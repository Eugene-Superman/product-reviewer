import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress'; //add later

import {REQUEST_URL, REQUEST_HEADER} from '../constants';

export default class LoginForm extends React.Component {
  state = {
    open: false,
    openedForm: '',
    userData: {
      username: '',
      password: '',
    },
    repeatedPassword: ''
  };

  handleClickOpen = (e) => {
    this.setState({ open: true, openedForm: e.currentTarget.name});
  };

  handleClose = () => {
    this.setState({ open: false, openedForm: '' });
  };

  handleChange = (event) => {
    this.setState({
      userData: {
        ...this.state.userData,
        [event.target.id]: event.target.value
      }
    })
  }

  submitLoginForm = (event) => {
    if( "register" === this.state.openedForm && this.state.userData.password !== this.state.repeatedPassword) {
      alert("Wrong password")
    } else {
      let requestUrl = REQUEST_URL + this.state.openedForm + "/";

      fetch(requestUrl, {
        method: 'post',
        headers: REQUEST_HEADER,
        body: JSON.stringify(this.state.userData)
      })
      .then(function (response) {
          return response.json();
      })
      .then(function (result) {
        if(result.success) {
          localStorage.setItem("token", result.token)
        } else {
          alert("Error");
        }
      })
      .catch (function (error) {
          console.log('Request failed', error);
      });
      this.handleClose();
    }

    event.preventDefault();
  }
  
  render() {
    return (
      <div>
        <Button color="inherit" name="login" onClick={this.handleClickOpen}>Login</Button>
        <Button color="inherit" name="register" onClick={this.handleClickOpen}>Register</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.state.openedForm}</DialogTitle>
          <form onSubmit={this.submitLoginForm}>
            <DialogContent>
              <TextField
                margin="dense"
                id="username"
                label="User name"
                type="text"
                onChange={this.handleChange}
                required
                fullWidth
              />
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                onChange={this.handleChange}
                required
                fullWidth
              />
              {this.state.openedForm === "register" &&
                <TextField
                  margin="dense"
                  id="repeatedPassword"
                  label="Repeat Password"
                  type="password"
                  onChange={(event)=>this.setState({repeatedPassword: event.target.value})}
                  required
                  fullWidth
                />
              }
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                {this.state.openedForm}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}