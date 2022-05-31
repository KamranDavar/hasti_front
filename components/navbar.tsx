import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const { t } = useTranslation("common");
  console.log("router", router);

  return (
    <nav>
      <Grid container direction="row-reverse">
        <Link href="/" locale={router.locale === "en" ? "fa" : "en"}>
          <Button
            onClick={() => {
             const dir= router.locale === "fa" ? "ltr" : "rtl"
              document.dir = dir ;
            }}
          >
            {t("change-locale")}
          </Button>
        </Link>
      </Grid>
    </nav>
  );
}
