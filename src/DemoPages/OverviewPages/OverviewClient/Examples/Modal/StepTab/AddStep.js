import React, { Component } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import axios from "axios";
import { SERVICE } from "../../../../../../config/config";

import {
  // Card, CardBody, CardTitle, Row, Container,
  // Modal, ModalHeader, ModalBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
} from "reactstrap";

import {
  faPlus,
  faMinus,
  // faSave, faUndo, faChevronDown
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Combobox } from "react-widgets";

class AddStep extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  initialState = {
    modal: false,
    valueStep: "",
    data: [],
    refresh: "",
    idStep: "",
    namaStep: "",
    namaClient: "",
  };

  options = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
  };

  componentDidMount = () => {
    this.getSteps();
    this.getListSteps(this.props.idCl);
  };

  getSteps = () => {
    axios
      .get(SERVICE.JAVA_SERVICE + "/step", this.options)
      .then((response) => response.data)
      .then((data) => {
        let stepList = [];
        data.data.map((step) => stepList.push(step.namaStep));
        this.setState({
          dataList: stepList,
        });
      });
  };

  getListSteps = (id) => {
    axios
      .get(SERVICE.JAVA_SERVICE + "/step-detail/" + id)
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          dataStep: data.data,
        });
      });
  };

  handleAdd = (namaStep) => {
    const stp = {
      namaStep: namaStep,
      namaClient: this.props.nama,
      orderStep: this.state.dataStep.length + 1,
    };

    axios.post(SERVICE.JAVA_SERVICE + "/step-detail", stp).then((response) => {
      this.getListSteps(this.props.idCl);
      this.setState({
        valueStep: "",
      });
    });
  };

  handleRemove = (id) => {
    axios
      .delete(SERVICE.JAVA_SERVICE + "/step-detail/" + id)
      .then((response) => {
        // const index = this.state.dataStep.length - 1;
        var ind = 0;
        for (var i = 0; i < this.state.dataStep.length; i++) {
          if (this.state.dataStep[i].idStepDet !== id && this.state.dataStep[i].idClient === this.props.idCl) {
            ind = ind + 1;
            this.setState({
              idStep: this.state.dataStep[i].idStepDet,
              namaStep: this.state.dataStep[i].namaStep,
              namaClient: this.state.dataStep[i].namaClient,
              orderStep: ind,
            });
            this.changeOrderStep();
            this.setState({
              valueStep: "",
            });
          }
        }
      });
  };

  changeOrderStep = async () => {
    const ord = {
      orderStep: this.state.orderStep,
      namaClient: this.state.namaClient,
      namaStep: this.state.namaStep,
    };
    axios.post(SERVICE.JAVA_SERVICE + "/step-detail/changeOrder/" + this.state.idStep, ord)
      .then(res => {
        this.getListSteps(this.props.idCl);
      })
      .catch(e => {

      })
  };

  dataChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    return (
      <span>
        <Form>
          {this.state.dataStep ? (
            this.state.dataStep.map((dataStep, index) => (
              <CSSTransitionGroup
                key={dataStep.idStepDet}
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}
              >
                <FormGroup row>
                  <Label
                    for="steptList"
                    sm={2}
                    style={{ alignSelf: "center" }}
                  ></Label>
                  <Label for="steptList" sm={1} style={{ alignSelf: "center" }}>
                    {dataStep.orderStep}
                  </Label>
                  {/* <Label for="stepList" sm={1} style={{ alignSelf: "center" }}>Step</Label> */}
                  <Col md="6" style={{ alignSelf: "center" }}>
                    <Input
                      disabled
                      required
                      type="text"
                      name="stepList"
                      id="stepList"
                      defaultValue={dataStep.namaStep}
                    />
                  </Col>
                  <Col md="1" style={{ alignSelf: "center" }}>
                    <FormGroup>
                      <Label></Label>
                      <br />
                      <Button
                        className="btn-pill btn-sm  btn-shine"
                        style={{ background: "#F37970", border: "none" }}
                        onClick={() => { this.handleRemove(dataStep.idStepDet); this.forceUpdate(); }}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </Button>
                    </FormGroup>
                  </Col>
                </FormGroup>
              </CSSTransitionGroup>
            ))
          ) : (
              <FormGroup row>
                <Label md="12" style={{ alignSelf: "center" }}>
                  No Steps Submitted
              </Label>
              </FormGroup>
            )}

          <FormGroup row>
            <Label
              for="steptList"
              sm={2}
              style={{ alignSelf: "center" }}
            ></Label>
            <Label for="stepList" sm={1} style={{ alignSelf: "center" }}>
              Add Step
            </Label>
            <Col md="6" style={{ alignSelf: "center" }}>
              <Combobox
                data={this.state.dataList}
                value={this.state.valueStep}
                textField="name"
                caseSensitive={false}
                minLength={1}
                onChange={(valueStep) => {
                  this.setState({ valueStep });
                }}
                filter="contains"
              />
            </Col>
            {
              <Col md="1" style={{ alignSelf: "center" }}>
                <FormGroup>
                  <Label />
                  <Button
                    className="btn-pill btn-sm  btn-shine"
                    style={{ background: "#8c9eff", border: "none" }}
                    onClick={() => {
                      this.handleAdd(this.state.valueStep);
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </FormGroup>
              </Col>
            }
          </FormGroup>
        </Form>
      </span>
    );
  }
}
export default AddStep;
