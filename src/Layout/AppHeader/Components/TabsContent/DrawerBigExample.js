// import React, { Component, Fragment } from 'react';
// import {
//     Button, Collapse, Col, Row, Container
// } from 'reactstrap';
// import {
//     faTrash,
// } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import image from '../../../../assets/utils/images/noorder.png'
// import CurrencyFormat from 'react-currency-format';



// class DrawerBigExample extends Component {
//     constructor(props) {
//         super(props);
//         this.deleteVenue = this.deleteVenue.bind(this);
//         this.deleteDecor = this.deleteDecor.bind(this);
//         this.deleteDam = this.deleteDam.bind(this);
//         this.deleteCatering = this.deleteCatering.bind(this);
//         this.deletePhoto = this.deletePhoto.bind(this);
//     }

//     deleteVenue = (data) => {
//         localStorage.removeItem(data);
//         localStorage.removeItem('keyVenue')
//         localStorage.removeItem('greyVenue')
//         this.setState({ isOpen: false })
//     }

//     deleteDecor = (data) => {
//         localStorage.removeItem(data);
//         localStorage.removeItem('keyDecor')
//         localStorage.removeItem('greyDecor')
//         this.setState({ isOpen: false })
//     }

//     deleteDam = (data) => {
//         localStorage.removeItem(data);
//         localStorage.removeItem('keyDam')
//         localStorage.removeItem('greyDam')
//         this.setState({ isOpen: false })
//     }

//     deleteCatering = (data) => {
//         localStorage.removeItem(data);
//         localStorage.removeItem('keyCatering')
//         localStorage.removeItem('greyCatering')
//         this.setState({ isOpen: false })
//     }

//     deletePhoto = (data) => {
//         localStorage.removeItem(data);
//         localStorage.removeItem('keyPhoto')
//         localStorage.removeItem('greyPhoto')
//         this.setState({ isOpen: false })
//     }

//     render() {
//         const dam = JSON.parse(localStorage.getItem('dam'))
//         const venue = JSON.parse(localStorage.getItem('venue'))
//         const photo = JSON.parse(localStorage.getItem('photo'))
//         const decor = JSON.parse(localStorage.getItem('decor'))
//         const catering = JSON.parse(localStorage.getItem('catering'))
//         return (
//             <>
//             <Fragment>
//                 <div className="drawer-section p-0">
//                     <div className="todo-box">
//                         <Container>
//                             <Container>
//                                 <br/>
//                                 {venue || decor || dam || catering || photo ?
//                                     <>
//                                         <Collapse isOpen={true} >
//                                             {decor ?
//                                                 <>
//                                                     <Row>
//                                                         <Col md={4} style={{ alignSelf: "center" }}>
//                                                             <img src={`http://localhost:1212/v1/app/downloadFile/${decor.imageDecor}`} alt="coba" style={{ width: "122.36px", height: "122.36px", objectFit: "cover" }} />
//                                                         </Col>
//                                                         <Col md={6} style={{ fontSize: "15px", alignSelf: "center" }}>
//                                                             <div>
//                                                                 <p>{decor.nameDecor}</p>
//                                                                 <p style={{ fontWeight: "bold", marginTop: "-1em" }}><CurrencyFormat value={decor.priceDecor} displayType={'text'} thousandSeparator={true} prefix={'IDR. '} /></p>
//                                                             </div>
//                                                         </Col>
//                                                         <Col md={2} style={{ alignSelf: "center" }}>
//                                                             <Button className="btn-pill btn-sm mr-3 btn-shine"
//                                                                 onClick={() => this.deleteDecor('decor')}
//                                                                 style={{ background: "#F37970", border: "none" }}>
//                                                                 <FontAwesomeIcon icon={faTrash} />
//                                                             </Button>
//                                                         </Col>
//                                                     </Row>
//                                                     <br />
//                                                 </>
//                                                 : ""}
//                                         </Collapse>

//                                         <Collapse isOpen={true} >
//                                             {photo ?
//                                                 <>
//                                                     <Row>
//                                                         <Col md={4} style={{ alignSelf: "center" }}>
//                                                             <img src={`http://localhost:1212/v1/app/downloadFile/${photo.imagePhoto}`} alt="coba" style={{ width: "122.36px", height: "122.36px", objectFit: "cover" }} />
//                                                         </Col>
//                                                         <Col md={6} style={{ fontSize: "15px", alignSelf: "center" }}>
//                                                             <>
//                                                                 <p>{photo.namePhoto}</p>
//                                                                 <p style={{ fontWeight: "bold", marginTop: "-1em" }}><CurrencyFormat value={photo.pricePhoto} displayType={'text'} thousandSeparator={true} prefix={'IDR. '} /></p>
//                                                             </>
//                                                         </Col>
//                                                         <Col md={2} style={{ alignSelf: "center" }}>
//                                                             <Button className="btn-pill btn-sm mr-3 btn-shine"
//                                                                 onClick={() => this.deletePhoto('photo')}
//                                                                 style={{ background: "#F37970", border: "none" }}>
//                                                                 <FontAwesomeIcon icon={faTrash} />
//                                                             </Button>
//                                                         </Col>
//                                                     </Row><br />
//                                                 </> : ""}
//                                         </Collapse>

