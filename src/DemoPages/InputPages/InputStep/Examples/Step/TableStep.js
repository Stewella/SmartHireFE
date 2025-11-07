import React, { useState, useEffect, Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faListUl } from '@fortawesome/free-solid-svg-icons';
import ReactTable from "react-table";
import {
    Row, Col,
    Card, CardBody,
    CardHeader,
    Button, Container
} from 'reactstrap';
import axios from 'axios';
import ModalAdd from './FormStep';
import ModalEdit from './EditStep';
import { SERVICE } from "../../../../../config/config";

const CardsTableStep = () => {

    const [modalAdd, setModalAdd] = useState(false);
    const [modalEditShow, setModalEditShow] = useState(false);
    const [dataStep, setDataStep] = useState([]);
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



    useEffect(() => {
        if (loading) {
            const getStep = async () => {
                await axios.get(SERVICE.JAVA_SERVICE + "/step")
                    .then(response => {
                        setDataStep(response.data.data);
                        setLoading(false)
                    })

            }
            getStep();
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
                                    <h5>Step Table</h5>
                                    <div className="btn-actions-pane-right">
                                        <Button
                                            className="btn-pill btn-md btn-shadow btn-shine text-right mr-3"
                                            style={{ background: "#c17184", border: "none" }}
                                            onClick={toggleAdd}
                                        >
                                            <FontAwesomeIcon icon={faListUl} />
                                            <span>  Add</span>
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <ReactTable
                                        data={dataStep}
                                        columns={[{
                                            columns: [
                                                {
                                                    Header: 'ID',
                                                    accessor: 'idStep',
                                                    Cell: row => (
                                                        <div className='d-block w-100 text-center'>
                                                            {row.value}
                                                        </div>
                                                    )
                                                }, {
                                                    Header: 'Step',
                                                    accessor: 'namaStep',
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
                                                                style={{ background: "#c17184", border: "none" }}
                                                                onClick={() => {setData(row.original); toggleEdit(data)}}
                                                            // onClick={() => this.setState({ modalEditShow: true, bookedlistedit: row.original })}
                                                            >
                                                                <FontAwesomeIcon icon={faPen} />
                                                            </Button>
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
export default CardsTableStep;
