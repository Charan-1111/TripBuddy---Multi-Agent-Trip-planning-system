import type { Metadata } from "next";
import Link from "next/link";
import { BenefitsStrip } from "@/components/BenefitsStrip";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { NewPasswordForm } from "@/components/recovery/NewPasswordForm";
import { PasswordSecurityGuidance } from "@/components/recovery/PasswordSecurityGuidance";

export const metadata: Metadata = {
  title: "Create a new password | TripBuddy",
  description:
    "Preview the password update step for a TripBuddy account recovery.",
};

export default function NewPasswordPage() {
  return (
    <>
      <SiteHeader />
      <main className="new-password-main" id="top">
        <div className="new-password-shell">
          <div className="new-password-topline">
            <Link className="recovery-back-link" href="/password-reset">
              <span aria-hidden="true">&larr;</span>
              Back to recovery methods
            </Link>
            <div className="new-password-step">
              <span className="recovery-status-dot" aria-hidden="true" />
              Step 02 of 02: Credential update &amp; security confirmation
            </div>
            <span className="new-password-preview-pill">
              <span className="new-password-preview-dot" aria-hidden="true" />
              Password update preview
            </span>
          </div>

          <div className="new-password-layout">
            <NewPasswordForm />
            <PasswordSecurityGuidance />
          </div>
        </div>
      </main>
      <BenefitsStrip />
      <SiteFooter />
    </>
  );
}
