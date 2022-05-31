import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const { t } = useTranslation("common");
  console.log("router", router);

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
      </Grid>
    </nav>
  );
}
