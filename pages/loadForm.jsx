import { useEffect, useState } from 'react';
import axios from 'axios';
import pako from "pako";

const ImageForm = () => {
    const [imageData, setImageData] = useState(null);

    const handleSubmit = async () => {
        try {
            await axios.post("/api/submitHandler", {
                imageData
            });
        } catch (error) {
            if (error.response.status == 413) {
                const compressedImageData = pako.deflate(imageData, { to: "string" });
                try {
                    await axios.post("/api/submitHandler", {
                        compressedImageData
                    })
                } catch (err) {
                    if (err.response.status == 413){
                        //console.log(compressedImageData);
                        console.log(compressedImageData);
                    }else{
                        console.log(err);  
                    }
                }
            } else {
                console.log(error);
            }
        }
    }

    const splitArrayInHalf = (arr) => {
        const middleIndex = Math.floor(arr.length / 2);
        const firstHalf = arr.slice(0, middleIndex);
        const secondHalf = arr.slice(middleIndex);
        return [firstHalf, secondHalf];
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageData(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <h2>Adjuntar imagen</h2>
            <input type="file" onChange={handleImageChange} />
            {imageData && (
                <div>
                    <h3>Vista previa de la imagen:</h3>
                    <img src={imageData} alt="Imagen adjuntada" style={{ maxWidth: '300px' }} />
                    <br></br>
                    <button onClick={handleSubmit}>Subir imagen</button>
                </div>
            )}
        </div>
    );
};

export default ImageForm;
