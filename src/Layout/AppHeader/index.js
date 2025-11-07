import React, { Fragment } from 'react';
import cx from 'classnames';

import { connect } from 'react-redux';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Button } from 'reactstrap';
import HeaderLogo from '../AppLogo';
//import KerinciLogo from './Components/KerinciStoriesLogo.png'

// import SearchBox from './Components/SearchBox';
// import MegaMenu from './Components/MegaMenu';
// import UserBox from './Components/UserBox';
// import HeaderRightDrawer from "./Components/HeaderRightDrawer";

// import HeaderDots from "./Components/HeaderDots";

class Header extends React.Component {
    handlePassSearch = (search) => {
        this.props.passingSearch(search);
    };

    render() {
        let {
            headerBackgroundColor,
            enableMobileMenuSmall,
            enableHeaderShadow
        } = this.props;
        return (
            <Fragment>
                <CSSTransitionGroup
                    component="div"
                    className={cx("app-header", headerBackgroundColor, { 'header-shadow': enableHeaderShadow })}
                    transitionName="HeaderAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={1500}
                    transitionEnter={false}
                    transitionLeave={false}>

                    <HeaderLogo />
                    {/* <ProsigmaLogo/> */}

                    <div className={cx(
                        "app-header__content",
                        { 'header-mobile-open': enableMobileMenuSmall },
                    )}>
                        <div className="app-header-left">
                            {/* <SearchBox passingSearch={this.handlePassSearch} /> */}
                            {/* <MegaMenu /> */}
                        </div>
                        <div className="app-header-right">
                            {/* <HeaderDots /> */}
                            {/* <UserBox/> */}
                            {/* <HeaderRightDrawer /> */}
                            <Button className="btn-pill btn-lg btn-shadow btn-info btn-shine mr-3"
                                onClick={() => {
                                    sessionStorage.clear();
                                    window.location.assign( "#/login");
                                    window.location.reload()
                                }}
                            >
                                <span> Logout </span>
                            </Button>
                        </div>
                    </div>
                </CSSTransitionGroup>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
    closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
    headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
    enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);