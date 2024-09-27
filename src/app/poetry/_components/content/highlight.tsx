'use client';

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
  FloatingArrow, arrow,
  useTransitionStyles
} from "@floating-ui/react";
import { useTheme } from 'next-themes'


export default function Highlight({ children, text, underline = true }: { underline?: boolean,text: string, children: React.ReactNode }) {
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
        fallbackAxisSideDirection: "start"
      }),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ]
  });

  const {isMounted, styles} = useTransitionStyles(context, {
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
    role
  ]);

  return (
    <>
      <span ref={refs.setReference} {...getReferenceProps()} className={`inline-flex flex-wrap ${underline && 'underline-offset-4 cursor-pointer decoration-dotted underline'}`}>{children}</span>
      {isOpen && isMounted && (
        <span
          ref={refs.setFloating}
          style={{...floatingStyles, ...styles}}
          {...getFloatingProps()}
          className="bg-background text-foreground font-sans text-base py-2 px-4 rounded-md border max-w-md"
        >
          <FloatingArrow fill={theme === 'light' ? 'black' : 'white'} ref={arrowRef} context={context} />
          <span>{text}</span>
        </span>
      )}
    </>
  );
}
