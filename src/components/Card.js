import React from 'react';

const Card = (props) => {

    const classes = props.className ? props.className + ' card' : 'card';
    
    return ( () => {
        if (props.id){
            return (
                <div id={props.id} className={classes}>
                    {props.children}
                </div>
            )
        }else{
            return (
                <div className={classes}>
                    {props.children}
                </div>
            )
        }
    } )()
}

export default Card;