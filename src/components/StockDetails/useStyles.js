import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: '20px',
  },
  field: {
    textTransform: 'capitalize',
  },
  info: {
    color: theme.palette.text.info,
  },
}));
