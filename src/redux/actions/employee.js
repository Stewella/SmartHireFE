import {employeeTypes} from "../types";
import axios from "axios";
import {SERVICE} from "../../config/config";

// const mainUrl = "http://localhost:1212/v1/diglett"
const mainUrl = SERVICE.JAVA_SERVICE

const employeeActions = {
    onChange: ({field, value}) => (dispatch) => {
      const payload = {field, value};
      dispatch({type: employeeTypes.CHANGE_DATA, payload})
    },
    toggle: (value) => (dispatch) => {
        const dataItem = {
            ...value
        }
        dispatch({
            type: employeeTypes.TOGGLE,
            payload: {dataItem}
        })
    },
    getDataEmployee: () => async (dispatch) => {
        try {
            const response = (await axios.get(mainUrl+ "/employee/get-all"))
                .data;
            const payload = { dataEmployee: response.data };
            dispatch({ type: employeeTypes.GET_DATA, payload });
            return response;
        } catch (e) {
            const payload = { dataEmployee: [] };
            dispatch({ type: employeeTypes.GET_DATA, payload });
            return payload;
        }
    },
    getDocType: () => async (dispatch) => {
        try {
            const response = (await axios.get(mainUrl+ "/document-type/get-all")).data;
            const payload = { docType: response.data };
            dispatch({ type: employeeTypes.GET_DOCUMENT_TYPE, payload });
            return response;
        } catch (e) {
            const payload = { docType: [] };
            dispatch({ type: employeeTypes.GET_DOCUMENT_TYPE, payload });
            return payload;
        }
    },
    getListFile: (id) => async (dispatch) => {
        try {
            const response = (await axios.get(mainUrl+ "/document-upload/get-all/" + id))
                .data;
            const payload = { docList: response.data };
            dispatch({ type: employeeTypes.GET_LIST_FILE, payload });
            return response;
        } catch (e) {
            const payload = { docList: [] };
            dispatch({ type: employeeTypes.GET_LIST_FILE, payload });
            return payload;
        }
    },
    getFile: (id) => async  () => {
        try {
            const url = mainUrl + "/document-upload/file/" + id
            const pdfFile = await (await axios.get(url)).data;
            return pdfFile;
        } catch (e) {
            const payload = { file: "" };
            return payload;
        }
    },
    delData: (id) => async (dispatch) => {
        try {
            const url = mainUrl + "/employee/delete/" + id
            const response = await ( await axios.post(url)).data;
            dispatch({ type: employeeTypes.DELETE_DATA});
            return response;
        } catch (e) {
            return null;
        }

    },
    delFile: (id) => async (dispatch) => {
        try {
            const url = mainUrl + "/document-upload/delete/" + id
            const response = await ( await axios.post(url)).data;
            dispatch({ type: employeeTypes.DELETE_DATA});
            return response;
        } catch (e) {
            return null;
        }

    },
    onSubmit: ( dataItem ) => async (dispatch) => {
        try {
            const res = await (
                await axios.post(mainUrl + "/employee/insert", dataItem)
            ).data;
            dispatch({ type: employeeTypes.SUBMIT_DATA });
            return { response : res };
        } catch (e) {
            return null;
        }
    },
    onSubmitFile: (data) => async (dispatch) => {
        const json = JSON.stringify({
            idDocType : data.idDocType,
            id: data.id,
            keterangan: data.keterangan
        })
        const blob = new Blob([json], {
            type : "application/json"
        })
        const formData = new FormData();
        formData.append("upload", blob)
        formData.append("file", data.file)
        const config = {
            headers: {
                "content-type": "multipart/mixed",
            }
        }
        const url = mainUrl + "/document-upload/insert"
        const response = await (await axios.post(url, formData, config)).data
        dispatch({ type : employeeTypes.SUBMIT_DATA})
        return response
    },
    resetForm: () => (dispatch) => {
        dispatch({type: employeeTypes.RESET_FORM})
    }
}

export default employeeActions;