"use strict"


import * as appointmentActions from '../../actions/appointmentActions';
import AppointmentRender from './AppointmentRender';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIcon from '../Helper/LoadingIcon';
import ErrorBanner from '../Helper/ErrorBanner';

const AppointmentContainer = (props) => {
    const { actions, appointments, requestState } = props;

    const {
        error,
        appointmentsPending, appointmentsFailed, appointmentsSuccess,
        postAppointmentsSuccess, postAppointmentsFailed,
        cancelAppointmentRequest, cancelAppointmentSuccess, cancelAppointmentFailed,
        updateAppointmentRequest, updateAppointmentSuccess, updateAppointmentFailed,
    } = requestState;


    useEffect(() => {
        actions.readAppointments();
    }, []);

    const renderSuccess = () => {
        return (
            <div className="reactive-margin">
                <AppointmentRender
                    appointments={ appointments }
                    handleRefresh={() => actions.readAppointments()}
                    handleCancel={(guid) => actions.cancelAppointment(guid)}
                    handleUpdate={(data) => actions.updateAppointment(data)}
                />
            </div>
        );
    }

    if (appointmentsPending || cancelAppointmentRequest || updateAppointmentRequest) {
        return <LoadingIcon />;
    } else if (appointmentsFailed) {
        return (
            <ErrorBanner>
                Error while loading appointments!
            </ErrorBanner>
        );
    } else if (postAppointmentsFailed){
        return (
            <ErrorBanner>
                Error while uploading appointment!
            </ErrorBanner>
        )
    }else if (cancelAppointmentFailed) {
        return (
            <ErrorBanner>
                Error while canceling appointment!
            </ErrorBanner>
        )
    }else if (updateAppointmentFailed) {
        return (
            <ErrorBanner>
                Error while updating appointment!
            </ErrorBanner>
        )
    } else if (appointmentsSuccess || postAppointmentsSuccess || cancelAppointmentSuccess || updateAppointmentSuccess) {
        return renderSuccess();
    } else {
        return (
            <ErrorBanner>
                {error}
                Invalid state! This message should never appear.
            </ErrorBanner>
        );
    }
}

AppointmentContainer.propTypes = {
    actions: PropTypes.object
};

function mapStateToProps(state) {
    const { appointmentReducer } = state;
    return {
       appointments: state.appointmentReducer.appointments,
       requestState: Object.assign({},
        appointmentReducer.requestState)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(appointmentActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppointmentContainer);

