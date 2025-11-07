import React from "react";
import {Form} from "react-bootstrap";
import {Col, Button} from "reactstrap";
import {userActions} from "../../../../../redux/actions";
import {connect} from "react-redux";
import {errorToast, invalidFormSwal, successToast} from "../../../../../keep/Toast/Toast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";

class ContentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : this.props.data,
            error : this.props.error
        };
    }

    submitModal = async (event) => {
        event.preventDefault();
        const valid = this.validateForm(this.state.error)
        if (valid) {
            //send data
            const response = await this.props.sendData(this.state.data)
            if (response.status === 200) {
                await successToast(response)
                //re-get data on table
                await this.props.getUser()
                //close modal
                this.props.toggle()
            } else if (response.status === 500) {
                await errorToast(response)
            }
        } else {
            await invalidFormSwal()
        }
    };

    valueChange = (event) => {
        const {name, value} = event.target
        let errMassage = name + " wajib diisi"
        let emailValidation = !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
        switch (name) {
            case "nama" :
                value.length < 1 ? this.setState(prevState => ({error: {...prevState.error, namaerr: errMassage}}))
                                 : this.setState(prevState => ({error: {...prevState.error, namaerr: ""}}))
                break
            case "email" :
                if (value.length < 1) {this.setState(prevState => ({error: {...prevState.error, emailerr: errMassage}}))}
                else if (emailValidation) {this.setState(prevState => ({error: {...prevState.error, emailerr: name + " tidak valid"}}))}
                else {this.setState(prevState => ({error: {...prevState.error, emailerr: ""}}))}
                break
            case "type" :
                value.length < 1 ? this.setState(prevState => ({error: {...prevState.error, typeerr: errMassage}}))
                                 : this.setState(prevState => ({error: {...prevState.error, typeerr: ""}}))
                break
            default :
                break
        }
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                [name]: value
            }
        }));
    }

    validateForm = (error) => {
        let valid = true;
        Object.values(error).forEach((val) => val.length > 0 && (valid = false));
        return valid;
    };

    render() {
        let {nama, email, type} = this.state.data;
        let {namaerr, emailerr, typeerr} = this.state.error
        return (
            <Form
                onSubmit={this.submitModal}
            >
                <Form.Group as={Col} controlId="nama">
                    <Form.Label>User</Form.Label>
                    <span className="text-danger"> *</span>
                    <Form.Control
                        required
                        autoComplete="off"
                        type="text"
                        value={nama}
                        onChange={this.valueChange}
                        name="nama"
                        placeholder="Masukkan nama user"
                        isInvalid={namaerr.length > 0 ? true : ""}
                    />
                    {namaerr.length > 0 &&
                     <span className="text-danger">{namaerr}</span>
                    }
                </Form.Group>

                <Form.Group as={Col} controlId="email">
                    <Form.Label>Email</Form.Label>
                    <span className="text-danger"> *</span>
                    <Form.Control
                        required
                        autoComplete="off"
                        type="text"
                        value={email}
                        onChange={this.valueChange}
                        name="email"
                        placeholder="Masukkan email user"
                        isInvalid={emailerr.length > 0 ? true : ""}
                    />
                    {emailerr.length > 0 &&
                     <span className="text-danger">{emailerr}</span>
                    }
                </Form.Group>

                <Form.Group as={Col} controlId="type">
                    <Form.Label>Type</Form.Label>
                    <span className="text-danger"> *</span>
                    <Form.Control
                        required
                        autoComplete="off"
                        type="text"
                        value={type}
                        onChange={this.valueChange}
                        name="type"
                        placeholder="Masukkan type user"
                        isInvalid={typeerr.length > 0 ? true : ""}

                    />
                    {typeerr.length > 0 &&
                     <span className="text-danger">{typeerr}</span>
                    }
                </Form.Group>

                <Button
                    className="btn-pill btn-lg btn-shadow float-right mt-3 mr-2"
                    type="submit"
                    style={{
                        background: "#C0D39A",
                        border: "none",
                        color: "currentcolor",
                    }}
                >
                    <FontAwesomeIcon icon={faSave}/>
                    <span> Submit</span>
                </Button>
            </Form>
        );
    }
}

const mapStateToProps = state => ({
    ...state.userReducer
})

const mapDispatchToProps = {
    sendData: userActions.sendData,
    getUser: userActions.getData
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentForm);
