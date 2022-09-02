import { Grid, Link } from '@material-ui/core'
import React from 'react'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import CountUp from 'react-countup';


export default function CustomCountCard(props) {
    return (
        <Grid container >
            <Grid item xs={12}>

                <div style={{ width: '100%', height: 120, borderRadius: 5, backgroundColor: '#FAFAFA' }}>
                    <Grid container style={{ padding: '10px 10px 10px 10px' }}>
                        {props.countCard ?
                            <>
                                {/* <Grid xs={1}></Grid> */}
                                <Grid item xs={12} style={{}}>{props.title}</Grid>
                                <br />
                                <br />

                                <Grid xs={6}><p style={{ fontSize: 22, fontWeight: 'bold', display: 'inline', overflow: 'auto' }}>
                                    <CountUp
                                        end={props.count}
                                        duration={1}
                                    />
                                    {/* {props.count} */}
                                </p>
                                    <ArrowDropUpIcon
                                        style={{ marginTop: 10, overflow: 'auto' }}
                                    />
                                </Grid>
                                <Grid xs={3}></Grid>
                                <Grid xs={3}>
                                    {props.icon}
                                </Grid>
                            </>
                            :
                            <>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={5}>{props.icon}</Grid>
                                <Grid item xs={3}></Grid>

                                <Grid item xs={3}></Grid>
                                <Grid item xs={9}>
                                    <h3 style={{ color: 'blueviolet' }}>
                                        <Link href={props.link}>
                                            {props.title}
                                        </Link>
                                    </h3>
                                </Grid>
                                {/* <Grid item xs={3}></Grid> */}


                            </>
                        }

                    </Grid>
                </div>
            </Grid>

        </Grid>
    )
}
