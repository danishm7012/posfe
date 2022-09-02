import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import api from '../../api/api';
import DeleteIcon from '@material-ui/icons/Delete';
import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Bar from '../AppBar/AppBarComponent'
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import { isAdmin } from '../../helpers/isAuthenticated'
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(id, barcode, product_name, details, category, product_per_carton, sale_price, supplier_price, supplier_name, actions) {
    return { id, barcode, product_name, details, category, product_per_carton, sale_price, supplier_price, supplier_name, actions };
}



export default function BasicTable() {
    const classes = useStyles();
    const [rows, setRows] = useState([])
    const [allData, setAllData] = useState([])

    const history = useHistory()

    const [openDialog, setOpenDialog] = React.useState(false);
    const [itemToDelete, setItemToDelete] = React.useState('');
    const handleDialog = () => {
        setOpenDialog(!openDialog)
    }
    const DeleteItem = async () => {
        var res = null;
        res = await api.delete(`product/delete/${itemToDelete}`)
        // alert(JSON.stringify(res.data))
        handleDialog()
        window.location.reload()
    }

    useEffect(async () => {
        const res = await api.get('product/get_all')
        if (res.data.data) {
            // alert(JSON.stringify(res.data.data))
            let temp = []
            res.data.data.map(x => {
                temp.push(createData(x._id, x.barcode, x.product_name, x.details, x.category, x.product_per_carton, x.sale_price, x.supplier_price, x.supplier_name))
            })
            setRows(temp)
            setAllData(res.data.data)
        }
    }, [])

    const setDataForSearch = (data) => {
        var temp = []
        data.map(x =>
            temp.push(createData(x._id, x.barcode, x.product_name, x.details, x.category, x.product_per_carton, x.sale_price, x.supplier_price, x.supplier_name))
        )
        setRows(temp)
    }
    return (<>
        <Bar title="Category" link1="Dashboard" link2="Category List" data={allData} setDataForSearch={setDataForSearch} from='cat' />
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell >Barcode</TableCell>
                        <TableCell >Product Name</TableCell>
                        <TableCell >Details</TableCell>
                        <TableCell >Category</TableCell>
                        <TableCell >Product Per Carton</TableCell>
                        <TableCell >Sale Price</TableCell>
                        <TableCell >Supplier Price</TableCell>
                        <TableCell >Supplier Name</TableCell>
                        <TableCell >Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {index + 1011}
                            </TableCell>
                            <TableCell >{row.barcode}</TableCell>
                            <TableCell >{row.product_name}</TableCell>
                            <TableCell >{row.details}</TableCell>
                            <TableCell >{row.category}</TableCell>
                            <TableCell >{row.product_per_carton}</TableCell>
                            <TableCell >{row.sale_price}</TableCell>
                            <TableCell >{row.supplier_price}</TableCell>
                            <TableCell >{row.supplier_name}</TableCell>
                            <TableCell >
                                {
                                    isAdmin() &&
                                    <>
                                        {/* <span onClick={() => history.push({ pathname: 'editcustomer', state: { id: row.Id } })}> */}
                                        <span onClick={() => history.push({ pathname: '/editproduct', state: { id: row.id } })}>
                                            <EditIcon style={{ color: '#003366', cursor: 'pointer' }} />
                                        </span>
                                        <span
                                            onClick={() => {
                                                handleDialog();
                                                setItemToDelete(row.id)
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
    </>
    );
}
