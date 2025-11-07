import React, {Fragment} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import PageTitle from '../../../Layout/AppMain/PageTitle';

// import Tabs, {TabPane} from 'rc-tabs';
// import TabContent from 'rc-tabs/lib/SwipeableTabContent';
// import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

// Examples
import Client from './Examples/Client';

export default class OverviewClient extends React.Component {

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
                        heading="Client"
                        //subheading="Wide selection of cards with multiple styles, borders, actions and hover effects."
                        icon="lnr-users icon-gradient bg-amy-crisp"
                    />
                    <Client/>
                </CSSTransitionGroup>
            </Fragment>
        );
    }
}