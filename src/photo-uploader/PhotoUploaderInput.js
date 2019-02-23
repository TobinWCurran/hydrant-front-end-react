import React from 'react';

const PhotoUploaderInput = (props) => {

    const handleOnChange = (event) =>{
        props.onChange(event);
    }

    return (
        <>
            <label htmlFor={'select-image'} className={'button'}>Take/Select Photo</label>
            <input name={'hydrant'} type={'file'} id={'select-image'} className={'show-for-sr file-select'} onChange={handleOnChange}></input>
        </>
    )
}

export default PhotoUploaderInput;