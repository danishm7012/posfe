import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import api from '../../api/api';
import { useHistory } from 'react-router-dom';

const AddLedger = (props) => {

    const history = useHistory();
    const [entry, setentry] = useState({
        serielNumber: "",
        supplierID: new URLSearchParams(props.history.location.search).get('supplier'),
        customerID: new URLSearchParams(props.history.location.search).get('customer'),
        particular: "",
        chqDate: "",
        chequeNo: "",
        debit: false,
        Payment: ''
    });

    const handleChange = (event) => {
        if (event.target.name === "debit") {
            setentry({ ...entry, [event.target.name]: event.target.checked })
        }
        else {
            setentry({ ...entry, [event.target.name]: event.target.value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const res = await api.post(`/${entry.supplierID?'supplier':'customer'}/add_payment`,{

                serielNumber:entry.serielNumber,
                supplierID:entry.supplierID,
                customerID:entry.customerID,
                particular:entry.particular,
                chqDate:entry.chqDate,
                chequeNo:entry.chequeNo,
                debit:entry.debit,
                ammount:entry.Payment
            });
            console.log(res)
            console.log(res.data.data)
            history.push(`/detail?type=${entry.supplierID?'supplier':'customer'}&id=${entry.supplierID?entry.supplierID:entry.customerID}`)
        } catch (error) {
            alert(error)
        }
    }

    return <div>
        <Grid xs={9} md={7} lg={5} className='mx-auto' >
            <Box m={2} p={3}>
                <form onSubmit={handleSubmit} >
                    <h1>Add Ledger Entry</h1>
                    <label htmlFor="serielNumber" >Serial Number</label>
                    <input
                        required={true}
                        id='serielNumber'
                        name='serielNumber'
                        placeholder='Serial Number'
                        value={entry.serielNumber}
                        onChange={handleChange}
                        style={{ borderWidth: 0.1, width: '100%', height: 35, paddingLeft: 10, marginBottom: 10 }}
                        type='text'
                    />
                    <label htmlFor="particular" >Particular</label>
                    <input
                        required={true}
                        id='particular'
                        name='particular'
                        placeholder='Particular'
                        value={entry.particular}
                        onChange={handleChange}
                        style={{ borderWidth: 0.1, width: '100%', height: 35, paddingLeft: 10, marginBottom: 10 }}
                        type='text'
                    />
                    <label htmlFor="chqDate" >Cheque Date</label>
                    <input
                        required={true}
                        id='chqDate'
                        name='chqDate'
                        placeholder='Cheque Date'
                        value={entry.chqDate}
                        onChange={handleChange}
                        style={{ borderWidth: 0.1, width: '100%', height: 35, paddingLeft: 10, marginBottom: 10 }}
                        type='text'
                    />
                    <label htmlFor="chequeNo" >Cheque No</label>
                    <input
                        required={true}
                        id='chequeNo'
                        name='chequeNo'
                        placeholder='Cheque No'
                        value={entry.chequeNo}
                        onChange={handleChange}
                        style={{ borderWidth: 0.1, width: '100%', height: 35, paddingLeft: 10, marginBottom: 10 }}
                        type='text'
                    />
                    <label>Payment Type</label>
                    <FormGroup>
                        <FormControlLabel control={
                            <Switch
                                checked={entry.debit}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled', 'name': 'debit' }}
                            />} label={entry.debit ? 'Debit' : 'Credit'} />
                    </FormGroup>
                    <label htmlFor="Payment" >Payment</label>
                    <input
                        required={true}
                        id='Payment'
                        name='Payment'
                        placeholder='Payment'
                        value={entry.Payment}
                        onChange={handleChange}
                        style={{ borderWidth: 0.1, width: '100%', height: 35, paddingLeft: 10, marginBottom: 10 }}
                        type='text'
                    />
                    <button className='btn MuiButton-containedPrimary' type='submit'>ADD</button>
                </form>
            </Box>
        </Grid>
    </div>;
};

export default AddLedger;
