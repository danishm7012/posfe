import React from "react";
import { Switch, Route } from "react-router";
import Checkout from "../Components/Form/Checkout";
import CustomerList from '../Components/Customer/CustomerList'
import StockList from "../Components/Stock/StockList";
import StockCheckout from '../Components/Stock/Checkout'
import PrintInvoice from '../Components/Invoice/PrintInvoice'
import Home from '../Components/Home/home'
import AddInvoice from "../Components/Invoice/AddInvoice";
import AddProduct from '../Components/Product/AddProduct'
import ManageCategory from '../Components/Product/ManageCategory'
import ManageProduct from '../Components/Product/ManageProduct'
import Manageinvoice from '../Components/Invoice/ManageInvoice'
import PersonDetail from '../Components/PersonDetail/PersonDetail'
import AllInvoices from '../Components/Invoice/AllInvoices'
import StockOfAllSuppliers from '../Components/Stock/StockOfAllSuppliers'
import AdminLogin from "../Components/AdminLogin/AdminLogin";
import PaymentForm from '../Components/Payment/PaymentForm'
import PaymentList from '../Components/Payment/PaymentList'
import AddLedger from "../Components/Ledger/AddLedger";


export default function App() {
    return (
        <Switch>

            <Route exact path="/addsubadmin" component={AdminLogin} />


            <Route exact path="/" component={Home} />
            <Route exact path="/customerlist" component={CustomerList} />
            <Route exact path="/addcustomer" component={Checkout} />
            <Route exact path="/editcustomer" component={Checkout} />



            <Route exact path="/supplierlist" component={CustomerList} />
            <Route exact path="/addsupplier" component={Checkout} />
            <Route exact path="/editsupplier" component={Checkout} />



            <Route exact path="/stocklist" component={StockList} />
            <Route exact path="/stockofsupplier" component={StockOfAllSuppliers} />
            <Route exact path="/addstock" component={StockCheckout} />
            <Route exact path="/editstock" component={StockCheckout} />



            <Route exact path="/manageinvoice" component={Manageinvoice} />
            <Route exact path="/printinvoice" component={PrintInvoice} />
            <Route exact path="/addinvoice" component={AddInvoice} />



            <Route exact path="/addcategory" component={ManageCategory} />
            <Route exact path="/addproduct" component={AddProduct} />
            <Route exact path="/editproduct" component={AddProduct} />
            <Route exact path="/manageproduct" component={ManageProduct} />



            <Route exact path="/detail" component={PersonDetail} />
            <Route exact path='/Add_Ledger_Entry' component={AddLedger} />



            <Route exact path="/allinvoicesof" component={AllInvoices} />



            <Route exact path="/customerpayment" component={PaymentForm} />
            <Route exact path="/customerpaymentList" component={PaymentList} />

            <Route exact path="/supplierpayment" component={PaymentForm} />
            <Route exact path="/supplierpaymentList" component={PaymentList} />
        </Switch>
    );
}

