import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import ProductDetails from './ProductDetails'
import { REQUEST_URL, REQUEST_HEADER } from '../constants';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});

class Products extends React.Component {
  state = {
    value: 0,
    products: []
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    let requestUrl = REQUEST_URL + "api/products/";
    let self = this;

    fetch(requestUrl, {
      method: 'get',
      headers: REQUEST_HEADER
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        self.setState({ products: result });
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
  }

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            {this.state.products.map((element, i) => (
              <Tab key={"item-" + i} label={element.title} />
            )
            )}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          {this.state.products.map((element, i) => (
            <ProductDetails key={"product-" + i} productData={element} dir={theme.direction} />
          )
          )}
        </SwipeableViews>
      </div>
    );
  }
}

Products.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Products);