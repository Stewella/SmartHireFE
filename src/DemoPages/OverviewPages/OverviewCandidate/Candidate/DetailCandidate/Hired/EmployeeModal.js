import {
    Button,
    Form,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {connect} from "react-redux";
import EmployeeForm from "./EmployeeForm";
import EmployeeView from "./EmployeeView";
import Swal from "sweetalert2";
import {employeeActions} from "../../../../../../redux/actions";


const EmployeeModal = ({toggle, dataItem, onSubmit, getDataEmployee}) => {

    const initialState = {
        addData: false,
        cancel: false,
        dataForm: {}
    }

    const setToggle = (value) => {
        toggle(value)
    }

    const submitForm = async (e) => {
        e.preventDefault()
        const {response} = await onSubmit(dataItem.dataForm)
        if (response.status === 200) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            await Toast.fire({
                icon: 'success',
                title: response.message
            })

            await getDataEmployee()
            setToggle({addData: false, dataForm: {}})
        } else if (response.status === 500) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            await Toast.fire({
                icon: 'error',
                title: response.message
            })
        }
    }

    const closeBtn = (
        <button className="close"
            onClick={() => setToggle(initialState)}
        >
            &times;
        </button>
    );


    return (
        <Modal
            className={`${dataItem.editData? "modal-xl" : "modal-lg" } modal-dialog-centered`}
            isOpen={dataItem.addData}
            // isOpen={true}
            toggle={() => setToggle(initialState)}
        >
            <ModalHeader
                close={closeBtn}
            >
                { dataItem.editData ? <>Employee Form</> : <>Employee Data</> }
            </ModalHeader>
            <Form onSubmit={submitForm}
                // onReset={resetForm}
            >
                <div style={{overflowY: 'scroll', height: '463px'}}>
                    <ModalBody>
                        {dataItem.editData? <EmployeeForm/> : <EmployeeView/>}
                    </ModalBody>
                </div>

                <ModalFooter>
                    {dataItem.editData ?
                        <>
                            {dataItem.cancel ?
                                <Button
                                    className="btn-pill btn-lg btn-shadow mt-1"
                                    type="button"
                                    onClick={() => setToggle({ editData: false, cancel: false })}
                                    style={{
                                        float: "left",
                                        backgroundColor: "#ffffff",
                                        border: "none",
                                        color: "currentcolor",
                                    }}
                                >
                                    <FontAwesomeIcon icon={faUndo} />
                                    <span> Cancel</span>
                                </Button>
                                :
                                null
                            }

                            <Button
                                className="btn-pill btn-lg btn-shadow mt-1"
                                // type="button"
                                // onClick={() => submitForm()}
                                style={{
                                    background: "#C0D39A",
                                    border: "none",
                                    color: "currentcolor",
                                }}
                            >
                                <FontAwesomeIcon icon={faSave}/>
                                <span> Submit</span>
                            </Button>
                        </>
                        :
                        <div style={{height: '40px'}}></div>
                    }
                </ModalFooter>
            </Form>
        </Modal>

    );
}

const mapStateToProps = (state) => ({
    ...state.employeeReducer
})

const mapDispatchToProps = {
    toggle: employeeActions.toggle,
    onSubmit: employeeActions.onSubmit,
    getDataEmployee: employeeActions.getDataEmployee
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeModal);