import React, {Fragment} from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button,
} from "reactstrap";
import {faEdit, faListUl, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ReactTable from "react-table";
import {matchSorter} from "match-sorter";

import AddModal from "./Modal/AddModal";
import EditModal from "./Modal/EditModal";
import DeleteModal from "./Modal/DeleteModal";
import {userActions} from "../../../../redux/actions";
import {connect} from "react-redux";

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addModalShow: false,
            editModalShow: false,
            deleteModalShow: false,
        };
    }

    componentDidMount = () => {
        this.props.getUser()
    }

    toggle1 = () => {
        this.setState({addModalShow: !this.state.addModalShow});
    };

    toggle2 = () => {
        this.setState({deleteModalShow: !this.state.deleteModalShow});
    };

    toggle3 = () => {
        this.setState({editModalShow: !this.state.editModalShow});
    };

    render() {
        const {dataGrid} = this.props
        const {addModalShow, editModalShow, deleteModalShow, sendData, sendId} = this.state
        let error = {
            namaerr: "",
            emailerr: "",
            typeerr: ""
        }
        let data = {
            nama: "",
            email: "",
            type: ""
        }
        return (
            <Fragment>
                <AddModal
                    isOpen={addModalShow}
                    toggle={() => this.toggle1()}
                    data={data}
                    error={error}
                />

                <EditModal
                    isOpen={editModalShow}
                    toggle={() => this.toggle3()}
                    data={sendData}
                    error={error}
                />

                <DeleteModal
                    isOpen={deleteModalShow}
                    toggle={() => this.toggle2()}
                    id={sendId}
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
                                    <h5>User Table</h5>
                                    <div className="btn-actions-pane-right">
                                        <Button
                                            className="btn-pill btn-md btn-shadow btn-shine float-right mr-3"
                                            onClick={() => {
                                                this.setState({
                                                    addModalShow: true
                                                });
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faListUl}/>
                                            <span> Add</span>
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <ReactTable
                                        data={dataGrid}
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
                                                        Header: "Email",
                                                        id: "email",
                                                        accessor: (d) => d.email,
                                                        filterMethod: (filter, rows) =>
                                                            matchSorter(rows, filter.value, {
                                                                keys: ["email"],
                                                            }),
                                                        filterAll: true,
                                                    },
                                                    {
                                                        Header: "Type",
                                                        id: "type",
                                                        accessor: (d) => d.type,
                                                        filterMethod: (filter, rows) =>
                                                            matchSorter(rows, filter.value, {
                                                                keys: ["type"],
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
                                                                <Button
                                                                    className="btn-pill btn-sm btn-info mr-2"
                                                                    onClick={() => {
                                                                        this.setState(prevState => ({
                                                                            ...prevState,
                                                                            editModalShow: true,
                                                                            sendData: row.original,
                                                                        }));
                                                                    }}
                                                                >
                                                                    <FontAwesomeIcon icon={faEdit}/>
                                                                    <span> Edit</span>
                                                                </Button>
                                                                <Button
                                                                    className="btn-pill btn-sm btn-danger"
                                                                    onClick={() => {
                                                                        this.setState(prevState=>({
                                                                            ...prevState,
                                                                            deleteModalShow: true,
                                                                            sendId: row.original.idUser,
                                                                        }));
                                                                    }}
                                                                >
                                                                    <FontAwesomeIcon icon={faTrash}/>
                                                                    <span> Delete</span>
                                                                </Button>
                                                            </div>
                                                        ),
                                                    },
                                                ],
                                            },
                                        ]}
                                        defaultPageSize={5}
                                        className="-striped -highlight -fixed"
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

const mapStateToProps = state => ({
    ...state.userReducer
})

const mapDispatchToProps = {
    getUser : userActions.getData
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
