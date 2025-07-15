"use client";

import React from "react";
import { Sun, Moon } from "react-feather";
import Cookie from "js-cookie";
import VisuallyHidden from "@/components/VisuallyHidden";

import { LIGHT_TOKENS, DARK_TOKENS } from "@/constants";

function DarkLightToggle({ initialTheme, className }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function handleClick() {
    const nextTheme = theme === "light" ? "dark" : "light";

    // Update the state variable.
    // This causes the Sun/Moon icon to flip.
    setTheme(nextTheme);

    // Write the cookie for future visits
    Cookie.set("color-theme", nextTheme, {
      expires: 1000,
    });

    // Apply the new tokens to the root HTML tag.
    const TOKENS = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;

    const root = document.documentElement;

    root.setAttribute("data-color-theme", nextTheme);

    for (const [variable, value] of Object.entries(TOKENS)) {
      root.style.setProperty(variable, value);
    }
  }

  return (
    <button className={className} type="button" onClick={handleClick}>
      {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
}

export default DarkLightToggle;
