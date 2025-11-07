import React from "react";
import {
    Button,
    Modal, ModalBody, ModalHeader,
} from 'reactstrap';

import {userActions} from "../../../../../redux/actions";
import {connect} from "react-redux";
import {errorToast, successToast} from "../../../../../keep/Toast/Toast";

const DeleteModal = (props) => {

    const closeBtn = <button className="close" onClick={props.toggle}>&times;</button>;

    const handleSubmit = async (id) => {
        const response = await props.delData(id)
        if (response.status === 200) {
            await successToast(response)
            await props.getUser()
            props.toggle();
        } else if (response.status === 500) {
            await errorToast(response)
        }
    }


    return (
        <Modal isOpen={props.isOpen} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle} close={closeBtn} >
                Delete User
            </ModalHeader>
            <ModalBody tabs="true" className="mb-3">
                <p className="m-0">Yakin ingin menghapus data ini?</p>
                <p className="m-0">data ini akan hilang setelah menekan tombol delete</p>
                <Button
                    className="btn btn-danger float-right mt-3"
                    type="submit"
                    onClick={()=>handleSubmit(props.id)}
                >
                    Delete
                </Button>
            </ModalBody>
        </Modal>
    );
}

const mapStateToProps = state => ({
    ...state.userReducer
})

const mapDispatchToProps = {
    delData : userActions.delData,
    getUser : userActions.getData
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal)
