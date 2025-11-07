import {
    Button, Table
} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {employeeActions} from "../../../../../../redux/actions";
import {connect} from "react-redux";


const EmployeeView = ({toggle, dataItem}) => {

    const setToggle = (value) => {
        toggle(value)
    }

    return (
        <>
            <div className="btn-actions-pane-right">
                <Button
                    className="mr-3 float-left btn-pill mb-3"
                    onClick={() => setToggle({editData: true, cancel: true})}
                    style={{backgroundColor: "grey", border: "none"}}
                >
                    <FontAwesomeIcon icon={faPen}/>
                    <span> Edit</span>
                </Button>
            </div>
            <Table striped className="mb-4">
                <thead className="text-center">
                <tr>
                    <th>Data Pribadi</th>
                    <th>Deskripsi</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td style={{width: 180}}>Nama</td>
                    <td>{dataItem.dataForm.nama}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Jenis Kelamin</td>
                    <td>{dataItem.dataForm.jenisKelamin}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Tempat, Tanggal Lahir</td>
                    <td>
                        {dataItem.dataForm.tempatLahir}, {dataItem.dataForm.tanggalLahir}
                    </td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Status Menikah</td>
                    <td>{dataItem.dataForm.statusMenikah}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Agama</td>
                    <td>{dataItem.dataForm.agama}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Alamat Ktp</td>
                    <td>{dataItem.dataForm.alamat}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Alamat Domisili</td>
                    <td>{dataItem.dataForm.alamatDomisili}</td>
                </tr>
                </tbody>
            </Table>
            <Table striped className="mb-4">
                <thead className="text-center">
                <tr>
                    <th>Pendidikan</th>
                    <th>Deskripsi</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td style={{width: 180}}>Jenjang Pendidikan</td>
                    <td>{dataItem.dataForm.jenjangPendidikan}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Sekolah/Perguruan Tinggi</td>
                    <td>{dataItem.dataForm.sekolah}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Jurusan</td>
                    <td>{dataItem.dataForm.jurusan}</td>
                </tr>
                </tbody>
            </Table>
            <Table striped className="mb-4">
                <thead className="text-center">
                <tr>
                    <th>Kepegawaian</th>
                    <th>Deskripsi</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td style={{width: 180}}>Penempatan Proyek</td>
                    <td>{dataItem.dataForm.penempatanProyek}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Posisi</td>
                    <td>{dataItem.dataForm.posisiHired}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Status Kontrak</td>
                    <td>{dataItem.dataForm.statusKontrak}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Start Join</td>
                    <td>{dataItem.dataForm.startJoin}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>End Kontrak</td>
                    <td>{dataItem.dataForm.endKontrak}</td>
                </tr>
                </tbody>
            </Table>
            <Table striped className="mb-4">
                <thead className="text-center">
                <tr>
                    <th>Dokumen</th>
                    <th>Deskripsi</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td style={{width: 180}}>NIK</td>
                    <td>{dataItem.dataForm.nik}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>No. Kk</td>
                    <td>{dataItem.dataForm.noKk}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>No. NPWP</td>
                    <td>{dataItem.dataForm.noNpwp}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>No. BPJS TK</td>
                    <td>{dataItem.dataForm.noBpjsTk}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>No. BPJS Kesehatan</td>
                    <td>{dataItem.dataForm.noBpjsKesehatan}</td>
                </tr>
                </tbody>
            </Table>
            <Table striped className="mb-4">
                <thead className="text-center">
                <tr>
                    <th>Kontak</th>
                    <th>Deskripsi</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td style={{width: 180}}>Telepon 1</td>
                    <td>{dataItem.dataForm.noHp}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Telepon 2</td>
                    <td>{dataItem.dataForm.telepon2}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>E-mail</td>
                    <td>{dataItem.dataForm.email}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Nama Emergency Contact</td>
                    <td>{dataItem.dataForm.namaEmergencyContact}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Nomor Emergency Contact</td>
                    <td>{dataItem.dataForm.nomorEmergencyContact}</td>
                </tr>
                </tbody>
            </Table>
            <Table striped className="mb-4">
                <thead className="text-center">
                <tr>
                    <th>Keluarga</th>
                    <th>Deskripsi</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td style={{width: 180}}>Nama Istri/Suami</td>
                    <td>{dataItem.dataForm.namaIstriSuami}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Tanggal Lahir Istri/Suami</td>
                    <td>{dataItem.dataForm.tanggalLahirIstriSuami}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Nama Anak 1</td>
                    <td>{dataItem.dataForm.namaAnak1}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Tanggal Lahir Anak 1</td>
                    <td>{dataItem.dataForm.tanggalLahirAnak1}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Nama Anak 2</td>
                    <td>{dataItem.dataForm.namaAnak2}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Tanggal Lahir Anak 2</td>
                    <td>{dataItem.dataForm.tanggalLahirAnak2}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Nama Anak 3</td>
                    <td>{dataItem.dataForm.namaAnak3}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Tanggal Lahir Anak 3</td>
                    <td>{dataItem.dataForm.tanggalLahirAnak3}</td>
                </tr>
                </tbody>
            </Table>
            <Table striped className="mb-4">
                <thead className="text-center">
                <tr>
                    <th>Data Lain</th>
                    <th>Deskripsi</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td style={{width: 180}}>Periode Kontrak 1</td>
                    <td>{dataItem.dataForm.periodeKontrak1}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Periode Kontrak 2</td>
                    <td>{dataItem.dataForm.periodeKontrak2}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Periode Kontrak 3</td>
                    <td>{dataItem.dataForm.periodeKontrak3}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Status Permanen</td>
                    <td>{dataItem.dataForm.statusPermanen}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Mutasi</td>
                    <td>{dataItem.dataForm.mutasi}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>NamaBank</td>
                    <td>{dataItem.dataForm.namaBank}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>No. Rekening</td>
                    <td>{dataItem.dataForm.noRekening}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Nama Rekening</td>
                    <td>{dataItem.dataForm.namaRekening}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>Nama Referensi (atasan sebelumnya)</td>
                    <td>{dataItem.dataForm.namaReferensi}</td>
                </tr>
                <tr>
                    <td style={{width: 180}}>No. Referensi (atasan sebelumnya)</td>
                    <td>{dataItem.dataForm.noReferensi}</td>
                </tr>
                </tbody>
            </Table>
        </>

    );
}

const mapStateToProps = (state) => ({
    ...state.employeeReducer
})

const mapDispatchToProps = {
    toggle: employeeActions.toggle,
    onChange: employeeActions.onChange
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeView);