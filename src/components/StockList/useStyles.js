import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  select: {
    width: '120px',
    color: theme.palette.text.light,
    '&:before': {
      borderColor: theme.palette.text.light,
    },
    '&:after': {
      borderColor: theme.palette.text.light,
    },
  },
  icon: {
    fill: theme.palette.text.light,
  },
  selectCell: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    color: theme.palette.text.link,
    textDecoration: 'underline',
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
