"use client";

import { ThemeProvider as MUIThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useMemo } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: "#6366f1", // Indigo 500
          },
          secondary: {
            main: "#ec4899", // Pink 500
          },
          background: {
            default: "#0f172a", // Slate 900
            paper: "#1e293b", // Slate 800
          },
        },
        typography: {
          fontFamily: "var(--font-geist-sans), sans-serif",
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "8px",
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
        },
      }),
    []
  );

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
