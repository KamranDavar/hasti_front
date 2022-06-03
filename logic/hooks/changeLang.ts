import { useRouter } from "next/router";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { Direction } from "@mui/material";

export default function useChangeLang() {
  const router = useRouter();

  const font =
    router.locale === "fa"
      ? "Byekan"
      : "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serifrtl";

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const cacheLtr = createCache({
    key: "muiltr",
    stylisPlugins: [prefixer],
  });
  const dir: Direction = router.locale === "en" ? "ltr" : "rtl";

  return { font, cacheRtl, cacheLtr, dir };
}
