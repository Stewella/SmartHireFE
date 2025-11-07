import React, { Component, Fragment } from 'react';
import { Container, Card, CardBody, Input, Button } from 'reactstrap';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import "datatables.net-dt/css/jquery.dataTables.css";
// import { faTh } from '@fortawesome/free-solid-svg-icons';
// import "datatables.net-dt/js/dataTables.dataTables";
// import ReactDOM from "react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { SERVICE } from '../../../../../config/config'

const $ = require('jquery')
$.dt = require('datatables.net')


class DataTableIndustry extends Component {

  componentDidMount() {
    this.$el = $(this.el)

    this.$el.DataTable(
      {
       "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
        "processing": true,
        "serverSide": true,
        "orderCellsTop": true,
        "ajax": {
          url: SERVICE.JAVA_SERVICE + "/datatables/industry-list",
          data: {
            "type": $('#type').val()
          }
        },
        "columns": [
          { data: "indid" },
          { data: "indnm" },
        ]
      }
    );
  }

  searchHandle = (event, i) => {
    let input = event.target.value
    // function search(input, i) {
    if (this.$el.DataTable().column(i).search() !== input) {
      this.$el.DataTable().column(i).search(input).draw();
    }
    // }
  }

  downloadHandle = (type, filename) => {
    let data = this.$el.DataTable().ajax.params();
    window.location = SERVICE.JAVA_SERVICE + "/datatables/industry-list-"
      + type + '?output=' + type
      + '&asAttachment=true&filename='
      + filename + '&'
      + $.param(data);
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
                  <table className="tableposisi" heigth="auto" width="100%" ref={el => this.el = el} >
                    {/* <table className="table" id="tableserverside" heigth="auto" width="100%"  > */}
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Industry</th>
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

};
export default DataTableIndustry;