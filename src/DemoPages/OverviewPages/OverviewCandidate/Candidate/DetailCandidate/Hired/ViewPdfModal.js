import {Modal, ModalBody, ModalHeader} from "reactstrap";
import React from "react";
import {candidateActions} from "../../../../../../redux/actions";
import {connect} from "react-redux";
//pdf viewer
import {Viewer} from '@react-pdf-viewer/core'; // install this library
// Plugins
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import {Worker} from '@react-pdf-viewer/core'; // install this library
import '../../../../../../assets/addpdf.css'

const ViewPdfModal = ({dataItemPdf, onAddPdf }) => {

    const initialValue = {
        onView: false,
        pdfFile: ""
    }

    // Create new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const setToogle = (value) => {
        onAddPdf(value)
    };

    const closeBtn = (
        <button className="close" onClick={() => setToogle(initialValue)}>
            &times;
        </button>
    );

    return (

        <Modal
            className="modal-preview-pdf modal-xl"
            isOpen={dataItemPdf.onView}
            toggle={() => setToogle(initialValue)}
        >
            <ModalHeader
                toggle={() => setToogle(initialValue)}
                close={closeBtn}
            >
                Document Preview
            </ModalHeader>
            <ModalBody>
                <div className="view-container">
                    <div className='pdf-container' style={{height: '450px'}}>
                        {dataItemPdf.pdfFile ?
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.1.266/build/pdf.worker.min.js">
                                <Viewer fileUrl={"data:application/pdf;base64," + dataItemPdf.pdfFile}
                                        plugins={[defaultLayoutPluginInstance]}/>
                            </Worker>
                            :
                            <div className="pdf-container blank-preview">
                                <span>No pdf file</span>
                            </div>
                        }
                    </div>
                </div>
            </ModalBody>
        </Modal>

    );
}

const mapStateToProps = (state) => ({
    ...state.candidateReducer,
});

const mapDispatchToProps = {
    onAddPdf: candidateActions.onAddPdf,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPdfModal);

