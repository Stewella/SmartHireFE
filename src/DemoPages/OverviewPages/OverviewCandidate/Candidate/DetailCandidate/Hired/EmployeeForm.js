import React, {Fragment} from "react";
import {Col, Row} from "react-bootstrap";
import {CustomInput, FormGroup, Input, InputGroup, InputGroupAddon, Label} from "reactstrap";
import Select from "react-select";
import InputMask from "react-input-mask";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhone} from "@fortawesome/free-solid-svg-icons";
import {employeeActions} from "../../../../../../redux/actions";
import {connect} from "react-redux";

const EmployeeForm = ({dataItem, onChange}) => {

    const handleChange = (e) => {
        const {name, value} = e.target
        onChange({field: name, value: value})

    }

    const handleSelectChange = (e) => {
        if (!e) {
            onChange({field: "agama", value: ""})
        } else {
            onChange({field: "agama", value: e.value})
        }
    }

    const agama = [
        { value: "Islam", label: "Islam" },
        { value: "Khatolik", label: "Khatolik" },
        { value: "Protestan", label: "Protestan" },
        { value: "Hindu", label: "Hindu" },
        { value: "Budha", label: "Budha" },
        { value: "Konghuchu", label: "Konghuchu" },
    ];

    return (
        <Fragment>
            <Row className="pl-2 pr-2 pt-2 pb-2">
                <Col className="col-lg-6 pt-4 pb-4 pl-4 pr-4" style={{borderRadius: '5px', backgroundColor: '#f8f9fa'}}>
                    <p className="font-size-xlg font-weight-bold mb-3">Data Diri</p>
                    <FormGroup>
                        <Label for="nama">
                            Nama
                            <span style={{color: "red"}}> *</span>
                        </Label>
                        <Input
                            type="text"
                            name="nama"
                            id="nama"
                            placeholder="Nama"
                            autoComplete="off"
                            value={dataItem.dataForm.nama}
                            onChange={handleChange}
                            // invalid={errors.nama.length > 0 ? true : ""}
                            required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    {/*radio*/}
                    <FormGroup>
                        <Label for="jenisKelamin">
                            Jenis Kelamin
                            <span style={{color: "red"}}> *</span>
                        </Label>
                        <div>
                            <CustomInput
                                type="radio"
                                id="perempuan"
                                name="jenisKelamin"
                                label="Perempuan"
                                value="Perempuan"
                                checked={dataItem.dataForm.jenisKelamin === "Perempuan"}
                                onChange={handleChange}
                                inline
                                required
                            />
                            <CustomInput
                                type="radio"
                                id="laki-laki"
                                name="jenisKelamin"
                                label="Laki-laki"
                                value="Laki-laki"
                                checked={dataItem.dataForm.jenisKelamin === "Laki-laki"}
                                onChange={handleChange}
                                inline
                                required
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="tempatLahir">Tempat Lahir</Label>
                        <span style={{color: "red"}}> *</span>
                        <Input
                            type="text"
                            name="tempatLahir"
                            id="tempatLahir"
                            placeholder="Tempat Lahir"
                            autoComplete="off"
                            value={dataItem.dataForm.tempatLahir}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="tanggalLahir">Tanggal Lahir</Label>
                        <span style={{color: "red"}}> *</span>
                        <Input
                            type="date"
                            name="tanggalLahir"
                            id="tanggalLahir"
                            placeholder="Tanggal Lahir"
                            autoComplete="off"
                            value={dataItem.dataForm.tanggalLahir}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    {/*radio*/}
                    <FormGroup>
                        <Label for="statusMenikah">
                            Status Menikah
                            <span style={{color: "red"}}> *</span>
                        </Label>
                        <div>
                            <CustomInput
                                type="radio"
                                id="menikah"
                                name="statusMenikah"
                                label="Menikah"
                                value="Menikah"
                                checked={dataItem.dataForm.statusMenikah === "Menikah"}
                                onChange={handleChange}
                                inline
                                required
                            />
                            <CustomInput
                                type="radio"
                                id="belumMenikah"
                                name="statusMenikah"
                                label="Belum Menikah"
                                value="Belum Menikah"
                                checked={dataItem.dataForm.statusMenikah === "Belum Menikah"}
                                onChange={handleChange}
                                inline
                                required
                            />
                        </div>
                    </FormGroup>
                    {/*select*/}
                    <FormGroup>
                        <Label for="agama">
                            Agama
                            <span style={{color: "red"}}> *</span>
                        </Label>
                        { dataItem.dataForm.agama ?
                            <Select
                                name="agama"
                                id="agama"
                                options={agama}
                                isClearable
                                onChange={handleSelectChange}
                                defaultValue={{value: dataItem.dataForm.agama, label: dataItem.dataForm.agama }}
                                placeholder="Pilih Agama"
                            />
                            :
                            <Select
                                name="agama"
                                id="agama"
                                options={agama}
                                isClearable
                                onChange={handleSelectChange}
                                placeholder="Agama"
                            />
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label for="alamatKtp">
                            Alamat KTP
                            <span style={{color: "red"}}> *</span>
                        </Label>
                        <Input
                            type="text"
                            name="alamat"
                            id="alamat"
                            placeholder="Alamat KTP"
                            autoComplete="off"
                            value={dataItem.dataForm.alamat}
                            onChange={handleChange}
                            // invalid={errors.alamat.length > 0 ? true : ""}
                            required
                        />
                        {/*{errors.alamat.length > 0 && (*/}
                        {/*    <span className="error">{errors.alamat}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="alamatDomisili">
                            Alamat Domisili
                            <span style={{color: "red"}}> *</span>
                        </Label>
                        <Input
                            type="text"
                            name="alamatDomisili"
                            id="alamatDomisili"
                            placeholder="Alamat Domisili"
                            autoComplete="off"
                            value={dataItem.dataForm.alamatDomisili}
                            onChange={handleChange}
                            // invalid={errors.alamat.length > 0 ? true : ""}
                            required
                        />
                        {/*{errors.alamat.length > 0 && (*/}
                        {/*    <span className="error">{errors.alamat}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                </Col>
                <Col className="col-lg-6 pt-4 pb-4 pl-4 pr-4" style={{borderRadius: '5px', backgroundColor: '#f8f9fa'}}>
                    <p className="font-size-xlg font-weight-bold mb-3">Data Pendidikan</p>
                    <FormGroup>
                        <Label for="jenjangPendidikan">
                            Jenjang Pendidikan
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <Input
                            type="text"
                            name="jenjangPendidikan"
                            id="jenjangPendidikan"
                            placeholder="Jenjang Pendidikan"
                            autoComplete="off"
                            value={dataItem.dataForm.jenjangPendidikan}
                            onChange={handleChange}
                            // invalid={errors.nama.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="sekolah">
                            Perguruan Tinggi / Sekolah
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <Input
                            type="text"
                            name="sekolah"
                            id="sekolah"
                            placeholder="Perguruan Tinggi / Sekolah"
                            autoComplete="off"
                            value={dataItem.dataForm.sekolah}
                            onChange={handleChange}
                            // invalid={errors.nama.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="jurusan">
                            Jurusan
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <Input
                            type="text"
                            name="jurusan"
                            id="jurusan"
                            placeholder="Jurusan"
                            autoComplete="off"
                            value={dataItem.dataForm.jurusan}
                            onChange={handleChange}
                            // invalid={errors.nama.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                </Col>
            </Row>
            <Row className="pl-2 pr-2 pt-2 pb-2">
                <Col className="col-lg-6 pt-4 pb-4 pl-4 pr-4" style={{borderRadius: '5px', backgroundColor: '#f8f9fa'}}>
                    <p className="font-size-xlg font-weight-bold mb-3">Data Kepegawaian</p>
                    <FormGroup>
                        <Label for="penempatanProyek">
                            Penempatan Proyek
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <Input
                            type="text"
                            name="penempatanProyek"
                            id="penempatanProyek"
                            placeholder="Penempatan Proyek"
                            autoComplete="off"
                            value={dataItem.dataForm.penempatanProyek}
                            onChange={handleChange}
                            // invalid={errors.nama.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="posisi">
                            Posisi
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <Input
                            type="text"
                            name="posisiHired"
                            id="posisiHired"
                            placeholder="Posisi"
                            autoComplete="off"
                            value={dataItem.dataForm.posisiHired}
                            onChange={handleChange}
                            // invalid={errors.nama.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="statusKontrak">
                            Status Kontrak
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <Input
                            type="text"
                            name="statusKontrak"
                            id="statusKontrak"
                            placeholder="Status Kontrak"
                            autoComplete="off"
                            value={dataItem.dataForm.statusKontrak}
                            onChange={handleChange}
                            // invalid={errors.nama.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="startJoin">
                            Start Join
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <Input
                            type="date"
                            name="startJoin"
                            id="startJoin"
                            placeholder="Start Join"
                            autoComplete="off"
                            value={dataItem.dataForm.startJoin}
                            onChange={handleChange}
                            // invalid={errors.nama.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="endKontrak">
                            End Kontrak
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <Input
                            type="date"
                            name="endKontrak"
                            id="endKontrak"
                            placeholder="End Kontrak"
                            autoComplete="off"
                            value={dataItem.dataForm.endKontrak}
                            onChange={handleChange}
                            // invalid={errors.email.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.email.length > 0 && (*/}
                        {/*    <span className="error">{errors.email}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                </Col>
                <Col className="col-lg-6 pt-4 pb-4 pl-4 pr-4" style={{borderRadius: '5px', backgroundColor: '#f8f9fa'}}>
                    <p className="font-size-xlg font-weight-bold mb-3">Data Dokumen</p>
                    <FormGroup>
                        <Label for="nik">
                            NIK
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <InputMask
                            className="form-control"
                            mask="9999999999999999"
                            maskChar={null}
                            name="nik"
                            id="nik"
                            placeholder="NIK"
                            autoComplete="off"
                            value={dataItem.dataForm.nik}
                            onChange={handleChange}
                            // invalid={errors.noHp.length > 0 ? true : ""}
                            // required
                        />

                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="noKk">
                            No. KK
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <InputMask
                            className="form-control"
                            mask="9999999999999999"
                            maskChar={null}
                            name="noKk"
                            id="noKk"
                            placeholder="No. KK"
                            autoComplete="off"
                            value={dataItem.dataForm.noKk}
                            onChange={handleChange}
                            // onKeyPress={($event) => numberOnly($event)}
                            // invalid={errors.noHp.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="noNpwp">
                            No. NPWP
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <InputMask
                            className="form-control"
                            mask="9999999999999999"
                            maskChar={null}
                            name="noNpwp"
                            id="noNpwp"
                            placeholder="No. NPWP"
                            autoComplete="off"
                            value={dataItem.dataForm.noNpwp}
                            onChange={handleChange}
                            // onKeyPress={($event) => numberOnly($event)}
                            // invalid={errors.noHp.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="noBpjsTk">
                            No. BPJS TK
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <InputMask
                            className="form-control"
                            mask="9999999999999999"
                            maskChar={null}
                            name="noBpjsTk"
                            id="noBpjsTk"
                            placeholder="No. BPJS TK"
                            autoComplete="off"
                            value={dataItem.dataForm.noBpjsTk}
                            onChange={handleChange}
                            // onKeyPress={($event) => numberOnly($event)}
                            // invalid={errors.noHp.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="noBpjsKesehatan">
                            No. BPJS Kesehatan
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <InputMask
                            className="form-control"
                            mask="9999999999999999"
                            maskChar={null}
                            name="noBpjsKesehatan"
                            id="noBpjsKesehatan"
                            placeholder="No. BPJS Kesehatan"
                            autoComplete="off"
                            value={dataItem.dataForm.noBpjsKesehatan}
                            onChange={handleChange}
                            // onKeyPress={($event) => numberOnly($event)}
                            // invalid={errors.noHp.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                </Col>
            </Row>
            <Row className="pl-2 pr-2 pt-2 pb-2">
                <Col className="col-lg-6 pt-4 pb-4 pl-4 pr-4" style={{borderRadius: '5px', backgroundColor: '#f8f9fa'}}>
                    <p className="font-size-xlg font-weight-bold mb-3">Data Kontak</p>
                    <FormGroup>
                        <Label for="telepon1">
                            Telepon 1
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                                <div className="input-group-text">
                                    <FontAwesomeIcon icon={faPhone}/>
                                </div>
                            </InputGroupAddon>
                            <InputMask
                                className="form-control"
                                mask="+62999999999999"
                                maskChar={null}
                                name="noHp"
                                id="noHp"
                                placeholder="Telepon 1"
                                autoComplete="off"
                                value={dataItem.dataForm.noHp}
                                onChange={handleChange}
                                // onKeyPress={($event) => numberOnly($event)}
                                // invalid={errors.noHp.length > 0 ? true : ""}
                                // required
                            />
                        </InputGroup>
                        {/*{errors.noHp.length > 0 && (*/}
                        {/*    <span className="error">{errors.noHp}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="telepon2">
                            Telepon 2
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                                <div className="input-group-text">
                                    <FontAwesomeIcon icon={faPhone}/>
                                </div>
                            </InputGroupAddon>
                            <InputMask
                                className="form-control"
                                mask="+62999999999999"
                                maskChar={null}
                                name="telepon2"
                                id="telepon2"
                                placeholder="Telepon 2"
                                autoComplete="off"
                                value={dataItem.dataForm.telepon2}
                                onChange={handleChange}
                                // invalid={errors.noHp.length > 0 ? true : ""}
                                // required
                            />
                        </InputGroup>
                        {/*{errors.noHp.length > 0 && (*/}
                        {/*    <span className="error">{errors.noHp}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">
                            Email
                            {/*<span style={{ color: "red" }}> *</span>*/}
                        </Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            autoComplete="off"
                            value={dataItem.dataForm.email}
                            onChange={handleChange}
                            // invalid={errors.email.length > 0 ? true : ""}
                            // required
                            // disabled
                        />
                        {/*{errors.email.length > 0 && (*/}
                        {/*    <span className="error">{errors.email}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="namaEmergencyContact">
                            Nama Emergency Contact
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <Input
                            type="text"
                            name="namaEmergencyContact"
                            id="namaEmergencyContact"
                            placeholder="Nama Emergency Contact"
                            autoComplete="off"
                            value={dataItem.dataForm.namaEmergencyContact}
                            onChange={handleChange}
                            // invalid={errors.nama.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="nomorEmergencyContact">
                            Nomor Emergency Contact
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                                <div className="input-group-text">
                                    <FontAwesomeIcon icon={faPhone}/>
                                </div>
                            </InputGroupAddon>
                            <InputMask
                                className="form-control"
                                mask="+62999999999999"
                                maskChar={null}
                                name="nomorEmergencyContact"
                                id="nomorEmergencyContact"
                                placeholder="Nomor Emergency Contact"
                                autoComplete="off"
                                value={dataItem.dataForm.nomorEmergencyContact}
                                onChange={handleChange}
                                // invalid={errors.noHp.length > 0 ? true : ""}
                                // required
                            />
                        </InputGroup>
                        {/*{errors.noHp.length > 0 && (*/}
                        {/*    <span className="error">{errors.noHp}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                </Col>
                <Col className="col-lg-6 pt-4 pb-4 pl-4 pr-4" style={{borderRadius: '5px', backgroundColor: '#f8f9fa'}}>
                    <p className="font-size-xlg font-weight-bold mb-3">Data Keluarga</p>
                    <FormGroup>
                        <Label for="namaIstriSuami">
                            Nama Istri / Suami
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <Input
                            type="text"
                            name="namaIstriSuami"
                            id="namaIstriSuami"
                            placeholder="Nama Istri / Suami"
                            autoComplete="off"
                            value={dataItem.dataForm.namaIstriSuami}
                            onChange={handleChange}
                            // invalid={errors.nama.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="tanggalLahirIstriSuami">
                            Tanggal Lahir Istri / Suami
                        </Label>
                        <Input
                            type="date"
                            name="tanggalLahirIstriSuami"
                            id="tanggalLahirIstriSuami"
                            placeholder="Tanggal Lahir Istri / Suami"
                            autoComplete="off"
                            value={dataItem.dataForm.tanggalLahirIstriSuami}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="namaAnak1">
                            Nama Anak 1
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <Input
                            type="text"
                            name="namaAnak1"
                            id="namaAnak1"
                            placeholder="Nama Anak 1"
                            autoComplete="off"
                            value={dataItem.dataForm.namaAnak1}
                            onChange={handleChange}
                            // invalid={errors.nama.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="tanggalLahirAnak1">
                            Tanggal Lahir Anak 1
                        </Label>
                        <Input
                            type="date"
                            name="tanggalLahirAnak1"
                            id="tanggalLahirAnak1"
                            placeholder="Tanggal Lahir Anak 1"
                            autoComplete="off"
                            value={dataItem.dataForm.tanggalLahirAnak1}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="namaAnak2">
                            Nama Anak 2
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <Input
                            type="text"
                            name="namaAnak2"
                            id="namaAnak2"
                            placeholder="Nama Anak 2"
                            autoComplete="off"
                            value={dataItem.dataForm.namaAnak2}
                            onChange={handleChange}
                            // invalid={errors.nama.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="tanggalLahirAnak2">
                            Tanggal Lahir Anak 2
                        </Label>
                        <Input
                            type="date"
                            name="tanggalLahirAnak2"
                            id="tanggalLahirAnak2"
                            placeholder="Tanggal Lahir Anak 2"
                            autoComplete="off"
                            value={dataItem.dataForm.tanggalLahirAnak2}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="namaAnak3">
                            Nama Anak 3
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <Input
                            type="text"
                            name="namaAnak3"
                            id="namaAnak3"
                            placeholder="Nama Anak 3"
                            autoComplete="off"
                            value={dataItem.dataForm.namaAnak3}
                            onChange={handleChange}
                            // invalid={errors.nama.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="tanggalLahirAnak3">
                            Tanggal Lahir Anak 3
                        </Label>
                        <Input
                            type="date"
                            name="tanggalLahirAnak3"
                            id="tanggalLahirAnak3"
                            placeholder="Tanggal Lahir Anak 3"
                            autoComplete="off"
                            value={dataItem.dataForm.tanggalLahirAnak3}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row className="pl-2 pr-2 pt-2 pb-2">
                <Col className="col-lg-12 pt-4 pb-4 pl-4 pr-4" style={{borderRadius: '5px', backgroundColor: '#f8f9fa'}}>
                    <p className="font-size-xlg font-weight-bold mb-3">Data Lain</p>
                    <FormGroup>
                        <Label for="periodeKontrak1">
                            Periode Kontrak 1
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <Input
                            type="text"
                            name="periodeKontrak1"
                            id="periodeKontrak1"
                            placeholder="Periode Kontrak 1"
                            autoComplete="off"
                            value={dataItem.dataForm.periodeKontrak1}
                            onChange={handleChange}
                            // invalid={errors.nama.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="periodeKontrak2">
                            Periode Kontrak 2
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <Input
                            type="text"
                            name="periodeKontrak2"
                            id="periodeKontrak2"
                            placeholder="Periode Kontrak 2"
                            autoComplete="off"
                            value={dataItem.dataForm.periodeKontrak2}
                            onChange={handleChange}
                            // invalid={errors.nama.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="periodeKontrak3">
                            Periode Kontrak 3
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <Input
                            type="text"
                            name="periodeKontrak3"
                            id="periodeKontrak3"
                            placeholder="Periode Kontrak 3"
                            autoComplete="off"
                            value={dataItem.dataForm.periodeKontrak3}
                            onChange={handleChange}
                            // invalid={errors.nama.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="statusPermanen">
                            Status Permanen
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <Input
                            type="text"
                            name="statusPermanen"
                            id="statusPermanen"
                            placeholder="Status Permanen"
                            autoComplete="off"
                            value={dataItem.dataForm.statusPermanen}
                            onChange={handleChange}
                            // invalid={errors.nama.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="mutasi">
                            Mutasi
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <Input
                            type="text"
                            name="mutasi"
                            id="mutasi"
                            placeholder="Mutasi"
                            autoComplete="off"
                            value={dataItem.dataForm.mutasi}
                            onChange={handleChange}
                            // invalid={errors.nama.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="namaBank">
                            Nama Bank
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <Input
                            type="text"
                            name="namaBank"
                            id="namaBank"
                            placeholder="Nama Bank"
                            autoComplete="off"
                            value={dataItem.dataForm.namaBank}
                            onChange={handleChange}
                            // invalid={errors.nama.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="noRekening">
                            No. Rekening
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <InputMask
                            className="form-control"
                            mask="9999999999999999"
                            maskChar={null}
                            name="noRekening"
                            id="noRekening"
                            placeholder="No. Rekening"
                            autoComplete="off"
                            value={dataItem.dataForm.noRekening}
                            onChange={handleChange}
                            // onKeyPress={($event) => numberOnly($event)}
                            // invalid={errors.noHp.length > 0 ? true : ""}
                            // required
                        />

                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="namaRekening">
                            Nama Rekening
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <Input
                            type="text"
                            name="namaRekening"
                            id="namaRekening"
                            placeholder="Nama Rekening"
                            autoComplete="off"
                            value={dataItem.dataForm.namaRekening}
                            onChange={handleChange}
                            // invalid={errors.nama.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="namaReferensi">
                            Nama Referensi (atasan selumnya)
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <Input
                            type="text"
                            name="namaReferensi"
                            id="namaReferensi"
                            placeholder="Nama Referensi (atasan selumnya)"
                            autoComplete="off"
                            value={dataItem.dataForm.namaReferensi}
                            onChange={handleChange}
                            // invalid={errors.nama.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>
                    <FormGroup>
                        <Label for="noReferensi">
                            No. Referensi (atasan selumnya)
                            {/*<span style={{color: "red"}}> *</span>*/}
                        </Label>
                        <InputMask
                            className="form-control"
                            mask="9999999999999999"
                            maskChar={null}
                            name="noReferensi"
                            id="noReferensi"
                            placeholder="No. Referensi (atasan selumnya)"
                            autoComplete="off"
                            value={dataItem.dataForm.noReferensi}
                            onChange={handleChange}
                            // onKeyPress={($event) => numberOnly($event)}
                            // invalid={errors.noHp.length > 0 ? true : ""}
                            // required
                        />
                        {/*{errors.nama.length > 0 && (*/}
                        {/*    <span className="error">{errors.nama}</span>*/}
                        {/*)}*/}
                    </FormGroup>

                </Col>
            </Row>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    ...state.employeeReducer
})

const mapDispatchToProps = {
    onChange: employeeActions.onChange
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);