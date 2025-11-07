import React from "react";
import { Form } from "react-bootstrap";
import { Col, Button, InputGroup, InputGroupAddon } from "reactstrap";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputMask from "react-input-mask";
import axios from "axios";
import Swal from "sweetalert2";
import { Combobox } from "react-widgets";
import { SERVICE } from "../../../../../../config/config";

export default class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state.show = false;
    this.valueChange = this.valueChange.bind(this);
    this.submitModal = this.submitModal.bind(this);
  }

  initialState = {
    data: [],
  };

  componentDidMount = () => {
    this.getListIndustry();
    this.getListSales();
    this.getClientBy(this.props.id);
  };

  getListIndustry = () => {
    axios
      .get(SERVICE.JAVA_SERVICE + "/industry", this.options)
      .then((response) => response.data)
      .then((data) => {
        let indList = [];
        data.data.map((ind) => indList.push(ind.nama));
        this.setState({
          dataIndustry: indList,
        });
      });
  };

  getListSales = () => {
    axios
      .get(SERVICE.JAVA_SERVICE + "/sales", this.options)
      .then((response) => response.data)
      .then((data) => {
        let indList = [];
        data.data.map((ind) => indList.push(ind.nama));
        this.setState({
          dataSales: indList,
        });
      });
  };

  getClientBy = (id) => {
    axios
      .get(SERVICE.JAVA_SERVICE + "/client/" + id)
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          nama: data.data.nama,
          industri: data.data.industri,
          alamat: data.data.alamat,
          email: data.data.email,
          noHp: data.data.noHp,
          nickname: data.data.nickname,
          sales: data.data.sales,
        });
      });
  };

  submitModal = (event) => {
    event.preventDefault();
    // this.validate();
    const client = {
      id: this.props.id,
      nama: this.state.nama,
      industri: this.state.industri,
      alamat: this.state.alamat,
      email: this.state.email,
      noHp: this.state.noHp,
      nickname: this.state.nickname,
      sales: this.state.sales,
    };
    this.props.submitHandle(client);
  };

  handleClick = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Data berhasil disimpan!",
    });
  };

  valueChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    let { nama, industri, alamat, email, noHp, nickname, sales } = this.state;
    return (
      <Form
        onSubmit={this.submitModal}
        // initialValues={{
        //   nama,
        //   industri,
        //   alamat
        // }}
        // enableReinitialize={true}
        // id=""
      >
        <Form.Group as={Col} controlId="nama">
          <Form.Label>Nama Client</Form.Label>
          <Form.Control
            required
            autoComplete="off"
            type="text"
            defaultValue={nama}
            onChange={this.valueChange}
            name="nama"
            placeholder="Masukkan nama client"
          />
          <span className="text-danger">{this.state.errUsername}</span>
        </Form.Group>

        <Form.Group as={Col} controlId="nickname">
          <Form.Label>Nickname</Form.Label>
          <Form.Control
            required
            disabled
            autoComplete="off"
            type="text"
            defaultValue={nickname}
            onChange={this.valueChange}
            name="nickname"
            placeholder="Masukkan nickname client"
          />

          <span className="text-danger">{this.state.erorr2}</span>
        </Form.Group>

        <Form.Group as={Col} controlId="industri">
          <Form.Label>Industri</Form.Label>
          <Combobox
            data={this.state.dataIndustry}
            value={industri}
            textField="name"
            caseSensitive={false}
            minLength={1}
            placeholder="Pilih industri"
            onChange={(industri) => {
              this.setState({ industri });
            }}
            filter="contains"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="alamat">
          <Form.Label>Alamat</Form.Label>
          <Form.Control
            required
            autoComplete="off"
            type="text"
            defaultValue={alamat}
            onChange={this.valueChange}
            name="alamat"
            placeholder="Masukkan alamat"
          />
          <span className="text-danger">{this.state.erorr2}</span>
        </Form.Group>

        <Form.Group as={Col} controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            required
            autoComplete="off"
            type="text"
            defaultValue={email}
            onChange={this.valueChange}
            name="email"
            placeholder="Masukkan E-mail"
          />
          <span className="text-danger">{this.state.erorr2}</span>
        </Form.Group>

        <Form.Group as={Col} controlId="noHp">
          <Form.Label>No. Hp</Form.Label>
          <Form.Control
            required
            autoComplete="off"
            type="text"
            defaultValue={noHp}
            onChange={this.valueChange}
            name="noHp"
            placeholder="Masukkan nomor handphone"
          />
          <span className="text-danger">{this.state.erorr2}</span>
        </Form.Group>

        <Form.Group as={Col} controlId="noHp">
          <Form.Label>No. Hp</Form.Label>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <div className="input-group-text">
                <FontAwesomeIcon icon={faPhone} />
              </div>
            </InputGroupAddon>
            <InputMask
              className="form-control"
              mask="+62999999999999"
              value={noHp}
              maskChar={null}
              type="text"
              name="noHp"
              id="noHp"
              placeholder="Enter No Hp"
              autoComplete="off"
              onChange={this.valueChange}
              maxLength="15"
              required
            />
          </InputGroup>
          <span className="text-danger">{this.state.erorr2}</span>
        </Form.Group>

        <Form.Group as={Col} controlId="sales">
          <Form.Label>Sales</Form.Label>
          <Combobox
            data={this.state.dataSales}
            value={sales}
            textField="name"
            caseSensitive={false}
            minLength={1}
            placeholder="Pilih Sales"
            onChange={(sales) => {
              this.setState({ sales });
            }}
            filter="contains"
          />

          <span className="text-danger">{this.state.erorr2}</span>
        </Form.Group>

        <Button
          className="btn btn-primary float-right"
          type="submit"
          onClick={this.props.onHide}
        >
          Simpan
        </Button>
      </Form>
    );
  }
}
