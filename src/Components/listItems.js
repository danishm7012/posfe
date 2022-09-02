import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import PeopleIcon from '@material-ui/icons/People';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import ListIcon from '@material-ui/icons/List';
import { useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import { isAdmin } from '../helpers/isAuthenticated'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
        backgroundColor: '#002447'
    },
}));

export default function NestedList() {
    const classes = useStyles();
    const history = useHistory();
    const [customer, setCustomer] = React.useState(false);
    const [supplier, setSupplier] = React.useState(false);
    const [stock, setStock] = React.useState(false);
    const [payment, setPayment] = React.useState(false);
    const [invoice, setInvoice] = React.useState(false);
    const [suite, setSuite] = React.useState(false);

    const handleClickCustomer = () => {
        setCustomer(!customer);
    };
    const handleClickSupplier = () => {
        setSupplier(!supplier);
    };
    const handleClickStock = () => {
        setStock(!stock);
    };
    const handleClickInvoice = () => {
        setInvoice(!invoice);
    };
    const handleClickSuite = () => {
        setSuite(!suite);
    };
    const handleClickPayment = () => {
        setPayment(!payment);
    };


    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            // subheader={
            //     <ListSubheader component="div" id="nested-list-subheader" >
            //         <h1 ><a href='/' style={{ color: '#f5f5f5', textDecoration: 'none' }}>Dashboard</a></h1>
            //     </ListSubheader>
            // }
            style={{ backgroundColor: '#003366', color: '#f5f5f5' }}

            className={classes.root}
        >
















            <ListItem button onClick={() => history.push('/')}>
                <ListItemIcon>
                    <ShowChartIcon style={{ color: '#f5f5f5' }} />
                </ListItemIcon>
                <ListItemText primary="Dasboard" />

            </ListItem>



            <ListItem button onClick={handleClickInvoice}>
                <ListItemIcon>
                    <ShowChartIcon style={{ color: '#f5f5f5' }} />
                </ListItemIcon>
                <ListItemText primary="Sell" />
                {invoice ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={invoice} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} onClick={() => window.location = '/manageinvoice'}>
                        <ListItemIcon>
                            <ListIcon style={{ color: '#f5f5f5' }} />
                        </ListItemIcon>
                        <ListItemText primary="Manage Invoice" />
                    </ListItem>
                    <ListItem button className={classes.nested} onClick={() => window.location = '/addinvoice'}>
                        <ListItemIcon>
                            <AddIcon style={{ color: 'f5f5f5' }} />
                        </ListItemIcon>
                        <ListItemText primary="Add new Invoice" />
                    </ListItem>

                </List>
            </Collapse>



            <ListItem button onClick={handleClickSuite}>
                <ListItemIcon>
                    <ShowChartIcon style={{ color: '#f5f5f5' }} />
                </ListItemIcon>
                <ListItemText primary="SUITE" />
                {suite ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={suite} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} onClick={() => window.location = '/addcategory'}>
                        <ListItemIcon>
                            <ListIcon style={{ color: '#f5f5f5' }} />
                        </ListItemIcon>
                        <ListItemText primary="Category" />
                    </ListItem>
                    <ListItem button className={classes.nested} onClick={() => window.location = '/manageproduct'}>
                        <ListItemIcon>
                            <ListIcon style={{ color: '#f5f5f5' }} />
                        </ListItemIcon>
                        <ListItemText primary="Manage Product" />
                    </ListItem>
                    <ListItem button className={classes.nested} onClick={() => window.location = '/addproduct'}>
                        <ListItemIcon>
                            <AddIcon style={{ color: 'f5f5f5' }} />
                        </ListItemIcon>
                        <ListItemText primary="Add Product" />
                    </ListItem>

                </List>
            </Collapse>


            <ListItem button onClick={handleClickCustomer}>
                <ListItemIcon>
                    <PeopleIcon style={{ color: 'f5f5f5' }} />
                </ListItemIcon>
                <ListItemText primary="Customers" />
                {customer ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={customer} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} onClick={() => window.location = '/customerlist'}>
                        <ListItemIcon>
                            <ListIcon style={{ color: '#f5f5f5' }} />
                        </ListItemIcon>
                        <ListItemText primary="Manage Customer" />
                    </ListItem>
                    <ListItem button className={classes.nested} onClick={() => window.location = '/addcustomer'}>
                        <ListItemIcon>
                            <AddIcon style={{ color: 'f5f5f5' }} />
                        </ListItemIcon>
                        <ListItemText primary="Add Customer" />
                    </ListItem>

                </List>
            </Collapse>


            <ListItem button onClick={handleClickSupplier}>
                <ListItemIcon>
                    <PeopleIcon style={{ color: '#f5f5f5' }} />
                </ListItemIcon>
                <ListItemText primary="Suppliers" />
                {supplier ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={supplier} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} onClick={() => window.location = '/supplierlist'}>
                        <ListItemIcon>
                            <ListIcon style={{ color: '#f5f5f5' }} />
                        </ListItemIcon>
                        <ListItemText primary="Manage Supplier" />
                    </ListItem>
                    <ListItem button className={classes.nested} onClick={() => window.location = '/addsupplier'}>
                        <ListItemIcon>
                            <AddIcon style={{ color: 'f5f5f5' }} />
                        </ListItemIcon>
                        <ListItemText primary="Add Supplier" />
                    </ListItem>

                </List>
            </Collapse>




            <ListItem button onClick={handleClickStock}>
                <ListItemIcon>
                    <ShowChartIcon style={{ color: '#f5f5f5' }} />
                </ListItemIcon>
                <ListItemText primary="Stocks" />
                {stock ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={stock} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} onClick={() => window.location = '/stocklist'}>
                        <ListItemIcon>
                            <ListIcon style={{ color: '#f5f5f5' }} />
                        </ListItemIcon>
                        <ListItemText primary="Manage Stock" />
                    </ListItem>
                    <ListItem button className={classes.nested} onClick={() => window.location = '/addstock'}>
                        <ListItemIcon>
                            <AddIcon style={{ color: 'f5f5f5' }} />
                        </ListItemIcon>
                        <ListItemText primary="Add Stock" />
                    </ListItem>

                </List>
            </Collapse>






            <ListItem button onClick={handleClickPayment}>
                <ListItemIcon>
                    <ShowChartIcon style={{ color: '#f5f5f5' }} />
                </ListItemIcon>
                <ListItemText primary="Payments" />
                {payment ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={payment} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} onClick={() => window.location = '/customerpaymentList'}>
                        <ListItemIcon>
                            <ListIcon style={{ color: '#f5f5f5' }} />
                        </ListItemIcon>
                        <ListItemText primary="Customer Payment" />
                    </ListItem>
                    <ListItem button className={classes.nested} onClick={() => window.location = '/supplierpaymentList'}>
                        <ListItemIcon>
                            <AddIcon style={{ color: 'f5f5f5' }} />
                        </ListItemIcon>
                        <ListItemText primary="Supplier Payment" />
                    </ListItem>

                </List>
            </Collapse>

            {
                isAdmin() &&

                <ListItem button onClick={() => history.push({ pathname: '/addsubadmin', state: { data: 'sub admin' } })}>
                    <ListItemIcon>
                        <ShowChartIcon style={{ color: '#f5f5f5' }} />
                    </ListItemIcon>
                    <ListItemText primary="Add SubAdmin" />

                </ListItem>
            }





        </List>
    );
}
