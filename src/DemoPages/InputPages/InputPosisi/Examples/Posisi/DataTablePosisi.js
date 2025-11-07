import React, { Component, Fragment } from 'react';
import { Button, Card, CardBody, Container, Input } from 'reactstrap';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "datatables.net-dt/css/jquery.dataTables.css";
import {SERVICE} from '../../../../../config/config';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

/**
 *  import the Datatables dependencies
 */
const $ = require('jquery')
$.dt = require('datatables.net')

export default class DataTablePosisi extends Component {
    componentDidMount(){
        this.$el = $(this.el)

        this.$el.dataTable(
      {
       "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
        "processing": true,
        "serverSide": true,
        "orderCellsTop": true,
        //load data dari ajax
        "ajax": {
          url: SERVICE.JAVA_SERVICE + "/datatables/posisi-list",
          //type : "GET" // get data
          data: {
            "type": $('#type').val()
          }
        },
        "columns": [
          { data: "posid" },
          { data: "posnm" },
        ]
      }
    );
    }

    searchHandle = (event, i) => {
        let input = event.target.value
        if (this.$el.DataTable().column(i).search() !== input) {
          this.$el.DataTable().column(i).search(input).draw();
        }
      }

      render() {
        return (
          <Fragment>
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
                      <table className="table" heigth="auto" width="100%" ref={el => this.el = el} >
                        {/* <table className="table" id="tableserverside" heigth="auto" width="100%"  > */}
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Position</th>
                          </tr>
                          <tr>
                            <th>
                              <Input type="text" onChange={(event) => this.searchHandle(event, 0)}></Input>
                            </th>
                            <th>
                              <Input type="text" onChange={(event) => this.searchHandle(event, 1)}></Input>
                            </th>
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
      }
}
