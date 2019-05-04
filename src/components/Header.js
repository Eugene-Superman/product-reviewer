import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import LoginForm from './LoginForm';

const styles = {
  toolBar: {
    'justify-content': 'flex-end'
  },
};

class Header extends React.Component {
  state = {
    openLoginForm: false
  }

  loginUser = () => {

  }

  render(){
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar className={classes.toolBar}>
            <LoginForm />
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