//                                         <Collapse isOpen={true} >
//                                             {catering ?
//                                                 <>
//                                                     <Row>
//                                                         <Col md={4} style={{ alignSelf: "center" }}>
//                                                             <img src={`http://localhost:1212/v1/app/downloadFile/${catering.imageCatering}`} alt="coba" style={{ width: "122.36px", height: "122.36px", objectFit: "cover" }} />
//                                                         </Col>
//                                                         <Col md={6} style={{ fontSize: "15px", alignSelf: "center" }}>
//                                                             <p>{catering.nameCatering}</p>
//                                                             <p style={{ fontWeight: "bold", marginTop: "-1em" }}><CurrencyFormat value={catering.priceCatering} displayType={'text'} thousandSeparator={true} prefix={'IDR. '} /></p>
//                                                         </Col>
//                                                         <Col md={2} style={{ alignSelf: "center" }}>
//                                                             <Button className="btn-pill btn-sm mr-3 btn-shine"
//                                                                 onClick={() => this.deleteCatering('catering')}
//                                                                 style={{ background: "#F37970", border: "none" }}>
//                                                                 <FontAwesomeIcon icon={faTrash} />
//                                                             </Button>
//                                                         </Col>
//                                                     </Row><br />
//                                                 </> : ""}
//                                         </Collapse>

//                                         <Collapse isOpen={true} >
//                                             {dam ?
//                                                 <>
//                                                     <Row>
//                                                         <Col md={4} style={{ alignSelf: "center" }}>
//                                                             <img className="d-block" src={`http://localhost:1212/v1/app/downloadFile/${dam.imageDam}`} alt="coba" style={{ width: "122.36px", height: "122.36px", objectFit: "cover" }} />
//                                                         </Col>
//                                                         <Col md={6} style={{ fontSize: "15px", alignSelf: "center" }}>
//                                                             <p>{dam.nameDam}</p>
//                                                             <p style={{ fontWeight: "bold", marginTop: "-1em" }}><CurrencyFormat value={parseInt(dam.priceDam)} displayType={'text'} thousandSeparator={true} prefix={'IDR. '} /></p>
//                                                         </Col>
//                                                         <Col md={2} style={{ alignSelf: "center" }}>
//                                                             <Button className="btn-pill btn-sm mr-3 btn-shine"
//                                                                 onClick={() => this.deleteDam('dam')}
//                                                                 style={{ background: "#F37970", border: "none" }}>
//                                                                 <FontAwesomeIcon icon={faTrash} />
//                                                             </Button>
//                                                         </Col>
//                                                     </Row>
//                                                     <br />
//                                                 </> : ""}
//                                         </Collapse>

//                                         <Collapse isOpen={true} >
//                                             {venue ?
//                                                 <Row>
//                                                     <Col md={4} style={{ alignSelf: "center" }}>
//                                                         <img src={`http://localhost:1212/v1/app/downloadFile/${venue.imageVenue}`} alt="coba" style={{ width: "122.36px", height: "122.36px", objectFit: "cover" }} />
//                                                     </Col>
//                                                     <Col md={6} style={{ fontSize: "15px", alignSelf: "center" }}>
//                                                         <p>{venue.nameVenue}</p>
//                                                         <p style={{ fontWeight: "bold", marginTop: "-1em" }}><CurrencyFormat value={venue.priceVenue} displayType={'text'} thousandSeparator={true} prefix={'IDR. '} /></p>
//                                                     </Col>
//                                                     <Col md={2} style={{ alignSelf: "center" }}>
//                                                         <Button className="btn-pill btn-sm mr-3 btn-shine"
//                                                             onClick={() => this.deleteVenue('venue')}
//                                                             style={{ background: "#F37970", border: "none" }}>
//                                                             <FontAwesomeIcon icon={faTrash} />
//                                                         </Button>
//                                                     </Col>
//                                                 </Row>
//                                                 : ""}
//                                         </Collapse>
//                                         <br />
//                                         <p style={{
//                                             borderBottom: "5px dotted #C0D39A",
//                                         }} />
//                                         <div className="d-block" style={{ fontWeight: "bold", fontSize: "18px" }}>
//                                             <span>Total Payment</span>
//                                             <div style={{ float: "right", marginRight: "10px", }}>
//                                                 <CurrencyFormat value={(decor ? parseInt(decor.priceDecor) : 0)
//                                                     + (photo ? parseInt(photo.pricePhoto) : 0)
//                                                     + (venue ? parseInt(venue.priceVenue) : 0)
//                                                     + (dam ? parseInt(dam.priceDam) : 0)
//                                                     + (catering ? parseInt(catering.priceCatering) : 0)} displayType={'text'} thousandSeparator={true} prefix={'IDR. '} />
//                                             </div>
//                                         </div>
//                                         <br />
//                                         <Button style={{ float: "right", backgroundColor: "#C0D39A", color: "black", border: "none" }}
//                                             className="mt-1 btn-shadow btn-wide btn-pill"
//                                             href="#/usertransaction/user"
//                                         >Set Plan</Button>
//                                     </>
//                                     :
//                                     <Collapse isOpen={true}>
//                                         <div className="text-center">
//                                             <br/><br/>
//                                             <img src={image} alt="imagedata"  style={{ width: '60%', height: 'auto', alignSelf: 'center' }}>
//                                             </img>
//                                             <p>You have no upcoming plans.</p>
//                                         </div>
//                                     </Collapse>
//                                 }
//                             </Container>
//                         </Container>
//                     </div>
//                 </div>
//                 <br />
//             </Fragment>
//             <br/><br/>
//             </>
//         )
//     }
// }

// export default DrawerBigExample;