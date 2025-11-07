import React, { Component } from 'react';
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import axios from 'axios';
import { SERVICE } from "../../../../config/config";

import {
    // Card, CardBody, CardTitle, Container,
    Row, Col, Input, Modal, ModalHeader, ModalBody,
    Button, Form, FormGroup, Label,
} from 'reactstrap';

import { SelectList } from 'react-widgets'

import { Combobox } from 'react-widgets';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCheckDouble, faWrench } from '@fortawesome/free-solid-svg-icons';

class FinalTab extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        namaKandidat: '',
        valueAvail: '',
        kode: [],
        valueKode: '',
        data: [],
        tgl: '',
        keterangan: '',
        refresh: '',
        client: '',
        pic: '',
        kebutuhan: '',
    }

    options = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
    };

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

    submitFinal = (event, id) => {
        event.preventDefault();
        const final = {
            namaCandidate: event.target.namaKandidat.value,
            kode: this.state.valueKode,
            tglKeputusan: this.state.tgl,
            keteranganPltHist: this.state.keterangan
        };

        if (this.state.valueAvail === 'Hired') {
            axios.put(SERVICE.JAVA_SERVICE + "/detailkeb/hired/" + this.state.valueKode)
                .then(response => {
                    // this.findAllClient();
                    // this.handleClick();
                });

            axios.post(SERVICE.JAVA_SERVICE + "/plottinghist/insert/" + id, final)
                .then(response => {
                    // this.findAllClient();
                    // this.handleClick();
                });
        }

        const cand = {
            idCandidate: id,
            cndAvail: this.state.valueAvail,
            createdBy: sessionStorage.getItem('role'),
            tanggalProses: this.state.tgl,
            keterangan: this.state.keterangan
        }
        axios.put(SERVICE.JAVA_SERVICE + "/candidate/availability/" + id , cand)
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
        let availability = ['Not Available', 'Hired']
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
                    <ModalHeader toggle={this.props.toggle}>FINAL</ModalHeader>
                    <ModalBody>
                        <Row form>
                            <Col md="12">
                                <Form onSubmit={(event) => { this.submitFinal(event, this.props.idKandidat); }}>
                                    <FormGroup row>
                                        <Label for="namaKandidat" sm={2}>Nama Kandidat</Label>
                                        <Col sm={10}>
                                            <Input disabled required type="text" name="namaKandidat" id="namaKandidat"
                                                defaultValue={this.props.namaKandidat} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="avail" sm={2}>  </Label>
                                        <Col sm={10}>
                                            <SelectList
                                                data={availability}
                                                value={this.state.valueAvail}
                                                onChange={valueAvail => {
                                                    this.setState({ valueAvail })
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    {
                                        this.state.valueAvail === 'Hired' ?
                                            <FormGroup row>
                                                <Label for="kode" sm={2}>Kode</Label>
                                                <Col sm={10}>
                                                    <Combobox
                                                        data={this.state.kode}
                                                        value={this.state.valueKode}
                                                        textField='kode'
                                                        caseSensitive={false}
                                                        minLength={1}
                                                        onChange={valueKode => {
                                                            this.setState({ valueKode })
                                                            this.findDetKebutuhanByKode(valueKode)
                                                        }}
                                                        filter='contains'
                                                    />
                                                </Col>
                                            </FormGroup>

                                            :
                                            null

                                    }
                                    {
                                        this.state.valueAvail === 'Hired' ?
                                            <FormGroup row>
                                                <Label for="client" sm={2}>Client</Label>
                                                <Col sm={10}>
                                                    <Input disabled required type="text" name="client" id="client"
                                                        value={this.state.client} />
                                                </Col>
                                            </FormGroup>
                                            :
                                            null
                                    }
                                    {
                                        this.state.valueAvail === 'Hired' ?
                                            <FormGroup row>
                                                <Label for="pic" sm={2}>PIC</Label>
                                                <Col sm={10}>
                                                    <Input disabled required type="text" name="pic" id="pic"
                                                        value={this.state.pic} />
                                                </Col>
                                            </FormGroup>
                                            :
                                            null
                                    }
                                    {
                                        this.state.valueAvail === 'Hired' ?
                                            <FormGroup row>
                                                <Label for="kebutuhan" sm={2}>Kebutuhan</Label>
                                                <Col sm={10}>
                                                    <Input disabled required type="text" name="kebutuhan" id="kebutuhan"
                                                        value={this.state.kebutuhan} />
                                                </Col>
                                            </FormGroup>
                                            :
                                            null
                                    }
                                    <FormGroup row>
                                        <Label for="tgl" sm={2}>Tanggal</Label>
                                        <Col sm={10}>
                                            <Input required autoComplete="off" type="date" name="tgl" id="tgl"
                                                value={this.state.tgl} onChange={this.formChange} />
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
                                        <Button size="lg" type="submit" className="mb-3 mr-2 btn-pill btn-success">Simpan</Button>
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
export default FinalTab;
