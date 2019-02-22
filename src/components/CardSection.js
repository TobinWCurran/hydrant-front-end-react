import React from 'react';

const CardSection = (props) => {

    const classes = props.className ? props.className + ' card-section' : 'card-section'

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

export default CardSection;