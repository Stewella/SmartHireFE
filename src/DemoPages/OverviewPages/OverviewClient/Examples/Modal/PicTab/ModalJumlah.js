import React, { Component } from 'react';
import axios from 'axios';
import { SERVICE } from "../../../../../../config/config";

import {
    Row, Col, Input, Modal, ModalHeader, ModalBody,
    Button, Form, FormGroup, Label,
} from 'reactstrap';

class ModalJumlah extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        idDetKeb: '',
        status: '',
        jumlahPerubahan: '',
        current: '',
        before: '',
        tanggalProses: '',
        keterangan: ''
    }

    submitJumlah = async () => {
        let detkebhist
        if (this.props.status === 'drop') {
            detkebhist = {
                idDetKeb: this.props.dataKebutuhan.id,
                status: this.props.status,
                jumlahPerubahan: Number(this.state.jumlahPerubahan),
                current: Number(this.props.dataKebutuhan.jumlah) - Number(this.state.jumlahPerubahan),
                before: Number(this.props.dataKebutuhan.jumlah),
                tanggalProses: this.state.tanggalProses,
                keterangan: this.state.keterangan,
            };
        } else {
            detkebhist = {
                idDetKeb: this.props.dataKebutuhan.id,
                status: this.props.status,
                jumlahPerubahan: Number(this.state.jumlahPerubahan),
                current: Number(this.props.dataKebutuhan.jumlah) + Number(this.state.jumlahPerubahan),
                before: Number(this.props.dataKebutuhan.jumlah),
                tanggalProses: this.state.tanggalProses,
                keterangan: this.state.keterangan,
            };
        }
        await axios.post(SERVICE.JAVA_SERVICE + "/detailkebhist/insert", detkebhist)
            .then((response) => {
                this.setState(this.initialState);
            })
        this.setState(this.initialState);
        this.props.toggle();
    }

    formChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    capitalizeFirstLetter(string) {
        return ((string || "").charAt(0) || "").toUpperCase() + (string || "").slice(1);
    }

    render() {
        return (
            <span>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={this.props.toggle}
                    className={this.props.className}
                    backdrop={'static'}
                    onClosed={() => { this.setState(this.initialState); }}
                >
                    <ModalHeader toggle={this.props.toggle}>{this.capitalizeFirstLetter(this.props.status)}</ModalHeader>
                    <ModalBody>
                        <Row form>
                            <Col md="12">
                                <Form>
                                    <FormGroup row>
                                        <Label for="kodeKebutuhan" sm={2}>Kode Kebutuhan</Label>
                                        <Col sm={10}>
                                            <Input disabled required type="text" name="kodeKebutuhan" id="kodeKandidat"
                                            // defaultValue={this.props.dataKebutuhan.kode}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="jumlahPerubahan" sm={2}>Jumlah</Label>
                                        <Col sm={10}>
                                            <Input type="text" pattern="[0-9]*" name="jumlahPerubahan" id="jumlahPerubahan" value={this.state.jumlahPerubahan}
                                                onChange={this.formChange} placeholder="Jumlah" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="tgl" sm={2}>Tanggal Proses</Label>
                                        <Col sm={10}>
                                            <Input required autoComplete="off" type="date" name="tanggalProses" id="tanggalProses"
                                                value={this.state.tanggalProses} onChange={this.formChange} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="keterangan" sm={2}>Keterangan</Label>
                                        <Col sm={10}>
                                            <Input type="textarea" name="keterangan" id="keterangan" value={this.state.keterangan}
                                                onChange={this.formChange} placeholder="Keterangan" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup check row style={{ display: "flex", justifyContent: "space-around" }}>
                                        <Button
                                            size="lg"
                                            className="mb-3 mr-2 btn-pill btn-light"
                                            color=""
                                            onClick={() => {
                                                this.props.toggle();
                                                this.setState(this.initialState);
                                            }}
                                        >
                                            Batal</Button>
                                        <Button size="lg" className="mb-3 mr-2 btn-pill btn-success" onClick={() => { this.submitJumlah(); }}>Simpan</Button>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
            </span >
        )
    }
}
export default ModalJumlah;
