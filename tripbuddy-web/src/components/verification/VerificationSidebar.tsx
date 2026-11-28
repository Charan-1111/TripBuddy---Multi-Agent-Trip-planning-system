import { Icon } from "@/components/Icon";

const verificationReasons = [
  {
    icon: "ticket" as const,
    title: "Keep account access together",
    description: "A verified number can help with account recovery and sign-in.",
  },
  {
    icon: "route" as const,
    title: "Useful trip updates",
    description: "Choose how you want to receive planning and travel updates.",
  },
  {
    icon: "support" as const,
    title: "A clearer support path",
    description: "A contact method can help support find the right account.",
  },
];

export function VerificationSidebar() {
  return (
    <aside className="verification-sidebar" aria-label="Verification information">
      <section className="verification-intro-panel">
        <div className="verification-side-label">
          <Icon name="sparkles" />
          Account setup
        </div>
        <h2>One more step before your next journey.</h2>
        <p>
          Phone verification helps connect a contact method to your traveler
          profile. You stay in control of your preferences.
        </p>
        <div className="verification-side-status">
          <span>Sign-up flow</span>
          <strong>Step 2 of 3</strong>
        </div>
      </section>

      <section className="verification-why-card" aria-labelledby="why-verify-title">
        <div className="why-verify-heading">
          <h2 id="why-verify-title">Why add a phone number?</h2>
          <span className="why-info-icon" aria-hidden="true">
            <Icon name="question" />
          </span>
        </div>
        <ul>
          {verificationReasons.map((reason) => (
            <li key={reason.title}>
              <span className="why-icon">
                <Icon name={reason.icon} />
              </span>
              <span>
                <strong>{reason.title}</strong>
                <small>{reason.description}</small>
              </span>
            </li>
          ))}
        </ul>

        <div className="traveler-preview">
          <span className="traveler-avatar">TB</span>
          <span className="traveler-preview-copy">
            <strong>Your TripBuddy profile</strong>
            <small>Preview only · not yet saved</small>
          </span>
          <span className="traveler-preview-mark">
            <Icon name="check" />
          </span>
        </div>
      </section>

      <div className="verification-security-note">
        <Icon name="shield" />
        <span>Verification is a UI preview; no OTP service is connected.</span>
      </div>
    </aside>
  );
}
