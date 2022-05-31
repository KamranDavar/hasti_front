import { Link } from "@mui/material";
import  Grid  from "@mui/material/Grid";

export default function Footer() {
  return (
    <footer>
      <Grid container justifyContent='center'>
        2022 Created by:
        <Link href="https://github.com/KamranDavar"> Kamran Davar</Link>
      </Grid>
    </footer>
  );
}
