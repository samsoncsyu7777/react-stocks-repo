import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Switch,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { useEffect, useState } from 'react';
import { useStyles } from './useStyles';

export default function StockLimit({ stock, task, open, handleClose, setOpenDetails, setIndex }) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [withExpire, setWithExpire] = useState(false);
  const [expireDate, setExpireDate] = useState(new Date());
  const [saveLimit, setSaveLimit] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const classes = useStyles();
  const buttonText = { Add: 'Save', Edit: 'Update', View: 'Done', Delete: 'Delete' }

  useEffect(() => {
    setSaveLimit(task === 'Add' || task === 'Edit');
    const limit = JSON.parse(localStorage.getItem(stock.name));
    setMinPrice(limit ? limit.minPrice : stock.price);
    setMaxPrice(limit ? limit.maxPrice : stock.price);
    if (limit) {
      setWithExpire(limit.withExpire);
      setExpireDate(limit.expireDate);
    }
  }, [open]);

  function minChange(e) {
    setMinPrice(e.target.value);
  }

  function maxChange(e) {
    setMaxPrice(e.target.value);
  }

  function toggleChange(e) {
    setWithExpire((prev) => !prev);
  }

  function dateChange(e) {
    setExpireDate(e);
  }

  function handleConfirm() {
    if (saveLimit) {
      const newLimit = {
        minPrice: minPrice,
        maxPrice: maxPrice,
        withExpire: withExpire,
        expireDate: expireDate
      };
      localStorage.setItem(stock.name, JSON.stringify(newLimit));
    }
    if (task === 'Delete') {
      setShowDeleteAlert(true);
    } else {
      handleClose();
    }
  }

  function urlClick() {
    handleClose();
    setOpenDetails(true);
  }

  function handleDelete() {
    setIndex(0);
    localStorage.removeItem(stock.name);
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>{task + 'Stock Symbol - ' + stock.name}</DialogTitle>
      <DialogContent>
        <DialogContentText color='primary'>
          Min Price
        </DialogContentText>
        <TextField
          autoFocus
          id='minPrice'
          type='number'
          variant='outlined'
          value={minPrice}
          onChange={minChange}
          disabled={!saveLimit}
        />
        <Box height='20px' />
        <DialogContentText color='primary'>
          Max Price
        </DialogContentText>
        <TextField
          autoFocus
          id='maxPrice'
          type='number'
          variant='outlined'
          value={maxPrice}
          onChange={maxChange}
          disabled={!saveLimit}
        />
        <Box display='flex' margin='20px'>
          <Typography variant='h6'>Expire</Typography>
          <Switch
            checked={withExpire}
            onChange={toggleChange}
            disabled={!saveLimit}
          />
        </Box>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Expire Date"
            inputFormat="MM/dd/yyyy"
            value={expireDate}
            onChange={dateChange}
            disabled={!saveLimit}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        {
          task === 'View' && <Typography
            onClick={urlClick}
            className={classes.link}
          >
            Url to stock info
          </Typography>
        }
        <DialogActions>
          <Button autoFocus onClick={handleConfirm}>
            {buttonText[task]}
          </Button>
        </DialogActions>
      </DialogContent>
      <Dialog
        open={showDeleteAlert}
        onClose={handleClose}
      >
        <DialogTitle>Alert</DialogTitle>
        <DialogContent>
          <DialogContentText color='primary'>
            {'Are you sure you want to delete tracked stock ' + stock.ticker}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDelete}>
            Yes
          </Button>
          <Button autoFocus onClick={handleClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  )
}