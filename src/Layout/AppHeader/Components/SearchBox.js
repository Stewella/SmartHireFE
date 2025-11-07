import React, { Fragment } from 'react';
// import { Route, Redirect, useHistory } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import cx from 'classnames';
// import {
//     Row, Col,
//     Card, CardBody,
//     CardFooter,
//     Button, Container,
//     FormGroup, Input
// } from 'reactstrap';
export const browserHistory = createBrowserHistory();
// const history = useHistory();
class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
        }
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
    };

    handleChangeSearch = (event) => {
        this.setState({ search: event.target.value });
        this.props.passingSearch(event.target.value);
        // this.props.passingSearch((event.target.value), () => { window.location.href = '#/user/searchpage' });
        window.location.href = '#/user/searchpage'
        // browserHistory.push('#/user/searchpage', { search:this.state.search });
    };


    render() {
        return (
            <Fragment>
                {/* <FormGroup>
                    <Input
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Search..."
                        onChange={this.handleChangeSearch}
                        value={this.state.search}
                    ></Input>
                </FormGroup> */}
                <div className={cx("search-wrapper", {
                    'active': this.state.activeSearch
                })}>
                    <div className="input-holder">
                        {/* <FormGroup> */}
                        <input type="text" className="search-input" placeholder="Type to search" value={this.state.search} onChange={this.handleChangeSearch}></input>
                        {/* </FormGroup> */}
                        <button onClick={() => this.setState({ activeSearch: !this.state.activeSearch, search: "" })}
                            className="search-icon"><span /></button>

                    </div>
                    {/* <button onClick={() => this.setState({ activeSearch: !this.state.activeSearch, search: ""})} className="close" /> */}
                </div>
            </Fragment>
        )
    }
}

export default SearchBox;