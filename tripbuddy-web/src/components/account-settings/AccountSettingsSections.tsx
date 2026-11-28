"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { AccountSecuritySidebar } from "@/components/account-settings/AccountSecuritySidebar";

export type SettingsTab = "security" | "sessions" | "profile" | "privacy";

type AccountSettingsSectionsProps = {
  activeTab: SettingsTab;
  onPreviewAction: (message: string) => void;
};

function PreviewToggle({
  label,
  description,
  defaultChecked = false,
}: {
  label: string;
  description: string;
  defaultChecked?: boolean;
}) {
  const [enabled, setEnabled] = useState(defaultChecked);
  return (
    <div className="account-toggle-row">
      <span className="account-toggle-icon">
        <Icon name="shield" />
      </span>
      <span className="account-toggle-copy">
        <strong>{label}</strong>
        <small>{description}</small>
      </span>
      <button
        aria-label={`${label}: ${enabled ? "on" : "off"}`}
        aria-pressed={enabled}
        className={`account-switch${enabled ? " is-on" : ""}`}
        onClick={() => setEnabled((value) => !value)}
        type="button"
      >
        <span />
      </button>
    </div>
  );
}

function SecuritySettings({
  onPreviewAction,
}: {
  onPreviewAction: (message: string) => void;
}) {
  const [twoFactorMethod, setTwoFactorMethod] = useState<"sms" | "app">("sms");
  const [googleConnected, setGoogleConnected] = useState(true);
  const [appleConnected, setAppleConnected] = useState(false);
  const [dangerConfirm, setDangerConfirm] = useState(false);

  return (
    <>
      <div className="account-settings-grid">
        <div className="account-settings-primary">
          <section className="account-settings-card password-auth-card">
            <div className="settings-card-heading">
              <span>
                <h2>Password &amp; Authentication</h2>
                <p>Manage passkeys, password strength, and two-factor authentication.</p>
              </span>
              <Icon name="lock" />
            </div>
            <div className="account-settings-card-body">
              <div className="account-password-row">
                <span className="account-toggle-icon"><Icon name="key" /></span>
                <span className="account-toggle-copy">
                  <strong>Account password</strong>
                  <small>Last changed 14 days ago · <b>Strong (92/100)</b></small>
                </span>
                <button
                  className="account-secondary-button"
                  onClick={() => onPreviewAction("Password change flow is not connected.")}
                  type="button"
                >
                  Change password
                </button>
              </div>
              <PreviewToggle
                defaultChecked
                description="Sign in instantly using device biometrics without typing passwords."
                label="Biometric 1-Tap Passkey / FaceID"
              />
              <PreviewToggle
                defaultChecked
                description="Extra verification layer for logins and wallet transactions."
                label="Two-Factor Authentication (2FA)"
              />
              <div className="two-factor-options" role="group" aria-label="Two-factor method preview">
                <button
                  aria-pressed={twoFactorMethod === "sms"}
                  className={twoFactorMethod === "sms" ? "is-selected" : ""}
                  onClick={() => setTwoFactorMethod("sms")}
                  type="button"
                >
                  <Icon name="phone" />
                  <span><strong>WhatsApp &amp; SMS OTP</strong><small>+91 00000 00000 · sample</small></span>
                  <Icon name="check" />
                </button>
                <button
                  aria-pressed={twoFactorMethod === "app"}
                  className={twoFactorMethod === "app" ? "is-selected" : ""}
                  onClick={() => setTwoFactorMethod("app")}
                  type="button"
                >
                  <Icon name="shield" />
                  <span><strong>Authenticator app</strong><small>Google / Authy TOTP</small></span>
                  {twoFactorMethod === "app" && <Icon name="check" />}
                </button>
              </div>
            </div>
          </section>

          <div className="account-settings-lower-grid">
            <section className="account-settings-card connected-accounts-card">
              <h2>Connected accounts</h2>
              <div className="connected-account-row">
                <Icon name="google" />
                <span><strong>Google OAuth</strong><small>{googleConnected ? "Connected · preview" : "Not linked"}</small></span>
                <button
                  aria-label={`Google account: ${googleConnected ? "connected" : "not connected"}`}
                  aria-pressed={googleConnected}
                  className={`account-switch${googleConnected ? " is-on" : ""}`}
                  onClick={() => setGoogleConnected((value) => !value)}
                  type="button"
                ><span /></button>
              </div>
              <div className="connected-account-row">
                <Icon name="user" />
                <span><strong>Apple ID</strong><small>{appleConnected ? "Connected · preview" : "Not linked"}</small></span>
                <button
                  aria-label={`Apple account: ${appleConnected ? "connected" : "not connected"}`}
                  aria-pressed={appleConnected}
                  className={`account-switch${appleConnected ? " is-on" : ""}`}
                  onClick={() => setAppleConnected((value) => !value)}
                  type="button"
                ><span /></button>
              </div>
            </section>

            <section className="account-danger-card">
              <div className="account-danger-heading">
                <Icon name="shield" />
                <h2>Danger zone</h2>
              </div>
              <p>Emergency lock and account deletion are unavailable in this preview.</p>
              {dangerConfirm ? (
                <div className="danger-confirmation">
                  <strong>No account will be frozen or deleted.</strong>
                  <button onClick={() => setDangerConfirm(false)} type="button">Dismiss</button>
                </div>
              ) : (
                <button
                  className="freeze-account-button"
                  onClick={() => setDangerConfirm(true)}
                  type="button"
                >
                  Freeze account (preview)
                </button>
              )}
              <button
                className="delete-account-button"
                onClick={() => onPreviewAction("Account deletion is unavailable in this prototype.")}
                type="button"
              >
                Delete account &amp; purge data (preview)
              </button>
            </section>
          </div>
        </div>
        <AccountSecuritySidebar onPreviewAction={onPreviewAction} />
      </div>
    </>
  );
}

