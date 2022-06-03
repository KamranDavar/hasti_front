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
    case "linkdin":
      icon = <LinkedInIcon />;
      break;
    case "website":
      icon = <PublicIcon />;
      break;
  }

  return (
    <Grid container alignItems="center" >
      <PaddingGrid  item>
        <Grid container alignItems="center">
          <Typography padding="0.5rem 0.5rem 0 0">
            {icon} 
          </Typography>
          <Typography>
            {type && t(type)}
          </Typography>
        </Grid>
      </PaddingGrid>
      <PaddingGrid flexGrow={1} item>
        <Typography variant="caption" display="inline">
          {t("link")}: {' '}
        </Typography>
        <Typography  display="inline">
          <Link href={link}>{link}</Link>
        </Typography>
      </PaddingGrid>
    </Grid>
  );
}

export default Display;

export const PaddingGrid = styled(Grid)<GridProps>(({ theme }) => ({
  padding: "0.5rem",
}));
