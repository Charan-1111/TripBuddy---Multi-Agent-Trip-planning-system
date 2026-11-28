"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Icon } from "@/components/Icon";
import { VerificationCodeInput } from "@/components/verification/VerificationCodeInput";

const CODE_LENGTH = 6;

export function VerificationCard() {
  const [code, setCode] = useState("");
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (code.replace(/\D/g, "").length !== CODE_LENGTH) {
      setNotice("Enter all 6 digits to continue.");
      return;
    }

    setNotice(
      "Phone verification is not connected yet. No code was sent or checked.",
    );
  }

  function handleResend() {
    setNotice("Code delivery is not connected yet. No SMS or WhatsApp message was sent.");
  }

  return (
    <section className="verification-card" aria-labelledby="verify-phone-title">
      <div className="verification-accent" aria-hidden="true" />
      <div className="verification-card-main">
        <div className="verification-eyebrow">
          <Icon name="shield" />
          <span>Phone verification preview</span>
        </div>
        <h1 id="verify-phone-title">Verify your phone</h1>
        <p className="verification-destination">
          Enter the 6-digit code that will be sent to the mobile number used
          during sign-up.
        </p>
        <p className="delivery-status">
          <span className="delivery-status-dot" aria-hidden="true" />
          SMS and WhatsApp delivery are not connected in this preview.
        </p>
        <Link className="edit-phone-link" href="/signup">
          <Icon name="arrow-right" />
          Return to sign-up
        </Link>

        <form className="verification-form" onSubmit={handleSubmit} noValidate>
          <div className="code-label-row">
            <label className="verification-label" htmlFor="verification-digit-1">
              Enter 6-digit passcode
            </label>
            <span className="verification-auto-note">
              <span aria-hidden="true" />
              Paste supported
            </span>
          </div>
          <VerificationCodeInput code={code} onCodeChange={setCode} />
          <div className="code-help-row">
            <span>
              <Icon name="ticket" />
              Paste code supported (⌘+V / Ctrl+V)
            </span>
            <button type="button" onClick={() => setCode("")}>
              Clear all
            </button>
          </div>

          <div className="resend-panel">
            <span className="resend-icon">
              <Icon name="phone" />
            </span>
            <p>
              <strong>Haven’t received a code?</strong>
              <span>Code delivery will be available when verification is connected.</span>
            </p>
            <button className="resend-button" type="button" onClick={handleResend}>
              <Icon name="mail" />
              Resend code
            </button>
          </div>

          {notice && (
            <p className="verification-notice" role="status">
              {notice}
            </p>
          )}

          <button className="submit-button verify-submit-button" type="submit">
            <span>Verify phone</span>
            <Icon name="arrow-right" />
          </button>
          <p className="verification-consent">
            Continuing confirms that this is a demonstration flow. No code or
            account details are transmitted.
          </p>
        </form>
      </div>

      <div className="verification-card-footer">
        <span>
          <Icon name="lock" />
          Verification UI preview
        </span>
        <span>
          <Icon name="route" />
          No external service connected
        </span>
      </div>
    </section>
  );
}
