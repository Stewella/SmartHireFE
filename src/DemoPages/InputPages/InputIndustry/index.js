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
import CardsTableIndustry from './Examples/Industry/TableIndustry';
// import DataTableIndustry from './Examples/Industry/DataTableIndustry'

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
                        heading="Industry"
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
                        <TabPane tab='Table Industry' key="1"><CardsTableIndustry/></TabPane>
                        {/* <TabPane tab='Data Table' key="2"><DataTableIndustry/></TabPane> */}
                    </Tabs>
                </CSSTransitionGroup>
            </Fragment>
        );
    }
}