import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const UserRoute = ({ isAuthenticated, userAccessRole, component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            userAccessRole === "ACCESS LEVEL 1" ? (<Component {...props} />) : (<Redirect to ="/login" />)}
    />
);

UserRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    userAccessRole: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.isAuthenticated,
    userAccessRole: state.auth.user.userAccessRole
});

export default connect(mapStateToProps)(UserRoute);
