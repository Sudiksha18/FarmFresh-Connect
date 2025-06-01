import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Define the form schema with Zod
const formSchema = z.object({
  otp: z.string().min(6, { message: "Please enter a valid 6-digit code" }),
});

// Type for our form
type FormValues = z.infer<typeof formSchema>;

const OTPVerification = () => {
  return (
    <div>
      <h1>OTP Verification</h1>
      <p>Please enter the OTP sent to your email.</p>
    </div>
  );
};

export default OTPVerification;
