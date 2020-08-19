import React, { Component } from "react";

import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Person from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";
import auth from "../components/auth/auth-helper";
import { findUserProfile } from "../utils/api-user.js";
import { Redirect } from "react-router-dom";
// import { Redirect, Link } from "react-router-dom";
import RecentPolls from "../components/RecentPolls";
import BottomNav from '../components/BottomNav'; 
import DeleteUser from "./DeleteUser";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    maxWidth: 200,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  },
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle,
  },
});

class Profile extends Component {
  constructor({ match }) {
    super();
    this.state = {
      user: "",
      redirectToSignin: false,
    };
    this.match = match;
  }
  init = (userId) => {
    const jwt = auth.isAuthenticated();
    findUserProfile(
      {
        userId: userId,
      },
      { t: jwt.token }
    ).then((data) => {
      if (data.error) {
        this.setState({ redirectToSignin: false });
      } else {
        this.setState({ user: data });
      }
    });
    console.log("jwt: " + JSON.stringify(jwt));
  };
  componentDidUpdate = (props) => {
    this.init(props.match.params.userId);
  };
  componentDidMount = () => {
    this.init(this.match.params.userId);
  };
  render() {
    const { classes } = this.props;
    const redirectToSignin = this.state.redirectToSignin;
    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }
    return (
      <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Profile
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={this.state.user.name}
              secondary={this.state.user.email}
            />{" "}
            {auth.isAuthenticated().user &&
              auth.isAuthenticated().user._id === this.state.user._id && (
                <ListItemSecondaryAction>
                  <DeleteUser userId={this.state.user._id} />
                </ListItemSecondaryAction>
              )}
          </ListItem>
          <Divider />
        </List>
        <RecentPolls />
      </Paper>
      <BottomNav />
      </div>
    );
  }
}

export default withStyles(styles)(Profile);
