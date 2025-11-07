import React, { Component } from 'react';
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import axios from 'axios';

import {
    // Card, CardBody, CardTitle, Row, Container,
    Col, Button, Form, FormGroup,
    Label, Input, Modal, ModalHeader, ModalBody,
} from 'reactstrap';

import {
    faPlus, faMinus,
    // faSave, faUndo, faWrench
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Combobox } from 'react-widgets';
import { SERVICE } from "../../../../config/config";



class UpdateRecommend extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.handleAdd = this.handleAdd.bind(this);

    }

    initialState = {
        namaKandidat: '',
        valuePosisi: '',
        projek: [],
        data: [],
        keterangan: '',
        refresh: '',
    }

    options = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
    };

    componentDidMount = () => {
        // this.getListRumpun();
        // this.getListPosisi();
        // this.getListPosisiCandidate(this.props.idKandidat);
    }

    getListPosisi = () => {
        axios.get(SERVICE.JAVA_SERVICE + "/posisi", this.options)
            .then((response) => (response.data))
            .then((data) => {
                let posisiList = [];
                data.data.map(posisi => posisiList.push(posisi.posisi))
                this.setState({
                    dataList: posisiList,
                });
                // this.setState({
                //     posisiList: this.state.data.posisi.map(),
                // });
            });
    }

    getListPosisiCandidate = (id) => {
        axios.get(SERVICE.JAVA_SERVICE + "/recommend/getById/" + id)
            .then((response) => (response.data))
            .then((data) => {
                // let posisiListCd = new Array();
                // data.data.map(posisi => posisiListCd.push(posisi.posisi))
                this.setState({
                    dataCd: data.data,
                });
                // this.setState({
                //     posisiList: this.state.data.posisi.map(),
                // });
            });
    }


    handleAdd = (posisi, candidate, id) => {
        const rec = {
            candidate: candidate,
            posisi: posisi,
        };

        axios.post(SERVICE.JAVA_SERVICE + "/recommend/insert/" + id, rec)
            .then((response) => {
                // this.setState(this.initialState);
                this.getListPosisiCandidate(this.props.idKandidat);
                this.setState({
                    valuePosisi: ''
                });
            })

    }

    handleRemove = (id) => {
        axios.delete(SERVICE.JAVA_SERVICE + "/recommend/" + id)
            .then((response) => {
                // this.setState(this.initialState);
                // this.setState(this.props.toggle);
                this.getListPosisiCandidate(this.props.idKandidat);
                this.setState({
                    valuePosisi: ''
                });
                // alert("OK!")
            })

    }

    dataChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {

        return (
            <span>
                <Modal isOpen={this.props.isOpen}
                    toggle={this.props.toggle}
                    className={this.props.className}
                    backdrop={'static'}
                    onClosed={() => { this.setState(this.initialState); }}
                    onOpened={() => {
                        this.getListPosisi();
                        this.getListPosisiCandidate(this.props.idKandidat);
                    }}
                >
                    <ModalHeader toggle={this.props.toggle}>UPDATE RECOMMEND</ModalHeader>
                    <ModalBody>
                        <Form>
                            {
                                this.state.dataCd ?
                                    this.state.dataCd.map(
                                        (dataCd, index) => (
                                            <FormGroup row>
                                                <Label for="posisiList" sm={3} style={{ alignSelf: "center" }}>Recommended Position</Label>
                                                <Col md="6" style={{ alignSelf: "center" }}>
                                                    <Input disabled required type="text" name="posisiList" id="posisiList"
                                                        defaultValue={dataCd.posisi} />
                                                </Col>
                                                <Col md="1" style={{ alignSelf: "center" }}>
                                                    <FormGroup>
                                                        <Label></Label>
                                                        <br />
                                                        <Button className="btn-pill btn-sm  btn-shine"
                                                            style={{ background: "#F37970", border: "none" }}
                                                            onClick={() => this.handleRemove(dataCd.id)}
                                                        >
                                                            <FontAwesomeIcon icon={faMinus} />
                                                        </Button>
                                                    </FormGroup>
                                                </Col>
                                            </FormGroup>
                                        )
                                    )
                                    : ""
                            }
                            {/* </FormGroup> */}

                            <FormGroup row>
                                <Label for="posisi" sm={3} style={{ alignSelf: "center" }}>Add Position</Label>
                                <Col md="6" style={{ alignSelf: "center" }}>
                                    <Combobox
                                        data={this.state.dataList}
                                        value={this.state.valuePosisi}
                                        textField='name'
                                        caseSensitive={false}
                                        minLength={1}
                                        onChange={valuePosisi => {
                                            this.setState({ valuePosisi })
                                        }}
                                        filter='contains'
                                    />
                                </Col>
                                {/* } */}
                                {
                                    <Col md="1" style={{ alignSelf: "center" }}>
                                        <FormGroup>
                                            <Label />
                                            <Button className="btn-pill btn-sm  btn-shine"
                                                style={{ background: "#8c9eff", border: "none" }}
                                                onClick={() => { this.handleAdd(this.state.valuePosisi, this.props.namaKandidat, this.props.idKandidat) }}
                                            >
                                                <FontAwesomeIcon icon={faPlus} />
                                            </Button>
                                        </FormGroup>
                                    </Col>}
                            </FormGroup>
                            <FormGroup check row style={{ display: "flex", justifyContent: "space-around" }}>
                                {/* <Button
                                    size="lg"
                                    className="mb-3 mr-2 btn-pill btn-light"
                                    color=""
                                    onClick={() => { this.toggle(); this.setState(this.initialState); }}
                                >
                                    Cancel
                                </Button> */}
                                <Button size="lg"
                                    className="mb-3 mr-2 btn-pill btn-success"
                                    onClick={() => { this.setState(this.initialState); this.props.toggle(); }}>
                                    Submit</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </span >
        )
    }
}
export default UpdateRecommend;
