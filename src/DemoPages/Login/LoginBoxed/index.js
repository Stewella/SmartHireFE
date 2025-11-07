import React, {Fragment, useState} from "react";
import {Col, Row, Button, Form, FormGroup, Input} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import qs from "qs";
import {API_LOGIN} from "../../../config/axios";
import jwt from 'jwt-decode';
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Loader from "react-loaders";

const MySwal = withReactContent(Swal);
const LoginBoxed = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [viewPassword, setViewPassword] = useState(false)

    const toggleViewPassword = () => {
        setViewPassword(!viewPassword);
    }

    const [loading, setLoading] = useState(false);

    const validation = async (event) => {
        setLoading(true)

        event.preventDefault()
        let auth = qs.stringify({
            username: username,
            password: password,
        });

        API_LOGIN()
            .post("/token", auth)
            .then((response) => {
                setLoading(false)
                if (response.data.status === 200) {
                    sessionStorage.clear();
                    sessionStorage.setItem('password', password)
                    const dataToken = response.data.data
                    const userInfo = jwt(dataToken.access_token)
                    sessionStorage.setItem('accessTokenResponse', JSON.stringify(dataToken));
                    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
                    sessionStorage.setItem('role', userInfo.resource_access.siska_client.roles)
                    window.location.href = "#/overview/dashboard";
                } else {
                    MySwal.fire({
                        icon: "error",
                        title: response.data.message,
                        showConfirmButton: true,
                        timer: 1500,
                    });
                }
            })
            .catch((error) => {
                setLoading(false)
                sessionStorage.setItem("auth", false);
            });
    };

    return (
        <Fragment>
            {loading ?
                <div className="position-absolute" style={{top: "50%", left: "50%", zIndex: '99'}}>
                    <Loader type="ball-spin-fade-loader"/>
                </div>
                :
                null
            }
            <Form onSubmit={validation}>
                <div className="h-100 bg-heavy-rain bg-animation">
                    <div className="d-flex h-100 justify-content-center align-items-center">
                        <Col md="8" className="mx-auto app-login-box">
                            <div className="app-logo-inverse mx-auto mb-3"/>

                            <div className="modal-dialog w-100 mx-auto">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <div className="h5 modal-title text-center">
                                            <h4 className="mt-2">
                                                <div>Welcome back,</div>
                                                <span>Please sign in to your account below.</span>
                                            </h4>
                                        </div>

                                        <Row form>
                                            <Col md={12}>
                                                <FormGroup>
                                                    <Input
                                                        type="username"
                                                        name="username"
                                                        id="exampleUsername"
                                                        placeholder="Username here..."
                                                        value={username}
                                                        onChange={(event) => {
                                                            setUsername(event.target.value);
                                                        }}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={12}>
                                                <div style={{position: 'relative'}}>
                                                    <FormGroup>
                                                        <Input
                                                            type={viewPassword ? "text" : "password"}
                                                            name="password"
                                                            id="examplePassword"
                                                            placeholder="Password here..."
                                                            value={password}
                                                            onChange={(event) => {
                                                                setPassword(event.target.value);
                                                            }}
                                                            required
                                                        />
                                                    </FormGroup>
                                                    {
                                                        viewPassword ?
                                                            <i className='eye-password' onClick={toggleViewPassword}>
                                                                <FontAwesomeIcon icon={faEye}/>
                                                            </i>
                                                            :
                                                            <i className='eye-password' onClick={toggleViewPassword}>
                                                                <FontAwesomeIcon icon={faEyeSlash}/>
                                                            </i>
                                                    }
                                                </div>

                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="modal-footer clearfix">
                                        <div className="float-right">
                                            <Button color="primary" size="lg">
                                                Login
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </div>
                </div>
            </Form>
        </Fragment>
    );
};

export default LoginBoxed;
