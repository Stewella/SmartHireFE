import React, {Fragment} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import PageTitle from '../../../Layout/AppMain/PageTitle';

import Tabs, {TabPane} from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

// Examples
// import CardsDetail from './Examples/History/DetailHistory';
// import CardsFormHistory from './Examples/History/FormHistory';
// import CardsTableHistory from './Examples/History/TableHistory';
import CardsTableSales from './Examples/Sales/TableSales';
// import DataTableSales from './Examples/Sales/DataTableSales'

export default class Page extends React.Component {

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
                        heading="Sales"
                        // subheading="Wide selection of cards with multiple styles, borders, actions and hover effects."
                        icon="pe-7s-culture icon-gradient bg-amy-crisp"
                    />
                    <Tabs
                        defaultActiveKey="1"
                        renderTabBar={() => <ScrollableInkTabBar/>}
                        renderTabContent={() => <TabContent/>}
                    >
                        {/* <TabPane tab='Detail History' key="1"><CardsDetail/></TabPane>
                        <TabPane tab='Form History' key="2"><CardsFormHistory/></TabPane>
                        <TabPane tab='Table History' key="3"><CardsTableHistory/></TabPane> */}
                        <TabPane tab='Table Sales' key="1"><CardsTableSales/></TabPane>
                        {/* <TabPane tab='Data Table' key="2"><DataTableSales/></TabPane> */}
                    </Tabs>
                </CSSTransitionGroup>
            </Fragment>
        );
    }
}