import "./App.css";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import React, { useState, useEffect } from "react";
import Loader from "./components/Loader";
import AddModal from "./components/AddModal";
import ConfirmationModal from "./components/ConfirmationModal";
import Toastify from "./components/Toastify";
import { toast } from "react-toastify";

let initData = [];

function App() {
  const [products, setProducts] = useState([]);
  const [liveData, setLiveData] = useState(initData);
  const [isLoading, setIsloading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isOpen, setConfirmModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add Product");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const [hideSave, setHideSave] = useState(false);
  const [toastrMessage, setToastMessage] = useState("Notification");

  const getData = async () => {
    try {
      const result = await fetch(
        "https://www.mocky.io/v2/5c3e15e63500006e003e9795"
      );
      const data = await result.json();
      if (data.products) {
        let formattedData = data.products.map((item) => {
          return {
            id: item.id,
            name: item.name,
            currentPrice: item.prices[0].price,
            prevPrice: item.prices[1].price,
          };
        });
        initData = formattedData;

        console.log("FormattedData:", formattedData);
        //setting copy of init data to liveData for search implementation
        setLiveData(initData);

        //cacheing in memory for offline use
        localStorage.setItem("initData", JSON.stringify(initData));
        setIsloading(false);

        //dispatch({ type: 'UPDATE_DATA', products: initData });
        setProducts(initData);
        //setProducts(seedData)
      }
    } catch (error) {
      setIsloading(false);
      const offlineData = localStorage.getItem("initData");
      //console.log(offlineData)
      setLiveData(JSON.parse(offlineData));
      setProducts(JSON.parse(offlineData));
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAddProductModal = () => {
    setOpen(!open);
    setProductName("");
    setProductPrice("");
    setModalTitle("Add Product");
    setShowUpdate(false);
    setHideSave(false);
  };

  const notify = (toastrMessage, type) => {
    setToastMessage(toastrMessage);
    switch (type) {
      case "warning":
        toast.warning(toastrMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;

      case "success":
        toast.success(toastrMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;

      default:
        toast.info(toastrMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    }
  };

  return (
    <div className="App">
      <NavBar
        setProducts={setProducts}
        handleAddProductModal={handleAddProductModal}
        data={initData}
        liveData={liveData}
        setLiveData={setLiveData}
      />

      <Toastify />
      <ConfirmationModal
        isOpen={isOpen}
        setConfirmModalOpen={setConfirmModalOpen}
        products={products}
        setProducts={setProducts}
        liveData={liveData}
        setLiveData={setLiveData}
        notify={notify}
        setToastMessage={setToastMessage}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <Products
          products={products}
          setOpen={setOpen}
          modalTitle={modalTitle}
          setModalTitle={setModalTitle}
          productName={productName}
          setProductName={setProductName}
          productPrice={productPrice}
          setProductPrice={setProductPrice}
          showUpdate={showUpdate}
          setShowUpdate={setShowUpdate}
          hideSave={hideSave}
          setHideSave={setHideSave}
          setConfirmModalOpen={setConfirmModalOpen}
          isOpen={isOpen}
        />
      )}
      <AddModal
        handleAddProductModal={handleAddProductModal}
        open={open}
        products={products}
        setProducts={setProducts}
        setOpen={setOpen}
        data={initData}
        liveData={liveData}
        setLiveData={setLiveData}
        modalTitle={modalTitle}
        setModalTitle={setModalTitle}
        productName={productName}
        setProductName={setProductName}
        productPrice={productPrice}
        setProductPrice={setProductPrice}
        showUpdate={showUpdate}
        setShowUpdate={setShowUpdate}
        hideSave={hideSave}
        setConfirmModalOpen={setConfirmModalOpen}
        notify={notify}
        toastrMessage={toastrMessage}
      />
    </div>
  );
}

export default App;
