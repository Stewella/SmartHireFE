import React, { Component, Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import PageTitle from '../../../Layout/AppMain/PageTitle';

// Examples
import ChartJsCircular from './Content';

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
                        heading="History Detail"
                        // subheading="Huge selection of charts created with the React ChartJS Plugin"
                        icon="lnr-users icon-gradient bg-amy-crisp"
                    />
                    <ChartJsCircular />
                </CSSTransitionGroup>
            </Fragment>
        );
    }
}