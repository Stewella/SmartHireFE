import React, { Fragment} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import ColumnStatusperMonth from './ColumnStatusperMonth'
import DoughnutCandidate from './DonutCandidate';
// import DoughnutCandidate2 from './DonutCandidate2';
// import PieExample from './pie';
// import RadarExample from './radar';
// import PolarExample from './polar';
// import LineExample from './line';
// import LineExample2 from './line2';
// import BarExample from './bar';
// import HorizontalBarExample from './horizontalBar';
import HorizontalTech from './horizontalTech';
// import ColumnBar from './ColumnBar';
// import axios from "axios";
// import { SERVICE } from "../../../../config/config";
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';
// import horizontalTech from './horizontalTech';

const Dashboard = () => {

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
                            <Col lg="8">
                                <Card className="main-card mb-3">
                                    <CardBody>
                                        <CardTitle>Status Kandidat per Bulan</CardTitle>
                                        <ColumnStatusperMonth />
                                    </CardBody>
                                </Card>
                            </Col>
                        <Col lg='4'>
                        <Row>
                            <Card className="main-card mb-2">
                                <CardBody>
                                    <CardTitle>Status Kandidat Hari Ini</CardTitle>
                                    <DoughnutCandidate />
                                </CardBody>
                            </Card>
                        </Row>
                        <Row>
                            <Card className="main-card">
                                <CardBody>
                                    <CardTitle>Jumlah Orang per Teknologi</CardTitle>
                                    <HorizontalTech />
                                </CardBody>
                            </Card>
                        </Row>
                        </Col>
                        </Row>
                        {/* <Row>
                        <Col lg="6">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>Radar Chart</CardTitle>
                                    <RadarExample />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>Polar Chart</CardTitle>
                                    <PolarExample />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>Pie Chart</CardTitle>
                                    <PieExample />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>Line Chart</CardTitle>
                                    <LineExample />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>Area Chart</CardTitle>
                                    <LineExample2 />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>Bar Chart</CardTitle>
                                    <BarExample />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>Horizontal Bar Chart</CardTitle>
                                    <HorizontalTech />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>Horizontal Bar Chart</CardTitle>
                                    <HorizontalBarExample />
                                </CardBody>
                            </Card>
                        </Col>
                        </Row> */}
                </Container>
            </CSSTransitionGroup>
        </Fragment>
    );
}
export default Dashboard;
