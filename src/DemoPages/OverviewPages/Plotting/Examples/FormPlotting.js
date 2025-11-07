import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Label, Input, Col, Row
} from 'reactstrap';
import axios from 'axios';
import { Combobox } from 'react-widgets';
import Swal from 'sweetalert2';
import KebutuhanHistoryTable from './KebutuhanHistTable';
import { SERVICE } from "../../../../config/config";

class FormPlotting extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    // this.findEmailByClientNickname('sdfsdf');
  }

  initialState = {
    namaKandidat: '',
    kode: [],
    valueKode: '',
    client: '',
    pic: '',
    kebutuhan: '',
    tgl: '',
    keterangan: '',
    data: [],
    email: '',
    kodeDetkeb: ''
  }



  findAllKodeDetKebutuhan = () => {
    axios.get(SERVICE.JAVA_SERVICE + "/detailkeb/getAllKebAvail")
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
        this.findEmailByClientNickname(data.client);
        // this.setState({email:this.findEmailByClientNickname(data.client)})
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


  findAllKebutuhanHistory = async (candidate) => {
    await axios.get(SERVICE.JAVA_SERVICE + "/detailkeb/bycnd/" + candidate)
      .then(response => response.data.data)
      .then((data) => {
        this.setState({ data: data });
      });
  }

  formChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  findEmailByClientNickname = (nickname) => {
    axios.get(SERVICE.JAVA_SERVICE + '/client/nama/' + nickname)
      .then(response => {
        this.setState({ email: response.data.data })
      })
  }

  findLockData = (id) => {
    axios.get(SERVICE.JAVA_SERVICE + "/lock-user/getBy/" + id)
      .then(response => {
        if(this.props.lockStatus === 'YES'){
          this.setState({ kodeDetkeb: response.data.data.kodeDetkeb });
        }
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

  submitPlotting = (event, candidate) => {
    event.preventDefault();

    let { valueKode, tgl, keterangan } = this.state;

    const plotting = {
      namaKandidat: event.target.namaKandidat.value,
      kode: valueKode,
      tgl: tgl,
      keterangan: keterangan
    };

    axios.post(SERVICE.JAVA_SERVICE + "/plotting", plotting)
      .then(response => {
        this.findAllKodeDetKebutuhan();
        this.findAllKebutuhanHistory(candidate);
        // this.sendEmail();
        this.sendEmail(this.state.email)
        // this.findEmailByClientNickname(this.state.email);
        this.handleClick();
        this.setState(this.initialState);

        setTimeout(() => this.props.toggle(), 3000);
      });
  }

  sendEmail = (email) => {
    const sendEmail = {
      emailName: email,
      callback: null,
      receiver: null,
      subject: "subject",
      body: "body",
      multiPartFile: null,
      response: null


    }
    axios.post(SERVICE.JAVA_SERVICE + "/sendEmail", sendEmail)
      .then((response) => {})
  }

  render() {
    let { kode, valueKode, tgl, keterangan } = this.state;
    return (
      <span>
        <Modal size="lg" isOpen={this.props.isOpen}
          toggle={this.props.toggle}
          className={this.props.className}
          backdrop={'static'}
          onClosed={() => { this.setState(this.initialState); }}
          onOpened={() => {
            this.findAllKebutuhanHistory(this.props.idKandidat);
            this.findAllKodeDetKebutuhan();
            this.findLockData(this.props.lockId);
          }}
        >
          <ModalHeader toggle={this.props.toggle}>PLOTTING</ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                <Form onSubmit={(event) => this.submitPlotting(event, this.props.idKandidat)}>
                  {this.props.lockStatus === 'YES' ?
                    <FormGroup row>
                      <Col sm={12}>
                        <div className="text-center">
                          <Button disabled className="mb-2 mr-2 " color="danger" >
                            Kandidat ini sedang di-lock di
                          <span className="badge badge-light">{this.state.kodeDetkeb}</span>
                          Pilih menu Edit Lock untuk membuka lock
                        </Button>
                        </div>
                      </Col>
                    </FormGroup>
                    :
                    <></>
                  }
                  <FormGroup row>
                    <Label for="namaKandidat" sm={2}>Nama Kandidat</Label>
                    <Col sm={10}>
                      <Input disabled required type="text" name="namaKandidat" id="namaKandidat"
                        defaultValue={this.props.namaKandidat} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="kode" sm={2}>Kode</Label>
                    <Col sm={10}>
                      {this.props.lockStatus === 'YES' ?
                        <Combobox disabled />
                        :
                        <Combobox
                          data={kode}
                          value={valueKode}
                          textField='kode'
                          caseSensitive={false}
                          minLength={1}
                          onChange={valueKode => {
                            this.setState({ valueKode })
                            this.findDetKebutuhanByKode(valueKode)
                          }}
                          filter='contains'
                        />
                      }
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
                    <Label for="tgl" sm={2}>Tanggal</Label>
                    <Col sm={10}>
                      {this.props.lockStatus === 'YES' ?
                        <Input disabled />
                        :
                        <Input required autoComplete="off" type="date" name="tgl" id="tgl"
                          value={tgl} onChange={this.formChange} />
                      }
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="keterangan" sm={2}>Keterangan</Label>
                    <Col sm={10}>
                      {this.props.lockStatus === 'YES' ?
                        <Input disabled type="textarea" />
                        :
                        <Input type="textarea" name="keterangan" id="keterangan" value={keterangan}
                          onChange={this.formChange} placeholder="Keterangan" />
                      }
                    </Col>
                  </FormGroup>
                  <FormGroup check row style={{ display: "flex", justifyContent: "space-around" }}>
                    <Button
                      size="lg"
                      className="mb-3 mr-2 btn-pill btn-gradient-light"
                      color=""
                      onClick={() => { this.props.toggle(); this.setState(this.initialState); }}
                    >
                      Batal
                </Button>
                    {this.props.lockStatus === 'YES' ?
                      <Button disabled size="lg" type="submit" className="mb-3 mr-2 btn-pill btn-gradient-danger">Simpan</Button>
                      :
                      <Button size="lg" type="submit" className="mb-3 mr-2 btn-pill btn-gradient-danger">Simpan</Button>
                    }
                  </FormGroup>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <KebutuhanHistoryTable data={this.state.data} />
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </span>
    );
  }
}

export default FormPlotting;
