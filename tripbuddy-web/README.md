# TripBuddy Web

This is a standalone, component-based Next.js frontend for the TripBuddy travel planner. It lives alongside the existing `frontend/` application so the sign-in, signup, verification, and password recovery screens can be developed independently.

## Requirements

- Node.js 20 or newer
- npm

## Run locally

From this directory:

```bash
npm install
npm run dev -- --port 3001
```

Open [http://localhost:3001](http://localhost:3001). The alternate port avoids conflicting with the existing frontend, which commonly uses port `3000`.

## Run with Docker

Build and run the production image from this directory:

```bash
docker build -t tripbuddy-web .
docker run --rm -p 3001:3000 tripbuddy-web
```

Open [http://localhost:3001](http://localhost:3001). The container listens on port `3000` and runs the standalone Next.js server as a non-root user.

## Routes

- `/` — Sign in
- `/signup` — Create an account and choose travel preferences
- `/verify-otp` — Enter a six-digit verification code
- `/password-reset` — Choose an email or phone recovery method
- `/new-password` — Preview setting a new password after recovery
- `/account-settings` — Preview security, sessions, profile, and privacy settings

## Project structure

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── password-reset/page.tsx
│   ├── account-settings/page.tsx
│   ├── signup/page.tsx
│   └── verify-otp/page.tsx
└── components/
    ├── BenefitsStrip.tsx
    ├── Brand.tsx
    ├── Icon.tsx
    ├── SignInCard.tsx
    ├── SiteFooter.tsx
    ├── SiteHeader.tsx
    ├── TravelHighlights.tsx
    ├── account-settings/
    │   ├── AccountSecuritySidebar.tsx
    │   ├── AccountSettingsDashboard.tsx
    │   └── AccountSettingsSections.tsx
    ├── recovery/
    │   ├── NewPasswordForm.tsx
    │   ├── PasswordSecurityGuidance.tsx
    │   ├── PasswordResetCard.tsx
    │   └── RecoveryGuidance.tsx
    ├── signup/
    │   ├── AccountEssentials.tsx
    │   ├── PersonalizationPreview.tsx
    │   ├── SignupActions.tsx
    │   ├── SignupExperience.tsx
    │   ├── SignupForm.tsx
    │   ├── SignupIntro.tsx
    │   ├── SignupProfile.ts
    │   ├── SignupProgress.tsx
    │   ├── TravelDNASection.tsx
    │   ├── TripBuddyPromise.tsx
    │   └── WelcomePassCard.tsx
    └── verification/
        ├── VerificationCard.tsx
        ├── VerificationCodeInput.tsx
        └── VerificationSidebar.tsx
```

The Travel DNA selections update the signup preview, and the OTP fields support keyboard entry and pasting. Password recovery includes email and SMS/WhatsApp method previews, followed by a new-password form preview with strength checks and confirmation validation. Account settings includes interactive previews for security, sessions, profile, and privacy controls. These are frontend-only prototypes: no credentials or codes are sent or stored, and account creation, recovery delivery, OTP verification, password updates, and account settings are not connected to a backend.

## Useful commands

```bash
npm run lint
npm run build
```
