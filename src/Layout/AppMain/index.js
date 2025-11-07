import { Route, Redirect } from 'react-router-dom';
import React, { Suspense, lazy, Fragment } from 'react';
import Loader from 'react-loaders'

import {
    ToastContainer,
} from 'react-toastify';
import ChangePassword from "../../DemoPages/Login/NewPassword";

const OverviewPages = lazy(() => import('../../DemoPages/OverviewPages'));
const InputPages = lazy(() => import('../../DemoPages/InputPages'));
const LoginBox = lazy(() => import('../../DemoPages/Login/LoginBoxed'));

const AppMain = () => {

    if (sessionStorage.getItem('role') === null) {
        return (
            <Fragment>

                {/* LoginPage */}

                <Suspense fallback={
                    <div className="loader-container">
                        <div className="loader-container-inner">
                            <div className="text-center">
                                <Loader type="semi-circle-spin" />
                            </div>
                            <h6 className="mt-3">
                                Selamat Datang
                                <small>Mohon tunggu sebentar</small>
                            </h6>
                        </div>
                    </div>
                }>
                    <Route path="/login" component={LoginBox} />
                </Suspense>

                <Route exact path="/" render={() => (
                    <Redirect to="/login" />
                )} />
                <ToastContainer />
            </Fragment>
        )

    }
    else {
        return (
            <Fragment>

                {/* AdminPages */}

                <Suspense fallback={
                    <div className="loader-container">
                        <div className="loader-container-inner">
                            <div className="text-center">
                                <Loader type="semi-circle-spin" />
                            </div>
                            <h6 className="mt-3">
                                Selamat Datang
                            <small>Mohon tunggu sebentar</small>
                            </h6>
                        </div>
                    </div>
                }>
                    <Route path="/master" component={InputPages} />
                </Suspense>

                <Suspense fallback={
                    <div className="loader-container">
                        <div className="loader-container-inner">
                            <div className="text-center">
                                <Loader type="ball-grid-pulse" />
                            </div>
                            <h6 className="mt-3">
                                Selamat Datang
                            <small>Mohon tunggu sebentar</small>
                            </h6>
                        </div>
                    </div>
                }>
                    <Route path="/overview" component={OverviewPages} />
                </Suspense>

                <Suspense fallback={
                    <div className="loader-container">
                        <div className="loader-container-inner">
                            <div className="text-center">
                                <Loader type="ball-grid-pulse" />
                            </div>
                            <h6 className="mt-3">
                                Selamat Datang
                                <small>Mohon tunggu sebentar</small>
                            </h6>
                        </div>
                    </div>
                }>

                    <Route path={`/changepassword`} component={ChangePassword} />
                </Suspense>


                <Route exact path="/" render={() => (
                    <Redirect to="/overview/dasboard" />
                )} />
                <ToastContainer />
            </Fragment>
        )
    }

};

export default AppMain;