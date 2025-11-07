import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import React from "react";
import {connect} from "react-redux";
import {employeeActions} from "../../../../../../redux/actions";
import {successToast, errorToast} from "../../../../../../keep/Toast/Toast";

const EmployeDelete = ({toggle, dataItem, delData, getDataEmployee, delFile, getListFile}) => {

    const initialState = {
        deleteData: false,
        dataForm: {},
        idUpload: "",
        id: ""
    }

    const setToggle = (value) => {
        toggle(value)
    }

    const handleDelete = async () => {
        const id = dataItem.dataForm.id
        const response = await delData(id)
        if (response.status === 200) {
            await successToast(response)
            await getDataEmployee()
            setToggle(initialState)
        } else if (response.status === 500) {
            await errorToast(response)
            setToggle(initialState)
        }
    }

    const handleDeleteFile = async () => {
        const response = await delFile(dataItem.idUpload)
        if (response.status === 200) {
            await successToast(response)
            await getListFile(dataItem.id)
            setToggle(initialState)
        } else if (response.status === 500) {
            await errorToast(response)
            setToggle(initialState)
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
            isOpen={dataItem.deleteData}
            toggle={() => setToggle(initialState)}
        >
            <ModalHeader
                toggle={() => setToggle(initialState)}
                close={closeBtn}>
                Delete Employee
            </ModalHeader>
            <ModalBody tabs="true" className="mb-3">
                <p className="m-0">Yakin ingin menghapus data ini?</p>
                <p className="m-0">data ini akan hilang setelah menekan tombol
                                   {dataItem.idUpload ?
                                       <> delete file</>
                                   :
                                       <> delete</>
                                   }
                </p>
                {dataItem.idUpload ?
                    <Button
                        className="btn btn-danger float-right mt-3"
                        type="submit"
                        onClick={handleDeleteFile}
                    >
                        Delete File
                    </Button>
                    :
                    <Button
                        className="btn btn-danger float-right mt-3"
                        type="submit"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>}

            </ModalBody>
        </Modal>
    );
}

const mapStateToProps = (state) => ({
    ...state.employeeReducer
})

const mapDispatchToProps = {
    toggle: employeeActions.toggle,
    delData: employeeActions.delData,
    getDataEmployee: employeeActions.getDataEmployee,
    delFile: employeeActions.delFile,
    getListFile: employeeActions.getListFile
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeDelete);