import React, { Component, Fragment } from "react";
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import axios from "axios";
import classnames from "classnames";
import { SERVICE } from "../../../../../../config/config";

import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardHeader,
} from "reactstrap";

// import {
//     faSave, faPlus, faMinus, faUndo, faChevronRight, faTasks
// } from '@fortawesome/free-solid-svg-icons';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DetailKebutuhan from "./DetailKebutuhan";
import PicTable from "./PicTable";

// import { Combobox } from 'react-widgets';

class AddPic extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.toggle = this.toggle.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  initialState = {
    modal: false,
    stepDetail: false,
    editOpen: false,
    picName: "",
    picEmail: "",
    picNoHp: "",
    idPic: "",
    data: [],
    namapic: "",
    refresh: "",
    activeTab: "1",
  };

  toggleStep = () => {
    this.setState({ stepDetail: !this.state.stepDetail });
  };

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  options = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
  };

  componentDidMount = () => {
    this.getListPic(this.props.nama);
  };

  getListPic = (nama) => {
    axios
      .get(SERVICE.JAVA_SERVICE + "/pic/byclient/" + nama)
      .then((response) => response.data)
      .then((data) => {
        let picList = [];
        data.data.map((pic) => picList.push(pic.picName));
        this.setState({
          dataPic: data.data,
        });
      });
  };

  handleAdd = (nama) => {
    const pic = {
      client: nama,
      picName: this.state.picName,
      picEmail: this.state.picEmail,
      picNoHp: this.state.picNoHp,
    };
    axios.post(SERVICE.JAVA_SERVICE + "/pic/insert", pic).then((response) => {
      this.getListPic(this.props.nama);
      this.setState({
        picName: "",
        picEmail: "",
        picNoHp: "",
      });
    });
  };

  handleEdit = (id) => {
    this.setState({ idPic: id });
    axios
      .get(SERVICE.JAVA_SERVICE + "/pic/byid/" + id)
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          picName: data.data.picName,
          picEmail: data.data.picEmail,
          picNoHp: data.data.picNoHp,
        });
      });
    this.setState({ editOpen: !this.state.editOpen });
  };

  handleSave = (id) => {
    const pic = {
      picName: this.state.picName,
      picEmail: this.state.picEmail,
      picNoHp: this.state.picNoHp,
    };
    axios
      .put(SERVICE.JAVA_SERVICE + "/pic/edit/" + id, pic)
      .then((response) => {
        this.getListPic(this.props.nama);
        this.setState({
          picName: "",
          picEmail: "",
          picNoHp: "",
        });
        this.setState({ editOpen: !this.state.editOpen });
      });
  };

  dataChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Col md="4" className="border-right">
            <Container>
              <Form>
                <Row>
                  <Label style={{ alignSelf: "center" }}>PIC</Label>
                </Row>
                <FormGroup row>
                  <Label for="picList" sm={3} style={{ alignSelf: "center" }}>
                    Name
                  </Label>
                  <Col md="8" style={{ alignSelf: "center" }}>
                    <Input
                      required
                      autoComplete="off"
                      type="text"
                      name="picName"
                      id="picName"
                      value={this.state.picName}
                      onChange={this.dataChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="picEmail" sm={3} style={{ alignSelf: "center" }}>
                    Email
                  </Label>
                  <Col md="8" style={{ alignSelf: "center" }}>
                    <Input
                      required
                      autoComplete="off"
                      type="text"
                      name="picEmail"
                      id="picEmail"
                      value={this.state.picEmail}
                      onChange={this.dataChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="picNoHp" sm={3} style={{ alignSelf: "center" }}>
                    No Hp
                  </Label>
                  <Col md="8" style={{ alignSelf: "center" }}>
                    <Input
                      required
                      autoComplete="off"
                      type="text"
                      name="picNoHp"
                      id="picNoHp"
                      value={this.state.picNoHp}
                      onChange={this.dataChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Label />

                  {this.state.editOpen === false ? (
                    <Button
                      className="btn-pill btn-lg  btn-shine float-right"
                      style={{ background: "#8c9eff", border: "none" }}
                      onClick={() => {
                        this.handleAdd(this.props.nama);
                      }}
                    >
                      Add
                    </Button>
                  ) : (
                    <Button
                      className="btn-pill btn-lg  btn-shine float-right"
                      style={{ background: "#9ACD32", border: "none" }}
                      onClick={() => {
                        this.handleSave(this.state.idPic);
                      }}
                    >
                      Save
                    </Button>
                  )}
                </FormGroup>
              </Form>
              <PicTable
                client={this.props.nama}
                listpic={this.state.dataPic}
                edit={(id) => this.handleEdit(id)}
              />
            </Container>
          </Col>
          <Col md="8">
            <Container>
              <Row>
                <Label style={{ alignSelf: "center" }}>Kebutuhan</Label>
              </Row>
              <Card tabs="true" className="mb-3">
                <CardHeader className="tabs-sm">
                  {this.state.dataPic
                    ? this.state.dataPic.map((dataPic, index) => (
                        <Nav justified key={dataPic.id}>
                          <NavItem>
                            <NavLink
                              href="#"
                              className={classnames({
                                active: this.state.activeTab === dataPic.id,
                              })}
                              onClick={() => {
                                this.toggleTab(dataPic.id);
                              }}
                            >
                              <div className="widget-number">
                                {dataPic.picName}
                              </div>
                            </NavLink>
                          </NavItem>
                        </Nav>
                      ))
                    : ""}
                </CardHeader>
                <TabContent activeTab={this.state.activeTab}>
                  {this.state.dataPic
                    ? this.state.dataPic.map((dataPic, index) => (
                        <TabPane tabId={dataPic.id} key={dataPic.id}>
                          <CardBody>
                            <DetailKebutuhan
                              isOpen={dataPic.isOpen}
                              key={dataPic.picName}
                              pic={dataPic.picName}
                              idPic={dataPic.id}
                              client={this.props.nama}
                            />
                          </CardBody>
                        </TabPane>
                      ))
                    : ""}
                </TabContent>
              </Card>
            </Container>
          </Col>
        </Row>
        <FormGroup
          check
          row
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Button
            size="lg"
            className="mb-3 mr-2 btn-pill btn-danger"
            onClick={() => {
              this.setState(this.initialState);
              this.props.togglein();
            }}
          >
            Close
          </Button>
        </FormGroup>
      </Fragment>
    );
  }
}
export default AddPic;
