import React, { Component } from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, Button
} from 'reactstrap';
// import { Combobox } from 'react-widgets';
import axios from 'axios';
import Swal from 'sweetalert2';
import { SERVICE } from '../../../../../config/config'

export default class CardsEditIndustry extends Component {
    constructor(props) {
        super(props)
        this.state = this.initialState;

    }
    initialState = {
        id: this.props.data.id,
        industry: this.props.data.nama,
    }
    options = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
    };

    submitData = event => {
        event.preventDefault();

        const dataIndustry = {
            id: this.props.data.id,
            nama: this.state.industry,
        };

        axios.post(SERVICE.JAVA_SERVICE + "/industry", dataIndustry, this.options)
            .then((response) => {
                // if(response.data.status === 200) {
                //     this.setState(this.props.toggle);
                //     alert("Sukses!")
                // } else {
                //     alert(response.data.message);
                // }
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
                this.setState(this.props.toggle);
            })
    }

    dataChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {

        const closeBtn = <button className="close" onClick={this.props.toggle}>&times;</button>;
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle} close={closeBtn} style={{ backgroundColor: "#7390a5", color: "black" }}>
                    {/* <FontAwesomeIcon icon={faTshirt} /> */}
                    <span>  Edit Industry </span>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.submitData} id="formIndustry">
                        <FormGroup>
                            <Label for="industry"><b>Industry</b></Label>
                            <Input type="text" name="industry" id="industry"
                                placeholder="Industry"
                                defaultValue={this.props.data.nama} required
                                onChange={this.dataChange} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.submitData} type="submit" className="mt-1" style={{ backgroundColor: "#506a7c" }}>Submit</Button>
                </ModalFooter>
            </Modal>
        )
    }

}
