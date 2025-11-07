import {candidateTypes} from "../types";
import { SERVICE } from "../../config/config";
import axios from "axios";

// const mainUrl = "http://localhost:1212/v1/diglett"
const mainUrl = SERVICE.JAVA_SERVICE

const candidateActions = {
  getData: () => async (dispatch) => {
    try {
      const dataClient = (await axios.get(mainUrl + "/candidate/availability/Available"))
        .data.data;
      const payload = { dataGrid: dataClient };
      dispatch({ type: candidateTypes.GET_DATA, payload });
      return payload;
    } catch (e) {
      const payload = { dataGrid: [] };
      dispatch({ type: candidateTypes.GET_DATA, payload });
      return payload;
    }
  },
  getDataStatus: (status) => async (dispatch) => {
    try {
      const dataClient = (
        await axios.get(
          mainUrl + "/candidate/availability/" + status
        )
      ).data.data;
      const payload = { dataGrid: dataClient };
      dispatch({ type: candidateTypes.GET_DATA_STATUS, payload });
      return payload;
    } catch (e) {
      const payload = { dataGrid: [] };
      dispatch({ type: candidateTypes.GET_DATA_STATUS, payload });
      return payload;
    }
  },
  getDataTab: (id) => async (dispatch) => {
    try {
      const dataClient = (
        await axios.get(mainUrl + "/candidate/" + id)
      ).data.data;
      const payload = { dataTab: dataClient };
      dispatch({ type: candidateTypes.GET_DATA_TAB, payload });
      return payload;
    } catch (e) {
      const payload = { dataGrid: [] };
      dispatch({ type: candidateTypes.GET_DATA_TAB, payload });
      return payload;
    }
  },
  getMedia: () => async (dispatch) => {
    try {
      const dataMedia = (await axios.get(mainUrl + "/media/name"))
        .data.data;
      const payload = { media: dataMedia };
      dispatch({ type: candidateTypes.GET_DATA_MEDIA, payload });
      return payload;
    } catch (e) {
      return e;
    }
  },
  getAvailable: () => async  (dispatch) => {
    try {
      const url = mainUrl + "/status/available"
      const data = await (await axios.get(url)).data;
      const payload = { availableGroup : data.data };
      dispatch({ type: candidateTypes.GET_AVAILABLE_STATUS, payload });
      return data;
    } catch (e) {
      const payload = { availableGroup: [] };
      dispatch({ type: candidateTypes.GET_AVAILABLE_STATUS, payload });
      return payload;
    }
  },
  onAdd: (value) => async (dispatch) => {
    const dataItem = {
      ...value,
    };
    dispatch({
      type: candidateTypes.ADDNEW,
      payload: { dataItem },
    });
  },
  remove: (id) => async (dispatch) => {
    try {
      await axios.delete(mainUrl + "/contact/person/" + id);
      await axios.delete(
        mainUrl + "/histori-posisi/candidate/" + id
      );
      await axios.delete(mainUrl + "/experience/candidate/" + id);
      await axios.delete(
        mainUrl + "/skill-detail/candidate/" + id
      );
      await axios.delete(mainUrl + "/candidate/" + id);
      dispatch({ type: candidateTypes.REMOVE_DATA });
      return { isError: false };
    } catch (e) {
      return { isError: true, message: e.toString() };
    }
  },
  onChangeTab: ({ field, value }) => (dispatch) => {
    const payload = { field, value };
    dispatch({ type: candidateTypes.CHANGE_DATA_TAB, payload });
  },
  onChange: ({ field, value }) => (dispatch) => {
    const payload = { field, value };
    dispatch({ type: candidateTypes.CHANGE_DATA, payload });
  },
  // discard: () => (dispatch) => dispatch({ type: masterEmployeeTypes.DISCARD }),
  onSubmit: ({ dataItem }) => async (dispatch) => {
    try {
      let variables = {
        id: dataItem.id,
        nama: dataItem.nama,
        email: dataItem.email,
        noHp: dataItem.noHp,
      };
      const dataTab = await (
        await axios.post(mainUrl + "/candidate", variables)
      ).data.data;
      dispatch({ type: candidateTypes.SUBMIT });
      return { isError: false, id: dataTab.id };
    } catch (e) {
      return { isError: true, message: e.toString() };
    }
  },
  onSubmitTab: ({ dataItemTab }) => async (dispatch) => {
    try {
      let variables = {
        id: dataItemTab.id,
        kode: dataItemTab.kode,
        nama: dataItemTab.nama,
        jenisKelamin: dataItemTab.jenisKelamin,
        tempatLahir: dataItemTab.tempatLahir,
        tanggalLahir: dataItemTab.tanggalLahir,
        alamat: dataItemTab.alamat,
        email: dataItemTab.email,
        noHp: dataItemTab.noHp,
        ekspektasiGaji: dataItemTab.ekspektasiGaji,
        avail: dataItemTab.avail,
        waktuAvailable: dataItemTab.waktuAvailable,
        tanggalProses: dataItemTab.tanggalProses || new Date()
      };
      await axios.post(mainUrl + "/candidate", variables);
      dispatch({ type: candidateTypes.SUBMIT });
      return { isError: false };
    } catch (e) {
      return { isError: true, message: e.toString() };
    }
  },
  resetForm: (initialState) => (dispatch) => {
    dispatch({ type: candidateTypes.RESET_FORM, payload: { initialState } });
  },
  // onSubmitPdf: (data) => async (dispatch) => {
  //   const json = JSON.stringify({
  //     id : data.id
  //   })
  //   const blob = new Blob([json], {
  //     type : "application/json"
  //   })
  //   const formData = new FormData();
  //   formData.append("candidate", blob)
  //   formData.append("file", data.file)
  //   const config = {
  //     headers: {
  //       "content-type": "multipart/mixed",
  //     }
  //   }
  //   const url = mainUrl + "/candidate/document"
  //   const response = await (await axios.post(url, formData, config)).data
  //   dispatch({ type : candidateTypes.SUBMIT})
  //   return response
  // },
  // //handle change on add pdf document
  // onChangePdf : ({field, value}) => (dispatch) => {
  //   const payload = {field, value};
  //   dispatch({type : candidateTypes.CHANGE_DATA_PDF, payload})
  // },
  onAddPdf: (value) => async (dispatch) => {
    const dataItemPdf = {
      ...value,
    };
    dispatch({
      type: candidateTypes.ADDNEWPDF,
      payload: { dataItemPdf } ,
    });
  },
  // getPdf: (id) => async  (dispatch) => {
  //   try {
  //     const url = mainUrl + "/candidate/document/" + id
  //     const pdfFile = await (await axios.get(url)).data.data;
  //     const payload = { file: pdfFile };
  //     dispatch({ type: candidateTypes.GET_PDF, payload });
  //     return pdfFile;
  //   } catch (e) {
  //     const payload = { file: "" };
  //     dispatch({ type: candidateTypes.GET_PDF, payload });
  //     return payload;
  //   }
  // },

};
export default candidateActions;
