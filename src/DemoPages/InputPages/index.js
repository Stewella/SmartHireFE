import React, {Fragment} from 'react';
import {Redirect, Route} from 'react-router-dom';

// Pages
import InputIndustry from './InputIndustry';
import InputPosisi from './InputPosisi';
import InputStep from './InputStep';
import InputService from './InputService';
import InputSales from './InputSales';
import InputUser from './InputUser'
import ChangePassword from "../Login/NewPassword";

// Layout
import AppHeader from '../../Layout/AppHeader';
import AppFooter from '../../Layout/AppFooter';
import AppSidebar from '../../Layout/AppSidebar';

const master = {
    "pvm_industri": ["industry", InputIndustry],
    "pvm_posisi": ["posisi", InputPosisi],
    "pvm_step": ["step", InputStep],
    "pvm_service": ["service", InputService],
    "pvm_sales": ["sales", InputSales],
    "pvm_candidate" : ["user", InputUser]
}
const masterKeys = Object.keys(master)
const masterValues = Object.values(master)
const role = sessionStorage.getItem("role")

const InputPages = ({match}) => (
    <Fragment>
        {/* <ThemeOptions /> */}
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">

                    {/*belum di masukin ke menu */}
                    <Route path={`${match.url}/change-password`} component={ChangePassword}/>
                    {/*<Route path={`${match.url}/user`} component={InputUser}/>*/}

                    {
                        masterValues.map((content, index) => {
                            if (role.includes(masterKeys[index])) {
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

export default InputPages;