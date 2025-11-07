import React, { Fragment, useEffect, useState } from 'react';
import ModalAdd from './FormService';
import ModalEdit from './EditService';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTable from 'react-table';
import axios from 'axios';
import { faListUl, faPen } from '@fortawesome/free-solid-svg-icons';
import { SERVICE } from "../../../../../config/config";

const CardsTableService = () => {
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEditShow, setModalEditShow] = useState(false);
    const [dataService, setDataService] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const toggleAdd = () => {
        setModalAdd(!modalAdd);
        setLoading(true)
    }
    const toggleEdit = (data) => {
        setModalEditShow(!modalEditShow);
        setLoading(true)
    }



    // const deleteData = (id) => {
    //     axios.delete(SERVICE.JAVA_SERVICE + "/service/" + id)
    //         .then(response => {
    //             alert("Deleted");
    //             getService();
    //         })
    // }

    useEffect(() => {
        if (loading) {
            const getService = async () => {
                await axios.get(SERVICE.JAVA_SERVICE + "/service")
                    .then(response => {
                        setDataService(response.data.data);
                        setLoading(false)
                    })

            }
            getService();
        }
    }, [loading])

    return (
        <Fragment>
            <ModalAdd
                isOpen={modalAdd}
                toggle={toggleAdd} />
            <ModalEdit
                data={data}
                isOpen={modalEditShow}
                toggle={toggleEdit}
            />
            <CSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}>
                <Container fluid>
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardHeader>
                                    <h5>service Table</h5>
                                    <div className="btn-actions-pane-right">
                                        <Button
                                            className="btn-pill btn-md btn-shadow btn-shine text-right mr-3"
                                            style={{ background: "#76B947", border: "none" }}
                                            onClick={toggleAdd}
                                        >
                                            <FontAwesomeIcon icon={faListUl} />
                                            <span>  Add</span>
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <ReactTable
                                        data={dataService}
                                        columns={[{
                                            columns: [
                                                {
                                                    Header: 'ID',
                                                    accessor: 'id',
                                                    Cell: row => (
                                                        <div className='d-block w-100 text-center'>
                                                            {row.value}
                                                        </div>
                                                    )
                                                }, {
                                                    Header: 'Service Name',
                                                    accessor: 'service',
                                                }, {
                                                    Header: 'Service ShortName',
                                                    accessor: 'shortService',
                                                },
                                            ]
                                        },
                                        {
                                            columns: [
                                                {
                                                    Header: 'Actions',
                                                    accessor: 'actions',
                                                    sortable: false,
                                                    Cell: row => (
                                                        <div className="d-block w-100 text-center">
                                                            <Button className="btn-pill btn-sm mr-3 btn-shine"
                                                                style={{ background: "#94C973", border: "none" }}
                                                                    onClick={() => {setData(row.original); toggleEdit(data)}}
                                                            // onClick={() => this.setState({ modalEditShow: true, bookedlistedit: row.original })}
                                                            >
                                                                <FontAwesomeIcon icon={faPen} />
                                                            </Button>
                                                            {/* <Button className="btn-pill btn-sm mr-3 btn-shine"
                                                                    style={{ background: "#F37970", border: "none" }}
                                                                    onClick={() => deleteData(row.original.id)}
                                                                >
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </Button> */}
                                                        </div>
                                                    )
                                                }
                                            ]
                                        }]}
                                        defaultSorted={[
                                            {
                                                id: "id",
                                                asc: true
                                            }
                                        ]}
                                        defaultPageSize={10}
                                        className="-striped -highlight"
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </CSSTransitionGroup>
        </Fragment>
    )
}

export default CardsTableService;
