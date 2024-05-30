import React, { useState } from 'react'
import validator from 'validator'


export default function QrCode() {
    const [img,setImg] = useState('')
    const [loading, setLoading] = useState(false)
    const [qrData, setQrData] = useState("")
    const [dimData, setDimData] = useState("")
    const [isLink, setIsLink] = useState(true)
    const [isDim, setIsDim] = useState(true)
    const [showError, setShowError] = useState(false);

   const handleChangeQr = (e) => {
    const value = e.target.value;
    setQrData(value);
    setIsLink(validator.isURL(value))
   }

   const handleChangeDim = (e) => {
    const value = e.target.value;
    setDimData(value);
    setIsDim(validator.isNumeric(value))
   }

    async function generateQR() {
        if (!qrData || !dimData) { 
            setShowError(true); 
            return;
        }
        setLoading(true)
        try {
            const url = `http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}!&size=${dimData}x${dimData}`;
            setImg(url)
        }catch (error){
            console.error("Error in generating QR code", error);
        }
        finally {
            setLoading(false);
        }
    }

    function downloadQR() {
        if (!qrData || !dimData) { 
            setShowError(true); 
            return;
        }
        fetch(img).then((response) => response.blob())
        .then((blob) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob)
            link.download="qrcode.png"
            document.body.appendChild(link)
            link.click();
            document.body.removeChild(link)
        }).catch((error) => {
            console.error("Error downloading QR code", error)
        })
    }

  return (
    <div className='app-container'>
        <h1>QR Code Generator</h1>
        {loading && <p>Please wait...</p>}
        {img && <img src={img} className='qr-code-image'/>}
            <label htmlFor='dataInput' className='input-label'>
                URL link
            </label>
            <input type='text' value={qrData} id="dataInput" placeholder='Enter the link for QR code' 
            onChange={handleChangeQr}/>
             {!isLink && <p style={{ color: 'red'}}>Input is not valid</p>}
            <label htmlFor='sizeInput' className='input-label'>
                Image size
            </label>
            <input type='text' value={dimData} id="sizeInput" placeholder='Enter the image size' 
            onChange={handleChangeDim}/>
            {!isDim && <p style={{ color: 'red'}}>Input is not valid</p>}
            {showError && (!qrData || !dimData) && <p style={{ color: 'red', margin: 0 }}>Please enter values in both fields</p>}
            <button className='generate-button' disabled={loading} onClick={generateQR}>Generate QR Code</button>
            <button className='download-button' onClick={downloadQR}>Download QR Code</button>

    </div>
  )
}
