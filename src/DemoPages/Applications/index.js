import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// APPLICATIONS

import Mailbox from './Mailbox/';
import Chat from './Chat/';
import SplitLayout from './SplitLayout/';
import FaqSection from './FaqSection/';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppFooter from '../../Layout/AppFooter/';

// Theme Options
import ThemeOptions from '../../Layout/ThemeOptions/';

const Applications = ({ match }) => (
    <Fragment>
        <ThemeOptions />
        <AppHeader />
        <div className="app-main">
            {/* <AppSidebar/> */}
            {/* <div className="app-main__outer"> */}
            <div className="app-main__inner p-0">
                <Route path={`${match.url}/mailbox`} component={Mailbox} />
                <Route path={`${match.url}/chatdungdung`} component={Chat} />
                <Route path={`${match.url}/split-layout`} component={SplitLayout} />
                <Route path={`${match.url}/faq-section`} component={FaqSection} />
                <AppFooter />
            </div>
            <div className="app-wrapper-footer">

            </div>
            {/* </div> */}

        </div>
    </Fragment>
);

export default Applications;