import { BenefitsStrip } from "@/components/BenefitsStrip";
import { SignInCard } from "@/components/SignInCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TravelHighlights } from "@/components/TravelHighlights";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="main-content">
        <div className="page-shell">
          <div className="security-notice" aria-label="Sign-in information">
            <span className="security-dot" aria-hidden="true" />
            <span>Welcome to your TripBuddy travel account</span>
            <span className="notice-divider" aria-hidden="true">
              ·
            </span>
            <span className="engine-status">
              <span className="status-ring" aria-hidden="true" />
              AI trip planning, all in one place
            </span>
          </div>

          <div className="sign-in-layout">
            <SignInCard />
            <TravelHighlights />
          </div>

          <p className="help-line">
            <span className="help-mark" aria-hidden="true">
              ?
            </span>
            Need help planning your next trip?{" "}
            <a href="mailto:hello@tripbuddy.ai">Contact the TripBuddy team</a>
          </p>
        </div>
      </main>
      <BenefitsStrip />
      <SiteFooter />
    </>
  );
}
