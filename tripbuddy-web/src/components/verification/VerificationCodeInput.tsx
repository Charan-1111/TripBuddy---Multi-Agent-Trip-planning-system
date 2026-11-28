"use client";

import { ClipboardEvent, KeyboardEvent, useRef } from "react";

const CODE_LENGTH = 6;

type VerificationCodeInputProps = {
  code: string;
  onCodeChange: (code: string) => void;
};

export function VerificationCodeInput({
  code,
  onCodeChange,
}: VerificationCodeInputProps) {
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = code.padEnd(CODE_LENGTH, " ").slice(0, CODE_LENGTH).split("");
  const firstEmptyIndex = digits.findIndex((digit) => !digit.trim());

  function focusInput(index: number) {
    inputs.current[Math.max(0, Math.min(index, CODE_LENGTH - 1))]?.focus();
  }

  function applyPastedCode(index: number, value: string) {
    const pastedDigits = value.replace(/\D/g, "").slice(0, CODE_LENGTH - index);
    if (!pastedDigits) return;

    const nextCode = code.padEnd(CODE_LENGTH, " ").split("");
    pastedDigits.split("").forEach((digit, offset) => {
      nextCode[index + offset] = digit;
    });
    onCodeChange(nextCode.join("").trimEnd());
    focusInput(index + pastedDigits.length);
  }

  function handleChange(index: number, value: string) {
    const enteredDigits = value.replace(/\D/g, "");
    if (!enteredDigits) {
      const nextCode = code.padEnd(CODE_LENGTH, " ").split("");
      nextCode[index] = " ";
      onCodeChange(nextCode.join("").trimEnd());
      return;
    }

    if (enteredDigits.length > 1) {
      applyPastedCode(index, enteredDigits);
      return;
    }

    const nextCode = code.padEnd(CODE_LENGTH, " ").split("");
    nextCode[index] = enteredDigits;
    onCodeChange(nextCode.join("").trimEnd());
    focusInput(index + 1);
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index].trim()) {
      focusInput(index - 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusInput(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      focusInput(index + 1);
    }
  }

  function handlePaste(index: number, event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    applyPastedCode(index, event.clipboardData.getData("text"));
  }

  return (
    <div className="verification-code" role="group" aria-label="6-digit verification code">
      {digits.map((digit, index) => (
        <input
          aria-label={`Verification digit ${index + 1} of ${CODE_LENGTH}`}
          autoComplete={index === 0 ? "one-time-code" : "off"}
          className={`verification-digit${index === firstEmptyIndex ? " is-current" : ""}`}
          id={`verification-digit-${index + 1}`}
          key={index}
          inputMode="numeric"
          maxLength={CODE_LENGTH}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={(event) => handlePaste(index, event)}
          pattern="[0-9]*"
          ref={(element) => {
            inputs.current[index] = element;
          }}
          type="text"
          value={digit.trim()}
        />
      ))}
    </div>
  );
}
