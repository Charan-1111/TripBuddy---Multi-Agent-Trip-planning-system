import Link from "next/link";
import { Icon } from "@/components/Icon";

type BrandProps = {
  compact?: boolean;
};

export function Brand({ compact = false }: BrandProps) {
  return (
    <Link className="brand" href="/" aria-label="TripBuddy home">
      <span className="brand-mark">
        <Icon name="plane" />
      </span>
      <span>TripBuddy</span>
      {!compact && <span className="brand-ai">AI</span>}
    </Link>
  );
}
