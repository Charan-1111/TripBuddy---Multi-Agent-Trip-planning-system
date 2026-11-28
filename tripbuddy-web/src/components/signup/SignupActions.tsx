import Link from "next/link";
import { Icon } from "@/components/Icon";

type SignupActionsProps = {
  emailUpdates: boolean;
  termsAccepted: boolean;
  notice: string;
  onEmailUpdatesChange: (checked: boolean) => void;
  onTermsAcceptedChange: (checked: boolean) => void;
};

export function SignupActions({
  emailUpdates,
  termsAccepted,
  notice,
  onEmailUpdatesChange,
  onTermsAcceptedChange,
}: SignupActionsProps) {
  return (
    <section className="signup-card signup-actions-card" aria-label="Complete your sign-up">
      <label className="consent-option">
        <input
          checked={emailUpdates}
          onChange={(event) => onEmailUpdatesChange(event.target.checked)}
          type="checkbox"
        />
        <span>
          Send me occasional TripBuddy planning tips and product updates.
          <strong> You can opt out at any time.</strong>
        </span>
      </label>
      <label className="consent-option">
        <input
          checked={termsAccepted}
          onChange={(event) => onTermsAcceptedChange(event.target.checked)}
          required
          type="checkbox"
        />
        <span>
          I understand this sign-up preview does not save or send my account
          details.
        </span>
      </label>

      {notice && (
        <p className="signup-notice" role="status">
          {notice}
        </p>
      )}

      <button className="submit-button signup-submit-button" type="submit">
        <span>Create my TripBuddy account</span>
        <Icon name="arrow-right" />
      </button>

      <p className="existing-account">
        Already have a TripBuddy account? <Link href="/#sign-in">Sign in</Link>
      </p>
    </section>
  );
}
