import React from 'react';

import { REQUEST_URL, REQUEST_HEADER } from '../constants';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});

class Comments extends React.Component {

  state = {
    comments: [],
  }

  componentDidMount() {
    let { productId } = this.props;
    let requestUrl = REQUEST_URL + "api/reviews/" + productId;
    let self = this;

    fetch(requestUrl, {
      method: 'get',
      headers: REQUEST_HEADER
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        self.setState({ comments: result });
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="h6" className={classes.title}>
          Reviews
        </Typography>
        <div className={classes.demo}>
          <List>
            {this.state.comments.map((element, i) => (
              <div key={"comment-" + i}>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary={
                      <div>
                        <p>User: {element.created_by.username}</p>
                        <p>Rate: {element.rate}</p>
                        <p>Comment: {element.text}</p>
                      </div>
                    }
                  />
                </ListItem>
              </div>
            ))}
          </List>
        </div>
      </div>
    )
  }
}

Comments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comments);