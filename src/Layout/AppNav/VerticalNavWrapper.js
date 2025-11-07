import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import MetisMenu from 'react-metismenu';
import {
    setEnableMobileMenu
} from '../../redux/reducers/ThemeOptions';
import {dashboard, dashKeys, dashValues,
        master, masterKeys, masterValues,
        menuKeys, menuValues} from "./NavContent"

class Nav extends Component {

    state = {
        sideBar : []
    };

    toggleMobileSidebar = () => {
        let {enableMobileMenu, setEnableMobileMenu} = this.props;
        setEnableMobileMenu(!enableMobileMenu);
    }

    menusidebar = () => {
        const role = sessionStorage.getItem('role')
        let side = [...this.state.sideBar]

        //dashboard
        for (let i = 0; i < dashKeys.length; i++) {
            if (role.includes(dashKeys[i])) {
                if (!dashboard.content.includes(dashValues[i])) {
                    dashboard.content.push(dashValues[i])
                }
            }
        }
        side.push(dashboard)

        //master
        for (let i = 0; i < masterKeys.length; i++) {
            if (role.includes(masterKeys[i])) {
                if (!master.content.includes(masterValues[i])) {
                    master.content.push(masterValues[i])
                }
            }
        }
        side.push(master)

        //menu
        for (let i = 0; i < menuKeys.length; i++) {
            if (role.includes(menuKeys[i])) {
                if (menuKeys[i] === "pvm_candidate") {
                    side.push(menuValues[i][0])
                    side.push(menuValues[i][1])
                } else {
                    side.push(menuValues[i])
                }
            }
        }
        return side
    }

    componentDidMount() {
        let side = this.menusidebar()
        this.setState({
            sideBar : side
        })
    }

    render() {
        const {sideBar} = this.state
        return (
            <Fragment>
                <h5 className="app-sidebar__heading">Menu</h5>
                <MetisMenu content={sideBar} onSelected={this.toggleMobileSidebar}
                           activeLinkFromLocation
                           className="vertical-nav-menu" iconNamePrefix=""
                           classNameStateIcon="pe-7s-angle-down"/>
            </Fragment>
        );
    }

    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }
}

const mapStateToProps = state => ({
    enableMobileMenu: state.ThemeOptions.enableMobileMenu
});

const mapDispatchToProps = dispatch => ({

    setEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable)),

});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));