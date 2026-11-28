"use client";

import { FormEvent, useState } from "react";
import { Icon } from "@/components/Icon";

type RecoveryMethod = "email" | "phone";

export function PasswordResetCard() {
  const [method, setMethod] = useState<RecoveryMethod>("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notice, setNotice] = useState("");

  function chooseMethod(nextMethod: RecoveryMethod) {
    setMethod(nextMethod);
    setNotice("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(
      method === "email"
        ? "Password recovery is not connected yet. No reset email was sent."
        : "SMS/WhatsApp recovery is not connected yet. No message was sent.",
    );
  }

  function handleAlternateMethod() {
    chooseMethod(method === "email" ? "phone" : "email");
  }

  return (
    <section className="recovery-card" aria-labelledby="recovery-title">
      <div className="recovery-card-accent" aria-hidden="true" />
      <div className="recovery-card-content">
        <div className="recovery-eyebrow">
          <Icon name="lock" />
          <span>Password recovery preview</span>
        </div>
        <h1 id="recovery-title">Reset your password</h1>
        <p className="recovery-intro">
          Choose an account contact method to preview the recovery flow.
        </p>

        <div className="recovery-tabs" role="group" aria-label="Choose a recovery method">
          <button
            aria-pressed={method === "email"}
            className={method === "email" ? "is-selected" : ""}
            id="email-recovery-tab"
            onClick={() => chooseMethod("email")}
            type="button"
          >
            <Icon name="mail" />
            Email recovery link
          </button>
          <button
            aria-pressed={method === "phone"}
            className={method === "phone" ? "is-selected" : ""}
            id="phone-recovery-tab"
            onClick={() => chooseMethod("phone")}
            type="button"
          >
            <Icon name="phone" />
            SMS / WhatsApp code
            <span className="method-preview-tag">Preview</span>
          </button>
        </div>

        <div
          aria-label={method === "email" ? "Email recovery" : "Phone recovery"}
          className="recovery-method-panel"
          id="recovery-method-panel"
          role="group"
        >
          <form className="recovery-form" onSubmit={handleSubmit}>
            <div className="recovery-field-heading">
              <label className="field-label" htmlFor="recovery-contact">
                {method === "email" ? "Email address" : "Mobile number"}
              </label>
              <span>
                <Icon name={method === "email" ? "mail" : "phone"} />
                {method === "email" ? "Used for sign-in" : "India · +91"}
              </span>
            </div>
            <div className={`input-wrap recovery-input-wrap${method === "phone" ? " phone-input-wrap" : ""}`}>
              {method === "phone" ? (
                <>
                  <span className="country-code">+91</span>
                  <span className="phone-divider" aria-hidden="true" />
                </>
              ) : (
                <Icon className="input-icon" name="mail" />
              )}
              <input
                autoComplete={method === "email" ? "email" : "tel"}
                id="recovery-contact"
                inputMode={method === "phone" ? "tel" : "email"}
                name={method === "email" ? "email" : "phone"}
                onChange={(event) => {
                  if (method === "email") {
                    setEmail(event.target.value);
                  } else {
                    setPhone(event.target.value);
                  }
                  setNotice("");
                }}
                placeholder={method === "email" ? "you@example.com" : "Mobile number"}
                required
                type={method === "email" ? "email" : "tel"}
                value={method === "email" ? email : phone}
              />
            </div>

            <p className="recovery-delivery-note">
              <Icon name="question" />
              {method === "email"
                ? "A connected service would send a reset link to this address."
                : "A connected service would send a one-time code to this number."}
            </p>

            <button className="recovery-submit-button" type="submit">
              <span>{method === "email" ? "Send reset instructions" : "Send recovery code"}</span>
              <Icon name="arrow-right" />
            </button>

            {notice && (
              <p className="recovery-notice" role="status">
                {notice}
              </p>
            )}
          </form>

          <button
            className="alternate-recovery-button"
            onClick={handleAlternateMethod}
            type="button"
          >
            <span className="alternate-recovery-icon">
              <Icon name={method === "email" ? "phone" : "mail"} />
            </span>
            <span>
              <strong>
                {method === "email" ? "Prefer a phone recovery option?" : "Prefer email recovery?"}
              </strong>
              <small>
                {method === "email"
                  ? "Switch to the SMS / WhatsApp preview."
                  : "Switch to the email reset-link preview."}
              </small>
            </span>
            <span className="alternate-recovery-action">
              {method === "email" ? "Use phone" : "Use email"}
            </span>
          </button>
        </div>
      </div>

      <div className="recovery-card-footer">
        <span>
          <Icon name="lock" />
          Frontend preview only
        </span>
        <span>
          <Icon name="shield" />
          No recovery message sent
        </span>
      </div>
    </section>
  );
}
