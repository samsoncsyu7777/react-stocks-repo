import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

export default function Notification({ alertTicker, alertEvent, open, handleClose }) {

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>{'Notification - Stock ' + alertEvent[0]}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {alertTicker + ' ' + alertEvent[1] + ' stop limit'}
        </DialogContentText>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Done
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )

}