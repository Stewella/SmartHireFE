import React from "react";
import {
    Modal, ModalBody, ModalHeader,
    // CardBody, CardHeader, NavItem, NavLink, Nav, TabContent, TabPane
} from 'reactstrap';
import Swal from 'sweetalert2';
import { SERVICE } from "../../../../../config/config";

// import classnames from 'classnames';

import AddClient from './AddTab/AddClient';
import axios from "axios";

const AddModal = (props) => {
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
                Add Client
        </ModalHeader>
            <ModalBody tabs="true" className="mb-3">
                <AddClient id={props.id} submitHandle={(client) => handleSubmit(client)} />
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
                        </NavItem> */}
                {/* <NavItem>
                            <NavLink href="#"
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => {
                                    toggle('2');
                                }}
                            >
                                Contact
                            </NavLink>
                        </NavItem> */}
                {/* </Nav>
                </CardHeader>
                <CardBody>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <AddClient id={props.id} />
                        </TabPane> */}
                {/* <TabPane tabId="2">
                            <AddContact id={props.id}/>
                        </TabPane> */}
                {/* <TabPane tabId="3">
                            <TabPosisi idcandidate={props.idcandidate}/>
                        </TabPane>
                        <TabPane tabId="4">
                            <TabPengalaman idcandidate={props.idcandidate}/>
                        </TabPane>
                        <TabPane tabId="5">
                            <TabSkill idcandidate={props.idcandidate}/>
                        </TabPane>
                        <TabPane tabId="6">
                            <TabStatus idcandidate={props.idcandidate}/>
                        </TabPane> */}
                {/* </TabContent>
                </CardBody> */}

            </ModalBody>
        </Modal>
    );
}

export default AddModal;
