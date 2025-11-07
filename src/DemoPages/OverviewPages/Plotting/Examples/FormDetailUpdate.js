import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Label, Input, Col, Row
} from 'reactstrap';
import axios from 'axios';
import { SelectList } from 'react-widgets';
import Swal from 'sweetalert2';
import {SERVICE} from "../../../../config/config";

class FormDetailUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.toggle = this.toggle.bind(this);
  }

  initialState = {
    modal: false,
    valueResult: '',
    keterangan: '',
    tanggal: '',
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  formChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick = () => {
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
      title: 'Data berhasil disimpan!'
    })
  }

  submitDetailUpdate = (event, pltdet, candidate) => {
    event.preventDefault();

    let { valueResult, keterangan, tanggal } = this.state;

    const updateDetail = {
      result: valueResult === '' ? null : valueResult,
      keterangan: keterangan,
      tanggal: this.props.tanggal ? event.target.tanggal.value : tanggal,
    };

    axios.put(SERVICE.JAVA_SERVICE + "/plotting-detail/" + pltdet, updateDetail)
      .then(response => {
        this.handleClick();
        this.props.refreshTable(candidate);
      });
    this.setState(this.initialState);
  }

  render() {
    let result = ['YES', 'NO', 'SKIP']
    let { valueResult, keterangan, tanggal } = this.state;
    return (
      <span>
        <Button size="sm" className="btn-pill btn-shadow btn-outline-2x" outline color="info" onClick={() => { this.toggle(); }}>
          Detail Update
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={'static'} onClosed={() => { this.setState({ modal: false }); this.setState(this.initialState); }}>
          <ModalHeader toggle={this.toggle}>UPDATE PLOTTING</ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                <Form onSubmit={(event) => this.submitDetailUpdate(event, this.props.idPltDet, this.props.idKandidat)}>
                  <FormGroup row>
                    <Label for="tanggal" sm={2}>Tanggal</Label>
                    <Col sm={10}>
                      {this.props.tanggal ?
                      <Input disabled type="date" name="tanggal" id="tanggal" defaultValue={this.props.tanggal}
                        onChange={this.formChange} /> :
                      <Input required autoComplete="off" type="date" name="tanggal" id="tanggal"
                        value={tanggal} onChange={this.formChange} />
                      }
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="namaKandidat" sm={2}></Label>
                    <Col sm={10}>
                      <SelectList
                        data={result}
                        value={valueResult}
                        onChange={valueResult => this.setState({ valueResult })}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="keterangan" sm={2}>Keterangan</Label>
                    <Col sm={10}>
                      <Input type="textarea" name="keterangan" id="keterangan" value={keterangan}
                        onChange={this.formChange} placeholder="Keterangan" />
                    </Col>
                  </FormGroup>
                  <FormGroup check row style={{ display: "flex", justifyContent: "space-around" }}>
                    <Button
                      className="mb-2 mr-2 btn-pill btn-gradient-light"
                      color=""
                      size="lg"
                      onClick={() => { this.toggle(); this.setState(this.initialState); }}
                    >
                      Batal
                    </Button>
                    <Button type="submit" className="mb-2 mr-2 btn-pill btn-gradient-info" size="lg">Simpan</Button>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </span>
    );
  }
}

export default FormDetailUpdate;
