import React, { Fragment } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {SERVICE} from '../../../../config/config';

import {
    Row, Col,
    Card, CardBody, Container, CardHeader
} from 'reactstrap';

import ReactTable from "react-table";
import axios from 'axios';
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
            refresh: ''
        };
    }

    componentDidMount = async () => {
        await this.getHist();
    }

    getHist = async () => {
        await axios.get(SERVICE.JAVA_SERVICE + "/plottinghist/getAll")
            .then(response => response.data.data)
            .then((data) => {
                this.setState({ data: data });
            });
    }

    refreshTable = () => {
        this.getHist();
        // this.setState({ refresh: set });

    }

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
                    transitionLeave={false}>
                    <Container fluid>
                        <Row>
                            <Col md="12">
                                <Card className="main-card mb-3">
                                    <CardHeader>
                                        <h5>History Plotting Table</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <ReactTable
                                            data={data}
                                            columns={[{
                                                columns: [{
                                                    Header: 'Kode Kandidat',
                                                    accessor: 'kodeCandidate',
                                                }, {
                                                    Header: 'Nama Kandidat',
                                                    accessor: 'namaCandidate'
                                                }, {
                                                    Header: 'ID Kebutuhan',
                                                    accessor: 'idDetKebutuhan'
                                                }, {
                                                    Header: 'Nama Client',
                                                    accessor: 'client'
                                                }, {
                                                    Header: 'Tanggal Hired',
                                                    accessor: 'tglKeputusan'
                                                },
                                                {
                                                    Header: 'Keterangan',
                                                    accessor: 'keteranganPltHist'
                                                }




                                                ]
                                            }]}
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
        )
    }
}
