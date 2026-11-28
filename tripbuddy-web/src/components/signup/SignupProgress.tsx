const steps = [
  { label: "Account core", icon: "01" },
  { label: "Travel DNA", icon: "02" },
  { label: "First itinerary", icon: "03" },
];

export function SignupProgress() {
  return (
    <ol className="signup-progress" aria-label="Account setup progress">
      {steps.map((step, index) => (
        <li
          className={`progress-step${index === 1 ? " is-active" : index === 0 ? " is-complete" : ""}`}
          key={step.label}
          aria-current={index === 1 ? "step" : undefined}
        >
          <span className="progress-line" aria-hidden="true" />
          <span className="progress-label">
            <span className="progress-icon" aria-hidden="true">
              {index === 0 ? "✓" : index === 1 ? "✦" : step.icon}
            </span>
            {index + 1}. {step.label}
          </span>
        </li>
      ))}
    </ol>
  );
}
