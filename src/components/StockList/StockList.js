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
import { useStyles } from './useStyles';
import { sortStock } from '../../utils/sort';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.error.dark,
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

export default function StockList({ stocks }) {
  const [sortedStocks, setSortedStocks] = useState(stocks);
  const [nameOrder, setNameOrder] = useState('');
  const [priceOrder, setPriceOrder] = useState('');
  const [openDetails, setOpenDetails] = useState(false);
  const [openLimit, setOpenLimit] = useState(false);
  const [index, setIndex] = useState(0);
  const [sortField, setSortField] = useState('name');
  const classes = useStyles();

  useEffect(() => {
    const order = sortField === 'name' ? nameOrder : priceOrder;
    const orderWithDefault = order === '' ? 'ascending' : order;
    setSortedStocks(sortStock(stocks, sortField, orderWithDefault));
  }, [stocks]);

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

  const stockClick = (index) => {
    setIndex(index);
    setOpenDetails(true);
  }

  const limitClick = (index) => {
    setIndex(index);
    setOpenLimit(true);
  }

  const limitClose = () => {
    setOpenLimit(false);
  }

  return (
    <Box>
      <Typography variant='h4'>Stock List</Typography>
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
              <StyledTableCell align="left">Change</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedStocks.map((stock, index) => (
              <StyledTableRow key={stock.name}>
                <StyledTableCell
                  align="left"
                  component="th"
                  scope="row"
                  onClick={() => stockClick(index)}
                  className={classes.link}
                >
                  {stock.name}
                </StyledTableCell>
                <StyledTableCell align="left">{stock.ticker}</StyledTableCell>
                <StyledTableCell align="left">{'$' + stock.price}</StyledTableCell>
                <StyledTableCell align="left">{stock.day_change}</StyledTableCell>
                <StyledTableCell
                  align="left"
                  className={classes.link}
                  onClick={() => limitClick(index)}
                >
                  Track
                </StyledTableCell>
              </StyledTableRow>
            ))}
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
          task='Add'
          setOpenDetails={setOpenDetails}
        />
      }
    </Box>
  )
}