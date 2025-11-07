import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Dropdown from 'react-bootstrap/Dropdown'
import axios from "axios";
import Swal from "sweetalert2";
import ReactTable from "react-table";
import { matchSorter } from "match-sorter";

import AddModal from "./Modal/AddModal";
import EditModal from "./Modal/EditModal";
import ViewModal from "./Modal/ViewModal";
import PicModal from "./Modal/PicModal";
import StepModal from "./Modal/StepModal";
import { SERVICE } from "../../../../config/config";

export default class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: [],
      addModalShow: false,
      editModalShow: false,
      viewModalShow: false,
      picModalShow: false,
      stepModalShow: false,

      initialState: {
        id: "",
        nama: "",
        alamat: "",
        industri: "",
        nickname: "",
        sales: "",
        noHp: "",
      },
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  async componentDidMount() {
    await axios.get(SERVICE.JAVA_SERVICE + "/client").then((response) => {
      this.setState({ client: response.data.data });
    });

    // this.refreshList();
  }

  refresh = (id) => {
    if (id) {
      const url = SERVICE.JAVA_SERVICE + "/client/" + id;
      axios.get(url).then((response) => {
        this.setState({ client: response.data });
      });
    }
  };

  refreshList = async () => {
    await axios.get(SERVICE.JAVA_SERVICE + "/client").then((response) => {
      this.setState({ client: response.data.data });
    });
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
      icon: "warning",
      title: "Data berhasil dihapus!",
    });
  };

  deleteData = (id) => {
    axios.delete(SERVICE.JAVA_SERVICE + "/client/" + id).then((response) => {
      // this.refreshList();
      if (response.data != null) {
        this.handleClick();
        this.setState({
          client: this.state.client.filter((client) => client.id !== id),
        });
      }
    });
  };

  toggle1 = () => {
    this.setState({ addModalShow: !this.state.addModalShow });
    this.refreshList();
  };

  toggle2 = () => {
    this.setState({ viewModalShow: !this.state.viewModalShow });
    this.refreshList();
  };

  toggle3 = () => {
    this.setState({ editModalShow: !this.state.editModalShow });
    this.refreshList();
  };

  toggle4 = () => {
    this.setState({ picModalShow: !this.state.picModalShow });
    this.refreshList();
  };

  toggle5 = () => {
    this.setState({ stepModalShow: !this.state.stepModalShow });
    this.refreshList();
  };

  render() {
    return (
      <Fragment>
        <AddModal
          isOpen={this.state.addModalShow}
          toggle={() => this.toggle1()}
        />

        <ViewModal
          isOpen={this.state.viewModalShow}
          toggle={() => this.toggle2()}
          toggleEdit={() => this.toggle3()}
          id={this.state.sendId}
        />

        <EditModal
          isOpen={this.state.editModalShow}
          toggle={() => this.toggle3()}
          id={this.state.sendId}
        />

        <PicModal
          isOpen={this.state.picModalShow}
          toggle={() => this.toggle4()}
          nama={this.state.sendNama}
        />

        <StepModal
          isOpen={this.state.stepModalShow}
          toggle={() => this.toggle5()}
          nama={this.state.sendNama}
          idCl={this.state.sendId}
        />

        <CSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Row>
            <Col>
              <Card className="main-card mb-3">
                <CardHeader>
                  <h5>Client Table</h5>
                  <div className="btn-actions-pane-right">
                    <Button
                      className="btn-pill btn-md btn-shadow btn-shine float-right mr-3"
                      onClick={() => {
                        this.setState({ addModalShow: true });
                      }}
                    >
                      <FontAwesomeIcon icon={faListUl} />
                      <span> Add</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <ReactTable
                    data={this.state.client}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                      String(row[filter.id]) === filter.value
                    }
                    columns={[
                      {
                        columns: [
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
                            Header: "Nickname",
                            id: "nickname",
                            accessor: (d) => d.nickname,
                            filterMethod: (filter, rows) =>
                              matchSorter(rows, filter.value, {
                                keys: ["nickname"],
                              }),
                            filterAll: true,
                          },
                          {
                            Header: "Industri",
                            id: "industri",
                            accessor: (d) => d.industri,
                            filterMethod: (filter, rows) =>
                              matchSorter(rows, filter.value, {
                                keys: ["industri"],
                              }),
                            filterAll: true,
                          },
                          {
                            Header: "Alamat",
                            id: "alamat",
                            accessor: (d) => d.alamat,
                            filterMethod: (filter, rows) =>
                              matchSorter(rows, filter.value, {
                                keys: ["alamat"],
                              }),
                            filterAll: true,
                          },
                          {
                            Header: "No. Hp",
                            id: "noHp",
                            accessor: (d) => d.noHp,
                            filterMethod: (filter, rows) =>
                              matchSorter(rows, filter.value, {
                                keys: ["noHp"],
                              }),
                            filterAll: true,
                          },
                          {
                            Header: "Sales",
                            id: "sales",
                            accessor: (d) => d.sales,
                            filterMethod: (filter, rows) =>
                              matchSorter(rows, filter.value, {
                                keys: ["sales"],
                              }),
                            filterAll: true,
                          },
                          {
                            Header: "Actions",
                            accessor: "actions",
                            sortable: false,
                            filterable: false,
                            Cell: (row) => (
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
                                          viewModalShow: true,
                                          sendId: row.original.id,
                                        });
                                      }}
                                    >
                                      View
                                    </DropdownItem>
                                    <DropdownItem
                                      onClick={() => {
                                        this.setState({
                                          picModalShow: true,
                                          sendNama: row.original.nama,
                                        });
                                      }}
                                    >
                                      PIC
                                    </DropdownItem>
                                    <DropdownItem
                                      onClick={() => {
                                        this.setState({
                                          stepModalShow: true,
                                          sendNama: row.original.nama,
                                          sendId: row.original.id,
                                        });
                                      }}
                                    >
                                      Step
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledButtonDropdown>
                              </div>
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
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
