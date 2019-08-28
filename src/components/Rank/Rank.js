import React from 'react'

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='white f3'>
                {`${name} , Your number of submitted images is...`}
            </div>
            <div className='white f1 '>
                {entries}
            </div>
        </div>
    )
}

export default Rank;