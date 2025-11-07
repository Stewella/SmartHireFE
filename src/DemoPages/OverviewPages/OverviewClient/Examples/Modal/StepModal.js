import React from "react";
import {
    Modal, ModalBody, ModalHeader,
    // CardBody, CardHeader, NavItem, NavLink, Nav, TabContent, TabPane
} from 'reactstrap';
// import Swal from 'sweetalert2';

// import classnames from 'classnames';

import AddStep from './StepTab/AddStep';
// import axios from "axios";

const StepModal = (props) => {

    const closeBtn = <button className="close" onClick={props.toggle}>&times;</button>;

    const handleToggle = () => {
        props.toggle();
    }

    return (
        <Modal className="modal-md" isOpen={props.isOpen} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle} close={closeBtn} >
                Recruitment Steps
        </ModalHeader>
            <ModalBody tabs="true" className="mb-3">
                <AddStep nama={props.nama} idCl={props.idCl} togglein={() => handleToggle()}/>
            </ModalBody>
        </Modal>
    );
}

export default StepModal;