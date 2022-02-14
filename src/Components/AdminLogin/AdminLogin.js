import { Grid } from '@material-ui/core'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import api from '../../api/api';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router';


export default function AdminLogin(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [first_name, set_first_name] = useState('')
    const [last_name, set_last_name] = useState('')
    const history = useHistory()
    const [isSignin, setIsSignin] = useState(history.location.state?.data ? false : true)

    const signin = async () => {

        const res = await api.post(`admin/login`, {
            email,
            password
        })
        if (res.data.data) {
            if (res.data.data.type == "admin")
                localStorage.setItem('isadmin', 'admin')
            localStorage.setItem('token', JSON.stringify(res.data.data))
            window.location.reload()
        }
    }
    const signup = async () => {
        const res = await api.post(`admin/signup`, {
            first_name,
            last_name,
            email,
            password,
            type: history.location.state?.data || 'admin'
        })
        if (res.data.data) {
            localStorage.setItem('token', JSON.stringify(res.data.data))
            window.location.reload()
            // props.changeLogin()
        }

    }
    return (
        <Grid container style={{ height: '100vh' }} spacing={5}>
            {/* {JSON.stringify(history.location.state.data)} */}
            {/* <Grid item xs={4} style={{ backgroundColor: 'green', height: '100vh' }}>

            </Grid> */}
            <Grid item xs={12} >
                <div style={{ textAlign: 'center' }}>

                    <div style={{ height: 300, width: 500, backgroundColor: 'white', textAlign: 'center', margin: 'auto', marginTop: 50 }}>
                        <h2>Sign in to your account!</h2>
                        {
                            isSignin ?
                                <>
                                    <form onSubmit={signin}>
                                        <Box sx={{ width: 500 }}>
                                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField value={email} id="input-with-sx" label="Your Email" variant="standard" style={{ width: 300, }} onChange={e => setEmail(e.target.value)} />
                                        </Box>
                                        <Box sx={{ width: 500, }}>
                                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField value={password} id="input-with-sx" type="password" label="Your Password" variant="standard" style={{ width: 300, }} onChange={e => setPassword(e.target.value)} />
                                        </Box>
                                        <Button variant="outlined" onClick={signin}>LOGIN</Button>
                                    </form>
                                    <p onClick={() => setIsSignin(false)}>SignUp?</p>
                                </>
                                : <>
                                    <form onSubmit={signup}>
                                        <Box sx={{ width: 500 }}>
                                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField value={first_name} id="input-with-sx" label="First Name" variant="standard" style={{ width: 300, }} onChange={e => set_first_name(e.target.value)} />
                                        </Box>
                                        <Box sx={{ width: 500, }}>
                                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField value={last_name} id="input-with-sx" label="Last Name" variant="standard" style={{ width: 300, }} onChange={e => set_last_name(e.target.value)} />
                                        </Box>
                                        <Box sx={{ width: 500, }}>
                                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField value={email} id="input-with-sx" label="Email" variant="standard" style={{ width: 300, }} onChange={e => setEmail(e.target.value)} />
                                        </Box>
                                        <Box sx={{ width: 500, }}>
                                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            <TextField value={password} id="input-with-sx" type="password" label="Password" variant="standard" style={{ width: 300, }} onChange={e => setPassword(e.target.value)} />
                                        </Box>
                                        <Button variant="outlined" onClick={signup}>REGISTER</Button>
                                    </form>
                                    {
                                        !history.location.state?.data &&

                                        <p onClick={() => setIsSignin(true)}>LOGIN?</p>
                                    }
                                </>

                        }
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}
