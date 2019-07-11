import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Drop from '../components/drops/Drop';
import Profile from '../components/profile/Profile';
import DropSkeleton from '../util/DropSkeleton';

import { connect } from 'react-redux';
import { getDrops } from '../redux/actions/dataActions';

class home extends Component {
  componentDidMount() {
    this.props.getDrops();
  }
  render() {
    const { drops, loading } = this.props.data;
    let recentDropsMarkup = !loading ? (
      drops.map((drop) => <Drop key={drop.dropId} drop={drop} />)
    ) : (
      <DropSkeleton />
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
        <Grid item sm={8} xs={12}>
          {recentDropsMarkup}
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getDrops: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getDrops }
)(home);
