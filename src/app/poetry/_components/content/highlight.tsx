"use client";

import { useRef, useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingArrow,
  arrow,
  useTransitionStyles,
} from "@floating-ui/react";
import { useTheme } from "next-themes";
import React from "react";
import clsx from "clsx";

export default function Highlight({
  children,
  text,
  underline = true,
}: {
  underline?: boolean;
  text: string;
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  const arrowRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: "start",
      }),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
  });

  const { isMounted, styles } = useTransitionStyles(context, {
    // Or, configure open and close durations separately:
    duration: {
      open: 200,
      close: 100,
    },
  });

  // Event listeners to change the open state
  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  // Role props for screen readers
  const role = useRole(context, { role: "tooltip" });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <>
      <span
        ref={refs.setReference}
        {...getReferenceProps()}
        className={clsx(
          "inline-flex flex-wrap",
          underline &&
            "cursor-pointer underline decoration-dotted underline-offset-4",
        )}
      >
        {children}
      </span>
      {isOpen && isMounted && (
        <span
          ref={refs.setFloating}
          style={{ ...floatingStyles, ...styles }}
          {...getFloatingProps()}
          className="max-w-md rounded-md border bg-background px-4 py-2 font-sans text-base text-foreground"
        >
          <FloatingArrow
            fill={theme === "light" ? "black" : "white"}
            ref={arrowRef}
            context={context}
          />
          <span>{text}</span>
        </span>
      )}
    </>
  );
}
