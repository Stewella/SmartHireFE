import {employeeTypes} from '../types'

const initialState = {
    dataItem: {
        addData: false,
        editData: true,
        deleteData: false,
        addFile: false,
        cancel: false,
        dataForm: {},
        idUpload: "",
        id: ""
        // dataRow: {}
    },
    dataEmployee: [],
    docType: [],
    docList: []
}

const employeeReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case employeeTypes.CHANGE_DATA: {
            const {field, value} = action.payload
            return {
                ...state,
                dataItem: {
                    ...state.dataItem,
                    dataForm: {
                        ...state.dataItem.dataForm,
                        [field]: value
                    }
                }
            }
        }

        case employeeTypes.TOGGLE: {
            const {dataItem} = action.payload
            return {
                ...state,
                dataItem: {
                    ...state.dataItem,
                    ...dataItem
                }
            }
        }

        case employeeTypes.GET_DATA: {
            const {dataEmployee} = action.payload
            return {
                ...state,
                dataEmployee
            }
        }

        case employeeTypes.GET_DOCUMENT_TYPE: {
            const {docType} = action.payload
            return {
                ...state,
                docType
            }
        }

        case employeeTypes.GET_LIST_FILE: {
            const {docList} = action.payload
            return {
                ...state,
                docList
            }
        }

        case employeeTypes.SUBMIT_DATA: {
            return {
                ...state
            }
        }

        case employeeTypes.DELETE_DATA: {
            return  {
                ...state
            }
        }

        case employeeTypes.RESET_FORM: {
            return {
                ...state,
                dataItem: {
                    ...state.dataItem,
                    dataForm: {
                        ...state.dataItem.dataForm,
                        idDocType: "",
                        file: "",
                        keterangan: ""
                    }
                }
            }
        }

        default :
            return {...state}
    }
}

export default employeeReducer;