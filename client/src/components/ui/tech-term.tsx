import React from "react";
import { TechTermTooltip } from "./tech-term-tooltip";
import { findTerm, TechTerm as TechTermType } from "@/data/tech-terms";

interface TechTermProps {
  children: React.ReactNode;
  term?: string; // Explicit term override (if different from children)
  className?: string;
}

export function TechTerm({ children, term, className }: TechTermProps) {
  const displayText = React.Children.toArray(children).join("");
  const termToUse = term || displayText;

  // Get the term definition, if it exists
  const termData = findTerm(termToUse);

  // If we don't have a definition for this term, just render the text
  if (!termData) {
    return <span className={className}>{children}</span>;
  }

  // Otherwise, render with a tooltip
  return (
    <TechTermTooltip
      term={termData.term}
      explanation={termData.explanation}
      className={className}
    >
      {children}
    </TechTermTooltip>
  );
}

// For cases where the term is already known and we want to provide explicit data
interface ExplicitTechTermProps {
  children: React.ReactNode;
  data: TechTermType;
  className?: string;
}

export function ExplicitTechTerm({ children, data, className }: ExplicitTechTermProps) {
  return (
    <TechTermTooltip
      term={data.term}
      explanation={data.explanation}
      className={className}
    >
      {children}
    </TechTermTooltip>
  );
}