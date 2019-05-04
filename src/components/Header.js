import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import LoginForm from './LoginForm';

const styles = {
  toolBar: {
    'justify-content': 'flex-end'
  },
};

class Header extends React.Component {
  state = {
    openLoginForm: false,
    isUserLogged: localStorage.getItem("token")
  }

  logoutUser = () => {
    localStorage.removeItem("token")
  }

  render(){
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar className={classes.toolBar}>
            {this.state.isUserLogged ? (
                <Button color="primary" onClick={this.logoutUser}>
                  Logout
                </Button>
              ):(
                <LoginForm />
              )
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);