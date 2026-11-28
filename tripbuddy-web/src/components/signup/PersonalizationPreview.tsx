import { Icon } from "@/components/Icon";

type PersonalizationPreviewProps = {
  selectedStyles: string[];
  pace: string;
  stay: string;
};

export function PersonalizationPreview({
  selectedStyles,
  pace,
  stay,
}: PersonalizationPreviewProps) {
  const styleSummary =
    selectedStyles.length > 0
      ? selectedStyles.slice(0, 2).join(" + ")
      : "Choose the travel styles that inspire you";

  return (
    <section className="personalization-card" aria-labelledby="personalization-title">
      <div className="personalization-heading">
        <div>
          <span className="preview-kicker">
            <span className="preview-live-dot" aria-hidden="true" />
            Your profile preview
          </span>
          <h2 id="personalization-title">A glimpse of your travel style</h2>
        </div>
        <span className="version-badge">LIVE PREVIEW</span>
      </div>

      <div className="matched-preferences">
        <div className="matched-title">
          <Icon name="sparkles" />
          Based on your selections
        </div>
        <p>{styleSummary}</p>
        <div className="preference-preview-grid">
          <span>
            <small>Your pace</small>
            <strong>{pace}</strong>
          </span>
          <span>
            <small>Stay inspiration</small>
            <strong>{stay}</strong>
          </span>
        </div>
      </div>

      <div
        className="destination-preview"
        aria-label="Illustrative destination preview"
      >
        <div className="landscape-art" aria-hidden="true">
          <span className="landscape-sun" />
          <span className="landscape-mountain mountain-back" />
          <span className="landscape-mountain mountain-front" />
          <span className="landscape-forest" />
          <span className="landscape-cabin">
            <span />
          </span>
        </div>
        <div className="destination-copy">
          <span className="illustration-label">Illustrative travel idea</span>
          <strong>Quiet trails &amp; heritage stays</strong>
          <small>A sample direction your itinerary could explore</small>
        </div>
      </div>

      <div className="route-preview">
        <span className="route-thumbnail">
          <Icon name="route" />
        </span>
        <span className="route-preview-copy">
          <strong>A first itinerary, made around you</strong>
          <small>Travel ideas can be refined as you plan.</small>
        </span>
        <span
          className="route-check"
          aria-label="Preview updates as you choose preferences"
        >
          <Icon name="check" />
        </span>
      </div>

      <div className="profile-score">
        <div>
          <span>Profile detail</span>
          <strong>
            {selectedStyles.length >= 2 ? "Taking shape" : "Add another style"}
          </strong>
        </div>
        <div className="profile-score-track" aria-hidden="true">
          <span
            style={{
              width: `${Math.min(100, 28 + selectedStyles.length * 18)}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
