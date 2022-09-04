import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import api from '../../api/api';
import { useHistory } from 'react-router-dom';
import Alert from '../Toast/toast'
import Bar from '../AppBar/AppBarComponent'



function createData(serielNumber, Particular, ChequeNo, ChequeDate, Debit, Credit, Balance) {
    return { serielNumber, Particular, ChequeNo, ChequeDate, Debit, Credit, Balance };
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

export default function SuplierLedger(props) {
    const history = useHistory()
    const classes = useStyles();
    const [userData, setUserData] = React.useState('');
    const [allData, setAllData] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [Debit, setDebit] = React.useState(0);
    const [Credit, setCredit] = React.useState(0);
    const [Loading, setLoading] = React.useState(false);


    const [openDialog, setOpenDialog] = React.useState(false);


    const get_all_Ledger = async () => {
        // alert('working')
        try {

            const res = await api.get(`ledger/getuserledger/${props.id}`);
            console.log(res)
            console.log(res.data.data)
            if (typeof res.data.data.records == 'undefined')

                setUserData([])
            else {
                // alert('here')
                let temp = []
                res.data.data.records.map(item =>
                    temp.push(createData(item.serielNumber, item.particular, item.chequeNo, item.chqDate, item.debit, item.credit, item.balance))

                )
                setRows(temp)
                setAllData(res.data.data.records)
                setDebit(res.data.data.total_debit)
                setCredit(res.data.data.total_credit)
                setLoading(false)
            }
            setUserData(res.data.data.records)
        } catch (error) {
            alert(error)
        }
    }
    useEffect(() => {
        setLoading(true)
        get_all_Ledger()
    }, [])


    const setDataForSearch = (data) => {
        // alert(JSON.stringify(data.length))
        let temp = []
        data.map(item =>
            temp.push(createData(item.serielNumber, item.particular, item.chequeNo, item.chqDate, item.debit, item.credit, item.balance))
        )
        setRows(temp)
    }

    return (<>
        <Bar title='Supplier' link1="Dashboard" link2="Ledger Entries" data={allData} setDataForSearch={setDataForSearch} from='suplier' />

        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Alert />
                {Loading ? <CircularProgress /> :
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Seriel Number</TableCell>
                                    <TableCell>Particular</TableCell>
                                    <TableCell>Cheque No</TableCell>
                                    <TableCell>Cheque Date</TableCell>
                                    <TableCell>Debit</TableCell>
                                    <TableCell>Credit</TableCell>
                                    <TableCell>Balance</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={index}>

                                        <TableCell component="th" scope="row">
                                            {index + 1011}
                                        </TableCell>
                                        <TableCell >{row.Particular}</TableCell>
                                        <TableCell >{row.ChequeNo}</TableCell>
                                        <TableCell >{row.ChequeDate}</TableCell>
                                        <TableCell >{row.Debit}</TableCell>
                                        <TableCell >{row.Credit}</TableCell>
                                        <TableCell >{row.Balance}</TableCell>
                                    </TableRow>
                                ))}

                                <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell rowSpan={3} />
                                    <TableCell rowSpan={3} />
                                    {/* <TableCell colSpan={2}  align="right"></TableCell> */}
                                    <TableCell colSpan={1} align="left">Total Debit</TableCell>
                                    <TableCell colspan={2} align="left">{Debit}</TableCell>
                                </TableRow>
                                <TableRow>
                                    {/* <TableCell colSpan={2}  align="right"></TableCell> */}
                                    <TableCell colSpan={2} align="left">Total Credit</TableCell>
                                    <TableCell colspan={1} align="left">{Credit}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </Paper>
        </div>
    </>
    );
}
