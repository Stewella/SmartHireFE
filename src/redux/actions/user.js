import {userTypes} from '../types'
import { SERVICE } from "../../config/config";
import axios from "axios";

const mainUrl = SERVICE.JAVA_SERVICE
// const mainUrl = "http://localhost:1212/v1/diglett"

const userActions = {
    getData: () => async (dispatch) => {
        try {
            const url = mainUrl + "/user/get-all"
            const dataUser = await (await axios.get(url)).data.data;
            const payload = { dataGrid: dataUser };
            dispatch({ type: userTypes.GET_DATA, payload });
            return payload;
        } catch (e) {
            const payload = { dataGrid: [] };
            dispatch({ type: userTypes.GET_DATA, payload });
            return payload;
        }
    },
    sendData: ( dataItem ) => async (dispatch) => {
        try {
            let variables = {
                idUser: dataItem.idUser,
                nama: dataItem.nama,
                email: dataItem.email,
                type: dataItem.type,
            };
            const url = mainUrl + "/user/insert"
            const response = await (await axios.post(url, variables)).data;
            dispatch({ type: userTypes.SEND_DATA});
            return response;
            // return { isError: false, id: newDataUser.id };
        } catch (e) {
            const payload = { dataGrid: [] };
            dispatch({ type: userTypes.SEND_DATA, payload });
            return payload;
            // return { isError: true, message: e.toString() };
        }
    },
    delData: (id) => async (dispatch) => {
        try {
            const url = mainUrl + "/user/delete/" + id
            const response = await ( await axios.post(url)).data;
            dispatch({ type: userTypes.DELETE_DATA});
            return response;
        } catch (e) {
            dispatch({ type: userTypes.DELETE_DATA});
        }

    }
}

export default userActions