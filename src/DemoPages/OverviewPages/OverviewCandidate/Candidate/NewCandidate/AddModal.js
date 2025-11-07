import React, {useState} from "react";
import {
    Modal,
    ModalBody,
    ModalHeader,
    Form,
    Input,
    FormGroup,
    Label,
    ModalFooter,
    Button,
    InputGroup,
    InputGroupAddon,
} from "reactstrap";
import {faSave, faUndo, faPhone} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {connect} from "react-redux";
import {candidateActions} from "../../../../../redux/actions";
import propTypes from "prop-types";
import InputMask from "react-input-mask";

const MySwal = withReactContent(Swal);

const AddModal = ({
                      dataItem,
                      onAdd,
                      onChange,
                      onSubmit,
                      reset,
                      getDataTab,
                  }) => {
    const setToogle = (value) => {
        onAdd(value);
    };
    const initialState = {
        id: "",
        nama: "",
        email: "",
        noHp: "",
        idCandidate: "",
    };
    const [errors, setErrors] = useState({
        nama: "",
        email: "",
        noHp: "",
    });
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        let error = errors;
        switch (name) {
            case "nama":
                if (value.length < 1) {
                    error.nama = "Nama wajib diisi";
                }
                    // else if (value.length > 100) {
                    //     error.nama = 'Nama maksimal 50 karakter'
                    // } else if (value.length < 3) {
                    //     error.nama = 'Nama minimal 3 karakter'
                // }
                else {
                    error.nama = "";
                }
                break;
            case "email":
                if (value.length < 1) {
                    error.email = "Email wajib diiisi";
                } else if (
                    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                        value
                    )
                ) {
                    error.email = "Email tidak valid";
                } else {
                    error.email = "";
                }
                break;
            case "noHp":
                // if (!/^[0-9\b]+$/.test(value) && value.length > 0) {
                //   error.noHp = "No Hp wajib berupa angka";
                // }
                if (value.length < 1) {
                    error.noHp = "No Hp wajib diisi";
                } else if (value.length > 13 + 2) {
                    error.noHp = "No Hp maksimal 13 angka";
                } else if (value.length < 10) {
                    error.noHp = "No Hp minimal 10 angka";
                } else {
                    error.noHp = "";
                }
                break;
            default:
                break;
        }
        onChange({field: name, value: value});
        setErrors({...errors});
    };
    const resetForm = () => {
        reset(initialState);
    };
    const submitForm = async () => {
        const formValid = validateForm(errors);
        if (formValid) {
            if (!dataItem.nama || !dataItem.email || !dataItem.noHp) {
                await MySwal.fire({
                    icon: "error",
                    title: "Harap periksa kembali data anda!",
                    showConfirmButton: false,
                    timer: 3000,
                });
            } else {
                const {isError, id} = await onSubmit({dataItem});
                if (!isError) {
                    setToogle({inAdd: false});
                    onAdd({inTab: true, inEdit: true});
                    getDataTab(id);
                    resetForm();
                } else {
                    await MySwal.fire({
                        icon: "error",
                        title: "Data gagal disimpan!",
                        showConfirmButton: false,
                        timer: 3000,
                    });
                }
                resetForm();
            }
        } else {
            await MySwal.fire({
                icon: "error",
                title: "Harap periksa kembali data anda!",
                showConfirmButton: false,
                timer: 3000,
            });
        }
    };

    const validateForm = (error) => {
        let valid = true;
        Object.values(error).forEach((val) => val.length > 0 && (valid = false));
        return valid;
    };
    const closeBtn = (
        <button className="close" onClick={() => setToogle({inAdd: false})}>
            &times;
        </button>
    );
    const numberOnly = (evt) => {
        evt = evt ? evt : window.event;
        var charCode = evt.which ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
            evt.preventDefault();
        } else {
            return true;
        }
    };
    return (
        <>
            <Modal
                isOpen={dataItem.inAdd}
                toggle={() => setToogle({inAdd: false})}
            >
                <ModalHeader
                    toggle={() => setToogle({inAdd: false})}
                    close={closeBtn}
                >
                    Candidate Form
                </ModalHeader>
                <Form onReset={resetForm}>
                    <ModalBody>
                        <Input
                            name="id"
                            id="id"
                            value={dataItem.id}
                            onChange={handleInputChange}
                            hidden
                        />
                        <FormGroup>
                            <Label for="nama">
                                Nama
                                <span style={{color: "red"}}> *</span>
                            </Label>
                            <Input
                                type="text"
                                name="nama"
                                id="nama"
                                placeholder="Enter Name"
                                autoComplete="off"
                                value={dataItem.nama}
                                onChange={handleInputChange}
                                invalid={errors.nama.length > 0 ? true : ""}
                                required
                            />
                            {errors.nama.length > 0 && (
                                <span className="error">{errors.nama}</span>
                            )}
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">
                                Email
                                <span style={{color: "red"}}> *</span>
                            </Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter Email"
                                autoComplete="off"
                                value={dataItem.email}
                                onChange={handleInputChange}
                                invalid={errors.email.length > 0 ? true : ""}
                                required
                            />
                            {errors.email.length > 0 && (
                                <span className="error">{errors.email}</span>
                            )}
                        </FormGroup>
                        <FormGroup>
                            <Label for="noHp">
                                No Hp
                                <span style={{color: "red"}}> *</span>
                            </Label>
                            <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <div className="input-group-text">
                                        <FontAwesomeIcon icon={faPhone}/>
                                    </div>
                                </InputGroupAddon>
                                <InputMask
                                    className="form-control"
                                    mask="+62999999999999"
                                    maskChar={null}
                                    type="noHp"
                                    name="noHp"
                                    id="noHp"
                                    placeholder="Enter No Hp"
                                    autoComplete="off"
                                    value={dataItem.noHp || ""}
                                    onChange={handleInputChange}
                                    onKeyPress={($event) => numberOnly($event)}
                                    invalid={errors.noHp.length > 0 ? true : ""}
                                    required
                                />
                            </InputGroup>
                            {errors.noHp.length > 0 && (
                                <span className="error">{errors.noHp}</span>
                            )}
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className="btn-pill btn-lg btn-shadow mt-1"
                            type="button"
                            onClick={() => resetForm()}
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
                        <Button
                            className="btn-pill btn-lg btn-shadow mt-1"
                            type="button"
                            onClick={() => submitForm()}
                            style={{
                                background: "#C0D39A",
                                border: "none",
                                color: "currentcolor",
                            }}
                        >
                            <FontAwesomeIcon icon={faSave}/>
                            <span> Submit</span>
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </>
    );
};
const mapStateToProps = (state) => ({
    ...state.candidateReducer,
});
const mapDisppatchToProps = {
    onSubmit: candidateActions.onSubmit,
    onChange: candidateActions.onChange,
    onAdd: candidateActions.onAdd,
    reset: candidateActions.resetForm,
    getDataTab: candidateActions.getDataTab,
};
AddModal.propTypes = {
    onSubmit: propTypes.func,
    onChange: propTypes.func,
};
export default connect(mapStateToProps, mapDisppatchToProps)(AddModal);
