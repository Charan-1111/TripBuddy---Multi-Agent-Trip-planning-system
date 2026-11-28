import { Icon } from "@/components/Icon";

const benefits = [
  {
    icon: "shield" as const,
    title: "Plan with confidence",
    description: "Keep travel details and ideas easy to find.",
  },
  {
    icon: "compass" as const,
    title: "Explore thoughtfully",
    description: "Discover places and experiences for your trip.",
  },
  {
    icon: "support" as const,
    title: "Helpful travel tools",
    description: "Bring research and itinerary planning together.",
  },
];

export function BenefitsStrip() {
  return (
    <section className="benefits-section" aria-label="TripBuddy highlights">
      <div className="benefits-grid">
        {benefits.map((benefit) => (
          <article className="benefit-card" key={benefit.title}>
            <Icon name={benefit.icon} />
            <div>
              <h2>{benefit.title}</h2>
              <p>{benefit.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
