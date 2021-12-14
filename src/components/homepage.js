import React, {useState, useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import { Collapse, CssBaseline, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link as Scroll } from 'react-scroll';
import PlaceToVisit from './PlaceToVisit';

const useStyles = makeStyles((theme) => ({
    root : {
        minHeight: '100vh',
        backgroundImage : `url("https://riceberrythaicuisine.co.uk/wp-content/uploads/2021/04/italian-food-background-1.jpg")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
        display:'flex',
        justifyContent:'center',
        textAlign:'center',
        alignItems:'center',
        fontFamily: 'Nunito'
    },
    container: {

    },
    colorText: {
        color: 'blue'
    },
    title: {
        color:'#fff',
        fontSize : '4rem'
    },
    goDown:{
        color: 'blue',
        width: '4rem'
    },

}));

export default function(){
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
      setChecked(true);
      console.log("collapse begin ")
    }, []);
    return (
        <div>
        <CssBaseline/>
        <div id="header">
    <div className={classes.root}>

        <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedSize={50}
      >
        <div className={classes.container}>
            <h1 className={classes.title}>
                Welcome to <br /> My
                <span className={classes.colorText}> Website.</span>
            </h1>
            <Scroll to="place-to-visit" smooth={true}>
            <IconButton>
                <KeyboardArrowDownIcon className={classes.goDown}/>
            </IconButton>
            </Scroll>
        </div>
        </Collapse>

    </div>

    </div>
    <PlaceToVisit></PlaceToVisit>
    </div>);
}