import React, { Fragment } from 'react';

import {
    Nav, NavLink, NavItem
} from 'reactstrap';

class MegaMenu extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            popoverOpen: false,
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
            popoverOpen: !this.state.popoverOpen

        });
    }

    state = {};

    render() {
        return (
            <Fragment>
                <Nav className="header-megamenu">
                    <NavItem>
                        <NavLink href="#/user/overview">
                            <i className="nav-link-icon lnr-map-marker icon-gradient bg-slick-carbon"> </i>
                            <span>Overview</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#/user/inputcandidate">
                            <i className="nav-link-icon lnr-magic-wand icon-gradient bg-slick-carbon"> </i>
                            <span>Input Candidate</span>
                        </NavLink>
                    </NavItem>
                    {/* <NavItem>
                        <NavLink href="#/user/dam">
                            <i className="nav-link-icon lnr-shirt icon-gradient bg-slick-carbon"> </i>
                            <span>Dress, Attire, and Makeup</span>
                        </NavLink>
                    </NavItem> */}
                </Nav>
            </Fragment>
        )
    }
}

export default MegaMenu;
