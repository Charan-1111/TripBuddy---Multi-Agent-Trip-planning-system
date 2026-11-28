import type { Metadata } from "next";
import Link from "next/link";
import { BenefitsStrip } from "@/components/BenefitsStrip";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { VerificationCard } from "@/components/verification/VerificationCard";
import { VerificationSidebar } from "@/components/verification/VerificationSidebar";

export const metadata: Metadata = {
  title: "Verify your phone | TripBuddy",
  description:
    "Enter a one-time passcode to continue setting up your TripBuddy travel profile.",
};

export default function VerifyOtpPage() {
  return (
    <>
      <SiteHeader />
      <main className="verification-main" id="top">
        <div className="verification-shell">
          <div className="verification-topline">
            <Link className="back-sign-in-link" href="/#sign-in">
              <span aria-hidden="true">&larr;</span>
              Back to sign in
            </Link>
            <div className="verification-progress-note">
              <span className="verification-step-dot" aria-hidden="true" />
              <strong>Step 02 of 03</strong>
              <span>Identity verification</span>
            </div>
          </div>

          <div className="verification-layout">
            <VerificationCard />
            <VerificationSidebar />
          </div>

          <div className="verification-help-row">
            <span>Having trouble receiving codes?</span>
            <Link href="mailto:hello@tripbuddy.ai?subject=Verification%20help">
              <span aria-hidden="true">?</span>
              Request help
            </Link>
          </div>
        </div>
      </main>
      <BenefitsStrip />
      <SiteFooter />
    </>
  );
}
