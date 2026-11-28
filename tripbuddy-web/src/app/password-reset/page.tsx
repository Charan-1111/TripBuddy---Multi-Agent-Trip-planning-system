import type { Metadata } from "next";
import Link from "next/link";
import { BenefitsStrip } from "@/components/BenefitsStrip";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PasswordResetCard } from "@/components/recovery/PasswordResetCard";
import { RecoveryGuidance } from "@/components/recovery/RecoveryGuidance";

export const metadata: Metadata = {
  title: "Reset your password | TripBuddy",
  description:
    "Choose an email or phone recovery method for your TripBuddy account.",
};

export default function PasswordResetPage() {
  return (
    <>
      <SiteHeader />
      <main className="recovery-main" id="top">
        <div className="recovery-shell">
          <Link className="recovery-back-link" href="/#sign-in">
            <span aria-hidden="true">&larr;</span>
            Back to sign in
          </Link>
          <div className="recovery-status-line">
            <span className="recovery-status-dot" aria-hidden="true" />
            Account recovery · Step 01 of 02: Choose a method
          </div>

          <div className="recovery-layout">
            <PasswordResetCard />
            <RecoveryGuidance />
          </div>
        </div>
      </main>
      <BenefitsStrip />
      <SiteFooter />
    </>
  );
}
