import {
  Box,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  styled,
  Dialog,
} from '@mui/material';
import { useStyles } from './useStyles';
import CloseIcon from '@mui/icons-material/Close';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
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

export default function StockDetails({ stock, open, handleClose }) {
  const classes = useStyles();

  return (
    <Dialog
      fullScreen
      open={open}
      className={classes.dialog}
    >
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h4'>Stock Details</Typography>
        <CloseIcon onClick={handleClose} />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableBody>
            {Object.keys(stock).map((key) => (
              <StyledTableRow key={key}>
                <StyledTableCell align="left" component="th" scope="row" className={classes.field}>
                  {key}
                </StyledTableCell>
                <StyledTableCell align="left" className={classes.info}>{stock[key]}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  )
}