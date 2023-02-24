import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "../Form/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";
import PeopleIcon from "@material-ui/icons/People";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import { useHistory } from "react-router-dom";
import api from "../../api/api";
import Toast from "../Toast/toast";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
export default function Form() {
  const history = useHistory();
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const [chqDate, setchqDate] = useState("");
  const [paid_amount, set_paid_amount] = useState();
  const [chequeNo, set_chequeNo] = useState();
  const [open, setOpen] = useState(false);
  const [allCustomers, setAllCustomers] = useState([]);

  useEffect(async () => {
    if (history.location.pathname == "/customerpayment") {
      const res1 = await api.get("customer/get_all");
      if (res1.data.data) setAllCustomers(res1.data.data);
    }
    if (history.location.pathname == "/supplierpayment") {
      const res1 = await api.get("supplier/get_all");
      if (res1.data.data) setAllCustomers(res1.data.data);
    }
  }, []);

  setTimeout(() => {
    setOpen(false);
    // alert('called')
  }, 5000);

  const submit = async () => {
    if (history.location.pathname == "/customerpayment") {
      const res = await api.post(`customer/add_payment`, {
        customer_name: firstName?.name,
        details,
        paid_amount,
        date,
       
      });
      alert(JSON.stringify(res.data.data));
      return;
    } else {
      const res = await api.post(`supplier/add_payment`, {
        supplier_name: firstName?.name,
        details,
        paid_amount,
        date,
        supplierID: firstName?.id,
        chqDate,
        chequeNo
      });
      console.log(res);
      // alert(JSON.stringify(res.data.data))
    }
  };

  return (
    <React.Fragment>
      <Grid
        container
        xs={12}
        style={{ padding: "0 250px 0 200px", marginTop: 50 }}
      >
        {/* <form onSubmit > */}
        <Autocomplete
          id="combo-box-demo"
          options={allCustomers}
          getOptionLabel={(option) =>
            history.location.pathname == "/customerpayment"
              ? option.customer_name
              : option.supplier_name
          }
          onChange={(e, newValue) => {
            console.log(newValue, "NEWVALUE");
            if (history.location.pathname == "/customerpayment") {
              setFirstName({ name: newValue?.customer_name });
            } else {
              setFirstName({
                name: newValue?.supplier_name,
                id: newValue?._id,
              });
            }
          }}
          renderInput={(params) => (
            <>
              <div ref={params.InputProps.ref} style={{}}>
                Name
                <input
                  style={{
                    height: 35,
                    marginLeft: 157,
                    width: 587,
                    marginBottom: 10,
                  }}
                  type="text"
                  placeholder="Name"
                  {...params.inputProps}
                />
              </div>
            </>
          )}
        />

        {/* <TextField
                    required
                    id="Name"
                    name="Name"
                    label="name"
                    placeholder={`Name`}
                    autoComplete="given-name"
                    variant="filled"
                    value={firstName}
                    title={`Name`}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ height: 35, marginBottom: 10 }}
                // style={{ borderWidth: 0.1, width: '100%', height: 35 }}
                /> */}

        <TextField
          // required
          id="Details"
          name="Details"
          title="Details"
          placeholder="Details"
          type="textarea"
          style={{ marginBottom: 20 }}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          style={{ height: 35, marginBottom: 50 }}
        />
        <TextField
          // required
          id="Paid"
          name="Paid"
          label="Paid Amount"
          placeholder="Paid Amount"
          value={paid_amount}
          title="Paid Amount"
          onChange={(e) => set_paid_amount(parseInt(e.target.value))}
          style={{ height: 35, marginBottom: 10 }}
          inputType="number"
        />
        <TextField
          required
          id="date"
          name="date"
          inputType="date"
          title="Date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ height: 35, marginBottom: 10 }}
        />
        <TextField
          required
          id="chqDate"
          name="chqDate"
          inputType="date"
          title="Cheque Date"
          placeholder="Date"
          value={chqDate}
          onChange={(e) => setchqDate(e.target.value)}
          style={{ height: 35, marginBottom: 10 }}
        />

        <TextField
          // required
          id="chequeNo"
          name="chequeNo"
          label="Cheque No"
          placeholder="Cheque No"
          value={chequeNo}
          title="Cheque No"
          onChange={(e) => set_chequeNo(parseInt(e.target.value))}
          style={{ height: 35, marginBottom: 10 }}
          inputType="number"
        />

        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            // color="primary"
            size="small"
            className={classes.button}
            // startIcon={<SaveIcon />}
            onClick={() => submit()}
            style={{ backgroundColor: "#003366", color: "white" }}
          >
            Save
          </Button>
        </Grid>

        {/* </form> */}
      </Grid>
    </React.Fragment>
  );
}
