import React, { Fragment } from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faShoppingCart,
    faWindowClose,
} from '@fortawesome/free-solid-svg-icons';

import PerfectScrollbar from 'react-perfect-scrollbar';

import Drawer from 'react-motion-drawer';

import DrawerBigExample from './TabsContent/DrawerBigExample';

class HeaderRightDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            openLeft: false,
            openRight: false,
            relativeWidth: false,
            width: 450,
            noTouchOpen: false,
            noTouchClose: false,
        };

    }


    render() {

        const {
            openRight,
        } = this.state;

        return (
            <Fragment>
                <Drawer
                    right
                    className="drawer-content-wrapper p-0"
                    width={450}
                    open={openRight}
                    onChange={open => this.setState({ openRight: open })}
                    noTouchOpen={false}
                    noTouchClose={false}
                >
                    <PerfectScrollbar>
                        <div className="drawer-heading" style={{ backgroundColor: "#C0D39A", fontSize: "25px", fontWeight: "bolder", textTransform: "none", fontFamily: "Philosopher, sans-serif" }}>
                            <span style={{ textAlign: "left"}}>Our plans</span>
                            <Button
                                style={{ backgroundColor: "transparent", float: "right" }}
                                width={26}
                                color='#6c757d'
                                padding='5px'
                                active={this.state.active}
                                onClick={() => this.setState({ openRight: false, openLeft: false, active: !this.state.active })}>
                                <FontAwesomeIcon
                                    icon={faWindowClose}
                                    size="lg" color="#76846A" />
                            </Button>
                        </div>
                        <DrawerBigExample />
                    </PerfectScrollbar>
                </Drawer>
                <div className="header-btn-lg">
                    <Button
                        style={{ backgroundColor: "transparent" }}
                        width={100}
                        color='##3F3E40'
                        padding='5px'
                        active={this.state.active}
                        onClick={() => this.setState({ openRight: !openRight, openLeft: false, active: !this.state.active })}>
                        <FontAwesomeIcon
                            icon={faShoppingCart}
                            size="lg" color="#76846A" />
                    </Button>
                </div>
            </Fragment>
        )
    }
}

export default HeaderRightDrawer;