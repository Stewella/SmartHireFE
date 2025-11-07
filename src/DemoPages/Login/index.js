import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import LoginBox from './LoginBoxed';
import AppSidebar from "../../Layout/AppSidebar";
import AppHeader from "../../Layout/AppHeader"
import AppFooter from "../../Layout/AppFooter"

const OverviewPages = ({match}) => (
    <Fragment>
        {/* <ThemeOptions /> */}
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__inner">
                {/* UserPages or Products */}
                <Route path={`${match.url}/loginbox`} component={LoginBox}/>
            </div>
            <div className="app-wrapper-footer">
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default OverviewPages;