import './App.css'
import NavBar from './components/NavBar'
import Products from './components/Products'
import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import Loader from './components/Loader'
import AddModal from './components/AddModal'
import ConfirmationModal from './components/ConfirmationModal'
import Toastify from './components/Toastify'
import { toast } from 'react-toastify';
//import { useSelector, useDispatch } from 'react-redux'

let initData = []

function App() {
  const [products, setProducts] = useState([])
  const [liveData, setLiveData] = useState(initData)
  const [isLoading, setIsloading] = useState(true)
  const [open, setOpen] = useState(false)
  const [isOpen, setConfirmModalOpen] = useState(false);  
  const [modalTitle, setModalTitle] = useState('Add Product')
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [showUpdate, setShowUpdate] = useState(false)
  const [hideSave, setHideSave] = useState(false)
  const [toastrMessage, setToastMessage] = useState('Notification')

  //const dispatch = useDispatch()  
  //const seedData = useSelector(state => products)
  //console.log("Seed Data:" , seedData)
  


  const getData = async () => {
    try {
      const result = await fetch(
        'https://www.mocky.io/v2/5c3e15e63500006e003e9795'
      )
      const data = await result.json()
      if (data.products) {
        let formattedData = data.products.map((item) => {
          return  {
            id: item.id,
            name: item.name,
            currentPrice: item.prices[0].price,
            prevPrice: item.prices[1].price,
          }          
        })
        initData = formattedData

        console.log("FormattedData:" , formattedData)
        //setting copy of init data to liveData for search implementation
        setLiveData(initData)
        //setLiveData(seedData)

        //cacheing in memory for offline use
        localStorage.setItem('initData', JSON.stringify(initData))
        setIsloading(false)

        //dispatch({ type: 'UPDATE_DATA', products: initData });
        setProducts(initData)
        //setProducts(seedData)
      }
    } catch (error) {
      setIsloading(false)
      const offlineData = localStorage.getItem('initData')
      //console.log(offlineData)
      setLiveData(JSON.parse(offlineData))
      setProducts(JSON.parse(offlineData))
      console.log(error)
    }

    // axios
    //   .get('http://www.mocky.io/v2/5c3e15e63500006e003e9795')
    //   .then((res) => {
    //     //console.log('Data:', res.data.products)
    //     res.data.products.map((item) => {
    //   let newObj = {
    //     id: item.id,
    //     name: item.name,
    //     currentPrice: item.prices[0].price,
    //     prevPrice: item.prices[1].price,
    //   }
    //   initData.push(newObj)
    // })
    //     console.log(initData)
    //     setProducts(initData)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    //   .finally(console.log('done'))
  }

  useEffect(() => {
    getData()
  }, [])

  const handleAddProductModal = () => {
 
    setOpen(!open)
    setProductName('')
    setProductPrice('')
    setModalTitle('Add Product')
    setShowUpdate(false)
    setHideSave(false)
  }

  const notify = (toastrMessage, type) => {
    setToastMessage(toastrMessage)
    switch(type){
      case 'warning':
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

      case 'success':
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
}
    

  return (
    <div className='App'>
      <NavBar
        setProducts={setProducts}
        handleAddProductModal={handleAddProductModal}
        data={initData}
        liveData={liveData}
        setLiveData={setLiveData}
      />

      <Toastify  />
      <ConfirmationModal
        isOpen = {isOpen}
        setConfirmModalOpen = {setConfirmModalOpen}
        products={products}
        setProducts={setProducts}
        liveData={liveData}
        setLiveData={setLiveData}
        notify = {notify}     
        setToastMessage ={setToastMessage}/>


      {isLoading ? (
        <Loader />
      ) : (
        <Products
          products={products}
          //products={payload}
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
          setConfirmModalOpen = {setConfirmModalOpen} 
          isOpen = {isOpen}
        />
      )}
      <AddModal
        handleAddProductModal={handleAddProductModal}
        open={open}
        products={products}
        //products={payload}
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
        setConfirmModalOpen = {setConfirmModalOpen}
        notify = {notify}    
        toastrMessage = {toastrMessage}
      />
    
    </div>
  )
}

export default App
