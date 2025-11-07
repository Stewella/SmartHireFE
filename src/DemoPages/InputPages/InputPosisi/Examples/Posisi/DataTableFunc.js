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
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);


    const toggleEdit = () => {
        setModalEditShow(!modalEditShow);
        setLoading(true)
    }

    // const editButton= (data) => {
    //     // render the buy button with jQuery
    //     $(this.refs.editButton).html(
    //       buyButtonJquery(this.props.product)
    //     );
    //   }

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
                            var datapos = JSON.stringify(data)
                            return "<button type='button' value='" + datapos + "'>Edit</button>"
                        }

                    }

                ]
            }
        );
        $('#posisi tbody').on('click', 'button', function () {
            var dataposisi =JSON.parse(this.value)
            setData(dataposisi);
            setModalEditShow(!modalEditShow);
            setLoading(true)
        });
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
