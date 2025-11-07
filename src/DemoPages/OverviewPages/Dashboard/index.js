import React, { Component, Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';


// Examples
import Dashboard from './Content';
import PageTitle from "../../../Layout/AppMain/PageTitle";

export default class ChartJSExamples extends Component {
    render() {

        return (
            <Fragment>
                <CSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <PageTitle
                        heading="Dashboard Candidate"
                        // subheading="Huge selection of charts created with the React ChartJS Plugin"
                        icon="pe-7s-graph1 icon-gradient bg-amy-crisp"
                    />
                    <Dashboard />
                </CSSTransitionGroup>
            </Fragment>
        );
    }
}