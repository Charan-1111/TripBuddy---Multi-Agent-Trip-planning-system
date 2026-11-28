import { Icon } from "@/components/Icon";

const activity = [
  { title: "Password strength reviewed", detail: "Sample activity · Bengaluru", tone: "mint" },
  { title: "Passkey synced", detail: "Sample activity · iPhone", tone: "dark" },
  { title: "2FA verification", detail: "Sample activity · Mumbai", tone: "red" },
];

export function AccountSecuritySidebar({
  onPreviewAction,
}: {
  onPreviewAction: (message: string) => void;
}) {
  return (
    <aside className="account-security-sidebar" aria-label="Security summary">
      <section className="account-security-score">
        <div className="security-shield-mark"><Icon name="shield" /></div>
        <div className="account-score-eyebrow">Wanderer security shield</div>
        <p className="account-score"><strong>98</strong><span>/100</span></p>
        <p className="account-score-caption">Fortress level protection · sample score</p>
        <div className="account-score-meter" aria-label="Sample security score 98 out of 100">
          <span />
        </div>
        <div className="protected-assets">
          <strong>Protected assets · example</strong>
          <span>Ooty 7-day itinerary <b>Preview</b></span>
          <span>Flight &amp; stay details <b>Sample</b></span>
          <span>TripBuddy wallet <b>₹8,420</b></span>
        </div>
        <div className="travel-mode-row">
          <span><strong>Travel mode</strong><small>Strict Airport Wi-Fi Protection · preview</small></span>
          <span className="account-mode-indicator" aria-hidden="true" />
        </div>
      </section>

      <section className="account-activity-card">
        <h2>Recent security activity</h2>
        <ul>
          {activity.map((item) => (
            <li key={item.title}>
              <span className={`activity-dot ${item.tone}`} aria-hidden="true" />
              <span><strong>{item.title}</strong><small>{item.detail}</small></span>
            </li>
          ))}
        </ul>
      </section>

      <section className="account-security-desk">
        <div className="security-desk-title">
          <Icon name="support" />
          <h2>24/7 Traveler Security Desk</h2>
        </div>
        <p>For suspicious activity, contact the team. This contact information is illustrative.</p>
        <div className="security-hotline">Priority hotline <strong>+91 00000 00000 · sample</strong></div>
        <button
          onClick={() => onPreviewAction("Security reporting is not connected. No report was sent.")}
          type="button"
        >
          Report suspicious activity
        </button>
      </section>
    </aside>
  );
}
