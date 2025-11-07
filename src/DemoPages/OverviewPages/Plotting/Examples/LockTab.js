import React, { Component } from 'react';
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import axios from 'axios';
import { SERVICE } from "../../../../config/config";

import {
    // Card, CardBody, CardTitle, Container,
    Row, Col, Input, Modal, ModalHeader, ModalBody,
    Button, Form, FormGroup, Label,
} from 'reactstrap';
import { Combobox } from 'react-widgets';


class LockTab extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        kode: [],
        client: '',
        pic: '',
        kebutuhan: '',
        namaKandidat: '',
        tglMulai: '',
        tglSelesai: '',
        refresh: '',
        kodeDetkeb: '',
        keterangan: ''
    }

    findAllKodeDetKebutuhan = (cndid) => {
        axios.get(SERVICE.JAVA_SERVICE + "/detailkeb/getAllKeb/" + cndid)
            .then(response => {
                let kode = [];
                response.data.data.map(dkb => kode.push(dkb.kode))
                this.setState({ kode: kode });
            })
    }

    findDetKebutuhanByKode = (kode) => {
        axios.get(SERVICE.JAVA_SERVICE + "/detailkeb/bykode/" + kode)
            .then(response => response.data.data)
            .then((data) => {
                if (data == null) {
                    this.setState({ client: '', pic: '', kebutuhan: '' })
                }
                else {
                    this.setState({
                        client: data.client,
                        pic: data.picName,
                        kebutuhan: data.posisi,
                    });
                }
            });
    }

    submitLock = () => {
        const lock = {
            candidateId: this.props.idKandidat,
            tglMulai: this.state.tglMulai,
            tglSelesai: this.state.tglSelesai,
            kodeDetkeb: this.state.kodeDetkeb,
            keterangan: this.state.keterangan
        };

        axios.post(SERVICE.JAVA_SERVICE + "/lock-user", lock)
            .then(response => {
                this.props.toggle();
            });
        this.setState(this.initialState);
    }

    formChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
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
                    onOpened={() => {
                        this.findAllKodeDetKebutuhan(this.props.idKandidat);
                    }}
                >
                    <ModalHeader toggle={this.props.toggle}>LOCK</ModalHeader>
                    <ModalBody>
                        <Row form>
                            <Col md="12">
                                <Form>
                                    <FormGroup row>
                                        <Label for="namaKandidat" sm={2}>Nama Kandidat</Label>
                                        <Col sm={10}>
                                            <Input disabled required type="text" name="namaKandidat" id="namaKandidat"
                                                defaultValue={this.props.namaKandidat} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="kode" sm={2}>Kode Kebutuhan</Label>
                                        <Col sm={10}>
                                            <Combobox
                                                data={this.state.kode}
                                                value={this.state.kodeDetkeb}
                                                textField='kode'
                                                caseSensitive={false}
                                                minLength={1}
                                                onChange={kodeDetkeb => {
                                                    this.setState({ kodeDetkeb })
                                                    this.findDetKebutuhanByKode(kodeDetkeb)
                                                }}
                                                filter='contains'
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="client" sm={2}>Client</Label>
                                        <Col sm={10}>
                                            <Input disabled required type="text" name="client" id="client"
                                                value={this.state.client} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="pic" sm={2}>PIC</Label>
                                        <Col sm={10}>
                                            <Input disabled required type="text" name="pic" id="pic"
                                                value={this.state.pic} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="kebutuhan" sm={2}>Kebutuhan</Label>
                                        <Col sm={10}>
                                            <Input disabled required type="text" name="kebutuhan" id="kebutuhan"
                                                value={this.state.kebutuhan} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="tgl" sm={2}>Lock Start</Label>
                                        <Col sm={10}>
                                            <Input required autoComplete="off" type="date" name="tglMulai" id="tglMulai"
                                                value={this.state.tglMulai} onChange={this.formChange} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="tgl" sm={2}>Lock End</Label>
                                        <Col sm={10}>
                                            <Input required autoComplete="off" type="date" name="tglSelesai" id="tglSelesai"
                                                value={this.state.tglSelesai} onChange={this.formChange} />
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
                                            onClick={() => { this.props.toggle(); this.setState(this.initialState); }}
                                        >
                                            Batal</Button>
                                        <Button size="lg" onClick={() => { this.submitLock() }} className="mb-3 mr-2 btn-pill btn-success">Simpan</Button>
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
export default LockTab;
