import React, {useState, Fragment} from "react";
import {Auth} from "aws-amplify";
// import {useHistory} from "react-router-dom";
import {FormGroup, FormControl} from "react-bootstrap";
import "./index.css"
import {useFormFields} from "../../../libs/hooksLib.js";
import "../../../libs/ChangePassword.css";
import {Card, CardBody, Label} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import LoaderButton from "./LoaderButton";

const eye = <FontAwesomeIcon icon={faEye} />;
const eyeX = <FontAwesomeIcon icon={faEyeSlash} />;

export default function ChangePassword() {
    // const history = useHistory();
    const [fields, handleFieldChange] = useFormFields({
        password: "",
        oldPassword: sessionStorage.getItem('password'),
        confirmPassword: "",
    });

    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const toggleConfirmPasswordVisiblity = () => {
        setConfirmPasswordShown(confirmPasswordShown ? false : true);
    };

    const [isChanging, setIsChanging] = useState(false);

    function validateForm() {
        return (
            fields.oldPassword.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    async function handleChangeClick(event) {
        event.preventDefault();

        setIsChanging(true);

        try {
            const currentUser = await Auth.currentAuthenticatedUser();
            await Auth.changePassword(
                currentUser,
                fields.oldPassword,
                fields.password
            );

            // history.push("/settings");
        } catch (error) {
            setIsChanging(true);
        }
    }

    return (
        <Fragment>
            <div className="ChangePassword">
                <Card>
                    <CardBody>
                        <form onSubmit={handleChangeClick}>
                            <FormGroup bsSize="large" controlId="oldPassword">
                                <Label>Old Password</Label>
                                <FormControl
                                    type="text"
                                    // onChange={}
                                    value={fields.oldPassword}
                                />
                            </FormGroup>

                            <FormGroup bsSize="large" controlId="password" className="pwd-container">
                                <Label>New Password</Label>
                                <div style={{position:"relative"}}>
                                    <FormControl
                                        type={passwordShown ? "text" : "password"}
                                        onChange={handleFieldChange}
                                        value={fields.password}
                                    />
                                    {passwordShown? <i onClick={togglePasswordVisiblity}>{eye}</i>
                                                  : <i onClick={togglePasswordVisiblity}>{eyeX}</i>}
                                </div>
                            </FormGroup>
                            <FormGroup bsSize="large" controlId="confirmPassword" className="pwd-container">
                                <Label>Confirm Password</Label>
                                <div style={{position:"relative"}}>
                                    <FormControl
                                        type={confirmPasswordShown ? "text" : "password"}
                                        onChange={handleFieldChange}
                                        value={fields.confirmPassword}
                                    />
                                    {confirmPasswordShown? <i onClick={toggleConfirmPasswordVisiblity}>{eye}</i>
                                                         : <i onClick={toggleConfirmPasswordVisiblity}>{eyeX}</i>}
                                </div>
                            </FormGroup>
                            <LoaderButton
                                block
                                type="submit"
                                bsSize="large"
                                disabled={!validateForm()}
                                isLoading={isChanging}
                            >
                                Change Password
                            </LoaderButton>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </Fragment>
    );
}