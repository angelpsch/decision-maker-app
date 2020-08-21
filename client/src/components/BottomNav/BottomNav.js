import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PollIcon from "@material-ui/icons/Poll";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    background: theme.palette.primary.main,
    marginTop: "10px",
  },
  bottomNav: {
    color: theme.palette.primary.contrastText,
    width: "100%",
  },
  footer: {
    background: theme.palette.primary.main,
  },
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
}));

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState();

  return (
    <footer className={classes.stickToBottom}>
      <center>
        <BottomNavigation
          className={(classes.stickToBottom, classes.root)}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
        >
          <Link to="/recent">
            <BottomNavigationAction
              className={classes.bottomNav}
              label="Recents"
              icon={<RestoreIcon />}
              size="large"
            />
          </Link>
          <Link to="/users/:_id">
            <BottomNavigationAction
              className={classes.bottomNav}
              label="My Decisions"
              icon={<PollIcon />}
            />
          </Link>
          <Link to="/create">
            <BottomNavigationAction
              className={classes.bottomNav}
              label="Create Decision"
              icon={<AddCircleIcon />}
              size="large"
            />
          </Link>
        </BottomNavigation>
      </center>
    </footer>
  );
}
