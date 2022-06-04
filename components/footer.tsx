import { Link, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import Grid, { GridProps } from "@mui/material/Grid";
import styled from "@emotion/styled";

export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <Grid container justifyContent="center" justifySelf="flex-end" paddingTop="2rem">
      <footer>
        <Typography>
          {t("2022 Created by")} :
          <Link href="https://github.com/KamranDavar">{t("Kamran Davar")}</Link>
        </Typography>
      </footer>
    </Grid>
  );
}

