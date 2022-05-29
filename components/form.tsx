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
import Paper, { PaperProps } from "@mui/material/Paper";
import { alpha, styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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
    <>
      {mode === "create" && (
        <Button startIcon={<AddIcon />} onClick={() => setExpanded(true)}>
          add social
        </Button>
      )}
      <GrayPaper sx={{ padding: expanded || mode === "update" ? "1rem" : "0" }}>
        {mode === "update" && (
          <Grid container spacing={2}>
            <Grid item xs={9}>
              {item?.type}
            </Grid>
            <Grid item xs={3}>
              <Grid container direction="row-reverse">
                <Button
                  startIcon={<DeleteIcon />}
                  onClick={() => remove.mutate()}
                  color="error"
                >
                  Delete
                </Button>
                <Button
                  startIcon={<EditIcon />}
                  onClick={() => setExpanded(true)}
                  color="primary"
                >
                  Edit
                </Button>
              </Grid>
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
                      fullWidth
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
                      fullWidth
                    />
                  )}
                  rules={{ required: "This is required." }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={9}></Grid>
              <Grid item xs={3} marginTop="0.5rem" direction="row-reverse">
                <Grid container direction="row-reverse">
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    color="primary"
                  >
                    submit
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setExpanded(false);
                      reset();
                    }}
                    color="primary"
                    size="small"
                  >
                    cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Collapse>
      </GrayPaper>
    </>
  );
};

export default Form;

const GrayPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  padding: "1rem",
  backgroundColor: grey[50],
  margin: "1rem 0",
}));
