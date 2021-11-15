import React, { Component } from "react";

import UserService from "../services/user.service";
import {makeStyles} from '@mui/styles';
import Homepage from "./homepage";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        console.log(response.data);
        this.setState({
          content: response.data.username
        });
      },
      error => {
        this.setState({
          content: "There is no user"
        });
      }
    );
  }

  render() {
    // const useStyles = makeStyles((theme) => ({

    // }));
    // const classes = useStyles();
    return (
      <div>
        <Homepage />
      </div>
    );
  }
}
