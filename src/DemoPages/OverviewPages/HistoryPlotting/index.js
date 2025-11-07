import React, { Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import PageTitle from '../../../Layout/AppMain/PageTitle';
// import PlottingTable from './Examples/OptyTable';
import HistPlotTable from './Examples/HistPlotTable';

const HistoryPlotting = () => {

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
                    // heading="Opportunity"
                    // subheading="Wide selection of cards with multiple styles, borders, actions and hover effects."
                    icon="lnr-users icon-gradient bg-amy-crisp"
                />
                <HistPlotTable />
            </CSSTransitionGroup>
        </Fragment>
    );

}
export default HistoryPlotting;