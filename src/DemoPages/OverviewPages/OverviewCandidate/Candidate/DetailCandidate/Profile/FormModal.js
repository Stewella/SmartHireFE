import React from 'react';
import {
    Modal, ModalBody, ModalHeader,
    // CardBody, CardHeader, NavItem, NavLink, Nav, TabContent, TabPane
} from 'reactstrap';
// import classnames from 'classnames';
import { connect } from 'react-redux'
import { candidateActions } from '../../../../../../redux/actions'
import propTypes from 'prop-types'
import Profile from './Profile';



const FormModal = ({ dataItem, onAdd }) => {
    // const [activeTab, setActiveTab] = useState('1');
    // const toggle = (tab) => {
    //     if (activeTab !== tab) {
    //         setActiveTab(tab)
    //     }
    // }
    const setToogle = (value) => {
        onAdd(value)
    }

    const closeBtn = <button className="close" onClick={() => setToogle({ inTab: false })}>&times;</button>;
    return (
        <Modal isOpen={dataItem.inTab} toggle={() => setToogle({ inTab: false })}>
            <ModalHeader toggle={() => dataItem.inTab} close={closeBtn} >
                Candidate Detail
            </ModalHeader>
            <ModalBody tabs="true" className="mb-3">
                <Profile />
            </ModalBody>
        </Modal>
    );
}

const mapStateToProps = state => ({
    ...state.candidateReducer
})
const mapDisppatchToProps = {
    onSubmit: candidateActions.onSubmit,
    onChange: candidateActions.onChange,
    onAdd: candidateActions.onAdd,
    reset: candidateActions.resetForm
}
FormModal.propTypes = {
    onSubmit: propTypes.func,
    onChange: propTypes.func
}
export default connect(mapStateToProps, mapDisppatchToProps)(FormModal)
