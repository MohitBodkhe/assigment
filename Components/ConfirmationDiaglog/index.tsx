import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ConfirmationDialogProps {
  description: string;
  confirmButtonName: string;
  dialogState: { open: boolean; setOpen: (value: boolean) => void };
  onConfirm: Function;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = (props) => {
  const { open, setOpen } = props.dialogState;

  const handleClose = () => setOpen(false);

  const onSubmit = () => {
    props.onConfirm();
    handleClose();
  };

  return (
    <Dialog
      PaperProps={{
        style: {
          minWidth: "450px",
          borderRadius: "10px",
          padding: "4px 4px 5px 0",
          border: "1px solid grey",
        },
      }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{props.description}</span>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogActions sx={{ margin: "0 15px 10px 0" }}>
        <Button
          sx={{
            border: "1px solid grey",
            color: "grey",
            borderRadius: "3px !important",
          }}
          onClick={handleClose}
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          sx={{
            backgroundColor: "red",
            color: "white",
            "&:hover": {
              backgroundColor: "red",
            },
          }}
          onClick={onSubmit}
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
