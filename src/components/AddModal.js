import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function AddModal({
  data,
  open,
  handleAddProductModal,
  setOpen,
  setProducts,
  liveData,
  setLiveData,
  modalTitle,
  productName,
  setProductName,
  productPrice,
  setProductPrice,
  showUpdate,
  hideSave,
  notify,
}) {
  const handleFormSubmit = () => {
    if (productName.length < 1 || productPrice.length < 1) {
      return notify(`Please make sure you have filled all fields`, "warning");
    }
    if (Number(productPrice) < 1) {
      return notify(`Invalid item price`, "info");
    }
    let newEntry = {
      id: Math.floor(Math.random() * 1000 + 1),
      name: productName,
      currentPrice: Number(productPrice),
      prevPrice: Number(productPrice),
    };

    //console.log(newEntry)
    setProducts((prevList) => [...liveData, newEntry]);
    notify(`${newEntry.name} successfully added to records`, "success");

    data = [...liveData, newEntry];

    //update search data as well
    setLiveData(data);

    setOpen(false);
    setProductName("");
    setProductPrice("");
  };

  const handleFormUpdate = () => {
    let inmemoryItem = JSON.parse(localStorage.getItem("selecteditem"));

    let newObj = {
      id: inmemoryItem.id,
      name: productName,
      currentPrice: productPrice,
      prevPrice: inmemoryItem.currentPrice,
    };

    if (newObj.name.length < 1 || newObj.currentPrice.length < 1) {
      return notify(`Please make sure you have filled all fields`, "warning");
    }
    if (newObj.currentPrice < 1) {
      return notify(`Invalid item price`, "info");
    }
    setProducts((prevList) => [...liveData, newObj]);

    console.log("Record was: ", inmemoryItem);
    console.log("Updated with: ", newObj);
    notify(`${newObj.name} has been updated`, "success");

    setOpen(false);
    setProductName("");
    setProductPrice("");
  };

  return (
    <div>
      <Dialog
        onClose={handleAddProductModal}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleAddProductModal}
        >
          {modalTitle}
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus={true}
            margin="dense"
            id="productName"
            label="Product Name"
            type="text"
            fullWidth
            value={productName}
            title="productName"
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="productPrice"
            label="Price"
            type="number"
            fullWidth
            value={productPrice}
            title="productPrice"
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          {!hideSave ? (
            <Button
              title="Add Record"
              variant="contained"
              onClick={handleFormSubmit}
              style={{
                backgroundColor: "#ff5100",
                color: "white",
              }}
            >
              Save
            </Button>
          ) : null}
          {showUpdate ? (
            <Button
              variant="contained"
              onClick={handleFormUpdate}
              style={{
                backgroundColor: "#1383b5",
                color: "white",
              }}
            >
              Update
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </div>
  );
}
