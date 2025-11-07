import React from 'react';
import {
    Modal, ModalBody, ModalHeader,
    // CardBody, CardHeader, NavItem, NavLink, Nav, TabContent, TabPane
} from 'reactstrap';
// import classnames from 'classnames';

import TabClient from './ViewTab/TabClient';
// import TabPosisi from './Tab/Posisi/TabPosisi';
// import TabPengalaman from './Tab/Pengalaman/TabPengalaman';
// import TabSkill from './Tab/Skill/TabSkill';

const ViewModal = (props) => {
    // const [client, setClient] = useState([]);
    // const [activeTab, setActiveTab] = useState('1');
    // const toggle = (tab) => {
    //     if (activeTab !== tab) {
    //         setActiveTab(tab)
    //     }
    // }

    const closeBtn = <button className="close" onClick={props.toggle}>&times;</button>;

    return (
        <Modal isOpen={props.isOpen} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle} close={closeBtn} >
                Client Detail
            </ModalHeader>
            <ModalBody tabs="true" className="mb-3">
                <TabClient id={props.id} toggleEdit={props.toggleEdit} toggleView={props.toggle}/>
            </ModalBody>
        </Modal>
    );

}

export default ViewModal;