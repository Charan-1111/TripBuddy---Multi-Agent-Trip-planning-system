import type { Metadata } from "next";
import { BenefitsStrip } from "@/components/BenefitsStrip";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { AccountSettingsDashboard } from "@/components/account-settings/AccountSettingsDashboard";

export const metadata: Metadata = {
  title: "Account settings & security | TripBuddy",
  description:
    "Preview TripBuddy account security, active sessions, travel profile, and privacy settings.",
};

export default function AccountSettingsPage() {
  return (
    <>
      <SiteHeader page="account-settings" />
      <main className="account-settings-main" id="top">
        <AccountSettingsDashboard />
      </main>
      <BenefitsStrip />
      <SiteFooter />
    </>
  );
}
