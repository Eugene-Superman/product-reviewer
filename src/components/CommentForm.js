import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import StarRatings from 'react-star-ratings';
import { REQUEST_URL, REQUEST_HEADER } from '../constants';

const styles = theme => ({
  textField: {
    margin: "10px 0",
    width: "100%"
  },
  buttonContainer: {
    textAlign: "right"
  }
});

class CommentForm extends React.Component {

  state = {
    text: '',
    rate: 0
  }

  changeRating = (newRating, name) => {
    this.setState({
      rate: newRating
    });
  }

  handleChange = (event) => {
    this.setState({ text: event.target.value })
  }

  submitCommentForm = (event) => {
    let { productId } = this.props;
    let requestUrl = REQUEST_URL + "api/reviews/" + productId;
    REQUEST_HEADER.Authorization = "Token " + localStorage.getItem('token')

    fetch(requestUrl, {
      method: 'post',
      headers: REQUEST_HEADER,
      body: JSON.stringify(this.state)
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      console.log(result)
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.submitCommentForm}>
        <StarRatings
          rating={this.state.rate}
          starRatedColor="blue"
          changeRating={this.changeRating}
          numberOfStars={5}
          name='rating'
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Leave your comment"
          multiline
          rowsMax="10"
          value={this.state.text}
          onChange={this.handleChange}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          required
        />
        <div className={classes.buttonContainer}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    )
  }
}

CommentForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentForm);
