import React from "react";
import { createTheme } from "@mui/material/styles";
import { yellow, grey } from "@mui/material/colors";
import { Direction } from "@mui/material";


export default function useTheme(mode: "light" | "dark", dir: Direction, font: string) {

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: mode,
                    background: {
                        default: "red",
                    },
                    primary: {
                        main: yellow[800],
                    },
                    secondary: {
                        main: grey[50]
                    },
                },
                typography: {
                    fontFamily: font,
                },
                direction: dir,
            }),
        [mode, font, dir]
    );


    return  theme ;
}
