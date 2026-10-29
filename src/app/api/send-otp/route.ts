import { NextResponse } from "next/server";
import twilio from "twilio";

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_SID } =
  process.env;

// Client ek hi baar banta hai, har request par nahi
const client =
  TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN
    ? twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    : null;

const fail = (message: string, status = 400) =>
  NextResponse.json({ success: false, message }, { status });

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!/^\+91[6-9]\d{9}$/.test(phone ?? "")) {
      return fail("Please enter a valid 10-digit mobile number");
    }
    if (!client || !TWILIO_VERIFY_SERVICE_SID) {
      return fail("Server config error: Twilio keys missing.", 500);
    }

    await client.verify.v2
      .services(TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({ to: phone, channel: "sms" });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("send-otp error:", error?.code, error?.message);
    return fail(
      error?.code === 60203
        ? "Too many OTP requests. Please try again after some time."
        : error?.message || "Could not send OTP. Try again!"
    );
  }
}