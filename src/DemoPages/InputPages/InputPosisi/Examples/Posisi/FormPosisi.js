import React, { Component } from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, Button
} from 'reactstrap';
// import { Combobox } from 'react-widgets';
import axios from 'axios';
import Swal from 'sweetalert2';
import { SERVICE } from "../../../../../config/config";

export default class CardsFormPosisi extends Component {
    constructor(props) {
        super(props)
        this.state = this.initialState;
    }
    initialState = {
        posisi: '',
        // cluster:'', rumpunList: [], nilai: []
    }
    options = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
    };
    // getListRumpun(){
    //     axios.get(SERVICE.JAVA_SERVICE + "/cluster", this.options)
    //         .then((response) => (response.data))
    //         .then((data) => {
    //             this.setState({
    //                 nilai: data.data,
    //             });
    //             var a = []
    //             for (var i = 0; i < this.state.nilai.length; i++) {
    //                 a.push(this.state.nilai[i].nameCluster)
    //             }
    //             this.setState({
    //                 rumpunList: a
    //             })
    //         });
    // }

    // componentDidMount(){
    //     this.getListRumpun();
    // }

    submitData = event => {
        event.preventDefault();

        const dataPosisi = {
            posisi: this.state.posisi,
        };

        axios.post(SERVICE.JAVA_SERVICE + "/posisi", dataPosisi, this.options)
            .then(response => {
                this.setState(() => {
                    return {
                        posisi : ''
                    }
                })
                // this.state.posisi = '';
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
            [event.target.name]: event.target.value
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
                    <span>  Add Position </span>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.submitData} id="formPosisi">
                        <FormGroup>
                            <Label for="posisi"><b>Posisi</b></Label>
                            <Input type="text" name="posisi" id="posisi"
                                placeholder="Position"
                                value={this.state.posisi} required
                                onChange={this.dataChange} />
                        </FormGroup>
                        {/* <FormGroup>
                        <Label for="cluster"><b>Rumpun</b></Label>
                        <Input type="text" name="cluster" id="cluster"
                            placeholder="Rumpun"/>
                        <Combobox
                            data={this.state.rumpunList}
                            name="cluster"
                            allowCreate="onFilter"
                            caseSensitive={false}
                            filter="contains"
                            textField="name"
                            placeholder="Cluster"
                            value={this.state.cluster}
                            onChange={cluster => this.setState({cluster})}
                        />
                    </FormGroup> */}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.submitData} type="submit" color="success" className="mt-1">Submit</Button>
                </ModalFooter>
            </Modal>
        )
    }

}
