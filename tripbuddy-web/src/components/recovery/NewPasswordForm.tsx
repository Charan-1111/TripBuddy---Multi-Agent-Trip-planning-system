"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";

const passwordRules = [
  {
    label: "At least 8 characters",
    isMet: (password: string) => password.length >= 8,
  },
  {
    label: "Uppercase and lowercase letters",
    isMet: (password: string) => /[a-z]/.test(password) && /[A-Z]/.test(password),
  },
  {
    label: "At least one number",
    isMet: (password: string) => /\d/.test(password),
  },
  {
    label: "At least one special symbol",
    isMet: (password: string) => /[^A-Za-z0-9]/.test(password),
  },
];

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onToggleVisibility: () => void;
  invalid?: boolean;
};

function PasswordField({
  id,
  label,
  value,
  onChange,
  visible,
  onToggleVisibility,
  invalid = false,
}: PasswordFieldProps) {
  return (
    <div className="new-password-field">
      <div className="input-wrap new-password-input-wrap">
        <Icon className="input-icon" name="lock" />
        <input
          aria-invalid={invalid}
          autoComplete="new-password"
          id={id}
          minLength={8}
          name={id}
          onChange={(event) => onChange(event.target.value)}
          required
          type={visible ? "text" : "password"}
          value={value}
        />
        <button
          aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          aria-pressed={visible}
          className="password-toggle"
          onClick={onToggleVisibility}
          type="button"
        >
          <Icon name={visible ? "eye-off" : "eye"} />
        </button>
      </div>
    </div>
  );
}

export function NewPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [signOutSessions, setSignOutSessions] = useState(true);
  const [freshSignIn, setFreshSignIn] = useState(false);
  const [notice, setNotice] = useState("");

  const ruleResults = passwordRules.map((rule) => ({
    ...rule,
    passed: rule.isMet(password),
  }));
  const strength = ruleResults.filter((rule) => rule.passed).length;
  const strengthLabel =
    password.length === 0
      ? "Not set"
      : strength < 2
        ? "Weak"
        : strength < 4
          ? "Fair"
          : "Strong";
  const passwordsMatch = confirmation.length > 0 && password === confirmation;
  const passwordsMismatch = confirmation.length > 0 && password !== confirmation;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (strength !== passwordRules.length) {
      setNotice("Meet each password requirement before previewing this step.");
      return;
    }

    if (password !== confirmation) {
      setNotice("The passwords do not match. Check both fields and try again.");
      return;
    }

    setNotice(
      "Preview complete. No password was changed or saved because account recovery is not connected.",
    );
  }

  return (
    <section className="new-password-card" aria-labelledby="new-password-title">
      <div className="new-password-card-accent" aria-hidden="true" />
      <div className="new-password-card-content">
        <div className="recovery-eyebrow">
          <Icon name="lock" />
          <span>Secure password setup · Preview</span>
        </div>
        <h1 id="new-password-title">Create a new password</h1>
        <p className="new-password-intro">
          Choose a resilient password to help protect your TripBuddy account.
          This screen is a frontend preview.
        </p>

        <div className="password-account-preview">
          <span className="password-account-icon">
            <Icon name="user" />
          </span>
          <span className="password-account-copy">
            <small>Recovery contact example</small>
            <strong>traveler@example.com</strong>
          </span>
          <span className="password-example-tag">Example only</span>
        </div>

        <form className="new-password-form" onSubmit={handleSubmit}>
          <div className="password-form-heading">
            <label htmlFor="new-password">New password</label>
            <small>Minimum 8 characters</small>
          </div>
          <PasswordField
            id="new-password"
            label="New password"
            onChange={(value) => {
              setPassword(value);
              setNotice("");
            }}
            onToggleVisibility={() => setPasswordVisible((visible) => !visible)}
            value={password}
            visible={passwordVisible}
          />

          <div className="password-strength-panel">
            <div className="password-strength-heading">
              <span>Password strength</span>
              <strong className={`strength-label strength-${strength}`}>
                {strengthLabel}
                {password && ` (${strength}/4)`}
              </strong>
            </div>
            <div
              aria-label={`Password strength: ${strengthLabel}`}
              className="password-strength-meter"
              role="meter"
              aria-valuemin={0}
              aria-valuemax={4}
              aria-valuenow={strength}
            >
              {passwordRules.map((rule, index) => (
                <span
                  aria-hidden="true"
                  className={index < strength ? `is-active strength-${strength}` : ""}
                  key={rule.label}
                />
              ))}
            </div>
          </div>

          <ul className="password-requirements" aria-label="Password requirements">
            {ruleResults.map((rule) => (
              <li className={rule.passed ? "is-met" : ""} key={rule.label}>
                <Icon name="check" />
                {rule.label}
              </li>
            ))}
          </ul>

          <div className="password-confirm-heading">
            <label className="field-label" htmlFor="confirm-password">
              Confirm new password
            </label>
            {passwordsMatch && (
              <span aria-live="polite" className="password-match-status">
                <Icon name="check" />
                Passwords match
              </span>
            )}
            {passwordsMismatch && (
              <span aria-live="polite" className="password-mismatch-status">
                Passwords do not match
              </span>
            )}
          </div>
          <PasswordField
            id="confirm-password"
            invalid={passwordsMismatch}
            label="Confirm new password"
            onChange={(value) => {
              setConfirmation(value);
              setNotice("");
            }}
            onToggleVisibility={() => setConfirmationVisible((visible) => !visible)}
            value={confirmation}
            visible={confirmationVisible}
          />

          <fieldset className="password-policy">
            <legend>Account security options</legend>
            <p>
              These preferences are shown for illustration and will not be
              applied to an account.
            </p>
            <label>
              <input
                checked={signOutSessions}
                onChange={(event) => setSignOutSessions(event.target.checked)}
                type="checkbox"
              />
              <span>
                <strong>Sign out other sessions</strong>
                <small>A connected account service could revoke existing sessions.</small>
              </span>
            </label>
            <label>
              <input
                checked={freshSignIn}
                onChange={(event) => setFreshSignIn(event.target.checked)}
                type="checkbox"
              />
              <span>
                <strong>Require a fresh sign-in on this device</strong>
                <small>Useful when changing a password on a shared device.</small>
              </span>
            </label>
          </fieldset>

          <button className="new-password-submit" type="submit">
            Update password (preview)
            <Icon name="arrow-right" />
          </button>
          <Link className="new-password-cancel" href="/password-reset">
            Cancel and return to recovery
          </Link>

          {notice && (
            <p className="new-password-notice" role="status">
              <Icon name="shield" />
              {notice}
            </p>
          )}
        </form>
      </div>
      <div className="new-password-card-footer">
        <Icon name="shield" />
        Frontend preview only · No password is sent or saved
      </div>
    </section>
  );
}
