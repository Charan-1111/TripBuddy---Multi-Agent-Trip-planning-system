import Link from "next/link";
import { Brand } from "@/components/Brand";

const footerGroups = [
  {
    title: "Discover",
    links: ["Stays and escapes", "Flight routes", "Local guides", "Travel ideas"],
  },
  {
    title: "TripBuddy",
    links: ["About the project", "How it works", "Privacy", "Terms"],
  },
  {
    title: "Get in touch",
    links: ["Help and feedback", "Community", "Contact"],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer" id="community">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-brand-column">
            <Brand compact />
            <p>
              Thoughtful travel planning, bringing useful details and a little
              inspiration together.
            </p>
            <Link className="footer-contact" href="mailto:hello@tripbuddy.ai">
              Get in touch
            </Link>
          </div>

          {footerGroups.map((group) => (
            <div className="footer-link-group" key={group.title}>
              <h2>{group.title}</h2>
              <ul>
                {group.links.map((label) => (
                  <li key={label}>
                    <Link href={label === "Contact" ? "mailto:hello@tripbuddy.ai" : "#top"}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>© TripBuddy. Made for the next journey.</p>
          <div>
            <Link href="#top">Back to top</Link>
            <Link href="mailto:hello@tripbuddy.ai">Feedback</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
