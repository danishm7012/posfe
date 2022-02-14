import { AppBar, Button, Container, Divider, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import TextField from '../Form/TextField'
import InputField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import api from '../../api/api';
import Toast from '../Toast/toast'
import { useHistory } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Bar from '../AppBar/AppBarComponent'
import { isAdmin } from '../../helpers/isAuthenticated'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
function createData(sl, category, action) {
    return { sl, category, action };
}
export default function AddInvoice() {
    const [category, setCategory] = useState('')
    const [rows, setRows] = useState([])
    const [openDialog, setOpenDialog] = React.useState(false);
    const [itemToDelete, setItemToDelete] = React.useState(null);



    const [toast, setToast] = useState(false)
    const [title, setTitle] = useState('')
    const [type, setType] = useState('success')
    const history = useHistory()
    const classes = useStyles();
    const [status, setStatus] = useState('add')
    const [selectedItem, setSelectedItem] = useState('')

    const handleDialog = () => {
        setOpenDialog(!openDialog)
    }
    useEffect(async () => {
        const res = await api.get('category/get_all')
        if (res.data.data) {
            let temp = []
            res.data.data.map(x => {
                temp.push(createData(x._id, x.category_name))
            })
            setRows(temp)
        }

    }, [])

    const handleSubmit = async () => {
        var res = null
        if (status == 'add')
            res = await api.post('category/add', {
                category_name: category
            })
        else
            res = await api.put(`category/update/${selectedItem}`, {
                category_name: category
            })
        if (res.data.data) {
            // alert('in')
            setStatus('add')
            setType('success')
            setTitle('Added Succesfully')
            setToast(false)
            setToast(true)
            window.location.reload()
            // history.push({ pathname: '/invoice', state: { name: selectedProduct.product_name, price, quantity: selectedCartons, grand_total: total - discount } })
        }
        else {
            // alert('in ewrror')
            setToast(false)
            setToast(true)
            setType('error')
            setTitle(res.data.message)

        }


    }
    return (
        <>
            <Bar title="Add Category" link1="Dashboard" link2="Add Category" />
            {toast &&

                <Toast open={true} title={title} type={type} />
            }
            <Container style={{ padding: '10px 10px 10px 10px', overflow: 'auto' }}>



                <Grid container xs={12} style={{ marginTop: 20 }}>
                    <Grid item xs={3} style={{}}>Category Name</Grid>
                    <Grid item xs={4}>
                        <input style={{ width: '100%', height: 35 }} placeholder="Category Name" onChange={e => setCategory(e.target.value)} value={category} />
                    </Grid>
                </Grid>

                <Grid container xs={12} style={{ marginTop: 10 }}>
                    <Grid item xs={3} style={{}}></Grid>
                    <Grid item xs={4}>

                        <Button
                            variant="contained"
                            // color="danger"
                            size="small"
                            // className={classes.button}
                            // startIcon={<SaveIcon />}
                            style={{
                                marginLeft: 10,
                                backgroundColor: '#003366',
                                color: 'white'

                            }}
                            onClick={() => handleSubmit()}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>


            </Container>
            <Container style={{ marginTop: 100 }}>
                <Grid constainer>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>SL.</TableCell>
                                    <TableCell >Catagory Name</TableCell>
                                    <TableCell >Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={row.sl}>
                                        <TableCell >
                                            {index + 1011}
                                        </TableCell>
                                        <TableCell >{row.category}</TableCell>
                                        <TableCell >
                                            {isAdmin() &&
                                                <>
                                                    {/* <span onClick={() => history.push({ pathname: 'editcustomer', state: { id: row.Id } })}> */}
                                                    <span
                                                        // onClick={() => history.push({ pathname: history.location.pathname == '/customerlist' ? 'editcustomer' : 'editsupplier', state: { id: row.Id } })}
                                                        onClick={() => {
                                                            setSelectedItem(row.sl)
                                                            setStatus('edit')
                                                            setCategory(row.category)
                                                        }
                                                        }
                                                    >
                                                        <EditIcon style={{ color: '#003366', cursor: 'pointer' }} />
                                                    </span>
                                                    <span
                                                        onClick={() => {
                                                            handleDialog();
                                                            setItemToDelete(row.sl)
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

                </Grid>
            </Container>
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
                    <Button onClick={async () => {
                        // alert(itemToDelete)
                        const res = await api.delete('category/delete/' + itemToDelete)
                        // alert(JSON.stringify(res.data))
                        // if (res.data.data)
                        handleDialog()
                        window.location.reload()
                    }} style={{ color: 'red' }} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
