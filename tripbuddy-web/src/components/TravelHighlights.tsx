import Link from "next/link";
import { Icon } from "@/components/Icon";

const accountFeatures = [
  {
    icon: "ticket" as const,
    title: "Flight insights",
    description: "Explore live flight status and useful route details.",
  },
  {
    icon: "compass" as const,
    title: "Thoughtful itineraries",
    description: "Turn a travel idea into an organized day-by-day plan.",
  },
  {
    icon: "globe" as const,
    title: "Stay discovery",
    description: "Find hotel research and destination inspiration together.",
  },
];

export function TravelHighlights() {
  return (
    <aside className="highlights-column" id="explore" aria-label="TripBuddy travel planning">
      <section className="travel-panel">
        <div className="panel-heading-row">
          <span className="live-badge">
            <span className="live-dot" aria-hidden="true" />
            AI trip planning
          </span>
          <span className="panel-tag">Made for curious travelers</span>
        </div>

        <h2>More wonder in the journey. Less work in the planning.</h2>
        <p className="panel-intro">
          Bring your travel ideas together with flight insights, stay research,
          and an itinerary shaped around your trip.
        </p>

        <div className="trip-preview">
          <div className="preview-topline">
            <span className="star-rating" aria-label="Trip inspiration">
              ✦ ✦ ✦ ✦ ✦
            </span>
            <span className="preview-caption">A little travel inspiration</span>
          </div>
          <blockquote>
            “The best trips begin with a simple idea. Let’s make yours easier to
            explore.”
          </blockquote>
          <div className="preview-author">
            <span className="author-avatar">TB</span>
            <span>
              <strong>TripBuddy AI</strong>
              <small>Your planning companion</small>
            </span>
            <Icon name="sparkles" />
          </div>
        </div>

        <div className="features-heading">A clearer start for your next trip</div>
        <ul className="feature-list">
          {accountFeatures.map((feature) => (
            <li key={feature.title}>
              <span className="feature-icon">
                <Icon name={feature.icon} />
              </span>
              <span>
                <strong>{feature.title}</strong>
                <small>{feature.description}</small>
              </span>
            </li>
          ))}
        </ul>

        <div className="community-row">
          <div className="avatar-stack" aria-hidden="true">
            <span>J</span>
            <span>M</span>
            <span>A</span>
            <span>+</span>
          </div>
          <span>Good journeys start with a good plan.</span>
        </div>
      </section>

      <div className="ai-prompt-card" id="planner">
        <span className="prompt-icon">
          <Icon name="sparkles" />
        </span>
        <span className="prompt-copy">
          <strong>Have a destination in mind?</strong>
          <small>Describe your trip and get an itinerary to build on.</small>
        </span>
        <Link href="#sign-in" aria-label="Sign in to start planning">
          <span>Explore</span>
          <Icon name="arrow-right" />
        </Link>
      </div>
    </aside>
  );
}
