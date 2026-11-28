import type { SVGProps } from "react";

export type IconName =
  | "arrow-right"
  | "apple"
  | "bell"
  | "check"
  | "compass"
  | "eye"
  | "eye-off"
  | "globe"
  | "google"
  | "key"
  | "lock"
  | "mail"
  | "menu"
  | "plane"
  | "question"
  | "route"
  | "shield"
  | "sparkles"
  | "support"
  | "ticket"
  | "close"
  | "user"
  | "phone"
  | "leaf";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

export function Icon({ name, ...props }: IconProps) {
  const sharedProps = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      {...sharedProps}
      {...props}
    >
      {name === "arrow-right" && (
        <>
          <path d="M4.75 12h14.5" />
          <path d="m13 5.75 6.25 6.25L13 18.25" />
        </>
      )}
      {name === "apple" && (
        <path
          fill="currentColor"
          stroke="none"
          d="M16.37 12.57c.02 2.2 1.93 2.93 1.95 2.94-.02.05-.3 1.02-1 2.02-.6.86-1.22 1.72-2.2 1.74-.96.02-1.27-.56-2.36-.56-1.1 0-1.44.54-2.35.58-.94.03-1.66-.94-2.27-1.8-1.24-1.79-2.2-5.06-.92-7.27.63-1.1 1.75-1.8 2.97-1.82.92-.02 1.8.62 2.36.62.56 0 1.61-.77 2.71-.66.46.02 1.74.19 2.56 1.42-.07.05-1.53.9-1.51 2.79Zm-1.78-6.04c.5-.6.84-1.43.75-2.26-.72.03-1.6.48-2.12 1.08-.47.54-.88 1.39-.77 2.2.81.06 1.64-.42 2.14-1.02Z"
        />
      )}
      {name === "bell" && (
        <>
          <path d="M18 8.5a6 6 0 0 0-12 0c0 7-2.5 7-2.5 8.5h17C20.5 15.5 18 15.5 18 8.5Z" />
          <path d="M10 20h4" />
        </>
      )}
      {name === "check" && <path d="m5 12.5 4.5 4.5L19 7.5" />}
      {name === "compass" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.8 8.2-2.4 5.2-5.2 2.4 2.4-5.2 5.2-2.4Z" />
        </>
      )}
      {name === "eye" && (
        <>
          <path d="M2.5 12s3.2-6 9.5-6 9.5 6 9.5 6-3.2 6-9.5 6-9.5-6-9.5-6Z" />
          <circle cx="12" cy="12" r="2.5" />
        </>
      )}
      {name === "eye-off" && (
        <>
          <path d="m3 3 18 18M10.6 6.2A9.9 9.9 0 0 1 12 6c6.3 0 9.5 6 9.5 6a15 15 0 0 1-3.1 3.6M6.2 6.8C3.8 8.4 2.5 12 2.5 12s3.2 6 9.5 6c1 0 2-.2 2.8-.5" />
          <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
        </>
      )}
      {name === "globe" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M3.5 12h17M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </>
      )}
      {name === "google" && (
        <path
          fill="currentColor"
          stroke="none"
          d="M21.35 12.2c0-.7-.06-1.37-.18-2.02H12v3.83h5.23a4.47 4.47 0 0 1-1.94 2.93v2.39h3.14c1.84-1.7 2.92-4.2 2.92-7.13ZM12 21.75c2.63 0 4.83-.87 6.44-2.35l-3.14-2.4c-.87.58-1.98.93-3.3.93-2.54 0-4.7-1.72-5.47-4.04H3.29v2.47A9.73 9.73 0 0 0 12 21.75Zm-5.47-7.86a5.85 5.85 0 0 1 0-3.78V7.64H3.29a9.75 9.75 0 0 0 0 8.72l3.24-2.47ZM12 6.07c1.43 0 2.72.5 3.73 1.49l2.8-2.8C16.83 3.2 14.63 2.25 12 2.25a9.73 9.73 0 0 0-8.71 5.39l3.24 2.47C7.3 7.8 9.46 6.07 12 6.07Z"
        />
      )}
      {name === "lock" && (
        <>
          <rect x="4.5" y="10" width="15" height="11" rx="2" />
          <path d="M8 10V7a4 4 0 1 1 8 0v3M12 14v3" />
        </>
      )}
      {name === "key" && (
        <>
          <circle cx="8" cy="15" r="4" />
          <path d="m11 12 8-8 2 2-2 2 1.5 1.5-2 2L17 10l-3 3" />
        </>
      )}
      {name === "mail" && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </>
      )}
      {name === "menu" && (
        <>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </>
      )}
      {name === "plane" && (
        <path
          fill="currentColor"
          stroke="none"
          d="m21.6 3.2-6.1 17.1c-.2.5-.8.6-1.1.2l-4.1-5.1-4.1 3.2c-.4.3-1 .1-1-.5l.5-5.5-3.3-1.9c-.5-.3-.4-1 .1-1.2l18-7.4c.6-.2 1.3.5 1.1 1.1ZM7 11.6l8.4-5.3-5.9 7.4 3.7 4.6 4.5-12.5L7 11.6Z"
        />
      )}
      {name === "question" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.6 9a2.5 2.5 0 1 1 4.2 1.8c-1.1 1-1.8 1.3-1.8 2.7M12 17h.01" />
        </>
      )}
      {name === "route" && (
        <>
          <circle cx="6" cy="18" r="2" />
          <circle cx="18" cy="6" r="2" />
          <path d="M8 18h3a3 3 0 0 0 3-3v-3a3 3 0 0 1 3-3h1" />
        </>
      )}
      {name === "shield" && (
        <>
          <path d="M12 3 20 6v5.5c0 4.7-3.2 7.8-8 9.5-4.8-1.7-8-4.8-8-9.5V6l8-3Z" />
          <path d="m8.5 12 2.3 2.3 4.8-4.8" />
        </>
      )}
      {name === "sparkles" && (
        <>
          <path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" />
          <path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15ZM5 2l.6 1.4L7 4l-1.4.6L5 6l-.6-1.4L3 4l1.4-.6L5 2Z" />
        </>
      )}
      {name === "support" && (
        <>
          <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
          <path d="M4 13h3v6H6a2 2 0 0 1-2-2v-4ZM20 13h-3v6h1a2 2 0 0 0 2-2v-4ZM17 19a5 5 0 0 1-5 2h-1" />
        </>
      )}
      {name === "ticket" && (
        <>
          <path d="M4 6h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4V6Z" />
          <path d="M13 8v2M13 14v2" />
        </>
      )}
      {name === "close" && <path d="m6 6 12 12M18 6 6 18" />}
      {name === "user" && (
        <>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </>
      )}
      {name === "phone" && (
        <path d="M7.2 3.5h2.3l1.2 4.1-1.6 1.6a15 15 0 0 0 5.7 5.7l1.6-1.6 4.1 1.2v2.3a2 2 0 0 1-2.2 2c-7.5-.7-13.2-6.4-13.9-13.9a2 2 0 0 1 2.8-1.4Z" />
      )}
      {name === "leaf" && (
        <>
          <path d="M20 4c-9 0-15 3.8-15 10a6 6 0 0 0 6 6c6.2 0 9-7 9-16Z" />
          <path d="M4 21c3-5 7-8 12-11" />
        </>
      )}
    </svg>
  );
}
