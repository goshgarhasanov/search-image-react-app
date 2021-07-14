import React from 'react';

const ImageLists = (props) => {


    return (
        <div>
            {props.images.map((image) => {
                return <img style={{ marginInline: '6px', border: '5px solid black' }} src={image.webformatURL} />
            })}
        </div>
    )
}

export default ImageLists