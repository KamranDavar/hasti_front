import Button from "@mui/material/Button";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRel, useRels } from "./logic/hooks/rels";
import Form from "../components/form";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Home: NextPage = () => {
  const [expanded, setExpanded] = useState<any>([]);
  const rels = useRels();

  console.log("expanded:", expanded);

  return (
    <Paper>
      <Form mode="create" updateList={rels.refetch} />
      {rels?.data?.map((item) => (
        <div key={item.id}>
          <Form
            mode="update"
            id={item.id}
            updateList={rels.refetch}
            item={item}
            initialExpand={false}
          />
        </div>
      ))}
    </Paper>
  );
};

export default Home;
