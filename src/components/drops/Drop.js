import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteDrop from './DeleteDrop';
import DropDialog from './DropDialog';
import LikeButton from './LikeButton';
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';

const styles = theme => ({
  card: {
    backgroundColor: theme.palette.primary.main,
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  },
  typo: {
    color: theme.palette.primary.light
  }
});

class Drop extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      drop: {
        body,
        createdAt,
        userImage,
        userHandle,
        dropId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteDrop dropId={dropId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          {deleteButton}
          <Typography variant="body2" className={classes.typo2} >
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1" className={classes.typo} >{body}</Typography>
          <LikeButton dropId={dropId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon />
          </MyButton>
          <span>{commentCount} comments</span>
          <DropDialog
            dropId={dropId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Drop.propTypes = {
  user: PropTypes.object.isRequired,
  drop: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Drop));
