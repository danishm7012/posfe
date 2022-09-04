import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '../Form/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import PeopleIcon from '@material-ui/icons/People'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import { useHistory } from 'react-router-dom';
import api from '../../api/api';
import { Box, Modal } from '@mui/material';
// import {Navigate}


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));
export default function Form() {
    const history = useHistory()
    const classes = useStyles();
    const [prodcutName, setProductName] = useState('')
    const [supplierName, setSupplierName] = useState('')
    const [CName, setCName] = useState('');
    const [buyDate, setBuyDate] = useState(new Date())
    const [quantity, setQuantity] = useState('')
    const [buyPrice, setBuyPrice] = useState('')
    const [salePrice, setSalePrice] = useState('')
    const [paidAmount, setPaidAmount] = useState('')
    const [AllSupliers, setAllSupliers] = useState([])

    const [modalSpName, setModalSpName] = useState('')
    const [modalSpAddress, setModalSpAddress] = useState('')
    const [modalSpPhone, setModalSpPhone] = useState('')
    const [modalSpEmail, setModalSpEmail] = useState('')

    const handleSupplierSave = async () => {
        try {
            if (modalSpName.length < 2 || modalSpAddress.length < 6 || modalSpPhone.length < 10 || modalSpEmail.length < 6) {
                alert('Please Fill All Fields with valid values')
                return
            }
            const res = await api.post(`supplier/add`, {
                supplier_name: modalSpName,
                supplier_email: modalSpEmail,
                contact_no: modalSpPhone,
                address: modalSpAddress,
                previous_balance: 0,
            });
            if (res.status === 200) {
                // RELOAD PAGE
                window.location.reload();
            }
        }
        catch (e) {
            alert(e.message)
            console.log(e);
        }
    }


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(async () => {
        if (history.location.pathname == '/editstock')
            getStock(history.location.state.id)

        const res1 = await api.get("supplier/get_all")
        if (res1.data.data)
            setAllSupliers(res1.data.data)
    }, [])

    const getStock = async (id) => {
        try {
            const res = await api.get(`stock/get/${id}`)
            const data = res.data.data
            setProductName(data.product_name)
            setSupplierName(data.supplier_name)
            setBuyDate(data.buy_date)
            setQuantity(data.quantity)
            setBuyPrice(data.buy_price)
            setSalePrice(data.sale_price)


            // alert(JSON.stringify(res.data.data.customer_name))
        } catch (error) {

        }
    }
    const checkApiCall = () => {
        if (history.location.pathname == '/addstock')
            addStock()
        else
            editStock()

    }

    const addStock = async () => {
        const res = await api.post(`stock/add`, {
            product_name: prodcutName,
            supplier_name: supplierName,
            buy_date: buyDate,
            quantity,
            buy_price: buyPrice,
            sale_price: salePrice,
            paid_amount: paidAmount

        });

        if (res.status === 200) {
            // alert("Saved successfully");
            alert(JSON.stringify(res.data.message))
            history.push("/stocklist");
        } else {
            throw new Error(
                `Unable to create the record. The status code is ${res.status}`
            );
        }
    }
    const editStock = async () => {
        const res = await api.put(`stock/update/${history.location.state.id}`, {
            // const res = await api.post(`stock/add`, {
            product_name: prodcutName,
            supplier_name: supplierName,
            buy_date: buyDate,
            quantity,
            buy_price: buyPrice,
            sale_price: salePrice,

        });

        if (res.status === 200) {
            alert("Saved successfully");
            // alert(JSON.stringify(res.data))
            history.push("/stocklist");
        } else {
            throw new Error(
                `Unable to create the record. The status code is ${res.status}`
            );
        }
    }


    return (
        <React.Fragment>

            <Grid container xs={12} style={{ padding: '0 250px 0 200px', marginTop: 50 }}>
                {/* <form onSubmit > */}

                {/* <Grid item xs={12} > */}
                <TextField
                    required
                    id="productname"
                    name="productname"
                    label="Product Name"
                    fullWidth
                    title='Product Name'
                    placeholder='Product Name'
                    autoComplete="given-name"
                    variant="filled"
                    value={prodcutName}
                    style={{ height: 35, marginBottom: 10 }}
                    onChange={(e) => setProductName(e.target.value)}
                />

                {/* </Grid> */}
                {/* <Grid item xs={12} sm={6}> */}
                {/* <TextField
                    required
                    id="suppliername"
                    name="suppliername"
                    title="Supplier name"
                    placeholder="Supplier name"
                    fullWidth
                    autoComplete="family-name"
                    variant="filled"
                    value={supplierName}
                    style={{ height: 35, marginBottom: 10 }}
                    onChange={(e) => setSupplierName(e.target.value)}
                /> */}

                {/* <Grid container xs={6}> */}
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10
                }}>
                    <Autocomplete
                        id="combo-box-demo"
                        options={AllSupliers}
                        getOptionLabel={(option) => option.supplier_name}
                        style={{ flex: 1, }}
                        onChange={(e, newValue) => {
                            // alert((newValue.supplier_name))
                            setSupplierName(newValue.supplier_name)
                        }}
                        renderInput={(params) =>
                            <>
                                <div ref={params.InputProps.ref} style={{

                                }}>
                                    <Grid container>
                                        <Grid item xs={3}>Supplier Name</Grid>
                                        <Grid item xs={9}>

                                            <input style={{ height: 35, width: '90%', marginLeft: 20 }} type="text" placeholder='Supplier Name' {...params.inputProps} />
                                        </Grid>
                                    </Grid>
                                </div>
                            </>
                        }
                    />
                    <Button variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        onClick={handleOpen}
                    >
                        Add
                    </Button>
                </div>
                {/* </Grid> */}
                {/* </Grid> */}
                {/* <Grid item xs={12}> */}
                <TextField
                    required
                    id="date"
                    name="date"
                    title="Buy Date"

                    inputType="datetime-local"
                    // type="datetime-local"
                    autoComplete="shipping address-line1"
                    variant="filled"
                    value={buyDate}
                    style={{ height: 35, marginBottom: 10 }}
                    onChange={(e) => setBuyDate(e.target.value)}
                />
                {/* </Grid> */}
                {/* <Grid item xs={12} sm={6}> */}
                {/* <TextField
                    required
                    id="productpercarton"
                    name="productpercarton"
                    title="Product per carton"
                    placeholder="Product per carton"
                    fullWidth
                    autoComplete="shipping address-line2"
                    variant="filled"
                    value={productPerCarton}
                    style={{ height: 35, marginBottom: 10 }}
                    onChange={(e) => setProductPerCarton(e.target.value)}
                /> */}
                {/* </Grid> */}

                {/* <Grid item xs={12} sm={6}> */}
                <TextField
                    required
                    id="quantity"
                    name="quantity"
                    title="Quantity"
                    placeholder="Quantity"
                    fullWidth
                    autoComplete="shipping postal-code"
                    variant="filled"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    style={{ height: 35, marginBottom: 10 }}
                />
                {/* </Grid> */}
                {/* <Grid item xs={12} sm={6}> */}
                <TextField
                    required
                    id="buyprice"
                    name="buyprice"
                    title="Buy Price"
                    placeholder="Buy Price"
                    fullWidth
                    autoComplete="shipping postal-code"
                    variant="filled"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(e.target.value)}
                    style={{ height: 35, marginBottom: 10 }}
                />
                {/* </Grid> */}
                {/* <Grid item xs={12} sm={6}> */}
                <TextField
                    required
                    id="saleprice"
                    name="saleprice"
                    title="Sale Price"
                    placeholder="Sale Price"
                    fullWidth
                    autoComplete="shipping postal-code"
                    variant="filled"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    style={{ height: 35, marginBottom: 10 }}
                />
                <TextField
                    required
                    id="paidamount"
                    name="paidamount"
                    title="Paid Amount"
                    placeholder="Paid Amount"
                    fullWidth
                    // autoComplete="shipping postal-code"
                    variant="filled"
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(e.target.value)}
                    style={{ height: 35, marginBottom: 10 }}
                />
                {/* </Grid> */}
                <Grid item xs={12} sm={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        // startIcon={<SaveIcon />}
                        onClick={() => checkApiCall()}
                    >
                        Save
                    </Button>
                </Grid>


                {/* </form> */}
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        style={{
                            width: '130%',
                            margin: 'auto',
                        }}
                    >
                        <TextField required fullWidth={true} value={modalSpName} onChange={(e) => {
                            setModalSpName(e.target.value)
                        }} style={{
                            width: '100%',
                        }} id="outlined-basic" placeholder="Supplier Name" label="Outlined" variant="outlined" />
                        <TextField
                            required
                            value={modalSpEmail}
                            onChange={(e) => {
                                setModalSpEmail(e.target.value)
                            }}
                            style={{
                                width: '100%',
                            }} id="filled-basic" placeholder="Email" fullWidth inputType="email" label="Filled" variant="filled" />
                        <TextField
                            required
                            value={modalSpPhone}
                            onChange={(e) => {
                                setModalSpPhone(e.target.value)
                            }}
                            style={{
                                width: '100%',
                            }} id="standard-basic" label="Standard" placeholder="Number" inputType="number" variant="standard" />
                        <TextField
                            required
                            value={modalSpAddress}
                            onChange={(e) => {
                                setModalSpAddress(e.target.value)
                            }}
                            style={{
                                width: '100%',
                            }} id="standard-basic" label="Standard" inputType="textarea" placeholder="Address" variant="standard" />
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            style={{
                                maxWidth: 150
                            }}
                            onClick={handleSupplierSave}
                        >
                            Add Supplier
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}