function ActiveSessions({ onPreviewAction }: { onPreviewAction: (message: string) => void }) {
  const sessions = [
    { device: "MacBook Pro · Chrome", location: "Bengaluru, India · This device", lastActive: "Active now", current: true },
    { device: "iPhone 15 Pro · TripBuddy app", location: "Mumbai, India", lastActive: "2 hours ago", current: false },
    { device: "Windows laptop · Safari", location: "Bengaluru, India", lastActive: "Yesterday", current: false },
  ];
  return (
    <section className="account-settings-card account-detail-panel">
      <div className="settings-card-heading">
        <span><h2>Active sessions</h2><p>Review devices that have access to this sample account.</p></span>
        <Icon name="route" />
      </div>
      <div className="session-list">
        {sessions.map((session) => (
          <article className="session-row" key={session.device}>
            <span className="session-device-icon"><Icon name="user" /></span>
            <span className="session-device-copy">
              <strong>{session.device} {session.current && <em>This device</em>}</strong>
              <small>{session.location}</small>
              <small>{session.lastActive}</small>
            </span>
            {!session.current && (
              <button
                className="account-secondary-button"
                onClick={() => onPreviewAction(`Sign out from ${session.device} is not connected.`)}
                type="button"
              >
                Sign out
              </button>
            )}
          </article>
        ))}
      </div>
      <button
        className="account-outline-button"
        onClick={() => onPreviewAction("Sign out from all devices is not connected.")}
        type="button"
      >
        Sign out of all other sessions
      </button>
    </section>
  );
}

function ProfilePreferences({ onPreviewAction }: { onPreviewAction: (message: string) => void }) {
  return (
    <section className="account-settings-card account-detail-panel">
      <div className="settings-card-heading">
        <span><h2>Profile &amp; Travel DNA</h2><p>Adjust your traveler profile and trip preferences.</p></span>
        <Icon name="user" />
      </div>
      <form className="account-profile-form" onSubmit={(event) => {
        event.preventDefault();
        onPreviewAction("Profile updates are not connected.");
      }}>
        <label>Full name<input defaultValue="Ananya Sharma" /></label>
        <label>Home city<input defaultValue="Bengaluru, India" /></label>
        <label>Preferred travel pace
          <select defaultValue="slow"><option value="slow">Slow &amp; serene</option><option value="balanced">Balanced</option><option value="packed">See it all</option></select>
        </label>
        <label>Dietary preference
          <select defaultValue="vegetarian"><option value="vegetarian">Pure vegetarian</option><option value="vegan">Vegan</option><option value="none">No preference</option></select>
        </label>
        <div className="profile-interest-options" role="group" aria-label="Travel interests">
          <span>Travel interests</span>
          <label><input type="checkbox" defaultChecked /> Nature &amp; serenity</label>
          <label><input type="checkbox" defaultChecked /> Heritage &amp; culture</label>
          <label><input type="checkbox" /> Food &amp; local markets</label>
        </div>
        <button className="account-primary-button" type="submit">Save profile preview</button>
      </form>
    </section>
  );
}

function PrivacyPreferences({ onPreviewAction }: { onPreviewAction: (message: string) => void }) {
  return (
    <section className="account-settings-card account-detail-panel">
      <div className="settings-card-heading">
        <span><h2>Notifications &amp; Privacy</h2><p>Choose what updates you receive and how your profile is used.</p></span>
        <Icon name="shield" />
      </div>
      <div className="privacy-setting-list">
        <PreviewToggle defaultChecked label="Trip updates" description="Booking reminders and itinerary changes." />
        <PreviewToggle defaultChecked label="Security alerts" description="New sign-ins and important account activity." />
        <PreviewToggle label="Travel inspiration" description="Occasional destination ideas and planning tips." />
        <PreviewToggle label="Personalized recommendations" description="Use travel preferences to tailor suggested stays and activities." />
      </div>
      <button
        className="account-outline-button"
        onClick={() => onPreviewAction("Privacy data export and deletion requests are not connected.")}
        type="button"
      >
        Preview privacy data request
      </button>
    </section>
  );
}

export function AccountSettingsSections({ activeTab, onPreviewAction }: AccountSettingsSectionsProps) {
  if (activeTab === "sessions") return <ActiveSessions onPreviewAction={onPreviewAction} />;
  if (activeTab === "profile") return <ProfilePreferences onPreviewAction={onPreviewAction} />;
  if (activeTab === "privacy") return <PrivacyPreferences onPreviewAction={onPreviewAction} />;
  return <SecuritySettings onPreviewAction={onPreviewAction} />;
}
