import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import api from '../../api/api';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '../Toast/toast'
import Bar from '../AppBar/AppBarComponent'
import { isAdmin } from '../../helpers/isAuthenticated'



function createData(Id, Name, Address, Contact, PreviousBalnce, Action) {
    return { Id, Name, Address, Contact, PreviousBalnce, Action };
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

    const [itemToDelete, setItemToDelete] = React.useState('');
    const [userData, setUserData] = React.useState('');
    const [allData, setAllData] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [Loading, setLoading] = React.useState(false);


    const [openDialog, setOpenDialog] = React.useState(false);
    const handleDialog = () => {
        setOpenDialog(!openDialog)
    }




    const get_all_customers = async () => {
        try {

            const res = await api.get('customer/get_all');
            // alert(JSON.stringify(res.data.data))
            if (res.data.data) {
                // alert(JSON.stringify(res.data.data))
                var temp = []
                res.data.data.map(item =>
                    temp.push(createData(item._id, item.customer_name, item.address, item.contact_no, item.previous_balance))

                )
                setRows(temp)
                setAllData(res.data.data)
                setLoading(false)
                // alert(JSON.stringify(rows))


            }
            setUserData(res.data.data)
        } catch (error) {
            alert(error)
        }
    }
    const get_all_suppliers = async () => {
        // alert('working')
        try {

            const res = await api.get('supplier/get_all');
            // alert(JSON.stringify(res.data.data))
            if (typeof res.data.data == 'undefined')

                setUserData([])
            else {
                // alert('here')
                let temp = []
                res.data.data.map(item =>
                    temp.push(createData(item._id, item.supplier_name, item.address, item.contact_no, item.previous_balance))

                )
                setRows(temp)
                setAllData(res.data.data)
                setLoading(false)
                // alert(JSON.stringify(rows))


            }
            setUserData(res.data.data)
        } catch (error) {
            alert(error)
        }
    }
    useEffect(() => {
        // alert(history.location.pathname)
        setLoading(true)
        if (history.location.pathname == '/customerlist')
            get_all_customers()
        else if (history.location.pathname == '/supplierlist')
            get_all_suppliers()
        else if (history.location.pathname == '/')
            get_all_customers()
    }, [])

    const DeleteItem = async () => {
        var res = null;
        if (history.location.pathname == '/customerlist')
            res = await api.delete(`customer/delete/${itemToDelete}`)
        if (history.location.pathname == '/supplierlist')
            res = await api.delete(`supplier/delete/${itemToDelete}`)
        // alert(res.data)
        handleDialog()
        window.location.reload()
    }


    const setDataForSearch = (data) => {
        // alert(JSON.stringify(data.length))
        let temp = []
        data.map(item =>
            temp.push(createData(item._id, item.customer_name ? item.customer_name : item.supplier_name, item.address, item.contact_no, item.previous_balance))
        )
        setRows(temp)
    }

    return (<>
        <Bar title={(history.location.pathname == '/customerlist') ? "Customer" : "Supplier"} link1="Dashboard" link2="Stock List" data={allData} setDataForSearch={setDataForSearch} from='customer' />
        {/* <p style={{ fontSize: 18, marginLeft: 10, }}>Manage {(history.location.pathname == '/customerlist') ? "Customer" : "Supplier"}</p>
        <Divider /> */}
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Alert />




                {Loading ? <CircularProgress className="text-center" /> :
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Contact Number</TableCell>
                                    <TableCell>Previous Balance</TableCell>

                                    <TableCell>Actions</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (

                                    <TableRow key={row.Name}>
                                        {/* {console.log(row.name)} */}
                                        <TableCell component="th" scope="row">
                                            {index + 1011}
                                        </TableCell>
                                        <TableCell >
                                            <a href={`/detail?type=${history.location.pathname == '/customerlist' ? "customer" : "supplier"}&id=${row.Id}`} style={{ textDecoration: 'none' }}>{row.Name}</a>
                                        </TableCell>
                                        <TableCell >{row.Address}</TableCell>
                                        <TableCell >{row.Contact}</TableCell>
                                        <TableCell >{row.PreviousBalnce}</TableCell>
                                        <TableCell >
                                            {
                                                isAdmin() &&
                                                <>

                                                    {/* <span onClick={() => history.push({ pathname: 'editcustomer', state: { id: row.Id } })}> */}
                                                    <span onClick={() => history.push({ pathname: history.location.pathname == '/customerlist' ? 'editcustomer' : 'editsupplier', state: { id: row.Id } })}>
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
                }
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
