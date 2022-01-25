import React from 'react'
import { alpha, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { makeLowercase } from '../HelperFunctions/HelperFunctions'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))

export default function NavBar({ setProducts, handleAddProductModal, liveData }) {
  const classes = useStyles()

  const searchRef = React.useRef(null)
  // let x = searchRef.current
  // console.log({ x })

  const initialData = [...liveData]
  //console.log('Live data:', initialData)
  let filteredItems = []

  const handleFilterItems = (e) => {
    if (e.target.value.length < 1) {
      setProducts(initialData)
    } else {
      filteredItems = liveData.filter((item) =>
        makeLowercase(item.name).includes(makeLowercase(e.target.value))
      )
      setProducts(filteredItems)
    }
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    ></Menu>
  )

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar style={{ backgroundColor: '#ff5100' }}>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant='h6' noWrap>
            mPharma
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              autoFocus
              placeholder='Search product…'
              onInput={handleFilterItems}
              ref={searchRef}
            />
          </div>
          <div className={classes.grow} />
          <Button
            title = 'Add Product'
            variant='contained'
            color='secondary'
            onClick={handleAddProductModal}
            style={{
              marginRight: '10px',
              backgroundColor: '#fecece',
              color: 'black',
            }}
          >
            <AddIcon/> Add 
          </Button>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  )
}
