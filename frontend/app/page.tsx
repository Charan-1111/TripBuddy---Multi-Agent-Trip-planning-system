"use client";

import { FormEvent, KeyboardEvent, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type TravelResponse = {
  success: boolean;
  thread_id?: string;
  answer?: string;
  error?: string;
};

const quickPrompts = [
  {
    label: "Japan Trip",
    prompt:
      "Plan a complete 7 days Japan trip from India including flights, hotels and sightseeing under 2 lakhs.",
  },
  {
    label: "Dubai Trip",
    prompt:
      "Plan a 5 days Dubai trip from Dhaka with flights, hotels and sightseeing.",
  },
  {
    label: "Thailand Trip",
    prompt:
      "Plan a 7 days Thailand trip from India with budget hotels and sightseeing.",
  },
  { label: "Global Flights", prompt: "Give me all country flight info." },
];

const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(
  /\/$/,
  "",
);

export default function Home() {
  const [message, setMessage] = useState("");
  const [threadId, setThreadId] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setThreadId(window.localStorage.getItem("travel_thread_id"));
  }, []);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      setError("Please enter your travel request first.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/travel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedMessage, thread_id: threadId }),
      });
      const data = (await response.json()) as TravelResponse;

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Something went wrong.");
      }
      if (!data.thread_id || !data.answer) {
        throw new Error("The travel service returned an incomplete response.");
      }

      setThreadId(data.thread_id);
      window.localStorage.setItem("travel_thread_id", data.thread_id);
      setAnswer(data.answer);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Could not connect to the travel service.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.ctrlKey && event.key === "Enter") {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(answer);
    } catch {
      setError("Could not copy result.");
    }
  }

  return (
    <>
      <div className="page-background" aria-hidden="true">
        <span className="glow glow-one" />
        <span className="glow glow-two" />
        <span className="glow glow-three" />
      </div>

      <main className="app-container">
        <section className="hero-section">
          <div className="badge">
            <span aria-hidden="true">✈</span> TripBuddy AI — Multi-Agent Travel
            Planner
          </div>
          <h1>Plan Your Perfect Trip with AI</h1>
          <p>
            Search flights, discover hotels, and generate a complete travel
            itinerary using a multi-agent LangGraph system.
          </p>
        </section>

        <section className="planner-card" aria-labelledby="planner-title">
          <div className="card-header">
            <div>
              <h2 id="planner-title">Where do you want to go?</h2>
              <p>
                Example: Plan a complete 7 days Japan trip from India under 2
                lakhs.
              </p>
            </div>
            <div className="status-pill">
              <span className="status-dot" />
              Ready to plan
            </div>
          </div>

          <form onSubmit={sendMessage}>
            <div className="input-area">
              <label className="sr-only" htmlFor="travel-request">
                Describe your trip
              </label>
              <textarea
                id="travel-request"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Plan a complete 7 days Japan trip including flights, hotels and sightseeing under 2 lakhs..."
                disabled={isLoading}
              />
              <button className="primary-button" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="loader" aria-hidden="true" />
                    Planning...
                  </>
                ) : (
                  "Generate Plan"
                )}
              </button>
            </div>
          </form>

          <div className="quick-prompts" aria-label="Example trip requests">
            {quickPrompts.map(({ label, prompt }) => (
              <button
                key={label}
                type="button"
                onClick={() => setMessage(prompt)}
                disabled={isLoading}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="keyboard-hint">Tip: press Ctrl + Enter to generate</p>
        </section>

        {error && (
          <div className="error-box" role="alert">
            {error}
          </div>
        )}

        {answer && (
          <section className="result-section" aria-labelledby="result-title">
            <div className="result-header">
              <div>
                <h2 id="result-title">Your AI Travel Plan</h2>
                {threadId && <p>Thread ID: {threadId}</p>}
              </div>
              <div className="result-actions">
                <button className="secondary-button" onClick={copyResult}>
                  Copy
                </button>
                <button className="download-button" onClick={() => window.print()}>
                  Save as PDF
                </button>
              </div>
            </div>
            <article className="result-content">
              <h1 className="print-title">AI Travel Plan</h1>
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
              </div>
            </article>
          </section>
        )}
      </main>

      <footer>
        Built with Next.js, FastAPI, LangGraph, Groq, PostgreSQL, Tavily and
        AviationStack
      </footer>
    </>
  );
}
