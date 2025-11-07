import React, { Fragment, useEffect } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux'
import PageTitle from '../../../Layout/AppMain/PageTitle';
import {candidateActions, employeeActions} from '../../../redux/actions'
import propTypes from 'prop-types'
import CardsAdvanced from './Candidate/CandidateTable';
import AddModal from './Candidate/NewCandidate/AddModal';
import ModalTabForm from './Candidate/DetailCandidate/Profile/FormModal'
import ViewPdfModal from "./Candidate/DetailCandidate/Hired/ViewPdfModal";
import EmployeeModal from "./Candidate/DetailCandidate/Hired/EmployeeModal";
import EmployeeFile from "./Candidate/DetailCandidate/Hired/EmployeeFile";
import EmployeeDelete from "./Candidate/DetailCandidate/Hired/EmployeeDelete";

const OverviewCandidate = ({ getCandidate, loading, getClientByStatus, getAvailable, getDataEmployee}) => {

    useEffect(() => {
        if (loading) {
                // getMedia()
                // getCandidate()
                getDataEmployee()
                getAvailable()
                getClientByStatus('Available')
        }

    }, [loading, getCandidate, getClientByStatus, getAvailable, getDataEmployee])

    return (
        <Fragment>
            <CSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}>
                <PageTitle
                    heading="Candidate"
                    // subheading="Wide selection of cards with multiple styles, borders, actions and hover effects."
                    icon="lnr-users icon-gradient bg-amy-crisp"
                />
                <CardsAdvanced />
                <AddModal />
                <ViewPdfModal />
                <ModalTabForm />
                <EmployeeModal/>
                <EmployeeFile/>
                <EmployeeDelete/>


            </CSSTransitionGroup>
        </Fragment>
    );

}

const mapStateToProps = state => ({
    ...state.candidateReducer,
    ...state.employeeReducer
})
const mapDisppatchToProps = {
    getCandidate: candidateActions.getData,
    getClientByStatus: candidateActions.getDataStatus,
    getAvailable: candidateActions.getAvailable,
    getDataEmployee: employeeActions.getDataEmployee
    // getMedia:candidateActions.getMedia
}
OverviewCandidate.propTypes = {
    dataItem: propTypes.object,
    getData: propTypes.func,
    getClientByStatus: propTypes.func,
    getDetail: propTypes.func,
    getDataEmployee: propTypes.func,
    getAvailable: propTypes.func,
    onHistoryMode: propTypes.func,
    dataStates: propTypes.object,
    loading: propTypes.bool
}
export default connect(mapStateToProps, mapDisppatchToProps)(OverviewCandidate)