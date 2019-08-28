import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({ imageURL, boxes }) => {
    return (
        <div className='center'>
            <div className='absolute mv2'>
                <img id='inputImage' alt='' src={imageURL} width='500px' height='auto' />
                {boxes.map((box, index) => {
                    return <div key={ index } className='boundingBox' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
                })}
            </div>
        </div>
    )
}

export default FaceRecognition;