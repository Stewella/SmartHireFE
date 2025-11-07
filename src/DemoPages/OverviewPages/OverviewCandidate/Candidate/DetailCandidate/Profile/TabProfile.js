import React from "react";
import { Table, Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { candidateActions } from "../../../../../../redux/actions";
import propTypes from "prop-types";
const TabProfile = ({ dataItemTab, onAdd }) => {
  const setToogle = (value) => {
    onAdd(value);
  };

  return (
    <>
      <div className="btn-actions-pane-right">
        <Button
          className="mr-3 float-left btn-pill mb-3"
          onClick={() => setToogle({ inEdit: true })}
          style={{ backgroundColor: "grey", border: "none" }}
        >
          <FontAwesomeIcon icon={faPen} />
          <span> Edit</span>
        </Button>
      </div>
      <Table striped className="mb-0">
        <thead className="text-center">
          <tr>
            <th>Profile</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={{ width: 180 }}>Kode</td>
            <td>{dataItemTab.kode}</td>
          </tr>
          <tr>
            <td style={{ width: 180 }}>Nama</td>
            <td>{dataItemTab.nama}</td>
          </tr>
          <tr>
            <td style={{ width: 180 }}>Jenis kelamin</td>
            <td>{dataItemTab.jenisKelamin}</td>
          </tr>
          <tr>
            <td style={{ width: 180 }}>Tempat, Tanggal Lahir</td>
            <td>
              {dataItemTab.tempatLahir}, {dataItemTab.tanggalLahir}
            </td>
          </tr>
          <tr>
            <td style={{ width: 180 }}>Alamat</td>
            <td>{dataItemTab.alamat}</td>
          </tr>
          <tr>
            <td style={{ width: 180 }}>E-mail</td>
            <td>{dataItemTab.email}</td>
          </tr>
          <tr>
            <td style={{ width: 180 }}>No Hp</td>
            <td>{dataItemTab.noHp}</td>
          </tr>
        </tbody>
      </Table>
    </>
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
TabProfile.propTypes = {
  onSubmit: propTypes.func,
  onChange: propTypes.func,
};
export default connect(mapStateToProps, mapDisppatchToProps)(TabProfile);
