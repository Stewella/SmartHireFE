import React, { Component } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import axios from "axios";
import { SERVICE } from "../../../../../../config/config";
// import moment from "moment-timezone";
import {
  // Card, CardBody, CardTitle, Container,
  // Modal, ModalHeader, ModalBody,
  Row,
  Col,
  ButtonGroup,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import {
  faPlus,
  faMinus,
  // faSave, faUndo, faChevronDown
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Combobox } from "react-widgets";
import ModalJumlah from "./ModalJumlah";
// import { data } from "jquery";

class DetailKebutuhan extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  initialState = {
    modal: false,
    valuePosisi: "",
    valueService: "",
    level: "",
    jumlah: "",
    data: [],
    refresh: "",
    modalJumlah: false
  };

  options = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
  };

  componentDidMount = () => {
    this.getListPosisi();
    this.getListService();
    this.getListKebutuhan(this.props.idPic);
  };
//   componentDidUpdate(prevProps, prevState) {
//     // Typical usage (don't forget to compare props):
//     if (this.state.loading !== prevState.loading) {
//       this.getListKebutuhan(this.props.idPic);
//       this.setState({ loading: false });
//     }
//   }
  getListPosisi = () => {
    axios
      .get(SERVICE.JAVA_SERVICE + "/posisi", this.options)
      .then((response) => response.data)
      .then((data) => {
        let posisiList = [];
        data.data.map((posisi) => posisiList.push(posisi.posisi));
        this.setState({
          dataList: posisiList,
        });
      });
  };

  getListService = () => {
    axios
      .get(SERVICE.JAVA_SERVICE + "/service", this.options)
      .then((response) => response.data)
      .then((data) => {
        let servList = [];
        data.data.map((serv) => servList.push(serv.service));
        this.setState({
          dataServ: servList,
        });
      });
  };

  getListKebutuhan = (id) => {
    axios
      .get(SERVICE.JAVA_SERVICE + "/detailkeb/bypic/" + id)
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          dataKebutuhan: data.data,
        });
      });
  };

  handleAdd = () => {
    const detkeb = {
      picName: this.props.pic,
      client: this.props.client,
      posisi: this.state.valuePosisi,
      service: this.state.valueService,
      level: this.state.level,
      jumlah: this.state.jumlah,
    };

    axios
      .post(SERVICE.JAVA_SERVICE + "/detailkeb/insert", detkeb)
      .then((response) => {
        this.getListKebutuhan(this.props.idPic);
        this.setState({
          valuePosisi: "",
          valueService: "",
          level: "",
          jumlah: "",
        });
      });
  };

  handleDrop = (dataKebutuhan) => {
    this.setState({
      dataKebHist: dataKebutuhan,
      statusJumlah: "drop",
    });
    this.toggleJumlah();
  };

  handleTambah = (dataKebutuhan) => {
    this.setState({
      dataKebHist: dataKebutuhan,
      statusJumlah: "tambah",
    });
    this.toggleJumlah();
  };

  toggleJumlah = () => {
    this.setState({ modalJumlah: !this.state.modalJumlah });
    this.getListKebutuhan(this.props.idPic);
  };

  dataChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <>
        <ModalJumlah
          isOpen={this.state.modalJumlah}
          dataKebutuhan={this.state.dataKebHist}
          toggle={() => this.toggleJumlah()}
          status={this.state.statusJumlah}
        />
        <CSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Form>
            <Row>
              <Col md="3" style={{ alignSelf: "center" }}>
                <Label>Posisi</Label>
              </Col>
              <Col md="3" style={{ alignSelf: "center" }}>
                <Label>Service</Label>
              </Col>
              <Col md="3" style={{ alignSelf: "center" }}>
                <Label>Level</Label>
              </Col>
              <Col md="2" style={{ alignSelf: "center" }}>
                <Label>Jumlah</Label>
              </Col>
            </Row>
            {this.state.dataKebutuhan ? (
              this.state.dataKebutuhan.map((dataKebutuhan, index) => (
                <FormGroup row key={dataKebutuhan.id}>
                  <Col md="3" style={{ alignSelf: "center" }}>
                    <Input
                      disabled
                      required
                      type="text"
                      name={"posisi" + dataKebutuhan.id}
                      id={"posisi" + dataKebutuhan.id}
                      value={dataKebutuhan.posisi}
                    />
                  </Col>
                  <Col md="3" style={{ alignSelf: "center" }}>
                    <Input
                      disabled
                      required
                      type="text"
                      name={"service" + dataKebutuhan.id}
                      id={"service" + dataKebutuhan.id}
                      value={dataKebutuhan.service}
                    />
                  </Col>
                  <Col md="3" style={{ alignSelf: "center" }}>
                    <Input
                      disabled
                      required
                      type="text"
                      name={"level" + dataKebutuhan.id}
                      id={"level" + dataKebutuhan.id}
                      value={dataKebutuhan.level}
                    />
                  </Col>
                  <Col md="3" style={{ alignSelf: "center" }}>
                    <ButtonGroup>
                      <span className="input-group-btn">
                        <Button
                          className="btn btn-md  btn-shine text-center"
                          style={{ background: "#F37970", border: "none" }}
                          onClick={() => this.handleDrop(dataKebutuhan)}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </Button>
                      </span>
                      <Input
                        disabled
                        required
                        type="text"
                        name={"jumlah" + dataKebutuhan.id}
                        id={"jumlah" + dataKebutuhan.id}
                        value={dataKebutuhan.jumlah}
                      />
                      <span className="input-group-btn">
                        <Button
                          className="btn btn-md  btn-shine"
                          style={{ background: "#8C9EFF", border: "none" }}
                          onClick={() => this.handleTambah(dataKebutuhan)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                      </span>
                    </ButtonGroup>
                  </Col>
                </FormGroup>
              ))
            ) : (
              <FormGroup row>
                <Label md="12" style={{ alignSelf: "center" }}>
                  No Steps Submitted
                </Label>
              </FormGroup>
            )}
            <FormGroup row>
              <Col md="3" style={{ alignSelf: "center" }}>
                <Combobox
                  data={this.state.dataList}
                  value={this.state.valuePosisi}
                  textField="name"
                  caseSensitive={false}
                  minLength={1}
                  onChange={(valuePosisi) => {
                    this.setState({ valuePosisi });
                  }}
                  filter="contains"
                />
              </Col>
              <Col md="3" style={{ alignSelf: "center" }}>
                <Combobox
                  data={this.state.dataServ}
                  value={this.state.valueService}
                  textField="name"
                  caseSensitive={false}
                  minLength={1}
                  onChange={(valueService) => {
                    this.setState({ valueService });
                  }}
                  filter="contains"
                />
              </Col>
              <Col md="3" style={{ alignSelf: "center" }}>
                <Input
                  autoComplete="off"
                  type="text"
                  name="level"
                  id="level"
                  value={this.state.level}
                  onChange={this.dataChange}
                />
              </Col>
              <Col md="2" style={{ alignSelf: "center" }}>
                <Input
                  required
                  autoComplete="off"
                  type="text"
                  name="jumlah"
                  id="jumlah"
                  value={this.state.jumlah}
                  onChange={this.dataChange}
                />
              </Col>
              {
                <Col md="1" style={{ alignSelf: "center" }}>
                  <FormGroup>
                    <Label />
                    <Button
                      className="btn-pill btn-sm  btn-shine"
                      style={{ background: "#8c9eff", border: "none" }}
                      onClick={() => {
                        this.handleAdd();
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </FormGroup>
                </Col>
              }
            </FormGroup>
          </Form>
        </CSSTransitionGroup>
      </>
    );
  }
}
export default DetailKebutuhan;
