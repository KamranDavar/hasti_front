import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

export interface SimpleDialogProps {
  open: boolean;
  setOpen: any;
  onOk: any;
  id: number | undefined;
}

function DeleteDialog(props: SimpleDialogProps) {
  const { setOpen, open, onOk, id } = props;

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>Are you sure to delete this item??</DialogTitle>
      <Button
        onClick={() => {
          setOpen(false);
        }}
      >
        cancel
      </Button>
      <Button
        color="error"
        onClick={() => {
          onOk(id);
        }}
      >
        delete
      </Button>
    </Dialog>
  );
}

export default DeleteDialog;
