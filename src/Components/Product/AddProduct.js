import { AppBar, Button, Container, Divider, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import TextField from '../Form/TextField'
import InputField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import api from '../../api/api';
import Toast from '../Toast/toast'
import { useHistory } from 'react-router';

export default function AddInvoice() {
    const [allCategory, setAllCategory] = useState([])
    const [allSupplier, setAllSupplier] = useState([])
    const [barCode, setBarCode] = useState('')
    const [productName, setProductName] = useState('')
    const [detail, setDetail] = useState('')
    const [productPerCarton, setProductPerCarton] = useState(0)
    const [salePrice, setSalePrice] = useState(0)
    const [supplierPrice, setSupplierPrice] = useState(0)
    const [model, setModel] = useState()
    const [category, setCategory] = useState()
    const [supplier_name, setSupplierName] = useState()
    const [toast, setToast] = useState(false)
    const [title, setTitle] = useState('')
    const [type, setType] = useState('success')
    const history = useHistory()

    useEffect(async () => {
        const res = await api.get('category/get_all')
        if (res.data.data)
            setAllCategory(res.data.data)

        const response = await api.get('supplier/get_all')
        if (response.data.data)
            setAllSupplier(response.data.data)
        if (history.location.pathname == '/editproduct') {
            // alert(JSON.stringify(history.location.state.id))
            const productData = await api.get(`product/get/${history.location.state.id}`)
            let data = productData.data.data
            // alert(JSON.stringify(data))
            setBarCode(data.barcode)
            setProductName(data.product_name)
            setDetail(data.details)
            setCategory(data.category)
            setProductPerCarton(data.product_per_carton)
            setSalePrice(data.sale_price)
            setSupplierName(data.supplier_name)
            setSupplierPrice(data.supplier_price)
        }
    }, [])

    const handleSubmit = async () => {

        try {
            const res = null
            if (history.location.pathname == '/editproduct')
                res = await api.put(`product/update/${history.location.state.id}`, {
                    barcode: barCode,
                    product_name: productName,
                    details: detail,
                    category,
                    product_per_carton: productPerCarton,
                    supplier_name: supplier_name,
                    sale_price: salePrice,
                    supplier_price: supplierPrice
                })
            else
                res = await api.post('product/add', {
                    barcode: barCode,
                    product_name: productName,
                    details: detail,
                    category,
                    product_per_carton: productPerCarton,
                    supplier_name: supplier_name,
                    sale_price: salePrice,
                    supplier_price: supplierPrice
                })
            if (res.data.data) {

                setToast(false)
                setToast(true)
                setType('success')
                setTitle('Added Succesfully')
                // history.push({ pathname: '/invoice', state: { name: selectedProduct.product_name, price, quantity: selectedCartons, grand_total: total - discount } })
            }
            else {

                setToast(false)
                setToast(true)
                setType('error')
                setTitle(res.data.message)

            }
        } catch (error) {
            // alert('i')
        }

    }
    return (
        <>

            {toast &&

                <Toast open={true} title={title} type={type} />
            }
            <Container style={{ padding: '10px 10px 10px 10px' }}>
                <p style={{ fontSize: 18 }}>Add new Product</p>
                <Divider />

                <Grid container xs={12} style={{ marginTop: 20 }}>

                    <Grid container xs={6}>

                        <TextField
                            // required
                            id="Barcode/QR-code"
                            name="Barcode/QR-code"
                            label="Barcode/QR-code"
                            fullWidth
                            title='Barcode/QR-code'
                            placeholder='Barcode/QR-code'
                            autoComplete="given-name"
                            variant="filled"
                            value={barCode}
                            style={{ height: 35, marginBottom: 10 }}
                            onChange={(e) => setBarCode(e.target.value)}
                        />
                    </Grid>
                    <Grid container xs={6}>

                        {/* <Button>New Customer</Button> */}
                    </Grid>



                    <Grid container xs={6}>

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
                            value={productName}
                            style={{ height: 35, marginBottom: 10 }}
                            inputType='text'
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </Grid>
                    <Grid xs={1}></Grid>
                    <Grid container xs={5}>

                        <TextField
                            // required
                            id="detail"
                            name="detail"

                            fullWidth
                            title='Detail'
                            placeholder='Detail'
                            autoComplete="given-name"
                            variant="filled"
                            value={detail}
                            style={{ height: 35, marginBottom: 70 }}
                            type='textarea'
                            onChange={(e) => setDetail(e.target.value)}
                        />
                    </Grid>


                    <Grid container xs={6}>
                        <Grid xs={3}>Catagory</Grid>
                        <Grid xs={9}>


                            <Autocomplete
                                id="combo-box-demo"
                                value={category}
                                options={allCategory}
                                getOptionLabel={(option) => option.category_name}
                                // style={{ marginTop: 10 }}
                                onChange={(e, newValue) => {
                                    setCategory(newValue.category_name)

                                }}
                                renderInput={(params) =>
                                    <div ref={params.InputProps.ref}>
                                        <input style={{ height: 35, width: '100%', marginBottom: 20 }} type="text" {...params.inputProps} placeholder="Select One" />
                                    </div>
                                }
                            />
                        </Grid>
                    </Grid>



                </Grid>
                <form xs={12}
                    onSubmit={(e) => handleSubmit(e)}
                >

                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Product Per Carton</th>
                                <th scope="col">Sale Price</th>
                                <th scope="col">Supplier Price</th>
                                {/* <th scope="col">Model</th> */}
                                <th scope="col">Supplier</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>

                                <td style={{ width: '15%' }}>
                                    <input type='number' style={{ width: '100%', height: 35 }} value={productPerCarton} onChange={e => setProductPerCarton(e.target.value < 0 ? 0 : e.target.value)} />

                                </td>

                                <td style={{ width: '15%' }}>
                                    <input style={{ width: '100%', height: 35 }} value={salePrice} onChange={e => setSalePrice(e.target.value)} />
                                </td>
                                <td style={{ width: '15%' }}>
                                    <input type='number' style={{ width: '100%', height: 35 }} value={supplierPrice} onChange={(e) => { setSupplierPrice(e.target.value < 0 ? 0 : e.target.value) }} />
                                </td>
                                {/* <td style={{ width: '15%' }}>
                                    <input style={{ width: '100%', height: 35 }} value={model} onChange={e => setModel(e.target.value)} />
                                </td> */}
                                <td style={{ width: '40%' }}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        value={supplier_name}
                                        options={allSupplier}
                                        getOptionLabel={(option) => option.supplier_name}
                                        // style={{ marginTop: 10 }}
                                        onChange={(e, newValue) => {
                                            setSupplierName(newValue.supplier_name)
                                        }}
                                        renderInput={(params) =>
                                            <div ref={params.InputProps.ref}>
                                                <input style={{ height: 35, width: '100%' }} type="text" {...params.inputProps} />
                                            </div>
                                        }
                                    />
                                </td>



                            </tr>

                        </tbody>
                    </table>
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

                </form>
            </Container>
        </>
    )
}
