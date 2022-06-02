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
import { useTheme} from "@mui/material/styles";

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
      <Grid container direction="row-reverse">
        <Link href="/" locale="fa">
          <Button
            onClick={() => {
              document.dir = "rtl";
            }}
          >
            فارسی
          </Button>
        </Link>
        <Link href="/" locale="en">
          <Button
            onClick={() => {
              document.dir = "ltr";
            }}
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
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Grid>
    </nav>
  );
}
