import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";
import React, { FC, useEffect, useState } from "react";
import { useForm, Controller, set } from "react-hook-form";
import {
  useCreateRel,
  useUpdateRel,
  useDeleteRel,
} from "../logic/hooks/rels";
import { formType, rel, rels } from "../logic/types";
import Button from "@mui/material/Button";
import Paper, { PaperProps } from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
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

const Form: FC<formType> = ({ mode, id, updateList, item, items }) => {
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
    getValues,
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
  const onCancel = () => {
    setExpanded(false);
    !id && reset();
    !id && setLink("");
  }

  const isDuplicateInput = () => {
    return !items.map((item) => item.link).includes(getValues("link"));
  }
  const options = [
    { icon: <LinkedInIcon />, text: 'linkdin' },
    { icon: <InstagramIcon />, text: 'instagram' },
    { icon: <TwitterIcon />, text: 'twitter' },
    { icon: <PublicIcon />, text: 'website' },
    { icon: <FacebookIcon />, text: 'facebook' },
  ]

  return (
    <>
      {mode === "create" && (
        <Button
          startIcon={<AddIcon />}
          disabled={expanded}
          onClick={() => setExpanded(true)}
        >
          {t("add social")}
        </Button>
      )}
      <GrayPaper sx={{ padding: expanded || id ? "0.5rem" : "0" }}>
        {id && (
          <Grid container spacing={2}>
            <Grid item flexGrow={1}>
              <Display type={item?.type} link={item?.link} />
            </Grid>
            <Grid item xs={12} md="auto" container direction="row-reverse" alignItems="center" >
              <Button
                onClick={() => setOpen(true)}
                color="error"
              >
                <DeleteIcon />
                <Box display={{ xs: "none", sm: "block" }}>{t("delete")}</Box>
              </Button>
              <DeleteDialog
                open={open}
                setOpen={setOpen}
                onOk={() => {
                  remove.mutate();
                }}
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
                        {options.map((item, index) => <MenuItem value={item.text}>
                          {item.icon}
                          <Typography marginLeft="0.2rem" display='inline-block'>
                            {t(item.text)}
                          </Typography>
                        </MenuItem>)}
                      </Select>
                      <FormHelperText>{errors.type?.message}</FormHelperText>
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
                  rules={{
                    required: t("required-error"),
                    pattern: {
                      value:
                        /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
                      message: "please inter a vald link.",
                    },
                    validate: {
                      value: isDuplicateInput,
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} direction="row-reverse" paddingTop={{ xs: "1.5rem", lg: "1rem" }}>
              <Button
                type="submit"
                variant="contained"
                size="small"
                color="primary"
                disabled={!!errors.link || !!errors.type}
              >
                {id ? t("edit") : t("submit")} {t("social")}{" "}
                {link && t(link)}
              </Button>
              <Button
                type="button"
                onClick={onCancel}
                color="primary"
                size="small"
              >
                {t("cancel")}
              </Button>
            </Grid>
          </form>
        </Collapse>
      </GrayPaper>
    </>
  );
};

export default Form;

const GrayPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? grey[900] : grey[50],
  padding: "0.5rem",
  margin: "0.5rem 0",
}));
