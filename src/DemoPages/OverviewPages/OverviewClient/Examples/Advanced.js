import React, { Component, Fragment, useState, useEffect } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import ReactTable from "react-table";
import axios from "axios";
import ModalPost from "./ModalPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faDatabase,
  faTrash,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";
import { SERVICE } from "../../../../config/config";
import { Row, Col, Card, CardBody, CardHeader, Button } from "reactstrap";
import ModalDetail from "./ModalDetail";

const CardsAdvanced = () => {
  const [idperson, setIdPerson] = useState("");
  const [client, setClient] = useState([]);
  const [modalPost, setModalPost] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);

  const toggle = () => {
    setModalPost(!modalPost);
  };

  const toggleDetail = () => {
    setModalDetail(!modalDetail);
  };

  const getClient = () => {
    axios.get(SERVICE.JAVA_SERVICE + "/client").then((response) => {
      setClient(response.data);
    });
  };

  useEffect(() => {
    getClient();
  }, []);

  const detail = (id) => {
    setModalDetail(true);
    setIdPerson(id);
  };

  return (
    <Fragment>
      <ModalPost isOpen={modalPost} toggle={toggle} />
      <ModalDetail
        isOpen={modalDetail}
        toggle={toggleDetail}
        idperson={idperson}
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
          <Col md="12">
            <Card className="main-card mb-3">
              <CardHeader>
                <h5>Client Table</h5>
                <div className="btn-actions-pane-right">
                  <Button
                    className="btn-pill btn-md btn-shadow btn-shine text-right mr-3"
                    onClick={toggle}
                    style={{ background: "#76B947", border: "none" }}
                  >
                    <FontAwesomeIcon icon={faListUl} />
                    <span> Add</span>
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={client}
                  columns={[
                    {
                      columns: [
                        {
                          Header: "ID",
                          accessor: "id",
                          Cell: (row) => (
                            <div className="d-block w-100 text-center">
                              {row.value}
                            </div>
                          ),
                        },
                        {
                          Header: "Company",
                          accessor: "nama",
                        },
                        {
                          Header: "Industry",
                          accessor: "industri",
                        },
                        {
                          Header: "Address",
                          accessor: "alamat",
                        },
                      ],
                    },
                    {
                      columns: [
                        {
                          Header: "Actions",
                          accessor: "actions",
                          sortable: false,
                          Cell: (row) => (
                            <div className="d-block w-100 text-center">
                              <Button
                                className="btn-pill btn-sm mr-3 btn-shine"
                                style={{
                                  background: "#8c9eff",
                                  border: "none",
                                }}
                                onClick={() => detail(row.original.id)}
                              >
                                <FontAwesomeIcon icon={faDatabase} />
                              </Button>
                              <Button
                                className="btn-pill btn-sm mr-3 btn-shine"
                                style={{
                                  background: "#94C973",
                                  border: "none",
                                }}
                                // onClick={() => this.setState({ modalEditShow: true, bookedlistedit: row.original })}
                              >
                                <FontAwesomeIcon icon={faPen} />
                              </Button>
                              <Button
                                className="btn-pill btn-sm mr-3 btn-shine"
                                style={{
                                  background: "#F37970",
                                  border: "none",
                                }}
                                // onClick={() => this.deleteBookedlist(row.original.idUser)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </div>
                          ),
                        },
                      ],
                    },
                  ]}
                  defaultPageSize={10}
                  className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <br />
        <br />
      </CSSTransitionGroup>
    </Fragment>
  );
};

export default CardsAdvanced;
