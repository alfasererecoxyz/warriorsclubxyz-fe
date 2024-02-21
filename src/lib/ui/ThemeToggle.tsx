'use client';

import React from "react";

type DivProps = React.JSX.IntrinsicElements['div'];

function useCurrentTheme(): 'dark' | 'light' | 'no-preference' {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  if (isDark) return 'dark';
  if (isLight) return 'light';
  return 'no-preference' 
}

function useSetTheme(theme?: 'dark' | 'light' | 'no-preference') {

}

function useToggle(inital?: boolean) {

  const [state, setState] = React.useState<boolean>(Boolean(inital));

  function toggle(override?: boolean) {
    setState(override ? override : !state);
  }

  return [state, toggle]
}

export function ThemeToggle(props: DivProps) {

  const theme = useCurrentTheme();

  return (
    <div>
      {theme}
      <input type="checkbox"/>
    </div>
  )
}