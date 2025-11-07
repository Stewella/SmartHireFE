import React, {Fragment} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import PageTitle from '../../../Layout/AppMain/PageTitle';

import Tabs, {TabPane} from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import CardsTablePosisi from './Examples/Posisi/TablePosisi';
// import DataTablePosisi from './Examples/Posisi/DataTablePosisi';
// import DataTableFunc from './Examples/Posisi/DataTableFunc'

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
                        heading="Position"
                        // subheading="Wide selection of cards with multiple styles, borders, actions and hover effects."
                        icon="pe-7s-portfolio icon-gradient bg-amy-crisp"
                    />
                    <Tabs
                        defaultActiveKey="1"
                        renderTabBar={() => <ScrollableInkTabBar/>}
                        renderTabContent={() => <TabContent/>}
                    >
                        {/* <TabPane tab='Detail History' key="1"><CardsDetail/></TabPane>
                        <TabPane tab='Form History' key="2"><CardsFormHistory/></TabPane>
                        <TabPane tab='Table History' key="3"><CardsTableHistory/></TabPane> */}
                        <TabPane tab='Table Position' key="1"><CardsTablePosisi/></TabPane>
                        {/* <TabPane tab='DataTable Position' key="2"><DataTablePosisi/></TabPane> */}
                        {/* <TabPane tab='DataTable' key="3"><DataTableFunc/></TabPane> */}
                    </Tabs>
                </CSSTransitionGroup>
            </Fragment>
        );
    }
}