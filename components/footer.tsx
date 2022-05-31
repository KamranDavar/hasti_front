import { Link, Typography } from "@mui/material";
import { PaddingGrid } from "./display";
import { useTranslation } from "next-i18next";

export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <footer>
      <PaddingGrid container justifyContent="center">
        <Typography>
          {t("2022 Created by")} :
          <Link href="https://github.com/KamranDavar">{t("Kamran Davar")}</Link>
        </Typography>
      </PaddingGrid>
    </footer>
  );
}
