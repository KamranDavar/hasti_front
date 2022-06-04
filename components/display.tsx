import Grid, { GridProps } from "@mui/material/Grid";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PublicIcon from "@mui/icons-material/Public";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import Link from "@mui/material/Link";
import styled from "@emotion/styled";
import { useTranslation } from "next-i18next";
import Typography from "@mui/material/Typography";

export interface display {
  type?: string;
  link?: string;
}

function Display(props: display) {
  const { type, link } = props;
  const { t } = useTranslation("common");

  let icon = <TwitterIcon />;

  switch (type) {
    case "twitter":
      icon = <TwitterIcon />;
      break;
    case "facebook":
      icon = <FacebookIcon />;
      break;
    case "instagram":
      icon = <InstagramIcon />;
      break;
    case "linkedin":
      icon = <LinkedInIcon />;
      break;
    case "website":
      icon = <PublicIcon />;
      break;
  }

  return (
    <>
        <Grid sm="auto" xs={12} item container alignItems="middle">
          <Typography
            display="inline"
            padding="0 0.5rem 0 0"
          >
            {icon}
          </Typography>
          <Typography marginRight="0.5rem" display="inline">
            {type && t(type)}
          </Typography>
        </Grid>
        <Grid item sm xs={12}>
          <Typography variant="caption" display="inline">
            {t("link")}:{" "}
          </Typography>
          <Typography display="inline">
            <Link href={link}>{link}</Link>
          </Typography>
        </Grid>
    </>
  );
}

export default Display;

export const PaddingGrid = styled(Grid)<GridProps>(({ theme }) => ({
  padding: "0.5rem",
}));
