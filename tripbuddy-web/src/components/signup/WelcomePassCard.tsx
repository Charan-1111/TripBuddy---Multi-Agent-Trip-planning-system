import { Icon } from "@/components/Icon";

export function WelcomePassCard() {
  return (
    <section className="welcome-pass-card" aria-labelledby="welcome-pass-title">
      <div className="welcome-pass-topline">
        <span className="welcome-pass-label">
          <Icon name="ticket" />
          Your traveler profile
        </span>
        <span className="preview-only-badge">PREVIEW</span>
      </div>
      <h2 id="welcome-pass-title">A passport for the way you travel</h2>
      <p>
        Add a few details and preferences to make your TripBuddy planning
        experience feel more like you.
      </p>
      <div className="welcome-pass-bottom">
        <span>Profile setup</span>
        <span>Step 2 of 3</span>
      </div>
    </section>
  );
}
