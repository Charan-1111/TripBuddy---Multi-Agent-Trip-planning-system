"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";

type SignInMethod = "google" | "apple" | "otp";

export function SignInCard() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [notice, setNotice] = useState("");

  function showUnavailableMessage(method: SignInMethod) {
    const methodName = {
      google: "Google sign-in",
      apple: "Apple sign-in",
      otp: "One-time passcode sign-in",
    }[method];
    setNotice(`${methodName} is not connected yet. Use the email form for now.`);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(
      "The sign-in service is not connected yet. Your details have not been submitted.",
    );
  }

  return (
    <section className="sign-in-card" id="sign-in" aria-labelledby="sign-in-title">
      <div className="card-accent" aria-hidden="true" />
      <div className="sign-in-card-content">
        <div className="eyebrow">
          <Icon name="compass" />
          <span>Wanderlust passport</span>
        </div>
        <h1 id="sign-in-title">Welcome back, explorer</h1>
        <p className="sign-in-intro">
          Sign in to revisit your saved itineraries and plan what comes next.
        </p>

        <div className="social-sign-in" aria-label="Other sign-in options">
          <button type="button" onClick={() => showUnavailableMessage("google")}>
            <Icon className="google-icon" name="google" />
            <span>Google</span>
          </button>
          <button type="button" onClick={() => showUnavailableMessage("apple")}>
            <Icon name="apple" />
            <span>Apple</span>
          </button>
          <button type="button" onClick={() => showUnavailableMessage("otp")}>
            <Icon name="ticket" />
            <span>Fast OTP</span>
          </button>
        </div>

        <div className="form-divider">
          <span />
          <span>Or sign in with email</span>
          <span />
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field-label" htmlFor="email">
            Email address
          </label>
          <div className="input-wrap">
            <Icon className="input-icon" name="mail" />
            <input
              autoComplete="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </div>

          <div className="password-label-row">
            <label className="field-label" htmlFor="password">
              Password
            </label>
            <Link className="text-action" href="/password-reset">
              Forgot password?
            </Link>
          </div>
          <div className="input-wrap">
            <Icon className="input-icon" name="lock" />
            <input
              autoComplete="current-password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              type={passwordVisible ? "text" : "password"}
            />
            <button
              aria-label={passwordVisible ? "Hide password" : "Show password"}
              aria-pressed={passwordVisible}
              className="password-toggle"
              onClick={() => setPasswordVisible((visible) => !visible)}
              type="button"
            >
              <Icon name={passwordVisible ? "eye-off" : "eye"} />
            </button>
          </div>

          <div className="form-options">
            <label className="remember-option">
              <input
                checked={rememberDevice}
                onChange={(event) => setRememberDevice(event.target.checked)}
                type="checkbox"
              />
              <span>Remember this device for 30 days</span>
            </label>
            <span className="sync-label">
              <Icon name="check" />
              Your trips, in sync
            </span>
          </div>

          <button className="submit-button" type="submit">
            <span>Sign in to TripBuddy</span>
            <Icon name="arrow-right" />
          </button>
        </form>

        {notice && (
          <p className="form-notice" role="status">
            {notice}
          </p>
        )}

        <div className="account-prompt">
          <p>
            <strong>Don’t have a traveler account?</strong>
            <span>Start with a fresh itinerary and keep your plans together.</span>
          </p>
          <Link href="/signup">Create account</Link>
        </div>

        <div className="trust-row" aria-label="TripBuddy benefits">
          <span>
            <Icon name="shield" />
            Your plans in one place
          </span>
          <span>
            <Icon name="sparkles" />
            AI-assisted planning
          </span>
          <span>
            <Icon name="route" />
            Built for better journeys
          </span>
        </div>
      </div>
    </section>
  );
}
