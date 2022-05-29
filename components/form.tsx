import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";
import React, { FC, useEffect, useState } from "react";
import { useForm, Controller, set } from "react-hook-form";
import {
  useCreateRel,
  useUpdateRel,
  useDeleteRel,
} from "../pages/logic/hooks/rels";
import { rel } from "../pages/logic/types";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

type propsType = {
  mode: "create" | "update";
  id?: number;
  updateList: any;
  initialExpand?: boolean;
  item?: rel;
};
const Form: FC<propsType> = ({ mode, id, updateList, item, initialExpand }) => {
  const [expanded, setExpanded] = useState<boolean | undefined>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: item,
  });
  const create = useCreateRel();
  const update = id ? useUpdateRel(id) : null;
  const remove = useDeleteRel(id);
  const onSubmit = async (data: rel) => {
    id ? await update?.mutate(data) : await create.mutate(data);
    setExpanded(false);
  };
  useEffect(() => {
    updateList();
  }, [update?.isSuccess, create.isSuccess, remove.isSuccess]);

  console.log("errors", errors);

  return (
    <div>
      {mode === "create" && (
        <Button onClick={() => setExpanded(true)}>add social</Button>
      )}
      <Paper>
        {mode === "update" && (
          <Grid container spacing={2}>
            <Grid item xs={10}>
              {item?.type}
            </Grid>
            <Grid item xs={2}>
              <Button onClick={() => setExpanded(true)}>Edit</Button>
              <Button onClick={() => remove.mutate()}>Delete</Button>
            </Grid>
          </Grid>
        )}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="type"
                      variant="outlined"
                      error={!!errors.type}
                      helperText={errors.type?.message}
                    />
                  )}
                  rules={{ required: "This is required." }}
                />
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name="link"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="link"
                      variant="outlined"
                      error={!!errors.link}
                      helperText={errors.link?.message}
                    />
                  )}
                  rules={{ required: "This is required." }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={10}></Grid>
              <Grid item xs={2}>
                <Button
                  type="button"
                  onClick={() => {
                    setExpanded(false);
                    reset();
                  }}
                >
                  cancel
                </Button>
                <Button type="submit">submit</Button>
              </Grid>
            </Grid>
          </form>
        </Collapse>
      </Paper>
    </div>
  );
};

export default Form;
