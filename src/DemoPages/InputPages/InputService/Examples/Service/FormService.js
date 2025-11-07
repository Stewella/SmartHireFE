import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios'
import Swal from 'sweetalert2';
import {SERVICE} from "../../../../../config/config";

export default class CardFormService extends Component{
    constructor(props) {
        super(props)
        this.state = this.initialState;
    }

    initialState = {
        service: '',
        shortService : '',

    }

    options = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : 'http://localhost:3000'
        }
    };

    submitData = event => {
        event.preventDefault();

        const dataService = {
            service: this.state.service,
            shortService : this.state.shortService,
        };

        axios.post(SERVICE.JAVA_SERVICE + "/service", dataService, this.options)
        .then((response) => {
            this.setState(() => {
                return {
                    service : '',
                    shortService : ''
                }
            })
            // this.state.service = '';
            // this.state.shortService = '';
            if (response.data !== null) {
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
            [event.target.name]:event.target.value
        })
    }

    render() {
        const closeBtn = <button className="close" onClick={this.props.toggle}>&times;</button>;
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle} close={closeBtn} style={{ backgroundColor: "#C0D39A" }}>
                    {/* <FontAwesomeIcon icon={faTshirt} /> */}
                    <span>  Add Service </span>
                </ModalHeader>
                <ModalBody>
                <Form onSubmit={this.submitData} id="formService">
                    <FormGroup>
                        <Label for="service"><b>Service Name</b></Label>
                        <Input type="text" name="service" id="service"
                            placeholder="service name"
                            value={this.state.service} required
                            onChange={this.dataChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="shortService"><b>Service ShortName</b></Label>
                        <Input type="text" name="shortService" id="shortService"
                            placeholder="service shortname"
                            value={this.state.shortService} required
                            onChange={this.dataChange}/>
                    </FormGroup>

                </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.submitData} type="submit" color="success"  className="mt-1">Submit</Button>
                </ModalFooter>
            </Modal>
        )
    }

}
