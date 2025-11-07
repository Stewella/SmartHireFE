import React, { Fragment } from 'react';

// import Ionicon from 'react-ionicons';
import { IoIosGrid } from "react-icons/io";

import {
    UncontrolledDropdown, DropdownToggle, DropdownMenu, Col, Row, Button
} from 'reactstrap';
// import image1 from '../../../assets/utils/images/header2.jpg';

class HeaderDots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };

    }

    render() {
        return (
            <Fragment>
                <div className="header-dots">
                    <UncontrolledDropdown>
                        <DropdownToggle className="p-0 mr-2" color="link">
                            <div className="icon-wrapper icon-wrapper-alt rounded-circle">
                                <div className="icon-wrapper-bg" style={{background:"#C9C78B"}} />
                                <IoIosGrid color="#76846A" fontSize="23px" />
                            </div>
                        </DropdownToggle>
                        <DropdownMenu right className="dropdown-menu-xl rm-pointers">
                            <div className="dropdown-menu-header">
                                <div className="dropdown-menu-header-inner" style={{background:"#76846A"}}>
                                    <div className="menu-header-image"
                                        // style={{
                                        //     backgroundImage: 'url(' + image1 + ')'
                                        // }}
                                    />
                                    <div className="menu-header-content text-white">
                                        <h5 className="menu-header-title" style={{ fontFamily: "Philosopher, sans-serif"}}>Menu</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="grid-menu grid-menu-xl grid-menu-3col">
                                <Row className="no-gutters">
                                    <Col xl="4" sm="6">
                                        <Button
                                            className="btn-icon-vertical btn-square btn-transition"
                                            outline color="#6A6932" href="#/user/openingpage">
                                            <i className="lnr-store icon-gradient bg-slick-carbon btn-icon-wrapper btn-icon-lg mb-3"> </i>
                                            Home
                                        </Button>
                                    </Col>
                                    <Col xl="4" sm="6">
                                        <Button
                                            className="btn-icon-vertical btn-square btn-transition"
                                            outline color="#6A6932" href="#/user/overview">
                                            <i className="lnr-map-marker icon-gradient bg-slick-carbon btn-icon-wrapper btn-icon-lg mb-3"> </i>
                                            Overview
                                        </Button>
                                    </Col>
                                    <Col xl="4" sm="6">
                                        <Button
                                            className="btn-icon-vertical btn-square btn-transition"
                                            outline color="#6A6932" href="#/user/inputcandidate">
                                            <i className="lnr-magic-wand icon-gradient bg-slick-carbon btn-icon-wrapper btn-icon-lg mb-3"> </i>
                                            Input Candidate
                                        </Button>
                                    </Col>
                                    {/* <Col xl="4" sm="6">
                                        <Button
                                            className="btn-icon-vertical btn-square btn-transition"
                                            outline color="#6A6932" href="#/user/dam">
                                            <i className="lnr-shirt icon-gradient bg-slick-carbon btn-icon-wrapper btn-icon-lg mb-3"> </i>
                                            Dress, Attire, and Makeup
                                        </Button>
                                    </Col>
                                    <Col xl="4" sm="6">
                                        <Button
                                            className="btn-icon-vertical btn-square btn-transition"
                                            outline color="#6A6932" href="#/user/catering">
                                            <i className="lnr-dinner icon-gradient bg-slick-carbon btn-icon-wrapper btn-icon-lg mb-3"> </i>
                                            Catering
                                        </Button>
                                    </Col>
                                    <Col xl="4" sm="6">
                                        <Button
                                            className="btn-icon-vertical btn-square btn-transition"
                                            outline color="#6A6932" href="#/user/photo">
                                            <i className="lnr-camera icon-gradient bg-slick-carbon btn-icon-wrapper btn-icon-lg mb-3"> </i>
                                            Photography & Videography
                                        </Button>
                                    </Col> */}
                                </Row>
                            </div>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            </Fragment>
        )
    }
}

export default HeaderDots;
