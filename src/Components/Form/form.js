import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from './TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import PeopleIcon from '@material-ui/icons/People'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import { useHistory } from 'react-router-dom';
import api from '../../api/api';
import Toast from '../Toast/toast'



const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));
export default function Form() {
    const history = useHistory()
    const classes = useStyles();
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')
    const [PBalance, setPBalance] = useState('')
    const [state, setState] = useState('addcustomer')
    const [title, setTitle] = useState('Customer')
    const [error, setError] = useState('Name and Contact Number must be filled')
    const [open, setOpen] = useState(false)
    const getCustomer = async (id) => {
        try {
            // alert('this here ')
            const res = await api.get(`customer/get/${id}`)
            setFirstName(res.data.data.customer_name)
            setAddress(res.data.data.address)
            setContact(res.data.data.contact_no)
            setEmail(res.data.data.email)
            setPBalance(res.data.data.previous_balance)
            // alert(JSON.stringify(res.data.data))

        } catch (error) {

        }
    }
    const getsupplier = async (id) => {
        try {
            const res = await api.get(`supplier/get/${id}`)
            setFirstName(res.data.data.supplier_name)
            setAddress(res.data.data.address)
            setContact(res.data.data.contact_no)
            setEmail(res.data.data.email)
            setPBalance(res.data.data.previous_balance)
            // alert(JSON.stringify(res.data.data.customer_name))
        } catch (error) {

        }
    }

    useEffect(() => {
        if (history.location.pathname == "/editcustomer") {
            getCustomer(history.location.state.id)
            setState('editcustomer')
            setTitle('Customer')

        }
        if (history.location.pathname == "/editsupplier") {
            getsupplier(history.location.state.id)
            setState('editsupplier')
            setTitle('Supplier')
        }
        if (history.location.pathname == "/addsupplier") {
            // getCustomer(history.location.state.id)
            setState('addsupplier')
            setTitle('Supplier')
        }

    }, [])


    const checkApiCall = () => {
        setOpen(false)
        if (state == "addcustomer")
            addCustomer()
        else if (state == "editcustomer")
            editCustomer()
        else if (state == "editsupplier")
            editSupplier()
        else if (state == "addsupplier")
            addSupplier()

    }

    const addCustomer = async () => {
        if (firstName == '' || contact == '') {
            setOpen(true)
            return
        }
        const res = await api.post(`customer/add`, {
            customer_name: firstName,
            customer_email: "user@pos.com",
            contact_no: contact,
            address,
            previous_balance: PBalance
        });

        if (res.status === 200) {
            if (!res.data.data) {
                setError(res.data.message)
                setOpen(true)
            } else {
                // alert(JSON.stringify(res.data.data))
                history.push("/customerlist");
            }

            // this.props.history.push("/customers");
        } else {
            throw new Error(
                `Unable to create the record. The status code is ${res.status}`
            );
        }
    }
    const editCustomer = async () => {
        if (firstName == '' || contact == '') {
            setOpen(true)
            return
        }
        const res = await api.put(`customer/update/${history.location.state.id}`, {
            customer_name: firstName,
            customer_email: email,
            contact_no: contact,
            address,
            previous_balance: PBalance
        });
        // alert(JSON.stringify(res.data))

        if (res.status === 200) {
            alert(JSON.stringify(res.data))
            // history.push("/customerlist");

            // this.props.history.push("/customers");
        } else {
            throw new Error(
                `Unable to create the record. The status code is ${res.status}`
            );
        }
    }
    const addSupplier = async () => {
        // alert('i am at add supplier')
        if (firstName == '' || contact == '') {
            setOpen(true)

            return
        }
        const res = await api.post(`supplier/add`, {
            supplier_name: firstName,
            supplier_email: null,
            contact_no: contact,
            address,
            previous_balance: PBalance
        });

        if (res.status === 200) {
            if (!res.data.data) {
                setError(res.data.message)
                setOpen(true)
            } else {
                // alert(JSON.stringify(res.data.data))
                // history.push("/customerlist");
                history.push("/supplierlist");
            }
            // alert("Saved successfully");
            // alert(JSON.stringify(res.data))
        } else {
            throw new Error(
                `Unable to create the record. The status code is ${res.status}`
            );
        }
    }
    const editSupplier = async () => {

        if (firstName == '' || contact == '') {
            setOpen(true)

            return
        }
        alert(PBalance)
        const res = await api.put(`supplier/update/${history.location.state.id}`, {
            supplier_name: firstName,
            supplier_email: email,
            contact_no: contact,
            address,
            previous_balance: PBalance
        });
        // alert(JSON.stringify(res.data))

        if (res.status === 200) {
            history.push("/supplierlist");

            // this.props.history.push("/customers");
        } else {
            throw new Error(
                `Unable to create the record. The status code is ${res.status}`
            );
        }
    }
    setTimeout(() => {
        setOpen(false)
        // alert('called')
    }, 5000);

    return (
        <React.Fragment>
            {
                open &&

                <Toast open={true} title={error} type='error' />
            }
            <Grid container xs={12} style={{ padding: '0 250px 0 200px', marginTop: 50 }}>
                {/* <form onSubmit > */}

                <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    placeholder={`${title} Name`}
                    autoComplete="given-name"
                    variant="filled"
                    value={firstName}
                    title={`${title} Name`}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ height: 35, marginBottom: 10 }}
                // style={{ borderWidth: 0.1, width: '100%', height: 35 }}
                />


                {/* <TextField
                    // required
                    id="email"
                    name="email"
                    label="Email"
                    placeholder={`${title} Email`}
                    value={email}
                    title={`${title} Email`}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ height: 35, marginBottom: 10 }}
                /> */}
                <TextField
                    required
                    id="contact"
                    name="contact"


                    title={`${title} Mobile`}
                    placeholder={`${title} Mobile`}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    style={{ height: 35, marginBottom: 10 }}

                />


                <TextField
                    // required
                    id="address1"
                    name="address1"
                    title={`${title} Address`}
                    placeholder={`${title} Address`}
                    type="textarea"
                    // style={{ marginBottom: 20 }}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ height: 35, marginBottom: 50 }}
                />



                <TextField
                    // required
                    id="PBalance"
                    name="PBalance"
                    title="Previous Balance"
                    placeholder="Previous Balance"
                    value={PBalance}
                    onChange={(e) => setPBalance(e.target.value)}
                    style={{ height: 35, marginBottom: 10 }}

                />




                <Grid item xs={12} sm={6}>
                    <Button
                        variant="contained"
                        // color="primary"
                        size="small"
                        className={classes.button}
                        // startIcon={<SaveIcon />}
                        onClick={() => checkApiCall()}
                        style={{ backgroundColor: '#003366', color: 'white' }}
                    >
                        Save
                    </Button>
                </Grid>


                {/* </form> */}
            </Grid>
        </React.Fragment>
    );
}