import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  CardHeader,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import ReactTable from "react-table";
import axios from "axios";
import FormPlotting from "./FormPlotting";
import UpdateTable from "./UpdateTable";
import UpdateRecommend from "./UpdateRecommend";
import FinalTab from "./FinalTab";
import LockTab from "./LockTab";
import EditLock from "./EditLock";
import { SERVICE } from "../../../../config/config";
import { matchSorter } from "match-sorter";

export default class PlottingTable extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      refresh: "",
      modalFPShow: false,
      modalUpdateShow: false,
      modalRecShow: false,
      modalFinalShow: false,
      modalLockShow: false,
    };
  }

  toggleFP = () => {
    this.setState({ modalFPShow: !this.state.modalFPShow });
    this.findAllAvailableCandidate();
  };

  toggleUpdate = () => {
    this.setState({ modalUpdateShow: !this.state.modalUpdateShow });
    this.findAllAvailableCandidate();
  };

  toggleRec = () => {
    this.setState({ modalRecShow: !this.state.modalRecShow });
    this.findAllAvailableCandidate();
  };

  toggleFinal = () => {
    this.setState({ modalFinalShow: !this.state.modalFinalShow });
    this.findAllAvailableCandidate();
  };

  toggleLock = () => {
    this.setState({ modalLockShow: !this.state.modalLockShow });
    this.findAllAvailableCandidate();
  };

  toggleEditLock = () => {
    this.setState({ modalEditLockShow: !this.state.modalEditLockShow });
    this.findAllAvailableCandidate();
  };

  componentDidMount = async () => {
    await this.findAllAvailableCandidate();
  };

  findAllAvailableCandidate = async () => {
    await axios
      .get(SERVICE.JAVA_SERVICE + "/candidate/available/lock")
      .then((response) => response.data.data)
      .then((data) => {
        this.setState({ data: data });
      });
  };

  refreshTable = () => {
    this.findAllAvailableCandidate();
  };

  render() {
    const { data } = this.state;

    return (
      <Fragment>
        <FormPlotting
          namaKandidat={this.state.namaKandidat}
          idKandidat={this.state.idKandidat}
          isOpen={this.state.modalFPShow}
          toggle={() => this.toggleFP()}
          lockStatus={this.state.lockStatus}
          lockId={this.state.lockId}
        />
        <UpdateTable
          namaKandidat={this.state.namaKandidat}
          idKandidat={this.state.idKandidat}
          isOpen={this.state.modalUpdateShow}
          toggle={() => this.toggleUpdate()}
        />
        <UpdateRecommend
          namaKandidat={this.state.namaKandidat}
          idKandidat={this.state.idKandidat}
          isOpen={this.state.modalRecShow}
          toggle={() => this.toggleRec()}
        />
        <FinalTab
          namaKandidat={this.state.namaKandidat}
          idKandidat={this.state.idKandidat}
          isOpen={this.state.modalFinalShow}
          toggle={() => this.toggleFinal()}
        />
        <LockTab
          namaKandidat={this.state.namaKandidat}
          idKandidat={this.state.idKandidat}
          isOpen={this.state.modalLockShow}
          toggle={() => this.toggleLock()}
        />
        <EditLock
          namaKandidat={this.state.namaKandidat}
          idKandidat={this.state.idKandidat}
          isOpen={this.state.modalEditLockShow}
          toggle={() => this.toggleEditLock()}
          lockId={this.state.lockId}
        />
        <CSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Container fluid>
            <Row>
              <Col md="12">
                <Card className="main-card mb-3">
                  <CardHeader>
                    <h5>Plotting Table</h5>
                  </CardHeader>
                  <CardBody>
                    <ReactTable
                      data={data}
                      filterable
                      defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]) === filter.value
                      }
                      columns={[
                        {
                          columns: [
                            {
                              Header: "Kode",
                              id: "kode",
                              accessor: (d) => d.kode,
                              filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, {
                                  keys: ["kode"],
                                }),
                              filterAll: true,
                            },
                            {
                              Header: "Nama",
                              id: "nama",
                              accessor: (d) => d.nama,
                              filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, {
                                  keys: ["nama"],
                                }),
                              filterAll: true,
                            },
                            {
                              Header: "Skill",
                              id: "posisi",
                              accessor: (d) => d.posisi,
                              filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, {
                                  keys: ["posisi"],
                                }),
                              filterAll: true,
                            },
                            {
                              Header: "Lock",
                              id: "lockStatus",
                              accessor: (d) => d.lockStatus,
                              filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, {
                                  keys: ["lockStatus"],
                                }),
                              filterAll: true,
                            },
                            {
                              Header: "Available Join",
                              id: "waktuAvailable",
                              accessor: (d) => d.waktuAvailable,
                              filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, {
                                  keys: ["waktuAvailable"],
                                }),
                              filterAll: true,
                            },
                            {
                              Header: "On Proccess",
                              id: "process",
                              accessor: (d) => d.process,
                              filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, {
                                  keys: ["process"],
                                }),
                              filterAll: true,
                            },
                            {
                              Header: "Ekspektasi Gaji",
                              id: "ekspektasiGaji",
                              accessor: (d) => d.ekspektasiGaji,
                              filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, {
                                  keys: ["ekspektasiGaji"],
                                }),
                              filterAll: true,
                            },
                            {
                              Header: "Actions",
                              accessor: "actions",
                              sortable: false,
                              filterable: false,
                              Cell: (row) => (
                                <>
                                  <div className="d-block w-100 text-center">
                                    <UncontrolledButtonDropdown
                                      direction="left"
                                      className="mb-2 mr-2"
                                    >
                                      <DropdownToggle
                                        size="lg"
                                        className="btn-wide"
                                        color="link"
                                      >
                                        <i className="pe-7s-menu icon"> </i>
                                      </DropdownToggle>
                                      <DropdownMenu size="sm">
                                        <DropdownItem
                                          onClick={() => {
                                            this.setState({
                                              modalFPShow: true,
                                              idKandidat: row.original.kode,
                                              namaKandidat: row.original.nama,
                                              lockStatus:
                                                row.original.lockStatus,
                                              lockId: row.original.lockId,
                                            });
                                          }}
                                        >
                                          Plotting
                                        </DropdownItem>
                                        <DropdownItem
                                          onClick={() => {
                                            this.setState({
                                              modalUpdateShow: true,
                                              idKandidat: row.original.kode,
                                              namaKandidat: row.original.nama,
                                            });
                                          }}
                                        >
                                          Plotting Update
                                        </DropdownItem>
                                        {sessionStorage.getItem("role") !==
                                        "role_sales" ? (
                                          <DropdownItem
                                            onClick={() => {
                                              this.setState({
                                                modalFinalShow: true,
                                                idKandidat: row.original.kode,
                                                namaKandidat: row.original.nama,
                                              });
                                            }}
                                          >
                                            Final
                                          </DropdownItem>
                                        ) : null}
                                        {row.original.lockStatus === "NO" &&
                                        sessionStorage.getItem("role") !==
                                          "role_recruitment" ? (
                                          <DropdownItem
                                            onClick={() => {
                                              this.setState({
                                                modalLockShow: true,
                                                idKandidat: row.original.kode,
                                                namaKandidat: row.original.nama,
                                              });
                                            }}
                                          >
                                            Lock
                                          </DropdownItem>
                                        ) : null}
                                        {row.original.lockStatus === "YES" &&
                                        sessionStorage.getItem("role") !==
                                          "role_recruitment" ? (
                                          <DropdownItem
                                            onClick={() => {
                                              this.setState({
                                                modalEditLockShow: true,
                                                idKandidat: row.original.kode,
                                                namaKandidat: row.original.nama,
                                                lockId: row.original.lockId,
                                              });
                                            }}
                                          >
                                            Edit Lock
                                          </DropdownItem>
                                        ) : null}
                                      </DropdownMenu>
                                    </UncontrolledButtonDropdown>
                                  </div>
                                </>
                              ),
                            },
                          ],
                        },
                      ]}
                      defaultPageSize={5}
                      className="-striped -highlight"
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </CSSTransitionGroup>
        <br />
        <br />
      </Fragment>
    );
  }
}
