import Link from "next/link";
import { Icon } from "@/components/Icon";

const recoverySteps = [
  {
    icon: "mail" as const,
    title: "Choose a contact method",
    description: "Use an email address or mobile number already associated with your account.",
  },
  {
    icon: "lock" as const,
    title: "Use a private reset link or code",
    description: "A recovery service should verify the request before changing a password.",
  },
  {
    icon: "check" as const,
    title: "Create a new password",
    description: "After verification, choose a strong password you have not reused.",
  },
];

const recoveryQuestions = [
  {
    question: "How long is a reset link valid?",
    answer:
      "The recovery service should set and communicate an expiry. TripBuddy password recovery is not connected in this preview.",
  },
  {
    question: "What if I no longer have access to my email or phone?",
    answer:
      "Use the account-support process to confirm ownership. Do not share passwords or verification codes over chat.",
  },
];

export function RecoveryGuidance() {
  return (
    <aside className="recovery-sidebar" aria-label="Password recovery guidance">
      <section className="recovery-overview-card" aria-labelledby="recovery-overview-title">
        <div className="recovery-overview-label">
          <Icon name="shield" />
          Account recovery
          <span>Preview</span>
        </div>
        <h2 id="recovery-overview-title">A careful way back into your account.</h2>
        <p>
          Password recovery should confirm account ownership before allowing a
          password change. This demo shows the interface only.
        </p>
        <ul className="recovery-steps">
          {recoverySteps.map((step) => (
            <li key={step.title}>
              <span className="recovery-step-icon">
                <Icon name={step.icon} />
              </span>
              <span>
                <strong>{step.title}</strong>
                <small>{step.description}</small>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="recovery-faq-card" aria-labelledby="recovery-faq-title">
        <h2 id="recovery-faq-title">
          <Icon name="question" />
          Common recovery questions
        </h2>
        <div className="recovery-faq-list">
          {recoveryQuestions.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
        <div className="recovery-support-card">
          <span className="support-kicker">
            <Icon name="support" />
            Need help?
          </span>
          <p>
            Contact the TripBuddy team if you have questions about this preview.
          </p>
          <Link href="mailto:hello@tripbuddy.ai?subject=Password%20recovery%20help">
            Contact TripBuddy
            <Icon name="arrow-right" />
          </Link>
        </div>
      </section>

      <div className="recovery-next-step">
        <span>
          <Icon name="lock" />
          Next screen
        </span>
        <Link href="/new-password">
          Preview new password setup
          <Icon name="arrow-right" />
        </Link>
        <small>Preview only · Recovery verification is not connected.</small>
      </div>
    </aside>
  );
}
