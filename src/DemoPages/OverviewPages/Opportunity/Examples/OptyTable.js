import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { SERVICE } from "../../../../config/config";

import {
  Row,
  Button,
  Col,
  Card,
  CardBody,
  Container,
  CardHeader,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledButtonDropdown,
} from "reactstrap";

import ReactTable from "react-table";
import axios from "axios";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DetailModal from "./DetailModal";
import { matchSorter } from "match-sorter";
import { saveAs } from "file-saver";
// import { APIFormData } from "../../../../config/axios";
// import FormPlotting from './FormPlotting';
// import UpdateTable from './UpdateTable';
// import UpdateRecommend from './UpdateRecommend';
// import FinalTab from './FinalTab';
// import {SERVICE} from "../../../../config/config";

export default class OptyTable extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      refresh: "",
      dataDetail: false,
      dkbid: "",
      dataWin: [],
      dataProccess: [],
      dataDrop: [],
    };
  }

  componentDidMount = async () => {
    await this.findOpti();
    this.detailCandidate();
  };

  findOpti = async () => {
    await axios
      .get(SERVICE.JAVA_SERVICE + "/detailkeb/getOpti")
      .then((response) => response.data.data)
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].win == null) {
            data[i].win = 0;
          }
        }
        this.setState({ data: data });
      });
  };

  detail = (value) => {
    axios
      .get(SERVICE.JAVA_SERVICE + "/plottinghist/" + value.dkbid)
      .then((res) => {
        this.setState({
          dataWin: res.data.data,
          dataDetail: true,
          dkbid: value.dkbid,
        });
        for(let i=0; i<this.state.dataWin.length;i++){
          this.state.dataWin[i].no=i+1;
        }
        this.getDataDrop();
        this.getOnProccess();
      });
  };



  detailCandidate = () => {
    axios.get(SERVICE.JAVA_SERVICE + "/detailkeb/getAll").then((res) => {
    });
  };

  refreshTable = () => {
    this.findOpti();
    // this.setState({ refresh: set });
  };

  getDataDrop = () => {
    axios.get(SERVICE.JAVA_SERVICE + "/plottingDetail").then((res) => {
      let data = [];
      for (let index = 0; index < res.data.data.length; index++) {
        if (
          res.data.data[index].plotting.detailKebutuhan.id === this.state.dkbid
          ) {
            if (res.data.data[index].tempResult === "NO") {
            data.push(res.data.data[index]);
          }
        }
      }
      this.setState({ dataDrop: data });
      for(let index=0;index<this.state.dataDrop.length;index++){
        this.state.dataDrop[index].no=index+1;
      }
    });
  };

  getOnProccess = () =>{
    axios.get(SERVICE.JAVA_SERVICE+"/plottinghist/proccess/"+this.state.dkbid)
    .then(res=>{
      let data = res.data.data;
      let arr = [];
      for(let i=0; i<data.length;i++){
          arr.push(data[i]);
      }
      this.setState({dataProccess:arr});
      for(let j=0;j<this.state.dataProccess.length;j++){
        this.state.dataProccess[j].no=j+1;
      }
    })
  }

  // getFile = () => {
  //   APIFormData()
  //     .get("/candidate/exportExcel")
  //     .then((res) => {
  //       const filename = "test.xlsx";
  //       this.saveFile(res.data, this.filename);
  //     });
  // };

  saveFile = (data, filename) => {
    const blob = new Blob([data]);
    saveAs.saveAs(blob, filename);
  };

  toggleDetail = () => {
    this.setState({ dataDetail: !this.state.dataDetail });
  };

  exportToCSV = (dataOpportunity) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const ws = XLSX.utils.json_to_sheet(dataOpportunity);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "Opportunity.xlsx");
  };

  render() {
    const { data } = this.state;

    return (
      <Fragment>
        <DetailModal
          dataWin={this.state.dataWin}
          dataDrop={this.state.dataDrop}
          dataProccess={this.state.dataProccess}
          isOpen={this.state.dataDetail}
          toggle={() => this.toggleDetail()}
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
                    <h5>History Candidate Table</h5>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="mb-3">
                        <Button
                          className="btn btn-success float-right"
                          onClick={() => this.exportToCSV(data)}
                        >
                          <FontAwesomeIcon
                            icon={faFileExcel}
                            className="mr-2"
                          />
                          <span>Download</span>
                        </Button>
                        {/* <Button
                          className="btn btn-success float-right"
                          onClick={() => this.getFile()}
                        >
                          <span>Test</span>
                        </Button> */}
                      </Col>
                    </Row>
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
                              Header: "Nama Client",
                              id: "namaClient",
                              accessor: (d) => d.namaClient,
                              filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, {
                                  keys: ["namaClient"],
                                }),
                              filterAll: true,
                            },
                            {
                              Header: "Kebutuhan",
                              id: "posisi",
                              accessor: (d) => d.posisi,
                              filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, {
                                  keys: ["posisi"],
                                }),
                              filterAll: true,
                            },
                            {
                              Header: "Win",
                              accessor: "win",
                              filterable: false,
                            },
                            {
                              Header: "On Proses",
                              accessor: "onProcess",
                              filterable: false,
                            },
                            {
                              Header: "Failed",
                              accessor: "drop",
                              filterable: false,
                            },
                            {
                              Header: "Sisa Kebutuhan",
                              accessor: "sisaKebutuhan",
                              filterable: false,
                            },
                            {
                              Header: "Actions",
                              accessor: "actions",
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
                                      title="detail"
                                    >
                                      <i className="pe-7s-menu icon"> </i>
                                    </DropdownToggle>
                                    <DropdownMenu size="sm">
                                      <DropdownItem
                                        onClick={() =>
                                          this.detail(row.original)
                                        }
                                      >
                                        Detail
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
          </Container>
        </CSSTransitionGroup>
        <br />
        <br />
      </Fragment>
    );
  }
}
