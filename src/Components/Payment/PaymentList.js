import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FilterListIcon from '@material-ui/icons/FilterList';
import api from '../../api/api';
import EditIcon from '@material-ui/icons/Edit';

import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Bar from '../AppBar/AppBarComponent'
import { isAdmin } from '../../helpers/isAuthenticated'


function createData(Id, From, Name, Details, PaidAmount, Date, RemaingBalance) {
    // alert('pushed to rows')
    return { Id, From, Name, Details, PaidAmount, Date, RemaingBalance };
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function EnhancedTable() {
    const history = useHistory()
    const classes = useStyles();
    const [rows, setRows] = useState([])
    const [allStock, setAllStock] = useState([])

    const [openDialog, setOpenDialog] = React.useState(false);
    const [itemToDelete, setItemToDelete] = React.useState('');
    const handleDialog = () => {
        setOpenDialog(!openDialog)
    }

    // const DeleteItem = async () => {
    //     var res = null;
    //     res = await api.delete(`stock/delete/${itemToDelete}`)
    //     handleDialog()
    //     window.location.reload()
    // }
    useEffect(async () => {
        var temp = []
        if (history.location.pathname == "/customerpaymentList") {
            const res1 = await api.get("customer/get_all_payments")
            if (res1.data.data) {
                res1.data.data.map(item =>
                    temp.push(createData(item._id, item.from, item.customer_name, item.details, item.paid_amount, item.date, item.remaing_balance))
                )
                setRows(temp)
                setAllStock(res1.data.data)
            }
        }
        if (history.location.pathname == "/supplierpaymentList") {
            var temp = []
            const res1 = await api.get("supplier/get_all_payments")
            if (res1.data.data) {
                // alert(JSON.stringify(res1.data.data[0]))

                res1.data.data.map(item => {

                    temp.push(createData(item._id, item.from, item.supplier_name, item.details, item.paid_amount, item.date, item.remaing_balance))
                }
                )
                setRows(temp)
                setAllStock(res1.data.data)
            }
        }


    }, [])


    const setDataForSearch = (data) => {
        var temp = []
        data.map(item =>
            temp.push(createData(item._id, item.from, item.supplier_name || item.customer, item.details, item.paid_amount, item.date, item.remaing_balance))
        )
        setRows(temp)
    }





    return (
        <>
            <Bar title="Payments" link1="Dashboard" link2="Payments" data={allStock} setDataForSearch={setDataForSearch} from='paymentlist' isButton={true} onClick={() => window.location = history.location.pathname == "/supplierpaymentList" ? '/supplierpayment' : 'customerpayment'} />

            <div className={classes.root}>

                <Paper className={classes.paper}>



                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>From</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Details</TableCell>
                                    <TableCell>Paid Amount</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Remaining Amount</TableCell>


                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={row.name}>

                                        <TableCell component="th" scope="row">
                                            {index + 1011}
                                        </TableCell>
                                        <TableCell >{row.From}</TableCell>
                                        <TableCell >{row.Name}</TableCell>
                                        <TableCell >{row.Details}</TableCell>
                                        <TableCell >{row.PaidAmount}</TableCell>
                                        <TableCell >{row.Date.split('T')[0]}</TableCell>
                                        <TableCell >{row.RemaingBalance}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Paper>

                {/* <Dialog
                    open={openDialog}
                    onClose={handleDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure to delete?"}</DialogTitle>

                    <DialogActions>
                        <Button onClick={handleDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={DeleteItem} style={{ color: 'red' }} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog> */}
            </div>
        </>
    );
}
