import Grid, { GridProps } from "@mui/material/Grid";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PublicIcon from "@mui/icons-material/Public";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import Link from "@mui/material/Link";
import styled from "@emotion/styled";
import { useTranslation } from "next-i18next";

export interface display {
  type?: string;
  link?: string;
  // icon: React.ReactNode;
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
    <Grid container alignItems="center">
      <PaddingGrid md={3} xs={12} item>
        <Grid container alignItems="center">
          {icon} {type && t(type)}
        </Grid>
      </PaddingGrid>
      <PaddingGrid md={9} xs={12} item>
        <Link href={link}>{link}</Link>
      </PaddingGrid>
    </Grid>
  );
}

export default Display;

const PaddingGrid = styled(Grid)<GridProps>(({ theme }) => ({
  padding: "0.5rem",
}));
