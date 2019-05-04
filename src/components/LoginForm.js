import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class LoginForm extends React.Component {
  state = {
    open: false,
    openedForm: '',
    userData: {}
  };

  handleClickOpen = (e) => {
    this.setState({ open: true, openedForm: e.currentTarget.name});
  };

  handleClose = () => {
    this.setState({ open: false, openedForm: '' });
  };

  loginUser = () => {

  }

  refisterUser = () => {
    fetch('http://smktesting.herokuapp.com/api/register/', {
      method: 'post',
      headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    }).then(res=>res.json())
    .then(res => console.log(res));
  }

  render() {
    
    return (
      <div>
        <Button color="inherit" name="Login" onClick={this.handleClickOpen}>Login</Button>
        <Button color="inherit" name="Register" onClick={this.handleClickOpen}>Register</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.state.openedForm}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="user-email"
              label="Email Address"
              type="email"
              required
              fullWidth
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              required
              fullWidth
            />
            {this.state.openedForm === "Register" &&
              <TextField
                margin="dense"
                id="repeat-password"
                label="Repeat Password"
                type="password"
                required
                fullWidth
              />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.state.openedForm === "Login"? this.loginUser: this.registerUser} color="primary">
              {this.state.openedForm}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}