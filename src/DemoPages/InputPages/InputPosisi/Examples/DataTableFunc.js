import React, { Fragment, useEffect, useState } from 'react';
import { Button, Card, CardBody, Container, Input } from 'reactstrap';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
//import "datatables.net-dt/css/jquery.dataTables.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SERVICE } from '../../../../../config/config';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import 'datatables.net-dt/css/jquery.dataTables.css';
import ModalEdit from './EditPosisi';


const $ = require('jquery')
$.dt = require('datatables.net')

const TablePosisiFunct = () => {
    const [modalEditShow, setModalEditShow] = useState(false);

    const [data, setData] = useState([]);


    const toggleEdit = (data) => {
        setModalEditShow(!modalEditShow);
        // setLoading(true)
    }

    useEffect(() => {
        //$el = $(this.el)
        $('#posisi').DataTable().destroy()
        $('#posisi').DataTable(
            {
                "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                "processing": true,
                "serverSide": true,
                "orderCellsTop": true,
                "ajax": {
                    url: SERVICE.JAVA_SERVICE + "/datatables/posisi-list",
                    data: {
                        "type": $('#type').val()
                    }
                },
                "columns": [
                    { data: "posid" },
                    { data: "posnm" },
                    {
                        data: null,
                        className: "center",
                        render: function (data, type, row) {
                            return '<button type="button" onClick={toggleEdit}>Edit</button>'
                        }
                    }

                ]
            }
        );
    })



    const searchHandle = (event, i) => {
        let input = event.target.value
        // function search(input, i) {
        if ($('#posisi').DataTable().column(i).search() !== input) {
            $('#posisi').DataTable().column(i).search(input).draw();
        }
        // }
    }

    return (
        <Fragment>
            <ModalEdit
                data={data}
                isOpen={modalEditShow}
                toggle={toggleEdit}
            />
            <CSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}>
                <Container fluid>
                    <Card className="main-card mb-3">
                        <CardBody>
                            <div>
                                {/* <input type="text">Search</input> */}
                                <table id="posisi" className="display" heigth="auto" width="100%">
                                    {/* <table className="table" id="tableserverside" heigth="auto" width="100%"  > */}
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Position</th>
                                            <th>Action</th>
                                        </tr>
                                        <tr>
                                            <th>
                                                <Input type="text" onChange={(event) => searchHandle(event, 0)}></Input>
                                            </th>
                                            <th>
                                                <Input type="text" onChange={(event) => searchHandle(event, 1)}></Input>
                                            </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <Button
                                className="btn btn-default"
                                onClick={() => { this.downloadHandle('csv', 'aset') }}
                            >
                                <FontAwesomeIcon icon={faDownload} />
                            </Button>
                        </CardBody>
                    </Card>
                </Container>
            </CSSTransitionGroup>
        </Fragment>
    )
};


export default TablePosisiFunct
