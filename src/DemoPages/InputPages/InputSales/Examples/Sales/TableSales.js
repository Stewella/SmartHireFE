import React, {useState, useEffect, Fragment} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faListUl } from '@fortawesome/free-solid-svg-icons';
import ReactTable from "react-table";
import { SERVICE } from '../../../../../config/config'
import {
    Row, Col,
    Card, CardBody,
    CardHeader,
    Button, Container
} from 'reactstrap';
import axios from 'axios';
import ModalAdd from './FormSales';
import ModalEdit from './EditSales';

const CardsTableSales = () => {

    const [modalAdd, setModalAdd] = useState(false);
    const [modalEditShow, setModalEditShow] = useState(false);
    const [dataSales, setDataSales] = useState([]);
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
    //     axios.delete(SERVICE.JAVA_SERVICE + "/sales/" + id)
    //         .then(response => {
    //             alert("Deleted");
    //             getSales();
    //         })
    // }

    useEffect(() => {
        if (loading) {
            const getSales = async () => {
                await axios.get(SERVICE.JAVA_SERVICE + "/sales")
                    .then(response => {
                        setDataSales(response.data.data);
                        setLoading(false)
                    })

            }
            getSales();
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
                                    <h5>Sales Table</h5>
                                    <div className="btn-actions-pane-right">
                                        <Button
                                            className="btn-pill btn-md btn-shadow btn-shine text-right mr-3"
                                            style={{ background: "#65859a", border: "none" }}
                                            onClick={toggleAdd}
                                        >
                                            <FontAwesomeIcon icon={faListUl} />
                                            <span>  Add</span>
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <ReactTable
                                        data={dataSales}
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
                                                    Header: 'Nama',
                                                    accessor: 'nama',
                                                }, {
                                                    Header: 'No. Hp',
                                                    accessor: 'noHp',
                                                }, {
                                                    Header: 'Email',
                                                    accessor: 'email',
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
                                                                style={{ background: "#65859a", border: "none" }}
                                                                onClick={() => { setData(row.original); toggleEdit(data) }}
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
export default CardsTableSales;
