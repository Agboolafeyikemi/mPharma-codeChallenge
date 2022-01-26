import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationModal({
  isOpen,
  setConfirmModalOpen,
  products,
  setProducts,
  liveData,
  setLiveData,
  notify,
}) {
  const handleDelete = () => {
    let inmemoryItem = JSON.parse(localStorage.getItem("selecteditem"));

    let filteredItems = products.filter((item) => item.id !== inmemoryItem.id);

    setProducts((prevState) => filteredItems);
    setLiveData(filteredItems);
    setConfirmModalOpen(!isOpen);
    notify(`${inmemoryItem.name} successfully removed from records`, "success");
  };

  const handleClose = () => {
    setConfirmModalOpen(false);
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Confirm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this product
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="primary">
            yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
