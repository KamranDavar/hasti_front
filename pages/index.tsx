import Button from "@mui/material/Button";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRel, useRels } from "./logic/hooks/rels";
import Form from "../components/form";
import { useState } from "react";
import Paper, { PaperProps } from "@mui/material/Paper";
import { alpha, styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Home: NextPage = () => {
  const [expanded, setExpanded] = useState<any>([]);
  const rels = useRels();

  console.log("expanded:", expanded);

  return (
    <PaddingPaper elevation={4}>
      <Typography gutterBottom component="h6">
        Socials
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
  marginTop:"2rem"
}));
