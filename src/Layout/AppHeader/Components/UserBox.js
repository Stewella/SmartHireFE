import React, { Fragment } from 'react';

// import Ionicon from 'react-ionicons';

import {
    DropdownToggle, DropdownMenu, Button, UncontrolledButtonDropdown
} from 'reactstrap';

// import {
//     toast,
//     Bounce
// } from 'react-toastify';


import {
     faUserCircle

} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import image1 from '../../../assets/utils/images/header1.jpg';
// import avatar1 from '../../../assets/utils/images/avatars/1.jpg';

class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };

    }

    render() {

        return (
            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="#76846A" className="p-0">
                                        {/* <img width={42} className="rounded-circle" src={avatar1} alt=""/> */}
                                        <FontAwesomeIcon className="ml-2 opacity-8" icon={faUserCircle} size="3x" color="#76846A" />
                                        {/* <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} /> */}
                                    </DropdownToggle>
                                    <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                                        <div className="dropdown-menu-header">
                                            <div className="dropdown-menu-header-inner" style={{ background: "#76846A" }}>
                                                <div className="menu-header-image opacity-2"
                                                    // style={{
                                                    //     backgroundImage: 'url(' + image1 + ')'
                                                    // }}
                                                />
                                                <div className="menu-header-content text-left">
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-3">
                                                                {/* <img width={42} className="rounded-circle" src={avatar1}
                                                                     alt=""/> */}
                                                                <FontAwesomeIcon className="rounded-circle bg-white" icon={faUserCircle} size="3x" color="#76846A" />
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">
                                                                    Admin Login
                                                                </div>
                                                                <div className="widget-subheading opacity-8">
                                                                    Login to access admin console
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right mr-2">
                                                                <Button className="btn-pill btn-shine btn-shadow"
                                                                    style={{ backgroundColor: "#A2BE75", outlineColor: "#778A35", border: "none" }} onClick={(e) => {
                                                                        e.preventDefault();
                                                                        window.location.href = '#/user/login';
                                                                    }}>
                                                                    Login
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default UserBox;