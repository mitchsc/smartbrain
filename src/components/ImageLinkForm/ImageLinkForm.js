import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonClick }) => {
    return (
        <div>
            <p className='f3'>
                {'This magic brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div>
                <div className='form pa4 br3 shadow-5 center'>
                    <input placeholder='Image URL' className='f4 pa2 w-70 center' type='text' onChange={onInputChange}></input>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonClick}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;