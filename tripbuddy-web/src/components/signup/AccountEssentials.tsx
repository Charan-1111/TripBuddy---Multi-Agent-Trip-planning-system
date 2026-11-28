import Link from "next/link";
import { Icon } from "@/components/Icon";

type AccountEssentialsProps = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  passwordVisible: boolean;
  whatsappUpdates: boolean;
  onFullNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onPasswordVisibilityChange: () => void;
  onWhatsappUpdatesChange: (checked: boolean) => void;
};

function getPasswordStrength(password: string) {
  if (!password) return { label: "Use 8 or more characters", level: 0 };

  const checks = [
    password.length >= 8,
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^a-zA-Z0-9]/.test(password),
  ].filter(Boolean).length;

  if (checks >= 4) return { label: "Strong", level: 3 };
  if (checks >= 3) return { label: "Good", level: 2 };
  return { label: "Add variety to strengthen it", level: 1 };
}

export function AccountEssentials({
  fullName,
  email,
  phone,
  password,
  passwordVisible,
  whatsappUpdates,
  onFullNameChange,
  onEmailChange,
  onPhoneChange,
  onPasswordChange,
  onPasswordVisibilityChange,
  onWhatsappUpdatesChange,
}: AccountEssentialsProps) {
  const strength = getPasswordStrength(password);

  return (
    <section
      className="signup-card account-essentials"
      aria-labelledby="account-essentials-title"
    >
      <div className="signup-section-heading">
        <div className="signup-section-title">
          <span className="section-index">1.</span>
          <h2 id="account-essentials-title">Account essentials</h2>
        </div>
        <span className="local-preview-badge">
          <Icon name="lock" />
          Private preview
        </span>
      </div>

      <div className="social-sign-in signup-social">
        <button
          type="button"
          onClick={() => window.alert("Google sign-up is not connected yet.")}
        >
          <Icon className="google-icon" name="google" />
          <span>Continue with Google</span>
        </button>
        <button
          type="button"
          onClick={() => window.alert("Apple sign-up is not connected yet.")}
        >
          <Icon name="apple" />
          <span>Continue with Apple</span>
        </button>
      </div>

      <div className="form-divider signup-divider">
        <span />
        <span>Or sign up with email</span>
        <span />
      </div>

      <div className="account-fields">
        <div className="account-field">
          <label className="field-label" htmlFor="signup-name">
            Full legal name
          </label>
          <div className="input-wrap signup-input-wrap">
            <Icon className="input-icon" name="user" />
            <input
              autoComplete="name"
              id="signup-name"
              name="name"
              onChange={(event) => onFullNameChange(event.target.value)}
              placeholder="Your name"
              required
              value={fullName}
            />
          </div>
        </div>
        <div className="account-field">
          <label className="field-label" htmlFor="signup-email">
            Email address
          </label>
          <div className="input-wrap signup-input-wrap">
            <Icon className="input-icon" name="mail" />
            <input
              autoComplete="email"
              id="signup-email"
              name="email"
              onChange={(event) => onEmailChange(event.target.value)}
              placeholder="you@example.com"
              required
              type="email"
              value={email}
            />
          </div>
        </div>
        <div className="account-field">
          <div className="field-label-row">
            <label className="field-label" htmlFor="signup-phone">
              Mobile number
            </label>
            <label className="whatsapp-option">
              <input
                checked={whatsappUpdates}
                onChange={(event) => onWhatsappUpdatesChange(event.target.checked)}
                type="checkbox"
              />
              <span>WhatsApp sync</span>
            </label>
          </div>
          <div className="input-wrap signup-input-wrap phone-input-wrap">
            <span className="country-code">+91</span>
            <span className="phone-divider" aria-hidden="true" />
            <input
              autoComplete="tel-national"
              id="signup-phone"
              inputMode="tel"
              name="phone"
              onChange={(event) => onPhoneChange(event.target.value)}
              placeholder="Mobile number"
              required
              type="tel"
              value={phone}
            />
          </div>
          <Link className="otp-preview-link" href="/verify-otp">
            Preview the phone verification screen
          </Link>
        </div>
        <div className="account-field">
          <div className="field-label-row">
            <label className="field-label" htmlFor="signup-password">
              Create master password
            </label>
            <span className={`password-strength level-${strength.level}`}>
              {strength.label}
            </span>
          </div>
          <div className="input-wrap signup-input-wrap">
            <Icon className="input-icon" name="lock" />
            <input
              autoComplete="new-password"
              id="signup-password"
              minLength={8}
              name="password"
              onChange={(event) => onPasswordChange(event.target.value)}
              placeholder="At least 8 characters"
              required
              type={passwordVisible ? "text" : "password"}
              value={password}
            />
            <button
              aria-label={passwordVisible ? "Hide password" : "Show password"}
              className="password-toggle"
              onClick={onPasswordVisibilityChange}
              type="button"
            >
              <Icon name={passwordVisible ? "eye-off" : "eye"} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
