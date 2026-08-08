"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

/**
 * The opening sequence is a shared clock: the preloader owns it, and any
 * section that needs to land on cue (the hero, the navigation) reads from it.
 *
 * `revealed` flips the moment the curtain starts lifting, not when it finishes,
 * so the hero is already in motion as the studio is uncovered.
 */

type IntroState = {
  revealed: boolean;
  reveal: () => void;
};

const IntroContext = createContext<IntroState>({
  revealed: true,
  reveal: () => {},
});

export function IntroProvider({ children }: { children: ReactNode }) {
  const [revealed, setRevealed] = useState(false);

  const value = useMemo<IntroState>(
    () => ({ revealed, reveal: () => setRevealed(true) }),
    [revealed]
  );

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}

export const useIntro = () => useContext(IntroContext);
