import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashMessages';

export default function(ComposedComponent) {
    class Authenticate extends Component {

        componentWillMount() {
            if(!this.props.isAuthenticated) {
                this.props.addFlashMessage({
                    type: 'error',
                    text: 'You need to be logged in to access this page'
                });
                this.context.router.history.push('/login');
            }
        }

        componentWillUpdate(nextProps) {
            if(!nextProps.isAuthenticated) {
                this.context.router.history.push('/login');
            }
        }
    render() {
        return (
            <ComposedComponent {...this.props} />
        );
    }
}

Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired
}

Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
}
function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        };
}

return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}