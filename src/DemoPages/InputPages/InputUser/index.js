import React, {Fragment} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import PageTitle from '../../../Layout/AppMain/PageTitle';

import User from './Examples/User';

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
                        heading="User"
                        //subheading="Wide selection of cards with multiple styles, borders, actions and hover effects."
                        icon="lnr-users icon-gradient bg-amy-crisp"
                    />
                    <User/>
                </CSSTransitionGroup>
            </Fragment>
        );
    }
}