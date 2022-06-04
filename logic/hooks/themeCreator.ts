import React from "react";
import { createTheme } from "@mui/material/styles";
import { yellow, grey } from "@mui/material/colors";
import { Direction } from "@mui/material";

export default function useTheme(
  mode: "light" | "dark",
  dir: Direction,
  font: string
) {
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          ...(mode === "light"
            ? {
               background:{
                   paper: "#f5f5f7",
               }
            }
            : {
                // palette values for dark mode
                background:{
                    paper: "#18192e",
                }
              }),

          primary: {
            main: yellow[800],
          },
          secondary: {
            main: grey[50],
          },
        },
        typography: {
          fontFamily: font,
        },
        direction: dir,
      }),
    [mode, font, dir]
  );

  return theme;
}
