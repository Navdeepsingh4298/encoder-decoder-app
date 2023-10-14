import { useState } from "react";
import encryptDecryptKey from "./encryptDecryptKey";
import "./App.css";

function App() {
  const [plainText, setPlainText] = useState("");
  const [codedText, setCodedText] = useState("");

  const magic = (e) => {
    let action="";
    let arrayOfWords=[]
    let resultArray = [];
    let tempResultArray = [];

    (e.target.getAttribute("action") === "encrypt") ? action = "encrypt": action = "decrypt";
    
    (action === "encrypt") ? arrayOfWords = plainText.split(" ") : arrayOfWords = codedText.split(" ")
      arrayOfWords.forEach((word) => {
        let ArrayOfLetters = word.split("");
        tempResultArray =[]
        ArrayOfLetters.forEach((letter) => {
          if(action === "encrypt"){
          let resultObj = encryptDecryptKey.find(({plainLetter}) => plainLetter === letter)
          resultObj ? tempResultArray.push(resultObj.codedLetter) : tempResultArray.push(letter)}
          else if(action === "decrypt"){
            let resultObj = encryptDecryptKey.find(({codedLetter}) => codedLetter === letter)
          resultObj ? tempResultArray.push(resultObj.plainLetter) : tempResultArray.push(letter)
          }
        })
        resultArray.push(tempResultArray.join(""))
      });
    (action === "encrypt") ? setCodedText(resultArray.join(" ")) : setPlainText(resultArray.join(" "))
  
  };

  const handlePlainTextChange = (e) => {
    e.preventDefault();
    setPlainText(e.target.value);
  };

  const handleCodedTextChange = (e) => {
    e.preventDefault();
    setCodedText(e.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        <div id="encode-box">
          <h2>Plain Text</h2>
          <textarea
            placeholder="type your plain text"
            onChange={handlePlainTextChange}
            name="encode-box-input"
            id="encode-box-input"
            value={plainText}
          />
          <button className="btn" type="submit" onClick={magic} action="encrypt">
            Encrypt
          </button>
        </div>
        <div id="decode-box">
          <h2>Coded Text</h2>
          <textarea
            placeholder="type your coded text"
            onChange={handleCodedTextChange}
            name="encode-box-input"
            id="decode-box-input"
            value={codedText}
          />
          <button className="btn" type="submit" onClick={magic} action="decrypt">
            Decrypt
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
