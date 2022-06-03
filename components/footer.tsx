import { Link, Typography } from "@mui/material";
import { PaddingGrid } from "./display";
import { useTranslation } from "next-i18next";
import Grid, { GridProps } from "@mui/material/Grid";
import styled from "@emotion/styled";

export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <PaddingGrid container justifyContent="center" justifySelf="flex-end">
      <footer>
        <Typography>
          {t("2022 Created by")} :
          <Link href="https://github.com/KamranDavar">{t("Kamran Davar")}</Link>
        </Typography>
      </footer>
    </PaddingGrid>
  );
}


const StikygGrid = styled(Grid)<GridProps>(({ theme }) => ({
  padding: "0.5rem",
  position: "sticky",
  bottom: 0,
}));

