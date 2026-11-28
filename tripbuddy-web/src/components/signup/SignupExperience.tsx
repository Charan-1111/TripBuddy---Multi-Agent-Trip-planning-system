"use client";

import { FormEvent, useState } from "react";
import { PersonalizationPreview } from "@/components/signup/PersonalizationPreview";
import { SignupForm } from "@/components/signup/SignupForm";
import type { SignupProfile } from "@/components/signup/SignupProfile";
import { TripBuddyPromise } from "@/components/signup/TripBuddyPromise";
import { WelcomePassCard } from "@/components/signup/WelcomePassCard";

const initialProfile: SignupProfile = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  passwordVisible: false,
  whatsappUpdates: false,
  emailUpdates: false,
  termsAccepted: false,
  selectedStyles: ["Nature & Serenity", "Heritage & Culture"],
  dietary: "Pure Vegetarian",
  pace: "Slow & Serene",
  stay: "Heritage Havens & Homestays",
  entourage: "Couple / 2 Adults",
  notice: "",
};

export function SignupExperience() {
  const [profile, setProfile] = useState(initialProfile);

  function updateProfile<K extends keyof SignupProfile>(
    key: K,
    value: SignupProfile[K],
  ) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  function toggleTravelStyle(style: string) {
    setProfile((current) => ({
      ...current,
      notice: "",
      selectedStyles: current.selectedStyles.includes(style)
        ? current.selectedStyles.filter((selected) => selected !== style)
        : [...current.selectedStyles, style],
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (profile.selectedStyles.length < 2) {
      updateProfile("notice", "Choose at least two travel styles to build your profile.");
      return;
    }

    updateProfile(
      "notice",
      "Account creation is not connected yet. Your details and preferences have not been sent or saved.",
    );
  }

  return (
    <div className="signup-layout">
      <SignupForm
        onProfileChange={updateProfile}
        onSubmit={handleSubmit}
        onToggleStyle={toggleTravelStyle}
        profile={profile}
      />
      <aside className="signup-sidebar" aria-label="TripBuddy profile preview">
        <WelcomePassCard />
        <PersonalizationPreview
          pace={profile.pace}
          selectedStyles={profile.selectedStyles}
          stay={profile.stay}
        />
        <TripBuddyPromise />
      </aside>
    </div>
  );
}
