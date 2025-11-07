import React from "react";
import { Modal, ModalBody, ModalHeader} from 'reactstrap';
import ContentForm from "./ContentForm";

const EditModal = (props) => {

    const closeBtn = <button className="close" onClick={props.toggle}>&times;</button>;

    return (
        <Modal isOpen={props.isOpen} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle} close={closeBtn} >
                Edit User
        </ModalHeader>
            <ModalBody tabs="true" className="mb-3">
                <ContentForm data={props.data} error={props.error} toggle={props.toggle}/>
            </ModalBody>
        </Modal>
    );
}

export default EditModal;
