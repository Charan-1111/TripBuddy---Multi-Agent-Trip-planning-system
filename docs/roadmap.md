# TripBuddy Improvement Roadmap

## Phase 1 — Reliability and cleanup
- [ ] Fix hotel state update and airport resolution bugs
- [ ] Separate frontend and backend
- [ ] Add structured request/response models
- [ ] Fix async blocking and error handling
- [ ] Add automated tests for existing behavior

## Phase 2 — Agentic workflow
- [ ] Extract trip requirements with structured LLM output
- [ ] Add supervisor routing and clarification questions
- [ ] Run independent research agents concurrently
- [ ] Support follow-up changes using persisted state
- [ ] Introduce budget validation and conditional replanning

## Phase 3 — Production AI engineering
- [ ] Introduce grounding and prompt-injection protections
- [ ] Add tool retries, timeouts, and fallback handling
- [ ] Implement LLM and tool tracing
- [ ] Track token usage, latency, and cost
- [ ] Build a small automated agent-evaluation dataset

## Phase 4 — Advanced capabilities
- [ ] Integrate an actual flight-offer search provider
- [ ] Add verified hotel and activity information
- [ ] Add human approval before consequential actions
- [ ] Support itinerary revisions and version history
- [ ] Introduce streaming agent progress to the frontend