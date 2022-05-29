import Button from "@mui/material/Button";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRel, useRels } from "./logic/hooks/rels";

const Home: NextPage = () => {
  const rels = useRels();
  const rel = useRel(1);

  console.log("rels:", rels.data);
  console.log("rel:", rel.data);

  return (
    <div>
      {rels?.data?.map((item) => (
        <div key={item.id}>{item.type}</div>
      ))}
    </div>
  );
};

export default Home;
