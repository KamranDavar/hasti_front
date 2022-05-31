import { Link } from "@mui/material";
import { PaddingGrid } from "./display";

export default function Footer() {
  return (
    <footer>
      <PaddingGrid container justifyContent="center">
        2022 Created by:
        <Link href="https://github.com/KamranDavar"> Kamran Davar</Link>
      </PaddingGrid>
    </footer>
  );
}
