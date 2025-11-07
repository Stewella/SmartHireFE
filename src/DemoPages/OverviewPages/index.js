import React, {Fragment} from 'react';
import {Redirect, Route} from 'react-router-dom';

// Pages
import OverviewCandidate from './OverviewCandidate';
import OverviewClient from './OverviewClient';
import Plotting from './Plotting';
import Dashboard from './Dashboard';
import DashboardDetkeb from './DashboardClient';
import Opti from './Opportunity';

// Layout
import AppHeader from '../../Layout/AppHeader';
import AppFooter from '../../Layout/AppFooter';
import AppSidebar from '../../Layout/AppSidebar';

const overView = {
    "pvb_candidate": ["dashboard", Dashboard],
    "pvb_hist_op": ["opti", Opti],
    "pvb_hist_det": ["detkebhist", DashboardDetkeb],
    // "": ["histplt", HistoryPlotting],
    "pvm_candidate": ["candidate", OverviewCandidate],
    "pvm_client": ["client", OverviewClient],
    "pvt_plot": ["plotting", Plotting],

}
const viewKeys = Object.keys(overView)
const viewValues = Object.values(overView)
const role = sessionStorage.getItem("role")

const OverviewPages = ({match}) => (
    <Fragment>
        {/* <ThemeOptions /> */}
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">

                    {
                        viewValues.map((content, index) => {
                            if (role.includes(viewKeys[index])) {
                                return (
                                    <Route path={`${match.url}/${content[0]}`} component={content[1]}/>
                                )
                            } else {
                                return (
                                    <Route path={`${match.url}/${content[0]}`} render={() => (
                                        <Redirect to="/overview/dashboard"/>
                                    )}/>
                                )
                            }
                        })
                    }
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default OverviewPages;