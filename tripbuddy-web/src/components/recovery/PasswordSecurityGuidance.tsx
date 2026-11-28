import Link from "next/link";
import { Icon } from "@/components/Icon";

const securityPoints = [
  {
    title: "Use a unique password",
    description: "Avoid reusing a password from another account.",
    icon: "lock" as const,
  },
  {
    title: "Confirm the recovery request",
    description: "A live service should verify account ownership first.",
    icon: "check" as const,
  },
  {
    title: "Review active sessions",
    description: "Session controls depend on the connected account service.",
    icon: "route" as const,
  },
];

const nextSteps = [
  "A connected service would verify the recovery request.",
  "Your new password would be saved only after confirmation.",
  "You could then sign in and review your saved trip details.",
];

export function PasswordSecurityGuidance() {
  return (
    <aside className="password-security-sidebar" aria-label="Password update guidance">
      <section className="password-security-overview">
        <div className="password-security-label">
          <Icon name="shield" />
          Password security preview
          <span>Demo</span>
        </div>
        <h2>Keep your account and trip plans protected.</h2>
        <p>
          These are general account-safety suggestions. No account is connected
          to this screen.
        </p>

        <div className="password-security-list" aria-label="Security suggestions">
          {securityPoints.map((point) => (
            <div className="password-security-item" key={point.title}>
              <span className="password-security-icon">
                <Icon name={point.icon} />
              </span>
              <span>
                <strong>{point.title}</strong>
                <small>{point.description}</small>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="password-next-steps" aria-labelledby="password-next-title">
        <h2 id="password-next-title">
          <Icon name="question" />
          What happens next?
        </h2>
        <ol>
          {nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="password-preview-note">
          This demo does not update credentials, invalidate sessions, or send
          security notifications.
        </p>
      </section>

      <div className="password-not-requested">
        <Icon name="shield" />
        <span>
          <strong>Didn&apos;t request a password change?</strong>
          <small>No change has been made. Return to the recovery preview.</small>
        </span>
        <Link href="/password-reset" aria-label="Return to recovery methods">
          Back
        </Link>
      </div>
    </aside>
  );
}
