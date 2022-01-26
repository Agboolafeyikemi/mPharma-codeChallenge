import React, { useRef } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import '../css/products.css'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
//import { useSelector } from 'react-redux'

function Products({
  products,
  setOpen,
  setModalTitle,
  setProductName,
  setProductPrice,
  setShowUpdate,
  setHideSave,
  isOpen,
  setConfirmModalOpen
}) {
  const dataGridRef = useRef(null)

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'name',
      headerName: 'Product Name',
      width: 200,
      editable: false,
    },
    {
      field: 'currentPrice',
      headerName: 'Price (GHS)',
      type: 'number',
      width: 200,
      editable: false,
    },
    {
      field: 'prevPrice',
      headerName: 'Previous Price (GHS)',
      type: 'number',
      width: 220,
      editable: false,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      type: 'number',
      renderCell: (e) => renderActions(),
    },
  ]


  const getSelectedData = (e) => {
    let data = e.row
    setProductName(data.name)
    setProductPrice(data.currentPrice)
    localStorage.setItem('selecteditem', JSON.stringify(data))
  }

  const editEventHandler = () => {
    setOpen(true)
    setShowUpdate(true)
    setHideSave(true)
    setModalTitle('Update Record')
  }

  const deleteEventHandler = () => {
    setConfirmModalOpen(true)
  }

  const renderActions = (e) => {
    return (
      <div>
        <Button
          variant='contained'
          style={{
            marginRight: '10px',
            backgroundColor: '#1383b5',
            color: 'white',
          }}
          onClick={editEventHandler}
          size='small'
        >
          <EditIcon />
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          onClick={deleteEventHandler}
        >
          <DeleteIcon />
        </Button>
      </div>
    )
  }

  return (
    <div className='prod' style={{ marginTop: '50px', boxShadow:'2px 2px 2px 2px #cecece' }}>
      <DataGrid
        //rows={payload}
        rows={products}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick={true}
        ref={dataGridRef}
        onCellClick={(e) => getSelectedData(e)}
      />
    </div>
  )
}

export default Products
