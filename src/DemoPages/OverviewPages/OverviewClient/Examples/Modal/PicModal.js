import React from "react";
import {
    Modal, ModalBody, ModalHeader,
    // CardBody, CardHeader, NavItem, NavLink, Nav, TabContent, TabPane
} from 'reactstrap';
// import Swal from 'sweetalert2';

// import classnames from 'classnames';

import AddPic from './PicTab/AddPic';
// import axios from "axios";

const PicModal = (props) => {

    const closeBtn = <button className="close" onClick={props.toggle}>&times;</button>;

    const handleToggle = () => {
        props.toggle();
    }

    return (
        <Modal className="modal-xl" isOpen={props.isOpen} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle} close={closeBtn} >
                Person in Charge & Kebutuhan
        </ModalHeader>
            <ModalBody tabs="true" className="mb-3">
                <AddPic nama={props.nama} togglein={() => handleToggle()}/>
            </ModalBody>
        </Modal>
    );
}

export default PicModal;