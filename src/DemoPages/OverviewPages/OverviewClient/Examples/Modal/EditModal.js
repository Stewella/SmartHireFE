import React from "react";
import {
    Modal, ModalBody, ModalHeader,
    // CardBody, CardHeader, NavItem, NavLink, Nav, TabContent, TabPane
} from 'reactstrap';
import { SERVICE } from "../../../../../config/config";

// import classnames from 'classnames';

import EditClient from './EditTab/EditClient';
import Swal from 'sweetalert2';
import axios from "axios";

const EditModal = (props) => {
    // const [client, setClient] = useState([]);
    // const [activeTab, setActiveTab] = useState('1');

    // const toggle = (tab) => {
    //     if (activeTab !== tab) {
    //         setActiveTab(tab)
    //     }
    // }

    const closeBtn = <button className="close" onClick={props.toggle}>&times;</button>;

    const handleSubmit = (client) => {
        axios
            .post(SERVICE.JAVA_SERVICE + "/client", client)
            .then((response) => {
                if (response.data != null) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        onOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'Data berhasil disimpan'
                    })
                }
                props.toggle();
            });


    }


    return (
        <Modal isOpen={props.isOpen} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle} close={closeBtn} >
                Edit Client
        </ModalHeader>
            <ModalBody tabs="true" className="mb-3">
                <EditClient id={props.id} submitHandle={(client) => handleSubmit(client)} />
                {/* <CardHeader>
                    <Nav justified>
                        <NavItem>
                            <NavLink href="#"
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => {
                                    toggle('1');
                                }}
                            >
                                Profile
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#"
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => {
                                    toggle('2');
                                }}
                            >
                                Contact
                            </NavLink>
                        </NavItem>
                    </Nav>
                </CardHeader>
                <CardBody>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <EditClient id={props.id}/>
                        </TabPane>
                        <TabPane tabId="2">
                            <EditContact id={props.id}/>
                        </TabPane>
                    </TabContent>
                </CardBody> */}

            </ModalBody>
        </Modal>
    );
}

export default EditModal;
