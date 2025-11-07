import React from "react";
import { Component } from "react";
import {
  // Card, CardBody, CardTitle, Row, Container,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  FormGroup,
  Col,
} from "reactstrap";
import Select from "react-select";
import "./DetailModal.css";
import moment from "moment-timezone";

class DetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataWin: [],
      dataProccess: [],
      dataDrop: [],
      status: "",
    };
  }

  status = [
    { value: "win", label: "Win" },
    { value: "failed", label: "Failed" },
    { value: "onproccess", label: "On Proccess" },
  ];

    componentDidMount (){
        this.state.status = null;
    }

  handleChangeStatus(value) {
    this.setState({ status: value.value });
  }

  render() {
    return (
      <span>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>
            Detail Opportunity
          </ModalHeader>
          <div className="ml-3 mt-3">
            <Col lg="6" md="6" sm="6">
              <FormGroup>
                <Select
                  onChange={this.handleChangeStatus.bind(this)}
                  options={this.status}
                  placeholder="Pilih Status"
                />
              </FormGroup>
            </Col>
          </div>
          <ModalBody>
            {this.state.status == "win" ? (
              <div className="mb-3">
                <b className="title">CANDIDATE WIN</b>
                <div className="mt-2">
                  <table className="styled-table">
                    <tbody>
                      <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Tanggal Placement</th>
                      </tr>
                      {this.props.dataWin.map((item) => (
                        <tr key={item.id} className="active-row">
                          <td>{item.no}</td>
                          <td>{item.nama}</td>
                          <td>
                            {moment(item.tglKeputusan)
                              .locale("id")
                              .format("D MMMM YYYY")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
            {this.state.status == "onproccess" ? (
              <div className="mb-3">
                <b>CANDIDATE ONPROCCESS</b>
                <div className="mt-2">
                  <table className="styled-table">
                    <tbody>
                      <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Tanggal Proses Pertama</th>
                      </tr>
                      {this.props.dataProccess.map((item) => (
                        <tr key={item.id} className="active-row">
                          <td>{item.no}</td>
                          <td>{item.nama}</td>
                          <td>{moment(item.tanggal)
                              .tz('Asia/Jakarta')
                              .format("D MMMM YYYY")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
            {this.state.status == "failed" ? (
              <div className="mb-3">
                <b>CANDIDATE FAILED</b>
                <div className="mt-2">
                  <table className="styled-table">
                    <tbody>
                      <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Tanggal Failed</th>
                      </tr>
                      {this.props.dataDrop.map((item) => (
                        <tr key={item.id} className="active-row">
                          <td>{item.no}</td>
                          <td>{item.plotting.candidate.nama}</td>
                          <td>
                            {moment(item.tgl)
                              .locale("id")
                              .format("D MMMM YYYY")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
          </ModalBody>
        </Modal>
      </span>
    );
  }
}

export default DetailModal;
