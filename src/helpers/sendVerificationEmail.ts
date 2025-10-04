import { resend } from "@/lib/resend";
import VerificationEmail from "./../../emails/VerificationEmails";
import { ApiResponse } from "@/types/apiResponse";

export const sendVerificationEmail = async (
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "TrueFeedback | Verification Code",
      react: VerificationEmail({ username: username, otp: verifyCode }),
    });

    return { success: true, message: "Verification email send successfully." };
  } catch (emailError) {
    console.log("Error sending verification email.", emailError);
    return { success: false, message: "Failed to send verification email." };
  }
};
