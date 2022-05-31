import Input from "@mui/material/Input";
import TextField, { TextFieldProps } from "@mui/material/TextField";
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
import Grid, { GridProps } from "@mui/material/Grid";
import { grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteDialog from "./deleteDialog";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PublicIcon from "@mui/icons-material/Public";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import Display from "./display";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTranslation } from "next-i18next";

type propsType = {
  mode: "create" | "update";
  id?: number;
  updateList: any;
  initialExpand?: boolean;
  item?: rel;
};
const Form: FC<propsType> = ({ mode, id, updateList, item, initialExpand }) => {
  const [expanded, setExpanded] = useState<boolean | undefined>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [link, setLink] = useState<string | undefined>(id ? item?.type : "");
  const { t } = useTranslation("common");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: item,
  });
  const create = useCreateRel();
  const update = id ? useUpdateRel(id) : null;
  const remove = useDeleteRel(id);
  const onSubmit = async (data: rel) => {
    id ? await update?.mutate(data) : await create.mutate(data);
    setExpanded(false);
    !id && reset();
    !id && setLink("");
  };
  useEffect(() => {
    updateList();
  }, [update?.isSuccess, create.isSuccess, remove.isSuccess]);

  const handleChangeLink = (e: SelectChangeEvent<string>) => {
    setLink(e.target.value);
    setValue("type", e.target.value);
  };

  return (
    <>
      {mode === "create" && (
        <Button startIcon={<AddIcon />} onClick={() => setExpanded(true)}>
          {t("add social")}
        </Button>
      )}
      <GrayPaper
        sx={{ padding: expanded || mode === "update" ? "0.5rem" : "0" }}
      >
        {mode === "update" && (
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Display type={item?.type} link={item?.link} />
            </Grid>
            <Grid item xs={3}>
              <Grid container direction="row-reverse">
                <Button
                  // startIcon={<DeleteIcon />}
                  onClick={() => setOpen(true)}
                  color="error"
                >
                  <DeleteIcon />
                  <Box display={{ xs: "none", sm: "block" }}>{t("delete")}</Box>
                </Button>
                <DeleteDialog
                  open={open}
                  setOpen={setOpen}
                  onOk={() => remove.mutate()}
                  id={id}
                />
                <Button
                  onClick={() => setExpanded(true)}
                  disabled={expanded}
                  color="primary"
                >
                  <EditIcon />
                  <Box display={{ xs: "none", sm: "block" }}> {t("edit")}</Box>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="caption" component="h6">
                  {id
                    ? `${t("edit social")} ${t(item?.type ? item?.type : "")}`
                    : t("add social")}
                </Typography>
              </Grid>
              <Grid item lg={4} xs={12}>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.type}>
                      <InputLabel id="demo-simple-select-label">
                        {t("type")}
                      </InputLabel>
                      <Select
                        {...field}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={link}
                        label="Age"
                        onChange={handleChangeLink}
                      >
                        <MenuItem value="linkdin">
                          <LinkedInIcon /> {t("linkdin")}
                        </MenuItem>
                        <MenuItem value="instagram">
                          <InstagramIcon /> {t("instagram")}
                        </MenuItem>
                        <MenuItem value="twitter">
                          <TwitterIcon /> {t("twitter")}
                        </MenuItem>
                        <MenuItem value="website">
                          <PublicIcon /> {t("website")}
                        </MenuItem>
                        <MenuItem value="facebook">
                          <FacebookIcon /> {t("facebook")}
                        </MenuItem>
                      </Select>
                      <FormHelperText>{errors.link?.message}</FormHelperText>
                    </FormControl>
                  )}
                  rules={{ required: t("required-error") }}
                />
              </Grid>
              <Grid item lg={8} xs={12}>
                <Controller
                  name="link"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={t("link")}
                      variant="outlined"
                      error={!!errors.link}
                      helperText={errors.link?.message}
                      fullWidth
                    />
                  )}
                  rules={{ required: t("required-error") }}
                />
              </Grid>
            </Grid>
            <ActionGrid container spacing={2}>
              <ActionGrid item xs={0} lg={9}></ActionGrid>
              <ActionGrid item xs={12} lg={12}>
                <Grid container direction="row-reverse">
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    color="primary"
                    disabled={!!errors.link || !!errors.type}
                  >
                    {id ?t("edit"):t("submit")}  {" "}{t("social")} {" "}
                    {link && t(link)}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setExpanded(false);
                      !id && reset();
                      !id && setLink("");
                    }}
                    color="primary"
                    size="small"
                  >
                    {t("cancel")}
                  </Button>
                </Grid>
              </ActionGrid>
            </ActionGrid>
          </form>
        </Collapse>
      </GrayPaper>
    </>
  );
};

export default Form;

const GrayPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  padding: "0.5rem",
  backgroundColor: grey[50],
  margin: "0.5rem 0",
}));
const ActionGrid = styled(Grid)<GridProps>(({ theme }) => ({
  marginTop: "-0.6rem",
}));
// const LinkTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
//   direction: "ltr",
//   font: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serifrtl",
// }));
