import type { NextPage } from "next";
import { useRels } from "../logic/hooks/rels";
import Form from "../components/form";
import Paper, { PaperProps } from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useTranslation, withTranslation } from "next-i18next";
import Typography from "@mui/material/Typography";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context?.locale || "en", ["common"])),
    },
  };
};

const Home: NextPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const rels = useRels();
  const { t } = useTranslation("common");
  const router = useRouter();

  if (rels.isLoading) {
    return <Typography>...loading</Typography>;
  }
  if (rels.isError) {
    return (
      <Alert variant="filled" severity="error">
        {rels.error.message}
      </Alert>
    );
  }
  if (rels.data) {
    return (
      <Box marginTop="1rem">
        <Typography variant="h6">{t("User settings")}</Typography>
        <PaddingPaper elevation={4}>
          <Typography gutterBottom component="h6">
            {t("title")}
          </Typography>
          <Form mode="create" updateList={rels.refetch} items={rels.data} />
          {rels?.data?.map((item) => (
            <Form
              mode="update"
              id={item.id}
              updateList={rels.refetch}
              item={item}
              initialExpand={false}
              key={item.id}
              items={rels.data}
            />
          ))}
        </PaddingPaper>
      </Box>
    );
  }
  return <></>;
};

export default Home;

const PaddingPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  padding: "1rem",
  marginTop: "1rem",
}));
