import "./App.css";
import RenderHTMLDocument from './RenderHTMLDocument'; 
import { useState } from "react";
import Tesseract from "tesseract.js";

function App() {
  const [file, setFile] = useState();
  const [result, setResult] = useState("");

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    // processImage();
  };

  const processImage = () => {
    setResult("");
    Tesseract.recognize(file, 'eng+osd').then(({ data: { text } }) => {
      setResult(text);
    });
  };


  return (
    <div className="App">

      <h1>Img To WebPage</h1>
      <p>renders html code from image!</p>
      <div className="input-wrapper" style={{ marginTop: 25}}>
        <label htmlFor="upload">Upload Image</label>
        <input type="file" id="upload" accept="image/*" onChange={onFileChange}/>
        <div >
          <label htmlFor="buttn">run</label>
          <input id="buttn" type="button" value="run" onClick={processImage} />
        </div>
      </div>
      
      
      <div className='result'>
        {file && (
          <div className='box-image'>
            <div className="image-box">
            <img src={URL.createObjectURL(file)} alt='thumb'></img>
            </div>
          </div>
        )}

        {result !== "" && (
          <div className="box-p">
            <h2>Rendered HTML Page</h2>
            <RenderHTMLDocument htmlString={result} />
          </div>
          
        )}
      </div>


      
    </div>
  );
}

export default App;