import { Icon, type IconName } from "@/components/Icon";

const travelStyles = [
  { label: "Nature & Serenity", icon: "leaf" as const },
  { label: "Heritage & Culture", icon: "compass" as const },
  { label: "High Adrenaline & Trekking", icon: "route" as const },
  { label: "Cafe & Culinary Trails", icon: "sparkles" as const },
  { label: "Wellness & Ayurvedic Retreats", icon: "sparkles" as const },
  { label: "Backpacker & Solo Nomad", icon: "globe" as const },
];

const dietaryOptions = [
  { label: "Pure Vegetarian", detail: "Vegetarian-first stays", icon: "leaf" as const },
  { label: "Non-Vegetarian", detail: "Regional cuisine options", icon: "ticket" as const },
  { label: "Vegan Friendly", detail: "Plant-based choices", icon: "leaf" as const },
  { label: "Jain Prep Only", detail: "No root vegetables", icon: "check" as const },
];

const paceOptions = [
  { label: "Slow & Serene", detail: "2–3 meaningful stops per day", icon: "compass" as const },
  { label: "Balanced", detail: "A few highlights each day", icon: "route" as const },
  { label: "High Cadence", detail: "More sights, active days", icon: "sparkles" as const },
];

const stayOptions = [
  {
    label: "Heritage Havens & Homestays",
    detail: "Colonial bungalows, estate stays & courtyards",
    icon: "compass" as const,
  },
  {
    label: "Eco-Resorts & Treehouses",
    detail: "Rainforest retreats with sustainability in mind",
    icon: "leaf" as const,
  },
  {
    label: "Luxury Palaces & Villas",
    detail: "Private spaces and considered service",
    icon: "sparkles" as const,
  },
  {
    label: "Boutique Nomadic Hubs",
    detail: "Design-led stays with workspace",
    icon: "globe" as const,
  },
];

const entourageOptions = [
  "Couple / 2 Adults",
  "Solo Wanderer",
  "Family with Children",
  "Squad / Friends (4+)",
];

type TravelDNASectionProps = {
  selectedStyles: string[];
  dietary: string;
  pace: string;
  stay: string;
  entourage: string;
  onToggleStyle: (style: string) => void;
  onDietaryChange: (dietary: string) => void;
  onPaceChange: (pace: string) => void;
  onStayChange: (stay: string) => void;
  onEntourageChange: (entourage: string) => void;
};

function ChoiceIcon({ name }: { name: IconName }) {
  return (
    <span className="choice-icon">
      <Icon name={name} />
    </span>
  );
}

export function TravelDNASection({
  selectedStyles,
  dietary,
  pace,
  stay,
  entourage,
  onToggleStyle,
  onDietaryChange,
  onPaceChange,
  onStayChange,
  onEntourageChange,
}: TravelDNASectionProps) {
  return (
    <section className="signup-card travel-dna-card" aria-labelledby="travel-dna-title">
      <div className="signup-section-heading travel-dna-heading">
        <div className="signup-section-title">
          <span className="section-index accent-index">2.</span>
          <h2 id="travel-dna-title">Calibrate your Travel DNA</h2>
        </div>
        <span className="section-aside">Your picks personalize suggestions</span>
      </div>

      <fieldset className="preference-group">
        <legend className="preference-legend">
          <span>Travel archetype &amp; passions</span>
          <span>Pick at least 2</span>
        </legend>
        <div className="style-chip-list">
          {travelStyles.map((option) => {
            const isSelected = selectedStyles.includes(option.label);
            return (
              <button
                aria-pressed={isSelected}
                className={`style-chip${isSelected ? " is-selected" : ""}`}
                key={option.label}
                onClick={() => onToggleStyle(option.label)}
                type="button"
              >
                <Icon name={option.icon} />
                {option.label}
                {isSelected && <Icon className="chip-check" name="check" />}
              </button>
            );
          })}
        </div>
        {selectedStyles.length < 2 && (
          <p className="selection-hint" role="status">
            Choose {2 - selectedStyles.length} more travel style
            {selectedStyles.length === 0 ? "s" : ""} to continue.
          </p>
        )}
      </fieldset>

      <fieldset className="preference-group">
        <legend className="preference-legend">
          <span>Dietary bias &amp; kitchen comfort</span>
        </legend>
        <div className="choice-card-grid dietary-grid">
          {dietaryOptions.map((option) => (
            <button
              aria-pressed={dietary === option.label}
              className={`choice-card dietary-card${dietary === option.label ? " is-selected" : ""}`}
              key={option.label}
              onClick={() => onDietaryChange(option.label)}
              type="button"
            >
              <ChoiceIcon name={option.icon} />
              {dietary === option.label && (
                <span className="selected-indicator" aria-hidden="true">
                  <Icon name="check" />
                </span>
              )}
              <strong>{option.label}</strong>
              <small>{option.detail}</small>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="preference-group">
        <legend className="preference-legend">
          <span>Daily rhythm &amp; sightseeing tempo</span>
        </legend>
        <div className="choice-card-grid pace-grid">
          {paceOptions.map((option) => (
            <button
              aria-pressed={pace === option.label}
              className={`choice-card pace-card${pace === option.label ? " is-selected" : ""}`}
              key={option.label}
              onClick={() => onPaceChange(option.label)}
              type="button"
            >
              <span className="pace-card-top">
                <strong>{option.label}</strong>
                <Icon name={option.icon} />
              </span>
              <small>{option.detail}</small>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="preference-group">
        <legend className="preference-legend">
          <span>Curated stay sanctuary archetype</span>
        </legend>
        <div className="choice-card-grid stay-grid">
          {stayOptions.map((option) => (
            <button
              aria-pressed={stay === option.label}
              className={`choice-card stay-card${stay === option.label ? " is-selected" : ""}`}
              key={option.label}
              onClick={() => onStayChange(option.label)}
              type="button"
            >
              <ChoiceIcon name={option.icon} />
              <span className="stay-card-copy">
                <strong>{option.label}</strong>
                <small>{option.detail}</small>
              </span>
              <span className="radio-indicator" aria-hidden="true" />
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="preference-group entourage-group">
        <legend className="preference-legend">
          <span>Standard travel entourage</span>
        </legend>
        <div className="entourage-list">
          {entourageOptions.map((option) => (
            <button
              aria-pressed={entourage === option}
              className={`entourage-chip${entourage === option ? " is-selected" : ""}`}
              key={option}
              onClick={() => onEntourageChange(option)}
              type="button"
            >
              <Icon name={entourage === option ? "check" : "user"} />
              {option}
            </button>
          ))}
        </div>
      </fieldset>
    </section>
  );
}
