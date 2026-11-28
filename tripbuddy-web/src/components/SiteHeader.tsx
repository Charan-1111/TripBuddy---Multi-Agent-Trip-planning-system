"use client";

import Link from "next/link";
import { useState } from "react";
import { Brand } from "@/components/Brand";
import { Icon } from "@/components/Icon";

const navigation = [
  { label: "AI Planner", href: "/#planner" },
  { label: "My Trips", href: "/#sign-in" },
  { label: "Explore Stays & Flights", href: "/#explore" },
  { label: "Community Guides", href: "/#community" },
];

type SiteHeaderProps = {
  page?: "signin" | "signup" | "account-settings";
};

export function SiteHeader({ page = "signin" }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isSignUpPage = page === "signup";
  const isAccountSettingsPage = page === "account-settings";

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />

        <nav
          id="primary-navigation"
          className={`primary-navigation${menuOpen ? " is-open" : ""}`}
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {isSignUpPage && (
            <Link
              href="/signup"
              aria-current="page"
              onClick={() => setMenuOpen(false)}
            >
              Get started
            </Link>
          )}
          {isAccountSettingsPage && (
            <Link
              href="/account-settings"
              aria-current="page"
              onClick={() => setMenuOpen(false)}
            >
              Account Settings &amp; Security
            </Link>
          )}
          <Link
            className="mobile-sign-in"
            href="/#sign-in"
            onClick={() => setMenuOpen(false)}
          >
            Sign in
          </Link>
        </nav>

        <div className="header-actions">
          <button className="currency-button" type="button" aria-label="Currency: Indian rupees">
            <Icon name="globe" />
            <span>INR ₹</span>
          </button>
          <Link className="header-sign-in" href="/#sign-in">
            Sign in
          </Link>
          {isSignUpPage ? (
            <Link className="signup-button" href="/signup" aria-current="page">
              Sign up
            </Link>
          ) : (
            <Link className="plan-button" href="/#planner">
              Plan a trip
            </Link>
          )}
          <button
            className="icon-button notification-button"
            type="button"
            aria-label="Notifications"
            title="Notifications"
          >
            <Icon name="bell" />
            <span className="notification-dot" aria-hidden="true" />
          </button>
          <span className="profile-chip" aria-label="Guest profile">
            <span className="profile-avatar">G</span>
            <span className="profile-name">Guest</span>
          </span>
          <button
            className="icon-button menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}
