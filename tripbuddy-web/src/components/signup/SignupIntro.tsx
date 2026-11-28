import { SignupProgress } from "@/components/signup/SignupProgress";

export function SignupIntro() {
  return (
    <section className="signup-intro" aria-labelledby="signup-title">
      <div className="signup-announcement">
        <span className="announcement-dot" aria-hidden="true" />
        <span>Your TripBuddy profile starts here</span>
        <span className="announcement-separator" aria-hidden="true">
          ·
        </span>
        <strong>Shape your travel recommendations</strong>
      </div>
      <div className="signup-intro-row">
        <div>
          <h1 id="signup-title">
            Create your account &amp; tune your <em>Travel DNA</em>
          </h1>
          <p>
            Tell TripBuddy how you like to explore. Your preferences help shape
            travel ideas around your pace, palate, and sensibilities.
          </p>
        </div>
        <div className="signup-step-note">
          <strong>Step 02 of 03</strong>
          <span>Estimated completion: 2 min</span>
        </div>
      </div>
      <SignupProgress />
    </section>
  );
}
