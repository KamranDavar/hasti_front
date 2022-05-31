import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <nav >
      <Grid container direction="row-reverse">
        <Link href="/" locale={router.locale === "en" ? "fa" : "en"}>
          <Button>{t("change-locale")}</Button>
        </Link>
      </Grid>
    </nav>
  );
}
