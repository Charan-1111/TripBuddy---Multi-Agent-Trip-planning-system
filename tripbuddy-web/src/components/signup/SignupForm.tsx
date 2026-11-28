import type { FormEvent } from "react";
import { AccountEssentials } from "@/components/signup/AccountEssentials";
import { SignupActions } from "@/components/signup/SignupActions";
import { TravelDNASection } from "@/components/signup/TravelDNASection";
import type { SignupProfile } from "@/components/signup/SignupProfile";

type SignupFormProps = {
  profile: SignupProfile;
  onProfileChange: <K extends keyof SignupProfile>(
    key: K,
    value: SignupProfile[K],
  ) => void;
  onToggleStyle: (style: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function SignupForm({
  profile,
  onProfileChange,
  onToggleStyle,
  onSubmit,
}: SignupFormProps) {
  return (
    <form className="signup-form" onSubmit={onSubmit}>
      <AccountEssentials
        email={profile.email}
        fullName={profile.fullName}
        onEmailChange={(value) => onProfileChange("email", value)}
        onFullNameChange={(value) => onProfileChange("fullName", value)}
        onPasswordChange={(value) => onProfileChange("password", value)}
        onPasswordVisibilityChange={() =>
          onProfileChange("passwordVisible", !profile.passwordVisible)
        }
        onPhoneChange={(value) => onProfileChange("phone", value)}
        onWhatsappUpdatesChange={(checked) =>
          onProfileChange("whatsappUpdates", checked)
        }
        password={profile.password}
        passwordVisible={profile.passwordVisible}
        phone={profile.phone}
        whatsappUpdates={profile.whatsappUpdates}
      />
      <TravelDNASection
        dietary={profile.dietary}
        entourage={profile.entourage}
        onDietaryChange={(value) => onProfileChange("dietary", value)}
        onEntourageChange={(value) => onProfileChange("entourage", value)}
        onPaceChange={(value) => onProfileChange("pace", value)}
        onStayChange={(value) => onProfileChange("stay", value)}
        onToggleStyle={onToggleStyle}
        pace={profile.pace}
        selectedStyles={profile.selectedStyles}
        stay={profile.stay}
      />
      <SignupActions
        emailUpdates={profile.emailUpdates}
        notice={profile.notice}
        onEmailUpdatesChange={(checked) =>
          onProfileChange("emailUpdates", checked)
        }
        onTermsAcceptedChange={(checked) =>
          onProfileChange("termsAccepted", checked)
        }
        termsAccepted={profile.termsAccepted}
      />
    </form>
  );
}
