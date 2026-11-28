import { Icon } from "@/components/Icon";

const promises = [
  { icon: "lock" as const, label: "Your choices stay in this preview" },
  { icon: "route" as const, label: "No booking or payment happens here" },
  { icon: "sparkles" as const, label: "Suggestions are starting points" },
  { icon: "check" as const, label: "You choose what fits your trip" },
];

export function TripBuddyPromise() {
  return (
    <section className="promise-card" aria-labelledby="promise-title">
      <h2 id="promise-title">The TripBuddy approach</h2>
      <ul>
        {promises.map((promise) => (
          <li key={promise.label}>
            <Icon name={promise.icon} />
            <span>{promise.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
