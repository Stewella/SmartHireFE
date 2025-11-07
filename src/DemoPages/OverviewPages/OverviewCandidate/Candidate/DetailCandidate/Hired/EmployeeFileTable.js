import {Table} from "reactstrap";
import React from "react";
import {connect} from "react-redux";
import {Button} from "react-bootstrap";
import {candidateActions, employeeActions} from "../../../../../../redux/actions";

const EmployeeFileTable = ({docList, delFile, getListFile, getFile, onAddPdf, toggle}) => {

    const deleteFile = (value) => {
        toggle(value)
    }

    const viewPdf = async (id) => {
        const file = await getFile(id);
        onAddPdf({onView: true, pdfFile: file.data})
    };


    return (
        <Table striped className="mb-4">
            <thead className="text-center">
            <tr>
                <th>Nama Dokumen</th>
                <th>Nama File</th>
                <th>Keterangan</th>
                <th>Action</th>
            </tr>
            </thead>

            <tbody>
            {docList ?
                docList.map(content => {
                    return (
                        <tr>
                            <td>{content.namaDocument}</td>
                            <td>{content.namaFile}</td>
                            <td>{content.keterangan}</td>
                            <td>
                                <Button
                                    className="float-right btn-pill btn-sm btn-danger ml-2"
                                    onClick={()=>deleteFile({idUpload : content.idUpload, id: content.id, deleteData: true})}
                                >
                                    Delete
                                </Button>
                                <Button
                                    className="float-right btn-pill btn-sm btn-success"
                                    onClick={()=>viewPdf(content.idUpload)}
                                >
                                    View
                                </Button>
                            </td>
                        </tr>
                    )
                })
                :
                <div className="mt-5 text-center">
                    <p className="m-auto">File tidak tersedia</p>
                </div>
            }


            </tbody>
        </Table>
    )
}


const mapStateToProps = (state) => ({
    ...state.employeeReducer
})

const mapDispatchToProps = {
    delFile: employeeActions.delFile,
    getListFile: employeeActions.getListFile,
    getFile: employeeActions.getFile,
    onAddPdf: candidateActions.onAddPdf,
    toggle: employeeActions.toggle
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeFileTable);
