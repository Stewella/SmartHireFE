import React, { Component } from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, Button
} from 'reactstrap';
// import { Combobox } from 'react-widgets';
import axios from 'axios';
import Swal from 'sweetalert2';
import { SERVICE } from '../../../../../config/config'

export default class CardsEditSales extends Component {
    constructor(props) {
        super(props)
        this.state = this.initialState;

    }
    initialState = {
        id: '',
        nama: '',
        noHp: '',
        email: ''
    }
    options = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
    };
    componentDidUpdate(prevProps, prevState){
        if(prevProps.isOpen !== this.props.isOpen){
            this.setState({
            id: this.props.data.id,
            nama: this.props.data.nama,
            noHp: this.props.data.noHp,
            email: this.props.data.email
            })
        }
        
    }
    submitData = event => {
        event.preventDefault();

        const dataSales = {
            id: this.props.data.id,
            nama: this.state.nama,
            noHp: this.props.data.noHp,
            email: this.props.data.email
        };

        axios.post(SERVICE.JAVA_SERVICE + "/sales", dataSales, this.options)
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
        // const {data} = this.props
        const closeBtn = <button className="close" onClick={this.props.toggle}>&times;</button>;
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle} close={closeBtn} style={{ backgroundColor: "#7390a5", color: "black" }}>
                    {/* <FontAwesomeIcon icon={faTshirt} /> */}
                    <span>  Edit Sales </span>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.submitData} id="formSales">
                    <FormGroup>
                            <Label for="nama"><b>Name</b></Label>
                            <Input type="text" name="nama" id="nama"
                                placeholder="Nama"
                                value={this.state.nama} required
                                onChange={this.dataChange} />
                            </FormGroup>
                            <FormGroup>
                            <Label for="noHp"><b>Nomor Hp</b></Label>
                            <Input type="number" name="noHp" id="noHp"
                                placeholder="Nomer Hp" 
                                value={this.state.noHp} required
                                onChange={this.dataChange} maxLength='13' minLength='10' />
                            </FormGroup>
                            <FormGroup>
                            <Label for="name"><b>Email</b></Label>
                            <Input type="text" name="email" id="email"
                                placeholder="Email"
                                value={this.state.email} required
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
