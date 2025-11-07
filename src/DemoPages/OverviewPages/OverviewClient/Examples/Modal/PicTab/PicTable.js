import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import axios from 'axios';
import ReactTable from "react-table";
import { Button } from 'reactstrap';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SERVICE } from "../../../../../../config/config";

// import { Combobox } from 'react-widgets';

class PicTable extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        modal: false,
        valuePosisi: '',
        valueService: '',
        level: '',
        jumlah: '',
        data: [],
        refresh: '',
    }

    options = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
    };

    handleClose = (id) => {
        const pic = {
            isOpen: "False"
        };
        axios.put(SERVICE.JAVA_SERVICE + "/pic/isOpen/" + id, pic)
            .then((response) => {
            })
    }

    handleEdit = () => {


    }

    dataChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {

        return (
            <>
                <br />
                <br />
                <CSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>


                    <ReactTable
                        data={this.props.listpic}
                        columns={[{
                            columns: [
                                //     {
                                //     Header: 'ID',
                                //     accessor: 'id',
                                //     Cell: row => (
                                //         <div className='d-block w-100 text-center'>
                                //             {row.value}
                                //         </div>)
                                // },
                                {
                                    Header: 'Name',
                                    accessor: 'picName'
                                },
                                {
                                    Header: 'E-mail',
                                    accessor: 'picEmail'
                                }, {
                                    Header: 'No Hp',
                                    accessor: 'picNoHp'
                                }, {
                                    Header: 'Actions',
                                    accessor: 'actions',
                                    sortable: false,
                                    Cell: row => (
                                        <div className="d-block w-100 text-center">
                                            {/* <Button className="btn-pill btn-sm btn-shine"
                                                style={{ background: "#B53939", border: "none" }}
                                                onClick={() => this.handleClose(row.original.id)}
                                            >
                                                <FontAwesomeIcon icon={faTimes} />
                                            </Button> */}
                                            <Button className="btn-pill btn-sm btn-shine"
                                                style={{ background: "#94C973", border: "none" }}
                                                onClick={() => this.props.edit(row.original.id)}
                                            >
                                                <FontAwesomeIcon icon={faPen} />
                                            </Button>
                                        </div>
                                    )
                                }

                            ]
                        }]}
                        defaultPageSize={5}
                        className="-striped -highlight"
                    />
                </CSSTransitionGroup>
            </>
        )
    }
}
export default PicTable;
