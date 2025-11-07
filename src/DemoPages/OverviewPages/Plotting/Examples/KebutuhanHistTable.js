import React, { Fragment } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import ReactTable from "react-table";


export default class KebutuhanHistoryTable extends React.Component {
    // constructor() {
    //     super();
    // }

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
                    <ReactTable
                        data={this.props.data}
                        columns={[{
                            columns: [{
                                Header: 'Client',
                                accessor: 'client',
                            }, {
                                Header: 'PIC',
                                accessor: 'picName'
                            }, {
                                Header: 'Kebutuhan',
                                accessor: 'kebutuhan'
                            }, {
                                Header: 'Created On',
                                accessor: 'createdOn'
                            }, {
                                Header: 'Keterangan',
                                accessor: 'keterangan'
                            }
                            ]
                        }]}
                        defaultPageSize={5}
                        className="-striped -highlight"
                    />
                </CSSTransitionGroup>
                <br />
                <br />
            </Fragment>
        )
    }
}