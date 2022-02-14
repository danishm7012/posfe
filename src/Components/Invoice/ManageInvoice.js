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
import { useHistory } from 'react-router';
import { isAdmin } from '../../helpers/isAuthenticated'
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(id, sellno, name, date, amount, paid_amount, actions) {
    return { id, sellno, name, date, amount, paid_amount, actions };
}



export default function BasicTable() {
    const classes = useStyles();
    const [rows, setRows] = useState([])
    const [allData, setAllData] = useState([])
    const [openDialog, setOpenDialog] = React.useState(false);
    const [itemToDelete, setItemToDelete] = React.useState('');
    const history = useHistory()
    const handleDialog = () => {
        setOpenDialog(!openDialog)
    }
    const DeleteItem = async () => {
        var res = null;
        res = await api.delete(`invoice/delete/${itemToDelete}`)
        // alert(JSON.stringify(res.data))
        handleDialog()
        window.location.reload()
    }
    useEffect(async () => {
        const res = await api.get('invoice/get_all')
        if (res.data.data) {
            // alert(JSON.stringify(res.data.data[0]))
            let temp = []
            res.data.data.map(x => {
                temp.push(createData(x._id, 1, x.customer_name, x.date, x.grand_total, x.paid_amount))
            })
            setRows(temp)
            setAllData(res.data.data)
        }
    }, [])



    const setDataForSearch = (data) => {
        var temp = []
        data.map(x =>
            temp.push(createData(x._id, 1, x.customer_name, x.date, x.grand_total))
        )
        setRows(temp)
    }
    return (<>
        <Bar title="Manage Invoice" link1="Dashboard" link2="Category List" data={allData} setDataForSearch={setDataForSearch} from='invoice' />
        {/* <p style={{ fontSize: 18, marginLeft: 10, }}>Manage Invoice</p> */}
        <Divider />
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell >Sell No</TableCell>
                        <TableCell >Customer Name</TableCell>
                        <TableCell >Date</TableCell>
                        <TableCell >Amount</TableCell>
                        <TableCell >Paid Amount</TableCell>
                        <TableCell >Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {index + 1011}
                            </TableCell>
                            <TableCell >{row.sellno}</TableCell>
                            <TableCell onClick={() => {
                                localStorage.setItem('name', row.name)
                                window.location = `/allinvoicesof`
                            }} style={{ color: 'blue', cursor: 'pointer' }}>
                                {row.name}
                            </TableCell>
                            <TableCell >{row.date.split('T')[0]}</TableCell>
                            <TableCell >{row.amount}</TableCell>
                            <TableCell >{row.paid_amount}</TableCell>
                            <TableCell >
                                {/* <span onClick={() => history.push({ pathname: 'editcustomer', state: { id: row.Id } })}> */}
                                {/* <span onClick={() => history.push({ pathname: history.location.pathname == '/customerlist' ? 'editcustomer' : 'editsupplier', state: { id: row.Id } })}>
                                            <EditIcon style={{ color: '#003366', cursor: 'pointer' }} />
                                        </span> */}
                                <span
                                    onClick={() => {
                                        handleDialog();
                                        setItemToDelete(row.Id)
                                    }}
                                >{
                                        isAdmin() &&
                                        <DeleteIcon style={{ color: 'red', marginLeft: 10, cursor: 'pointer' }} />
                                    }
                                </span>
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
