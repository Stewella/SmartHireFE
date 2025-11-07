import React from 'react';
import {
    Modal, ModalHeader, ModalBody,
    Col, Row
} from 'reactstrap';
import axios from 'axios';
import FormDetailUpdate from './FormDetailUpdate';
import ReactTable from 'react-table';
import { SERVICE } from "../../../../config/config";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPen, faTasks } from '@fortawesome/free-solid-svg-icons';



class UpdateTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        disable: false,
        data: [],
        dataLast: []
    }

    componentDidMount() {
        // this.findAllPlottingDetail(this.props.idKandidat);
        // this.findAllPlottingDetailLast(this.props.idKandidat);
    }

    refreshTable = (candidate) => {
        this.findAllPlottingDetail(candidate);
        this.findAllPlottingDetailLast(candidate);
    }

    findAllPlottingDetail = (candidate) => {
        axios.get(SERVICE.JAVA_SERVICE + "/plotting-detail/" + candidate)
            .then(response => response.data.data)
            .then((data) => {
                this.setState({ data: data });
            });
    }

    findAllPlottingDetailLast = (candidate) => {
        axios.get(SERVICE.JAVA_SERVICE + "/plotting-detail/last/" + candidate)
            .then(response => response.data.data)
            .then((data) => {
                this.setState({ dataLast: data });
            });
    }

    render() {
        const { data, dataLast } = this.state;
        return (
            <span>
                <Modal size="xl" isOpen={this.props.isOpen}
                    toggle={this.props.toggle}
                    className={this.props.className}
                    backdrop={'static'}
                    onOpened={() => {
                        this.findAllPlottingDetail(this.props.idKandidat);
                        this.findAllPlottingDetailLast(this.props.idKandidat);
                    }}
                >
                    <ModalHeader toggle={this.props.toggle}>PLOTTING DETAIL TABLE</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col md="12">
                                <ReactTable
                                    data={data}
                                    columns={[{
                                        columns: [{
                                            Header: 'Order',
                                            accessor: 'orderStep',
                                        }, {
                                            Header: 'Kegiatan',
                                            accessor: 'kegiatan'
                                        }, {
                                            Header: 'Result',
                                            accessor: 'result'
                                        }, {
                                            Header: 'Keterangan',
                                            accessor: 'keterangan'
                                        }, {
                                            Header: 'Tanggal',
                                            accessor: 'tanggal'
                                        }, {
                                            Header: 'Kebutuhan',
                                            accessor: 'kebutuhan'
                                        }, {
                                            Header: 'PIC',
                                            accessor: 'picName'
                                        }, {
                                            Header: 'Client',
                                            accessor: 'client'
                                        }, {
                                            Header: 'Actions',
                                            accessor: 'actions',
                                            sortable: false,
                                            Cell: row => (
                                                <div className="d-block w-100 text-center">
                                                    <FormDetailUpdate
                                                        idKandidat={this.props.idKandidat}
                                                        idPltDet={row.original.id}
                                                        tanggal={row.original.tanggal}
                                                        refreshTable={(candidate)=>this.refreshTable(candidate)} />
                                                </div>
                                            )
                                        }
                                        ]
                                    }]}
                                    defaultPageSize={5}
                                    className="-striped -highlight"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <ReactTable
                                    data={dataLast}
                                    columns={[{
                                        columns: [{
                                            Header: 'Order',
                                            accessor: 'orderStep',
                                        }, {
                                            Header: 'Kegiatan',
                                            accessor: 'kegiatan'
                                        }, {
                                            Header: 'Result',
                                            accessor: 'result'
                                        }, {
                                            Header: 'Keterangan',
                                            accessor: 'keterangan'
                                        }, {
                                            Header: 'Tanggal',
                                            accessor: 'tanggal'
                                        }, {
                                            Header: 'Kebutuhan',
                                            accessor: 'kebutuhan'
                                        }, {
                                            Header: 'PIC',
                                            accessor: 'picName'
                                        }, {
                                            Header: 'Client',
                                            accessor: 'client'
                                        }, {
                                            Header: 'Actions',
                                            accessor: 'actions',
                                            sortable: false,
                                            // Cell: row => (
                                            //     <div className="d-block w-100 text-center">
                                            //         <FormDetailUpdate
                                            //             idKandidat={this.props.idKandidat}
                                            //             idPltDet={row.original.id}
                                            //             tanggal={row.original.tanggal}
                                            //             findAllPlottingDetail={this.findAllPlottingDetail}/>
                                            //     </div>
                                            // )
                                        }
                                        ]
                                    }]}
                                    defaultPageSize={5}
                                    className="-striped -highlight"
                                />
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
            </span>
        );
    }
}

export default UpdateTable;
