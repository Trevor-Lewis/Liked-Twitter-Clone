import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Drop from '../components/drops/Drop';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import DropSkeleton from '../util/DropSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    dropIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const dropId = this.props.match.params.dropId;

    if (dropId) this.setState({ dropIdParam: dropId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { drops, loading } = this.props.data;
    const { dropIdParam } = this.state;

    const dropsMarkup = loading ? (
      <DropSkeleton />
    ) : drops === null ? (
      <p>No drops from this user</p>
    ) : !dropIdParam ? (
      drops.map((drop) => <Drop key={drop.dropId} drop={drop} />)
    ) : (
      drops.map((drop) => {
        if (drop.dropId !== dropIdParam)
          return <Drop key={drop.dropId} drop={drop} />;
        else return <Drop key={drop.dropId} drop={drop} openDialog />;
      })
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {dropsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);