import React from 'react';

const Button = (props) => {

    const classes = props.className ? props.className + ' button' : 'button';
    
    return ( () => {
        if (props.id){
            return (
                <button id={props.id} className={classes}>
                    {props.children}
                </button>
            )
        }else{
            return (
                <button className={classes}>
                    {props.children}
                </button>
            )
        }
    } )()
}

export default Button;