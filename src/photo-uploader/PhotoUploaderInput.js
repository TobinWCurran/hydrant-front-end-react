import React from 'react';

const PhotoUploaderInput = (props) => {

    const handleOnChange = (event) =>{
        props.onChange(event.target.files[0]);
    }

    return (
        <>
            <label htmlFor={'select-image'} className={'button'}>Select Image</label>
            <input name={'hydrant'} type={'file'} id={'select-image'} className={'show-for-sr file-select'} onChange={handleOnChange}></input>
        </>
    )
}

export default PhotoUploaderInput;