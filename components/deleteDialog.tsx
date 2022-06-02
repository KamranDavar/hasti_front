import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useTranslation } from "next-i18next";
import { Dispatch, SetStateAction } from "react";

export interface SimpleDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onOk: (id: number) => void;
  id: number;
}

function DeleteDialog(props: SimpleDialogProps) {
  const { setOpen, open, onOk, id } = props;
  const { t } = useTranslation("common");

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>{t("are you sure?")}</DialogTitle>
      <Button
        onClick={() => {
          setOpen(false);
        }}
      >
        {t("cancel")}
      </Button>
      <Button
        color="error"
        onClick={() => {
          id && onOk(id);
        }}
      >
        {t("delete")}
      </Button>
    </Dialog>
  );
}

export default DeleteDialog;
