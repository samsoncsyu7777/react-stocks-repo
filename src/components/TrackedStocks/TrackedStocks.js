import { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  styled,
  Select,
  MenuItem,
} from '@mui/material';
import StockDetails from '../StockDetails/StockDetails';
import StockLimit from '../StockLimit/StockLimit';
import Notification from '../Notification/Notification';
import { useStyles } from './useStyles';
import { sortStock } from '../../utils/sort';
import { checkLimit } from '../../utils/checkLimit';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function TrackedStocks({ stocks }) {
  const [sortedStocks, setSortedStocks] = useState(stocks);
  const [nameOrder, setNameOrder] = useState('');
  const [priceOrder, setPriceOrder] = useState('');
  const [openDetails, setOpenDetails] = useState(false);
  const [openLimit, setOpenLimit] = useState(false);
  const [index, setIndex] = useState(0);
  const [task, setTask] = useState('View');
  const [sortField, setSortField] = useState('name');
  const [alertTicker, setAlertTicker] = useState('');
  const [alertEvent, setAlertEvent] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const order = sortField === 'name' ? nameOrder : priceOrder;
    const orderWithDefault = order === '' ? 'ascending' : order;
    setSortedStocks(sortStock(stocks, sortField, orderWithDefault));
    callCheckLimit();
  }, [stocks]);

  const callCheckLimit = async () => {
    const alert = await checkLimit(stocks);
    if ('stock' in alert) {
      setAlertTicker(alert.stock.ticker);
      setAlertEvent(alert.event);
      setShowNotification(true);
    }
  }

  const nameChange = (e) => {
    setNameOrder(e.target.value);
    setSortField('name');
    setSortedStocks(sortStock(stocks, 'name', e.target.value));
  }

  const priceChange = (e) => {
    setPriceOrder(e.target.value);
    setSortField('price');
    setSortedStocks(sortStock(stocks, 'price', e.target.value));
  }

  const detailsClose = () => {
    setOpenDetails(false);
  }

  const limitClick = (index, task) => {
    setIndex(index);
    setTask(task);
    setOpenLimit(true);
  }

  const limitClose = () => {
    setOpenLimit(false);
  }

  const notificationClose = () => {
    setShowNotification(false);
  }

  return (
    <Box>
      <Typography variant='h4'>Tracked Stocks</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left" className={classes.selectCell}>
                Name
                <Select
                  value={nameOrder}
                  className={classes.select}
                  onChange={nameChange}
                  variant='standard'
                  inputProps={{
                    classes: {
                      icon: classes.icon,
                    },
                  }}
                >
                  <MenuItem value={'ascending'}>ascending</MenuItem>
                  <MenuItem value={'descending'}>descending</MenuItem>
                </Select>
              </StyledTableCell>
              <StyledTableCell align="left">Symbol</StyledTableCell>
              <StyledTableCell align="left" className={classes.selectCell}>
                Current Value
                <Select
                  value={priceOrder}
                  className={classes.select}
                  onChange={priceChange}
                  variant='standard'
                  inputProps={{
                    classes: {
                      icon: classes.icon,
                    },
                  }}
                >
                  <MenuItem value={'ascending'}>ascending</MenuItem>
                  <MenuItem value={'descending'}>descending</MenuItem>
                </Select>
              </StyledTableCell>
              <StyledTableCell align="left">Min</StyledTableCell>
              <StyledTableCell align="left">Max</StyledTableCell>
              <StyledTableCell align="left">Expires</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedStocks.map((stock, index) => {
              return (
                <StyledTableRow key={stock.name}>
                  <StyledTableCell
                    align="left"
                    component="th"
                    scope="row"
                  >
                    {stock.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{stock.ticker}</StyledTableCell>
                  <StyledTableCell align="left">{'$' + stock.price}</StyledTableCell>
                  <StyledTableCell align="left">{'$' + stock.minPrice}</StyledTableCell>
                  <StyledTableCell align="left">{'$' + stock.maxPrice}</StyledTableCell>
                  <StyledTableCell align="left">{stock.withExpire ? new Date(Date.parse(stock.expireDate)).toLocaleDateString() : 'N/A'}</StyledTableCell>
                  <StyledTableCell
                    align="left"
                    className={classes.link}
                  >
                    <Typography className={classes.action} onClick={() => limitClick(index, 'View')}>View</Typography>
                    <Typography className={classes.action} onClick={() => limitClick(index, 'Edit')}>Edit</Typography>
                    <Typography className={classes.action} onClick={() => limitClick(index, 'Delete')}>Delete</Typography>

                  </StyledTableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {
        sortedStocks.length > 0 && sortedStocks[index] && <StockDetails
          stock={sortedStocks[index]}
          open={openDetails}
          handleClose={detailsClose}
        />
      }
      {
        sortedStocks.length > 0 && sortedStocks[index] && <StockLimit
          stock={sortedStocks[index]}
          open={openLimit}
          handleClose={limitClose}
          task={task}
          setOpenDetails={setOpenDetails}
          setIndex={setIndex}
        />
      }
      <Notification
        alertTicker={alertTicker}
        alertEvent={alertEvent}
        open={showNotification}
        handleClose={notificationClose}
      />
    </Box>
  )
}