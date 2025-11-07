import React, { Fragment, useState } from "react";
import {
  CustomInput,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import TableProfile from "./TabProfile";
import { faSave, faUndo, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { connect } from "react-redux";
import { candidateActions } from "../../../../../../redux/actions";
import propTypes from "prop-types";
import NumberFormat from "react-number-format";
import InputMask from "react-input-mask";
import moment from "moment-timezone";

const MySwal = withReactContent(Swal);

const ProfileForm = ({
  dataItemTab,
  onChangeTab,
  onSubmitTab,
  onAdd,
  dataItem,
}) => {
  // const [disabled, setDisabled] = useState(false);
  const currentDate = moment().format("yyyy-MM-D");
  const [errors, setErrors] = useState({
    kode: "",
    nama: "",
    jenisKelamin: "",
    tempatLahir: "",
    tanggalLahir: "",
    alamat: "",
    email: "",
    noHp: "",
    ekspektasiGaji: "",
    waktuAvailable: "",
    tanggalProses: ""
  });
  const status = [
    { value: "Hired", label: "Hired" },
    { value: "Available", label: "Available" },
    { value: "Not Available", label: "Not Available" },
  ];
  const avail = [
    { value: "Available", label: "Available" },
    { value: "Not Available", label: "Not Available" },
  ];
  const setToogle = (value) => {
    onAdd(value);
  };
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
  // const [gaji, setGaji] = useState(0);
  // const currency = (x) => {
  //   setGaji(x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  // };

  const numberOnly = (evt) => {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      evt.preventDefault();
    } else {
      return true;
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let error = errors;
    switch (name) {
      case "nama":
        if (value.length < 1) {
          error.nama = "Nama wajib diisi";
        } else {
          error.nama = "";
        }
        break;
      case "alamat":
        error.alamat = value.length < 1 ? "Alamat wajib diisi" : "";
        break;
      case "email":
        if (value.length < 1) {
          error.email = "Email wajib diiisi";
        } else if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )
        ) {
          error.email = "Email tidak valid";
        } else {
          error.email = "";
        }
        break;
      case "noHp":
        // if (!/^[0-9\b]+$/.test(value) && value.length > 0) {
        //   error.noHp = "No Hp wajib berupa angka";
        // } 
        if (value.length < 1) {
          error.noHp = "No Hp wajib diisi";
        } else if (value.length > 13+2) {
          error.noHp = "No Hp maksimal 13 angka";
        } else if (value.length < 10) {
          error.noHp = "No Hp minimal 10 angka";
        } else {
          error.noHp = "";
        }
        break;
        // case "tanggalProses":
        //   error.tanggalProses = value.length < 1 ? "Tanggal Proses wajib diisi" : "";
        //   break;
      default:
        break;
    }
    onChangeTab({
      field: name,
      value:value,
    });
    setErrors({ ...errors });
  };

  const saveProfile = async () => {
    const formValid = validateForm(errors);
    if (formValid) {
      if (
        !dataItemTab.kode ||
        !dataItemTab.nama ||
        !dataItemTab.jenisKelamin ||
        !dataItemTab.alamat ||
        !dataItemTab.email ||
        !dataItemTab.noHp ||
        !dataItemTab.ekspektasiGaji
      ) {
        await MySwal.fire({
          icon: "error",
          title: "Please re-check your data!",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        const { isError } = await onSubmitTab({
          dataItemTab,
          value: { tabProfil: true },
        });
        if (!isError) {
          setToogle({ inEdit: false });
          await MySwal.fire({
            icon: "success",
            title: "Your data has been saved successfully!",
            showConfirmButton: false,
            timer: 3000,
          });
        } else {
          await MySwal.fire({
            icon: "error",
            title: "Your data failed to save!",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      }
    } else {
      await MySwal.fire({
        icon: "error",
        title: "Please re-check your data!",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };
  return (
    <Fragment>
      {!dataItem.inEdit ? (
        <TableProfile idcandidate={dataItemTab.id} />
      ) : (
        <div className="form-wizard-content">
          <Form>
            <Input
              name="id"
              id="id"
              value={dataItemTab.id}
              onChange={handleInputChange}
              hidden
            />
            <FormGroup>
              <Label for="kode">
                Kode
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Input
                type="text"
                name="kode"
                id="kode"
                placeholder="Enter Code"
                autoComplete="off"
                value={dataItemTab.kode || ""}
                onChange={handleInputChange}
                invalid={errors.kode.length > 0 ? true : ""}
                required
              />
              {errors.kode.length > 0 && (
                <span className="error">{errors.kode}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="nama">
                Nama
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Input
                type="text"
                name="nama"
                id="nama"
                placeholder="Enter Name"
                autoComplete="off"
                value={dataItemTab.nama || ""}
                onChange={handleInputChange}
                invalid={errors.nama.length > 0 ? true : ""}
                required
              />
              {errors.nama.length > 0 && (
                <span className="error">{errors.nama}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="jenisKelamin">
                Jenis Kelamin
                <span style={{ color: "red" }}> *</span>
              </Label>
              <div>
                <CustomInput
                  type="radio"
                  id="perempuan"
                  name="jenisKelamin"
                  label="Perempuan"
                  value="Perempuan"
                  checked={dataItemTab.jenisKelamin === "Perempuan"}
                  onChange={handleInputChange}
                  inline
                  required
                />
                <CustomInput
                  type="radio"
                  id="laki-laki"
                  name="jenisKelamin"
                  label="Laki-laki"
                  value="Laki-laki"
                  checked={dataItemTab.jenisKelamin === "Laki-laki"}
                  onChange={handleInputChange}
                  inline
                  required
                />
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="tempatLahir">Tempat Lahir</Label>
              <Input
                type="text"
                name="tempatLahir"
                id="tempatLahir"
                placeholder="Enter Birthplace"
                autoComplete="off"
                value={dataItemTab.tempatLahir || ""}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="tanggalLahir">Tanggal Lahir</Label>
              <Input
                type="date"
                name="tanggalLahir"
                id="tanggalLahir"
                placeholder="Enter Birthdate"
                autoComplete="off"
                value={dataItemTab.tanggalLahir || ""}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="alamat">
                Address
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Input
                type="text"
                name="alamat"
                id="alamat"
                placeholder="Enter Address"
                autoComplete="off"
                value={dataItemTab.alamat || ""}
                onChange={handleInputChange}
                invalid={errors.alamat.length > 0 ? true : ""}
                required
              />
              {errors.alamat.length > 0 && (
                <span className="error">{errors.alamat}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="email">
                Email
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                autoComplete="off"
                value={dataItemTab.email || ""}
                onChange={handleInputChange}
                invalid={errors.email.length > 0 ? true : ""}
                required
                disabled
              />
              {errors.email.length > 0 && (
                <span className="error">{errors.email}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="noHp">
                No Hp
                <span style={{ color: "red" }}> *</span>
              </Label>
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <div className="input-group-text">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                </InputGroupAddon>
                <InputMask
                  className="form-control"
                  mask="+62999999999999"
                  maskChar={null}
                  type="text"
                  name="noHp"
                  id="noHp"
                  placeholder="Enter No Hp"
                  autoComplete="off"
                  value={dataItemTab.noHp || ""}
                  onChange={handleInputChange}
                  onKeyPress={($event) => numberOnly($event)}
                  invalid={errors.noHp.length > 0 ? true : ""}
                  required
                />
              </InputGroup>
              {errors.noHp.length > 0 && (
                <span className="error">{errors.noHp}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="ekspektasiGaji">
                Ekspektasi Gaji
                <span style={{ color: "red" }}> *</span>
              </Label>
              <div>
                <NumberFormat
                  name="ekspektasiGaji"
                  id="ekspektasiGaji"
                  placeholder="Ekspektasi Gaji"
                  autoComplete="off"
                  className="form-control"
                  value={dataItemTab.ekspektasiGaji || ""}
                  onBlur={handleInputChange}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"Rp"}
                  inputmode="numeric"
                />
              </div>

              {errors.ekspektasiGaji.length > 0 && (
                <span className="error">{errors.ekspektasiGaji}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="waktuAvailable">Waktu Available</Label>
              <Input
                type="text"
                name="waktuAvailable"
                id="waktuAvailable"
                placeholder="Enter Available Time"
                autoComplete="off"
                value={dataItemTab.waktuAvailable || ""}
                onChange={handleInputChange}
                invalid={errors.waktuAvailable.length > 0 ? true : ""}
                required
              />
              {errors.waktuAvailable.length > 0 && (
                <span className="error">{errors.alamat}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="tanggalProses">
                Tanggal Proses
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Input
                type="date"
                name="tanggalProses"
                id="tanggalProses"
                placeholder="Enter Process Date"
                autoComplete="off"
                value={dataItemTab.tanggalProses ||currentDate}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            {dataItemTab.avail==='Not Available' ? (
            <FormGroup>
              <Label for="avail">Status</Label>
              <Input
                type="select"
                name="avail"
                id="avail"
                value={dataItemTab.avail || ""}
                onChange={handleInputChange}
              >
                {avail.map((item) => (
                  <option value={item.value}>{item.label}</option>
                ))}
              </Input>
            </FormGroup>

            ):null}
            {dataItemTab.avail==='Hired' ? (
            <FormGroup>
              <Label for="avail">Status</Label>
              <Input
                type="select"
                name="avail"
                id="avail"
                value={dataItemTab.avail || ""}
                onChange={handleInputChange}
              >
                {status.map((item) => (
                  <option value={item.value}>{item.label}</option>
                ))}
              </Input>
            </FormGroup>
            ):null}
            <Button
              className="btn-pill btn-lg btn-shadow mt-1"
              type="button"
              hidden={dataItem.alamat}
              onClick={() => setToogle({ inEdit: false })}
              style={{
                float: "left",
                backgroundColor: "#ffffff",
                border: "none",
                color: "currentcolor",
              }}
            >
              <FontAwesomeIcon icon={faUndo} />
              <span> Cancel</span>
            </Button>
            <Button
              className="btn-pill btn-lg btn-shadow mt-1 float-right"
              type="button"
              onClick={saveProfile}
              style={{
                background: "#C0D39A",
                border: "none",
                color: "currentcolor",
              }}
            >
              <FontAwesomeIcon icon={faSave} />
              <span> Submit</span>
            </Button>
          </Form>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  ...state.candidateReducer,
});
const mapDisppatchToProps = {
  onSubmitTab: candidateActions.onSubmitTab,
  onChangeTab: candidateActions.onChangeTab,
  onAdd: candidateActions.onAdd,
  reset: candidateActions.resetForm,
  getDataTab: candidateActions.getDataTab,
};
ProfileForm.propTypes = {
  onSubmit: propTypes.func,
  onChange: propTypes.func,
};
export default connect(mapStateToProps, mapDisppatchToProps)(ProfileForm);
