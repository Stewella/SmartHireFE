import React, {Fragment, useEffect, useState} from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import ReactTable from "react-table";
import {
    Col,
    Card,
    CardBody,
    Button,
    Container,
    Row,
    CardHeader,
    FormGroup,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import Select from "react-select";
import {
    faListUl,
    faFileExcel, faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
import {connect} from "react-redux";
import {candidateActions, employeeActions} from "../../../../redux/actions";
import {CandidateStatus} from "./CandidateStatus";
import propTypes from "prop-types";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {matchSorter} from "match-sorter";
import UpdateRecommend from "./UpdateRecommend";


// const MySwal = withReactContent(Swal);
const CardsAdvanced = ({
                           dataGrid,
                           onAdd,
                           toggle,
                           getClientByStatus,
                           availableGroup,
                           getDocType,
                           getListFile,
                           getDataEmployee,
                           docList,
                           dataEmployee
                       }) => {

    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

    const exportToCSV = (dataGrid) => {
        const ws = XLSX.utils.json_to_sheet(dataGrid);
        const wb = {Sheets: {data: ws}, SheetNames: ["data"]};
        const excelBuffer = XLSX.write(wb, {bookType: "xlsx", type: "array"});
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, "Candidate.xlsx");
    };

    const [status, setStatus] = useState('Available');

    const makeObject = () => {
        let availableList = []
        availableGroup.map((val, i) => (
            availableList[i] = {value: val.status, label: val.status}
        ))

        return availableList
    }

    const setToogle = (value) => {
        onAdd(value);
    };

    const detail = (value) => {
        const dataItem = {
            dataItemTab: {...value},
            inTab: true,
            inEdit: false,
        };
        onAdd(dataItem);
    };


    const [recmodal, setRecmodal] = useState(false);
    const [datakand, setDatakand] = useState([]);
    const updateRecommend = (value) => {
        setRecmodal(true)
        setDatakand(value)
    };
    const toggleRec = () => {
        setRecmodal(!recmodal);
        getClientByStatus(status)
    };

    const handleChangeStatus = async (value) => {
        if (value.value === CandidateStatus.HIRED) {
            await getDataEmployee();
        }
        setStatus(value.value)
        await getClientByStatus(value.value);
    };

    const setEmployeeToggle = (value) => {
        toggle(value)
    }


    const listFile = async (id) => {
        await getListFile(id);
        // console.log(docList)
    }

    useEffect(() => {
        // getData()
        getDocType()
    }, [getDocType])

    return (
        <Fragment>
            <UpdateRecommend
                namaKandidat={datakand.nama}
                idKandidat={datakand.id}
                isOpen={recmodal}
                toggle={() => toggleRec()}
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
                                    <h5>Candidate Table</h5>
                                    <div className="btn-actions-pane-right">
                                        <Button
                                            className="btn-pill btn-md btn-shadow btn-shine text-right mr-3"
                                            onClick={() => setToogle({inAdd: true})}
                                        >
                                            <FontAwesomeIcon icon={faListUl}/>
                                            <span> Add</span>
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col lg="3" md="3" sm="6">
                                            <FormGroup>
                                                <Select
                                                    onChange={handleChangeStatus}
                                                    options={makeObject()}
                                                    defaultValue={{value: "Available", label: "Available"}}
                                                    placeholder="Select Candidates"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="9">
                                            <Button
                                                className="btn btn-success float-right"
                                                onClick={() => exportToCSV(dataGrid)}
                                            >
                                                <FontAwesomeIcon icon={faFileExcel} className="mr-2"/>
                                                <span>Download</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                    <ReactTable
                                        resizable
                                        data={status === CandidateStatus.HIRED ? dataEmployee : dataGrid}
                                        filterable
                                        defaultFilterMethod={(filter, row) =>
                                            String(row[filter.id]) === filter.value
                                        }
                                        columns={[
                                            {
                                                columns: [
                                                    {
                                                        Header: "Code",
                                                        Cell: (row) => (
                                                            <div className="d-block w-100 text-center">
                                                                {row.value}
                                                            </div>
                                                        ),
                                                        id: "kode",
                                                        accessor: (d) => d.kode,
                                                        filterMethod: (filter, rows) =>
                                                            matchSorter(rows, filter.value, {
                                                                keys: ["kode"],
                                                            }),
                                                        filterAll: true,
                                                        width: 100,
                                                    },
                                                    {
                                                        Header: "Name",
                                                        id: "nama",
                                                        accessor: (d) => d.nama,
                                                        filterMethod: (filter, rows) =>
                                                            matchSorter(rows, filter.value, {
                                                                keys: ["nama"],
                                                            }),
                                                        filterAll: true,
                                                        width: 100
                                                    },
                                                    {
                                                        Header: "E-mail",
                                                        id: "email",
                                                        accessor: (d) => d.email,
                                                        filterMethod: (filter, rows) =>
                                                            matchSorter(rows, filter.value, {
                                                                keys: ["email"],
                                                            }),
                                                        filterAll: true,
                                                        width: 200
                                                    },
                                                    {
                                                        Header: "No Hp",
                                                        id: "noHp",
                                                        accessor: (d) => d.noHp,
                                                        filterMethod: (filter, rows) =>
                                                            matchSorter(rows, filter.value, {
                                                                keys: ["noHp"],
                                                            }),
                                                        filterAll: true,
                                                        width: 150
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
                                                        Header: "Actions",
                                                        accessor: "actions",
                                                        sortable: false,
                                                        filterable: false,
                                                        Cell: (row) => (
                                                            <div className="d-block w-100 text-center">
                                                                <UncontrolledButtonDropdown direction="left"
                                                                                            className="mb-2 mr-2">
                                                                    <DropdownToggle size="lg" className="btn-wide"
                                                                                    color="link">
                                                                        <i className="pe-7s-menu icon"> </i>
                                                                    </DropdownToggle>
                                                                    <DropdownMenu size="sm">
                                                                        {status === CandidateStatus.HIRED ?
                                                                            <>
                                                                                <DropdownItem
                                                                                    onClick={() => {
                                                                                        setEmployeeToggle({
                                                                                            addData: true,
                                                                                            editData: false,
                                                                                            dataForm: row.original
                                                                                        })
                                                                                    }}
                                                                                >
                                                                                    Detail
                                                                                </DropdownItem>
                                                                                <DropdownItem
                                                                                    onClick={() => {
                                                                                        setEmployeeToggle({
                                                                                            addFile: true,
                                                                                            dataForm: {"id": row.original.id}
                                                                                        });

                                                                                        listFile(row.original.id)

                                                                                    }}
                                                                                >
                                                                                    Attachment
                                                                                </DropdownItem>
                                                                                <DropdownItem style={{color: 'red'}}
                                                                                              onClick={() => {
                                                                                                  setEmployeeToggle({
                                                                                                      deleteData: true,
                                                                                                      dataForm: row.original,
                                                                                                      idUpload: ""})
                                                                                              }}
                                                                                >
                                                                                    Delete
                                                                                    <span>
                                                                                <FontAwesomeIcon className="ml-2" icon={faExclamationCircle}/>
                                                                            </span>
                                                                                </DropdownItem>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <DropdownItem
                                                                                    onClick={() => detail(row.original)}
                                                                                >
                                                                                    View
                                                                                </DropdownItem>
                                                                                <DropdownItem
                                                                                    onClick={() => {
                                                                                        setEmployeeToggle({
                                                                                            addFile: true,
                                                                                            dataForm: {"id": row.original.id}
                                                                                        });

                                                                                        listFile(row.original.id)

                                                                                    }}
                                                                                >
                                                                                    Attachment
                                                                                </DropdownItem>
                                                                                <DropdownItem onClick={() => {
                                                                                    updateRecommend(row.original)
                                                                                }}
                                                                                >
                                                                                    Update Posisi Rekomendasi
                                                                                </DropdownItem>
                                                                            </>
                                                                        }

                                                                        {/*<DropdownItem*/}
                                                                        {/*    onClick={() => setTooglePdf({ inAddPdf: true, dataRow : row.original})}*/}
                                                                        {/*>*/}
                                                                        {/*  Add Document*/}
                                                                        {/*</DropdownItem>*/}


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
                                        // headerClassName= "wordwrap"
                                        // style= { {'whiteSpace': 'unset'} }
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </CSSTransitionGroup>
            <br/>
            <br/>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    ...state.candidateReducer,
    ...state.employeeReducer
});

const mapDispatchToProps = {
    getClient: candidateActions.getData,
    onAdd: candidateActions.onAdd,
    remove: candidateActions.remove,
    getClientByStatus: candidateActions.getDataStatus,
    toggle: employeeActions.toggle,
    getDocType: employeeActions.getDocType,
    getListFile: employeeActions.getListFile,
    getDataEmployee: employeeActions.getDataEmployee
};

CardsAdvanced.propTypes = {
    dataGrid: propTypes.array,
    dataEmployee: propTypes.array,
    onAdd: propTypes.func,
    remove: propTypes.func,
    getClientByStatus: propTypes.func,
    getDetail: propTypes.func,
    onHistoryMode: propTypes.func,
    dataStates: propTypes.object,
    loading: propTypes.bool,
};
export default connect(mapStateToProps, mapDispatchToProps)(CardsAdvanced);
