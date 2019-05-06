import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Comments from './Comments';
import { connect } from "react-redux";
import CommentForm from './CommentForm'

import { REQUEST_URL } from '../constants';

const styles = {
  card: {
    maxWidth: 345,
    margin: '40px auto'
  },
  comment: {
    maxWidth: 500,
    margin: '40px auto'
  },
  media: {
    height: 300,
  }
};

class ProductDetails extends React.Component {

  render() {
    const { classes, productData, isUserAuthorized } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} md={6} >
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={REQUEST_URL + "static/" + productData.img}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {productData.title}
                </Typography>
                <Typography component="p">
                  {productData.text}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={classes.comment}>
            {isUserAuthorized &&
              (<CommentForm productId={productData.id} />)
            }
            <Comments productId={productData.id} />
          </div>
        </Grid>
      </Grid>
    );
  }
}

ProductDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = states => ({
  isUserAuthorized: states.isUserAuthorized,
})

export default connect(mapStateToProps)(withStyles(styles)(ProductDetails));