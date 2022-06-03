import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ColorModeContext } from "../pages/_app";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Navbar() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation("common");
  const colorMode = React.useContext(ColorModeContext);
  useEffect(() => {
    const dir = router.locale === "en" ? "ltr" : "rtl";
    document.dir = dir;
  }, []);

  return (
    <nav>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="secondary">
          <Grid container direction="row-reverse">
            <Link href="/" locale="fa">
              <Button
                onClick={() => {
                  document.dir = "rtl";
                }}
                color="primary"
              >
                فارسی
              </Button>
            </Link>
            <Link href="/" locale="en">
              <Button
                onClick={() => {
                  document.dir = "ltr";
                }}
                color="primary"

              >
                English
              </Button>
            </Link>
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon color="primary" />
              ) : (
                <Brightness4Icon color="primary" />
              )}
            </IconButton>
          </Grid>
        </AppBar>
      </Box>
    </nav>
  );
}
