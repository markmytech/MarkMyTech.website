import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TechTermTooltipProps {
  term: string;
  explanation: string;
  children: React.ReactNode;
  className?: string;
}

export function TechTermTooltip({
  term,
  explanation,
  children,
  className,
}: TechTermTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLSpanElement>(null);

  // Track analytics when a tooltip is viewed
  const handleShowTooltip = () => {
    setIsVisible(true);
    
    // Log tooltip view to analytics
    if (window.trackEvent) {
      window.trackEvent("tooltip_view", {
        term,
        page: window.location.pathname,
      });
    }
  };

  const handleHideTooltip = () => {
    setIsVisible(false);
  };

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current && 
        !tooltipRef.current.contains(event.target as Node) &&
        termRef.current &&
        !termRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Calculate position for tooltip (centered below term)
  const getTooltipStyle = () => {
    if (!termRef.current || !tooltipRef.current) return {};
    
    const termRect = termRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    // Center the tooltip under the term
    const left = termRect.left + (termRect.width / 2) - (tooltipRect.width / 2);
    const top = termRect.bottom + window.scrollY + 8; // 8px gap
    
    // Keep tooltip within viewport width
    const rightEdge = left + tooltipRect.width;
    const viewportWidth = window.innerWidth;
    
    let adjustedLeft = left;
    if (rightEdge > viewportWidth - 20) {
      adjustedLeft = viewportWidth - tooltipRect.width - 20;
    }
    if (adjustedLeft < 20) {
      adjustedLeft = 20;
    }
    
    return {
      top: `${top}px`,
      left: `${adjustedLeft}px`,
    };
  };

  return (
    <>
      <span
        ref={termRef}
        className={cn(
          "relative inline cursor-help border-b border-dotted border-primary/60 font-medium",
          "text-primary hover:border-primary transition-colors",
          className
        )}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsVisible(!isVisible);
          if (!isVisible) handleShowTooltip();
        }}
        onMouseEnter={handleShowTooltip}
        onMouseLeave={handleHideTooltip}
        aria-describedby={`tooltip-${term.replace(/\s+/g, "-").toLowerCase()}`}
      >
        {children}
      </span>

      {isVisible && (
        <div
          ref={tooltipRef}
          id={`tooltip-${term.replace(/\s+/g, "-").toLowerCase()}`}
          role="tooltip"
          className="fixed z-[60] w-64 rounded-md bg-white p-3 shadow-md border border-gray-200 text-sm"
          style={getTooltipStyle()}
        >
          <div className="font-semibold text-primary mb-1">{term}</div>
          <div className="text-gray-700">{explanation}</div>
        </div>
      )}
    </>
  );
}