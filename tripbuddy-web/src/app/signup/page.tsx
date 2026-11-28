import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SignupExperience } from "@/components/signup/SignupExperience";
import { SignupIntro } from "@/components/signup/SignupIntro";

export const metadata: Metadata = {
  title: "Create your account | TripBuddy",
  description:
    "Set up your TripBuddy profile and choose the travel styles that inspire your next journey.",
};

export default function SignupPage() {
  return (
    <>
      <SiteHeader page="signup" />
      <main className="signup-main" id="top">
        <div className="signup-shell">
          <SignupIntro />
          <SignupExperience />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
