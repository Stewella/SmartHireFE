// import React, {useState} from "react";
// import {
//     Modal,
//     ModalBody,
//     ModalHeader,
//     ModalFooter,
//     Button, Label, CustomInput,
// } from "reactstrap";
// import {faSave, faSpinner, faUndo} from "@fortawesome/free-solid-svg-icons";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {library} from '@fortawesome/fontawesome-svg-core'
// import {fab} from '@fortawesome/free-brands-svg-icons'
// import {connect} from "react-redux";
// import {candidateActions} from "../../../../../redux/actions";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import propTypes from "prop-types";
// //pdf viewer
// import {Viewer} from '@react-pdf-viewer/core'; // install this library
// // Plugins
// import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout'; // install this library
// // Import the styles
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// // Worker
// import {Worker} from '@react-pdf-viewer/core'; // install this library
// import '../../../../../assets/addpdf.css'
//
// //spinner
// library.add(fab, faSpinner)
//
//
// const AddPdfModal = ({
//                          dataItemPdf,
//                          onAddPdf,
//                          onChangePdf,
//                          onSubmitPdf
//                      }) => {
//
//     const MySwal = withReactContent(Swal);
//
//     const setToogle = (value) => {
//         onAddPdf(value);
//         setViewPdf(null)
//     };
//
//     //loading
//     const [disabled, setDisabled] = useState(true)
//     const [isLoading, setIsLoading] = useState(false);
//
//     // Create new plugin instance
//     const defaultLayoutPluginInstance = defaultLayoutPlugin();
//
//     // for onchange event
//     // const [pdfFile, setPdfFile] = useState(null)
//     const [pdfFileError, setPdfFileError] = useState('');
//
//     // for view pdf
//     const [viewPdf, setViewPdf] = useState(null);
//
//     // onchange event
//     const fileType = ['application/pdf'];
//     const handlePdfFileChange = (e) => {
//         let selectedFile = e.target.files[0];
//         if (selectedFile) {
//             if (selectedFile && fileType.includes(selectedFile.type)) {
//                 let reader = new FileReader();
//                 reader.readAsDataURL(selectedFile);
//                 reader.onloadend = (e) => {
//                     setViewPdf(e.target.result);
//                     setPdfFileError('');
//                     setDisabled(false)
//                 }
//                 onChangePdf({field: "file", value: selectedFile})
//             } else {
//                 setViewPdf(null);
//                 setPdfFileError('Please select valid pdf file');
//             }
//         }
//     }
//
//     // form submit
//     const handlePdfFileSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true)
//         if (!pdfFileError) {
//             let response = await onSubmitPdf(dataItemPdf.dataRow)
//             setIsLoading(false)
//             if (response.status === 200) {
//                 const Toast = Swal.mixin({
//                     toast: true,
//                     position: 'top-end',
//                     showConfirmButton: false,
//                     timer: 1500,
//                     timerProgressBar: true,
//                     onOpen: (toast) => {
//                         toast.addEventListener('mouseenter', Swal.stopTimer)
//                         toast.addEventListener('mouseleave', Swal.resumeTimer)
//                     }
//                 })
//                 await Toast.fire({
//                     icon: 'success',
//                     title: 'Data berhasil disimpan'
//                 })
//
//                 setToogle({inAddPdf: false})
//                 setDisabled(true)
//             } else if (response.status === 500) {
//                 const Toast = Swal.mixin({
//                     toast: true,
//                     position: 'top-end',
//                     showConfirmButton: false,
//                     timer: 3000,
//                     timerProgressBar: true,
//                     onOpen: (toast) => {
//                         toast.addEventListener('mouseenter', Swal.stopTimer)
//                         toast.addEventListener('mouseleave', Swal.resumeTimer)
//                     }
//                 })
//                 await Toast.fire({
//                     icon: 'error',
//                     title: response.message
//                 })
//                 setDisabled(true)
//             }
//         } else {
//             await MySwal.fire({
//                 icon: "error",
//                 title: "Harap periksa kembali data anda!",
//                 showConfirmButton: false,
//                 timer: 3000,
//             });
//             setIsLoading(false)
//
//         }
//     }
//
//     // form reset
//     const resetForm = () => {
//         setViewPdf(null);
//         setPdfFileError(null)
//         document.getElementsByClassName("custom-file-label")[0].innerText = "Choose file"
//     }
//
//     const closeBtn = (
//         <button className="close" onClick={() => setToogle({inAddPdf: false})}>
//             &times;
//         </button>
//     );
//
//     return (
//         <>
//             <Modal
//                 className="modal-preview-pdf modal-xl"
//                 isOpen={dataItemPdf.inAddPdf}
//                 toggle={() => setToogle({inAddPdf: false})}
//             >
//                 <ModalHeader
//                     toggle={() => setToogle({inAddPdf: false})}
//                     close={closeBtn}
//                 >
//                     Candidate Form
//                 </ModalHeader>
//                 <ModalBody>
//                     <form className='form-group'>
//                         <div className="mb-3">
//                             <Label for="exampleCustomFileBrowser">File Browser</Label>
//                             <CustomInput type="file"
//                                          id="exampleCustomFileBrowser"
//                                          name="customFile"
//                                          invalid={pdfFileError ? true : false}
//                                          required
//                                          onChange={handlePdfFileChange}/>
//                             {pdfFileError && <div className='error-msg'>{pdfFileError}</div>}
//                         </div>
//                     </form>
//                     <div className="view-container">
//                         {viewPdf ?
//                             <div className='pdf-container'>
//                                 {/* show pdf conditionally (if we have one)  */}
//                                 {viewPdf &&
//                                 <><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.1.266/build/pdf.worker.min.js">
//                                     <Viewer fileUrl={viewPdf}
//                                             plugins={[defaultLayoutPluginInstance]}/>
//                                 </Worker></>}
//
//                                 {/* if we dont have pdf or viewPdf state is null */}
//                             </div>
//                             :
//                             <div className="pdf-container blank-preview">
//                                 <span>No pdf file selected</span>
//                             </div>
//                         }
//                     </div>
//                 </ModalBody>
//                 <ModalFooter>
//                     <Button
//                         className="btn-pill btn-lg btn-shadow mt-1"
//                         type="button"
//                         onClick={() => resetForm()}
//                         style={{
//                             float: "left",
//                             backgroundColor: "#ffffff",
//                             border: "none",
//                             color: "currentcolor",
//                         }}
//                     >
//                         <FontAwesomeIcon icon={faUndo}/>
//                         <span> Reset</span>
//                     </Button>
//                     <Button
//                         className="btn-pill btn-lg btn-shadow mt-1"
//                         disabled={disabled || isLoading}
//                         onClick={handlePdfFileSubmit}
//                         style={{
//                             background: "#C0D39A",
//                             border: "none",
//                             color: "currentcolor",
//                         }}
//                     >
//                         {isLoading ? <FontAwesomeIcon icon={['fas', 'spinner']}
//                                                       pulse
//                                                       fixedWidth
//                                                       size="1x"/>
//                             : <FontAwesomeIcon icon={faSave}/>
//                         }
//                         <span> Submit</span>
//                     </Button>
//                 </ModalFooter>
//             </Modal>
//         </>
//     );
// };
//
// const mapStateToProps = (state) => ({
//     ...state.candidateReducer,
// });
//
// const mapDispatchToProps = {
//     onChangePdf: candidateActions.onChangePdf,
//     onAddPdf: candidateActions.onAddPdf,
//     onSubmitPdf: candidateActions.onSubmitPdf,
// };
//
// AddPdfModal.propTypes = {
//     onSubmit: propTypes.func,
//     onChange: propTypes.func,
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(AddPdfModal);
