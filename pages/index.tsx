import Button from "@mui/material/Button";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRel, useRels } from "./logic/hooks/rels";
import Form from "../components/form";
import { useState } from "react";
import Paper, { PaperProps } from "@mui/material/Paper";
import { alpha, styled } from "@mui/material/styles";
import {  useTranslation, withTranslation } from "next-i18next";
import Typography from "@mui/material/Typography";
import TranslateIcon from "@mui/icons-material/Translate";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";

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

  return (
    <PaddingPaper elevation={4}>
      <Link href="/" locale={router.locale === "en" ? "fa" : "en"}>
        <button>{t("change-locale")}</button>
      </Link>
      <Typography gutterBottom component="h6">
        {t("title")}
      </Typography>
      <Form mode="create" updateList={rels.refetch} />
      {rels?.data?.map((item) => (
        <Form
          mode="update"
          id={item.id}
          updateList={rels.refetch}
          item={item}
          initialExpand={false}
          key={item.id}
        />
      ))}
    </PaddingPaper>
  );
};

export default Home;

const PaddingPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  padding: "1rem",
  marginTop: "2rem",
}));
