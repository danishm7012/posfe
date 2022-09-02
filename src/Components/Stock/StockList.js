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


function createData(Id, Product_Name, Supplier_Name, Buy_Date, Product_Per_Carton, Quantity, Buy_Price, Sale_Price, Action) {
    // alert('pushed to rows')
    return { Id, Product_Name, Supplier_Name, Buy_Date, Product_Per_Carton, Quantity, Buy_Price, Sale_Price, Action };
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

    const DeleteItem = async () => {
        var res = null;
        res = await api.delete(`stock/delete/${itemToDelete}`)
        handleDialog()
        window.location.reload()
    }
    const get_all_stocks = async () => {
        try {

            const res = await api.get('stock/get_all');
            // alert(JSON.stringify(res.data.data[0].paid_amount))
            var temp = []
            if (res.status == 200)
                res.data.data.map(item =>
                    temp.push(createData(item._id, item.product_name, item.supplier_name, item.buy_date, item.product_per_carton, item.quantity, item.buy_price, item.sale_price))
                )
            setRows(temp)
            setAllStock(res.data.data)
            // alert("i am row" + JSON.stringify(rows))
        } catch (error) {
            // alert(error)
        }
    }

    useEffect(() => {
        get_all_stocks()
    }, [])


    const setDataForSearch = (data) => {
        var temp = []
        data.map(item =>
            temp.push(createData(item._id, item.product_name, item.supplier_name, item.buy_date, item.product_per_carton, item.quantity, item.buy_price, item.sale_price))
        )
        setRows(temp)
    }





    return (
        <>
            <Bar title="Stocks" link1="Dashboard" link2="Stock List" data={allStock} setDataForSearch={setDataForSearch} from='stock' />
            <div className={classes.root}>

                <Paper className={classes.paper}>



                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Supplier Name</TableCell>
                                    <TableCell>Buy Date</TableCell>
                                    <TableCell>Product per Carton</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Buy Price</TableCell>
                                    <TableCell>Sale Price</TableCell>
                                    <TableCell>Actions</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={row.name}>

                                        <TableCell component="th" scope="row">
                                            {index + 1011}
                                        </TableCell>
                                        <TableCell >{row.Product_Name}</TableCell>
                                        <TableCell >{row.Supplier_Name}</TableCell>
                                        <TableCell >{row.Buy_Date.split('T')[0]}</TableCell>
                                        <TableCell >{row.Product_Per_Carton}</TableCell>
                                        <TableCell >{row.Quantity}</TableCell>
                                        <TableCell >{row.Buy_Price}</TableCell>
                                        <TableCell >{row.Sale_Price}</TableCell>
                                        <TableCell >
                                            {
                                                isAdmin() && <>

                                                    {/* <span onClick={() => history.push({ pathname: 'editcustomer', state: { id: row.Id } })}> */}
                                                    <span onClick={() => history.push({ pathname: 'editstock', state: { id: row.Id } })}>
                                                        <EditIcon style={{ color: '#003366', cursor: 'pointer' }} />
                                                    </span>
                                                    <span
                                                        onClick={() => {
                                                            handleDialog();
                                                            setItemToDelete(row.Id)
                                                        }}
                                                    >
                                                        <DeleteIcon style={{ color: 'red', marginLeft: 10, cursor: 'pointer' }} />
                                                    </span>
                                                </>
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Paper>

                <Dialog
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
                </Dialog>
            </div>
        </>
    );
}
