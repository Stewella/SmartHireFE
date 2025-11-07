import React, {Fragment} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import DashboardClientTable from './Opportunity/Examples/DashboardClientTable'

import {Col, Container, Row} from 'reactstrap';

const ChartJsCircular = () => {

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
                        <Col lg="12">
                            <DashboardClientTable/>
                        </Col>
                    </Row>
                </Container>
            </CSSTransitionGroup>
        </Fragment>
    );
}
export default ChartJsCircular;
