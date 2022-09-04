import React from 'react'


import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Button, Grid } from '@material-ui/core';
import search from '../functions/search'



const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        backgroundColor: 'white',
        color: 'black'
    },

}));
export default function AppBarComponent(props) {
    const classes = useStyles();


    const searchQuery = (query) => {
        props.setDataForSearch(search(query, props.data, props.from))
        // alert(search(query, props.data, props.from).length)
    }
    return (
        <React.Fragment>
            <AppBar position="absolute" className={classes.appBar} >
                <Toolbar>
                    <Grid xs={6}>
                        <Typography variant="h6" color="inherit" noWrap>

                            {props.title}
                        </Typography>
                    </Grid>
                    <Grid xs={3}>
                        <input type='text' onChange={e => searchQuery(e.target.value)} placeholder="Search" />
                    </Grid>
                    <Breadcrumbs aria-label="breadcrumb" style={{ float: 'right' }}>
                        <Link color="inherit" href="/" >
                            {props.link1}
                        </Link>
                        <Typography color="textPrimary">
                            {props.link2}
                        </Typography>
                    </Breadcrumbs>
                    {
                        props.isButton &&
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            // startIcon={<SaveIcon />}
                            onClick={props.onClick}
                        >
                            Add Payment
                        </Button>
                    }

                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}
