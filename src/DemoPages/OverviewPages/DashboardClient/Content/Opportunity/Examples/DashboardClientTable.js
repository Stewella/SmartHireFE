import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  CardHeader,
} from "reactstrap";

import ReactTable from "react-table";
import axios from "axios";
import {SERVICE} from "../../../../../../config/config";

export default class DashboardClientTable extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      refresh: "",
    };
  }

  componentDidMount = async () => {
    // await this.findOpti();
    await this.findDetKebHist();
    // this.detailCandidate();
  };

  findDetKebHist=async () =>{
    await axios
    .post(SERVICE.JAVA_SERVICE + "/detailkebhist/getAll")
    .then((response)=> response.data.data)
    .then((data)=>{
      this.setState({ data: data });
    })
  }

  refreshTable = () => {
    this.findDetKebHist();
  };


  render() {
    const { data } = this.state;

    return (
      <Fragment>
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
                    <h5>History Detail Kebutuhan Table</h5>
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
                              Header: "Kode Kebutuhan",
                              accessor: "kodeDetKeb",
                              filterable: false,
                            },
                            {
                              Header: "Jumlah Sebelum Perubahan",
                              accessor: "before",
                              filterable: false,
                            },
                            {
                              Header: "Jumlah Saat Ini",
                              accessor: "current",
                              filterable: false,
                            },
                            {
                              Header: "Status",
                              accessor: "status",
                              filterable: false,
                            },
                            {
                              Header: "Keterangan",
                              accessor: "keterangan",
                              filterable: false,
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
