import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Form from './form';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';


import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        backgroundColor: 'white',
        color: 'black'
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));


export default function Checkout() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const history = useHistory()


    return (
        <React.Fragment>
            <CssBaseline />

            <AppBar position="absolute" className={classes.appBar} >
                <Toolbar>
                    <Grid xs={9}>
                        <Typography variant="h6" color="inherit" noWrap>

                            {history.location.pathname == '/addcustomer' && "Add Customer"}
                            {history.location.pathname == '/editcustomer' && "Edit Customer"}
                            {history.location.pathname == '/editsupplier' && "Edit Supplier"}
                            {history.location.pathname == '/addsupplier' && "Add Supplier"}
                        </Typography>
                    </Grid>
                    <Breadcrumbs aria-label="breadcrumb" style={{ float: 'right' }}>
                        <Link color="inherit" href="/" >
                            Dashboard
                        </Link>

                        <Typography color="textPrimary">Add Customer</Typography>
                    </Breadcrumbs>

                </Toolbar>
            </AppBar>

            <Form />
        </React.Fragment>
    );
}