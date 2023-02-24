import { AppBar, Container, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CountCard from './Components/customCountCard'
import HomeIcon from '@material-ui/icons/Home'
import api from '../../api/api'


export default function Home() {

    const [totalCustomers, setTotalCustomers] = useState(0)
    const [totalSuppliers, setTotalSuppliers] = useState(0)
    const [totalStock, setTotalStock] = useState(0)
    const [totalInvoice, setTotalInvoice] = useState(0)

    useEffect(async () => {
        var count = 0
        var res = await api.get('supplier/get_all')
        if (res.status == 200){
                let data=res.data.data
                let totalSupBalance=data?.reduce((accumulator, object) => {
                    return accumulator + object.previous_balance;
                  }, 0)

            setTotalSuppliers(totalSupBalance)

        }

        res = null
        res = await api.get('customer/get_all')
        if (res.status == 200){
            let data=res.data.data
                let totalCustomerBalance=data?.reduce((accumulator, object) => {
                    return accumulator + object.previous_balance;
                  }, 0)

            setTotalCustomers(totalCustomerBalance)

        }

        res = null
        res = await api.get('stock/get_all')
        if (res.status == 200){
            let data=res.data.data
            console.log(data)

                let totalProductAmount=data?.reduce((accumulator, object) => {
                    return accumulator + object.buy_price;
                  }, 0)
            setTotalStock(totalProductAmount)

        }

        res = null
        res = await api.get('invoice/get_all')
        if (res.status == 200)
            setTotalInvoice(res.data.data.length)


    }, [])
    return (
        <>
            <AppBar>hello</AppBar>
            <Container>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3} ><CountCard countCard={true} title="Total Customer Amount" count={totalCustomers} icon={<img src="./images/customer.png" width={60} />} /></Grid>
                    <Grid item xs={12} md={6} lg={3} ><CountCard countCard={true} title="Total Product Amount" count={totalStock} icon={<img src="./images/products-icon-3.png" width={60} />} /></Grid>
                    <Grid item xs={12} md={6} lg={3} ><CountCard countCard={true} title="Total Supplier Amount" count={totalSuppliers} icon={<img src="./images/supplier.png" width={60} />} /></Grid>
                    <Grid item xs={12} md={6} lg={3} ><CountCard countCard={true} title="Cycle Amount" count={(totalCustomers+totalStock)-totalSuppliers} icon={<img src="./images/invoice.png" width={60} />} /></Grid>

                    <Grid item xs={12} md={6} lg={3} ><CountCard link='/invoice' title="Create POS Invoice" icon={<img src="./images/pos_invoice.png" width={40} />} /></Grid>
                    <Grid item xs={12} md={6} lg={3} ><CountCard link='/addstock' title="Add Product" icon={<img src="./images/product.png" width={40} />} /></Grid>
                    <Grid item xs={12} md={6} lg={3} ><CountCard link='/addcustomer' title="Add Customer" icon={<img src="./images/add_customer.png" width={40} />} /></Grid>
                    <Grid item xs={12} md={6} lg={3} ><CountCard link='/addsupplier' title="Add Supplier" icon={<img src="./images/supplier.png" width={60} />} /></Grid>

                </Grid>
            </Container>
        </>
    )
}
