import React, { Component, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import api from '../../api/api'


import { Divider, Grid } from '@material-ui/core';
import ReactToPrint from "react-to-print";
import PrintIcon from '@material-ui/icons/Print';
import Button from '@material-ui/core/Button'
import SuplierLedger from '../Ledger/Suplier';
import { NavLink } from 'react-router-dom';








export default class PersonDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],

        }
    }
    render() {

        return (
            <>
                <p style={{ fontSize: 18, marginLeft: 10, padding: "10px 0 10px 0" }}>Ledger
                    <span style={{ float: 'right', marginRight: 10 }}>
                        <NavLink to={`/Add_Ledger_Entry?${(new URLSearchParams(this.props.history.location.search).get('type'))}=${(new URLSearchParams(this.props.history.location.search).get('id'))}`}>
                            <button className="btn btn-primary">Add</button>
                        </NavLink>
                        <ReactToPrint

                            trigger={() =>
                                <Button
                                    style={{ marginLeft: 10 }}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    // className={classes.button}
                                    // startIcon={}
                                    onClick={() => window.location = '/addstock'}
                                >
                                    <PrintIcon />
                                </Button>}
                            content={() => this.componentRef}
                        />
                    </span>
                </p>
                <Divider />
                <div style={{}}>
                    {/* {JSON.stringify(this.state.data)} */}
                    <ComponentToPrint ref={(el) => (this.componentRef = el)} type={(new URLSearchParams(this.props.history.location.search).get('type'))} id={(new URLSearchParams(this.props.history.location.search).get('id'))} />
                </div >
            </>
        )
    }
}



class ComponentToPrint extends React.Component {
    render(props) {
        var data = this.props.data
        var type = this.props.type
        return (
            <>
                <SuplierLedger id={this.props.id} />
            </>
        )
    }
}