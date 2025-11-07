import {
    Button, CustomInput,
    Form,
    FormGroup, Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faUndo, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import {employeeActions} from "../../../../../../redux/actions";
import {connect} from "react-redux";
import Select from "react-select";
import EmployeeFileTable from "./EmployeeFileTable";
import {successToast, errorToast, invalidFormSwal} from "../../../../../../keep/Toast/Toast";

library.add(fab, faSpinner)

const EmployeeFile = ({toggle, dataItem, docType, onChange, onSubmitFile, getListFile, resetForm}) => {

    const setToggle = (value) => {
        toggle(value)
    }

    const initialState = {
        addFile: false,
        dataForm: {},
        docList: []
    }

    const makeObject = () => {
        let docTypeList = []
        docType.map((val, i) => (
            docTypeList[i] = {value: val.idDocType, label: val.namaDocument}
        ))
        return docTypeList
    }

    const [errors, setErrors] = useState({
        tipe: "",
        file: "",
    });

    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target
        onChange({field: name, value: value})

    }

    const [label, setLabel] = useState("");
    const handleSelectChange = (e) => {
        if (!e) {
            setLabel("")
            setErrors({...errors, tipe: "tipe dokumen wajib diisi"})
            errors.tipe = "Tipe dokumen wajib diisi"
            onChange({field: "idDocType", value: ""})
        } else {
            setLabel(e.label)
            setErrors({...errors, tipe: ""})
            onChange({field: "idDocType", value: e.value})
        }
    }

    const fileType = ['application/pdf'];
    const handlePdfFileChange = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                setErrors({...errors, file: ""})
                onChange({field: "file", value: selectedFile})
            } else {
                // setViewPdf(null);
                setErrors({...errors, file: "File pdf tidak valid"})
            }
        }
    }

    const validateForm = (err) => {
        let valid = true
        Object.values(err).map(val => {
            val && (valid = false)
        })
        return valid
    }

    const reset = () => {
        resetForm()
        document.getElementsByClassName("custom-file-label")[0].innerText = "Choose file"
        setLabel("")
    }

    const submitForm = async () => {
        let valid = validateForm(errors)
        const {idDocType, file, keterangan} = dataItem.dataForm
        if (valid) {
            if ((idDocType && file) || keterangan) {
                setIsLoading(true)
                const response = await onSubmitFile(dataItem.dataForm)
                if (response.status === 200) {
                    setIsLoading(false)
                    await successToast(response)
                    //get data list file yang diupload
                    await getListFile(dataItem.dataForm.id);
                    //reset form di redux
                    reset()

                } else if (response.status === 500) {
                    setIsLoading(false)
                    await errorToast(response)
                }
            } else {
                await invalidFormSwal()
            }

        } else {
            await invalidFormSwal()
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
            className="modal-lg modal-dialog-centered"
            isOpen={dataItem.addFile}
            toggle={() => setToggle({initialState})}

        >
            <ModalHeader
                toggle={() => setToggle({initialState})}
                close={closeBtn}
            >
                Attachment File
            </ModalHeader>
            <Form
                // onReset={resetForm}
            >
                <div style={{overflowY: 'scroll', height: '463px'}}>
                    <ModalBody>
                        <Row className="pl-2 pr-2 pt-2 pb-2">
                            <Col className="col-lg-12 pt-4 pb-4 pl-4 pr-4"
                                 style={{borderRadius: '5px', backgroundColor: '#f8f9fa'}}>
                                <FormGroup>
                                    <Label for="idDocType">
                                        Tipe Dokumen
                                        <span className='error-msg'> *</span>
                                    </Label>
                                    <Select
                                        name="idDocType"
                                        id="idDocType"
                                        options={makeObject()}
                                        isClearable
                                        onChange={handleSelectChange}
                                        placeholder="Pilih tipe dokumen"
                                    />
                                    {errors.tipe && <div className='error-msg'>{errors.tipe}</div>}
                                </FormGroup>

                                <FormGroup>
                                    <Label for="file">Dokumen {label}
                                        <span className='error-msg'> *</span>
                                    </Label>
                                    <CustomInput className="file-employee"
                                                 type="file"
                                                 id="file"
                                                 name="file"
                                                 invalid={errors.file ? true : false}
                                                 disabled={!label ? true : false}
                                                 onChange={handlePdfFileChange}
                                    />

                                    {errors.file && <div className='error-msg'>{errors.file}</div>}
                                </FormGroup>

                                <FormGroup>
                                    <Label for="keterangan">
                                        Keterangan
                                    </Label>
                                    <Input
                                        type="text"
                                        name="keterangan"
                                        id="keterangan"
                                        placeholder="Keterangan"
                                        autoComplete="off"
                                        value={dataItem.dataForm.keterangan}
                                        onChange={handleChange}
                                        required
                                    />

                                </FormGroup>
                                <div className="text-right mt-5">
                                    <Button
                                        className="btn-pill btn-lg btn-shadow"
                                        type="button"
                                        disabled={isLoading}
                                        onClick={() => submitForm()}
                                        style={{
                                            background: "#C0D39A",
                                            border: "none",
                                            color: "currentcolor",
                                        }}
                                    >
                                        {isLoading ? <FontAwesomeIcon icon={['fas', 'spinner']}
                                                                      pulse
                                                                      fixedWidth
                                                                      size="1x"/>
                                            : <FontAwesomeIcon icon={faSave}/>
                                        }
                                        <span> Submit</span>
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <div>
                            <Button className="mb-4 mr-2 mt-4"
                                    style={{boxShadow: "0 16px 26px -10px rgba(63,106,216,0.56), 0 4px 25px 0px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(63,106,216,0.20)"}}
                                    type="button"
                                    color="primary">
                                Tabel Document
                            </Button>
                            <EmployeeFileTable/>
                        </div>


                    </ModalBody>
                </div>

                <ModalFooter>
                    <Button
                        className="btn-pill btn-lg btn-shadow mt-1"
                        type="button"
                        onClick={reset}
                        style={{
                            float: "left",
                            backgroundColor: "#ffffff",
                            border: "none",
                            color: "currentcolor",
                        }}
                    >
                        <FontAwesomeIcon icon={faUndo}/>
                        <span> Reset</span>
                    </Button>
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
    onChange: employeeActions.onChange,
    onSubmitFile: employeeActions.onSubmitFile,
    getListFile: employeeActions.getListFile,
    resetForm: employeeActions.resetForm
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeFile);