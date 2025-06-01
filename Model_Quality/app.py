import os
import numpy as np
import cv2
import pandas as pd
from flask import Flask, request, render_template
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from collections import Counter

app = Flask(__name__)

# ✅ Configure Upload Folder
UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# ✅ Train Model on Synthetic Data
np.random.seed(42)
data = {
    "Area": np.random.uniform(2000, 6000, 1000),
    "Perimeter": np.random.uniform(100, 300, 1000),
    "Circularity": np.random.uniform(0.6, 1.0, 1000),
    "Grade": np.random.choice(["A", "B", "C", "D"], 1000),
}
df = pd.DataFrame(data)
grade_mapping = {"A": 0, "B": 1, "C": 2, "D": 3}
df["Grade"] = df["Grade"].map(grade_mapping)

# ✅ Train-Test Split
X = df[["Area", "Perimeter", "Circularity"]]
y = df["Grade"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# ✅ Train Model
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)

# ✅ Function to determine final grade
def get_final_grade(predicted_grades):
    grade_counts = Counter(predicted_grades)
    final_grade = max(grade_counts, key=grade_counts.get)  # Grade with highest frequency
    return final_grade

# ✅ Function to Process Image and Predict Rice Grade
def predict_rice_grains(image_path):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        return None, "Error reading image"

    _, thresh = cv2.threshold(img, 150, 255, cv2.THRESH_BINARY_INV)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    features = []
    for cnt in contours:
        area = cv2.contourArea(cnt)
        perimeter = cv2.arcLength(cnt, True)
        circularity = (4 * np.pi * area) / (perimeter ** 2) if perimeter != 0 else 0
        features.append([area, perimeter, circularity])

    if not features:
        return None, "No rice grains detected"

    features_np = np.array(features)
    features_scaled = scaler.transform(features_np)
    predicted_labels = model.predict(features_scaled)

    grade_reverse_mapping = {0: "A", 1: "B", 2: "C", 3: "D"}
    predicted_grades = [grade_reverse_mapping[label] for label in predicted_labels]

    final_grade = get_final_grade(predicted_grades)

    img_color = cv2.imread(image_path)
    for cnt in contours:
        x, y, w, h = cv2.boundingRect(cnt)
        cv2.rectangle(img_color, (x, y), (x + w, y + h), (0, 255, 0), 2)

    output_path = os.path.join(UPLOAD_FOLDER, "output.jpg")
    cv2.imwrite(output_path, img_color)

    return final_grade, output_path

# ✅ Flask Routes
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        if "file" not in request.files:
            return render_template("index.html", error="No file uploaded.")

        file = request.files["file"]
        if file.filename == "":
            return render_template("index.html", error="No file selected.")

        filename = file.filename.replace(" ", "_")  # Simple filename sanitization
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(file_path)

        final_grade, output_image = predict_rice_grains(file_path)

        if not final_grade:
            return render_template("index.html", error="Could not detect rice grains.")

        return render_template("index.html", final_grade=final_grade, uploaded_img=file_path, output_img=output_image)

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)





