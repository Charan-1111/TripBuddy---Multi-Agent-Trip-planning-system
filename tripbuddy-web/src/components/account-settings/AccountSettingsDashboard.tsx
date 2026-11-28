"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import { AccountSettingsSections, type SettingsTab } from "@/components/account-settings/AccountSettingsSections";

const settingsTabs: { id: SettingsTab; label: string }[] = [
  { id: "security", label: "Security & Login" },
  { id: "sessions", label: "Active Sessions (3)" },
  { id: "profile", label: "Profile & Travel DNA" },
  { id: "privacy", label: "Notifications & Privacy" },
];

export function AccountSettingsDashboard() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("security");
  const [notice, setNotice] = useState("");

  function showPreviewNotice(message: string) {
    setNotice(`${message} This is a preview; no account changes were made.`);
  }

  return (
    <div className="account-settings-shell">
      <div className="account-settings-topline">
        <Link className="account-back-link" href="/#sign-in">
          <span aria-hidden="true">&larr;</span>
          Back to My Trips
        </Link>
        <div className="account-trust-badges">
          <span className="account-protection-badge">
            <Icon name="shield" />
            Tier 1 · Preview protection
          </span>
          <span className="account-audit-badge">
            <span className="account-status-dot" aria-hidden="true" />
            Sample security dashboard
          </span>
        </div>
      </div>

      <section className="account-profile-card" aria-label="Account overview preview">
        <div className="account-profile-heading">
          <span className="account-avatar" aria-hidden="true">AS</span>
          <span className="account-profile-copy">
            <span className="account-name-row">
              <strong>Ananya Sharma</strong>
              <span className="account-verified-badge">
                <Icon name="check" />
                Sample profile
              </span>
            </span>
            <small>Member since December 2023 · Bengaluru, India</small>
          </span>
          <button
            className="account-edit-profile"
            onClick={() => {
              setActiveTab("profile");
              setNotice("");
            }}
            type="button"
          >
            <Icon name="user" />
            Edit profile
          </button>
        </div>

        <div className="account-contact-grid">
          <article className="account-contact-item">
            <span>Primary email</span>
            <strong>ananya.sharma@example.com</strong>
            <small className="contact-status">Verified · demo</small>
          </article>
          <article className="account-contact-item">
            <span>Phone number</span>
            <strong>+91 00000 00000</strong>
            <small className="contact-status">WhatsApp · sample</small>
          </article>
          <article className="account-contact-item">
            <span>Emergency contact</span>
            <strong>Rohan Sharma · +91 00000 00000</strong>
            <small className="contact-status">Example contact</small>
          </article>
        </div>

        <div className="account-travel-dna">
          <span className="travel-dna-title">
            <Icon name="sparkles" />
            Travel DNA:
          </span>
          <span className="travel-dna-chip">Nature &amp; Serenity</span>
          <span className="travel-dna-chip">Heritage &amp; Culture</span>
          <span className="travel-dna-chip">Pure Vegetarian</span>
          <span className="travel-dna-chip">Slow &amp; Serene</span>
          <button
            onClick={() => {
              setActiveTab("profile");
              setNotice("");
            }}
            type="button"
          >
            Recalibrate Travel DNA
            <Icon name="arrow-right" />
          </button>
        </div>
      </section>

      <div className="account-settings-tabs" role="group" aria-label="Account settings sections">
        {settingsTabs.map((tab) => (
          <button
            aria-pressed={activeTab === tab.id}
            className={activeTab === tab.id ? "is-active" : ""}
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setNotice("");
            }}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {notice && (
        <p className="account-settings-notice" role="status">
          <Icon name="shield" />
          {notice}
        </p>
      )}

      <AccountSettingsSections
        activeTab={activeTab}
        onPreviewAction={showPreviewNotice}
      />
      <p className="account-preview-disclaimer">
        <Icon name="question" />
        Account, security, and privacy controls are illustrative only. No data is saved or sent.
      </p>
    </div>
  );
}
