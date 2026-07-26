"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";

const queries = [
  {
    id: "deletion",
    label: "Data deletion",
    question: "Can I hard-delete a user when they close their account?",
    artifact: "ADR-014",
    title: "Soft-delete user records",
    answer:
      "No. User records remain recoverable for 30 days. New deletion work must preserve the restoration window.",
    related: "REQ-021 · DESIGN-008",
  },
  {
    id: "auth",
    label: "Authentication",
    question: "Should this service issue its own session tokens?",
    artifact: "ADR-027",
    title: "Centralize session issuance",
    answer:
      "No. Session tokens are issued by the identity boundary. Services validate them but do not mint replacements.",
    related: "REQ-034 · DESIGN-011",
  },
  {
    id: "storage",
    label: "Event storage",
    question: "Can I overwrite an event when its payload changes?",
    artifact: "ADR-031",
    title: "Append events; never mutate",
    answer:
      "No. Corrections append a compensating event so the audit trail and downstream replay remain deterministic.",
    related: "REQ-041 · ROADMAP-006",
  },
];

export function DecisionConsole() {
  const [activeId, setActiveId] = useState(queries[0].id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = queries.find((query) => query.id === activeId) ?? queries[0];

  const selectTab = (index: number) => {
    const next = queries[index];
    setActiveId(next.id);
    tabRefs.current[index]?.focus();
  };

  const handleTabKey = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number | undefined;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % queries.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + queries.length) % queries.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = queries.length - 1;
    }

    if (nextIndex !== undefined) {
      event.preventDefault();
      selectTab(nextIndex);
    }
  };

  return (
    <div className="decision-console">
      <div
        className="console-tabs"
        role="tablist"
        aria-label="Example repository queries"
      >
        {queries.map((query, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={active.id === query.id}
            aria-controls="decision-result"
            id={`tab-${query.id}`}
            key={query.id}
            onClick={() => setActiveId(query.id)}
            onKeyDown={(event) => handleTabKey(event, index)}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            tabIndex={active.id === query.id ? 0 : -1}
          >
            <span className="tab-marker" aria-hidden="true" />
            {query.label}
          </button>
        ))}
      </div>
      <div
        className="console-body"
        id="decision-result"
        role="tabpanel"
        aria-labelledby={`tab-${active.id}`}
        aria-live="polite"
        key={active.id}
      >
        <div className="query-pane">
          <div className="console-label">
            <span>AGENT QUERY</span>
            <span>EXAMPLE</span>
          </div>
          <blockquote>“{active.question}”</blockquote>
          <div className="query-route">
            <span>search_artifacts</span>
            <span aria-hidden="true">→</span>
            <span>get_artifact</span>
            <span aria-hidden="true">→</span>
            <span>get_related</span>
          </div>
        </div>
        <div className="result-pane">
          <div className="console-label">
            <span>CITED RESULT</span>
            <span className="verified">VALID RECORD</span>
          </div>
          <p className="artifact-id">{active.artifact}</p>
          <h3>{active.title}</h3>
          <p className="artifact-answer">{active.answer}</p>
          <p className="artifact-related">
            Related <span>{active.related}</span>
          </p>
        </div>
      </div>
      <div className="console-footer">
        <span>NO EMBEDDINGS</span>
        <span>NO MODEL CALL</span>
        <span>READ-ONLY MCP</span>
        <span>DETERMINISTIC RESULT</span>
      </div>
    </div>
  );
}
