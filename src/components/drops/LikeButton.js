import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { likeDrop, unlikeDrop } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
  likedDrop = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.dropId === this.props.dropId
      )
    )
      return true;
    else return false;
  };
  likeDrop = () => {
    this.props.likeDrop(this.props.dropId);
  };
  unlikeDrop = () => {
    this.props.unlikeDrop(this.props.dropId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedDrop() ? (
      <MyButton tip="Undo like" onClick={this.unlikeDrop}>
        <FavoriteIcon />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeDrop}>
        <FavoriteBorder />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  dropId: PropTypes.string.isRequired,
  likeDrop: PropTypes.func.isRequired,
  unlikeDrop: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likeDrop,
  unlikeDrop
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);