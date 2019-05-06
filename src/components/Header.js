import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from 'react-redux';
import { authorizeUser } from '../redux/actions';

import { REQUEST_URL, REQUEST_HEADER } from '../constants';


const styles = {
  toolBar: {
    'justify-content': 'flex-end'
  },
};

class Header extends React.Component {
  state = {
    isUserLogged: localStorage.getItem("token"),
    open: false,
    openForm: '',
    userData: {
      username: '',
      password: '',
    },
    repeatedPassword: ''
  }

  handleClickOpen = (e) => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
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
    if ("register" === this.state.openForm && this.state.userData.password !== this.state.repeatedPassword) {
      alert("Wrong password")
    } else {
      let requestUrl = REQUEST_URL + "api/" + this.state.openForm + "/";
      let self = this;

      fetch(requestUrl, {
        method: 'post',
        headers: REQUEST_HEADER,
        body: JSON.stringify(this.state.userData)
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          if (result.success) {
            localStorage.setItem("token", result.token)
            self.props.authorizeUser(true)
          } else {
            console.log(result)
            alert("Error");
          }
        })
        .catch(function (error) {
          console.log('Request failed', error);
        });

      this.handleClose();
    }

    event.preventDefault();
  }

  logoutUser = () => {
    localStorage.removeItem("token")
    this.props.authorizeUser(false)
  }

  openForm = (e) => {
    this.setState({ open: true, openForm: e.currentTarget.name });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar className={classes.toolBar}>
            {this.props.isUserAuthorized ? (
              <Button variant="contained" color="primary" onClick={this.logoutUser}>
                Logout
                </Button>
            ) : (
                <div>
                  <Button color="inherit" name="login" onClick={this.openForm}>Login</Button>
                  <Button color="inherit" name="register" onClick={this.openForm}>Register</Button>
                </div>
              )
            }
          </Toolbar>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">{this.state.openForm}</DialogTitle>
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
                {this.state.openForm === "register" &&
                  <TextField
                    margin="dense"
                    id="repeatedPassword"
                    label="Repeat Password"
                    type="password"
                    onChange={(event) => this.setState({ repeatedPassword: event.target.value })}
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
                  {this.state.openForm}
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isUserAuthorized: state.isUserAuthorized
})

const mapDispatchToProps = {
  authorizeUser
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  authorizeUser: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));
