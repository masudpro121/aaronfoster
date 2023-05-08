import { useEffect, useRef, useState } from "react";
import "./App.css";
import { msgs, specailPrompt, thisFormat } from "./config";
import { createChatCompletion, createCompletion } from "./api/my-openai";
import UserImg from "./img/user.png";
import BotImg from "./img/bot.jpg";
import {  BsFillFileArrowDownFill } from "react-icons/bs";
import {  AiOutlineAppstoreAdd } from "react-icons/ai";
import { Button, FloatingLabel, Form } from "react-bootstrap";
function App() {
  const [text, setText] = useState('');
  const [inputs, setInputs] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const [initialOutput, setInitialOutput] = useState([]);

  console.log(outputs, 'outputs');

  useEffect(()=>{
    setOutputs(initialOutput)
  },[initialOutput])
  // console.log(inputs, 'inputs');
  const handleInput = () =>{
    const limit = 30;
    let mytext = text.split('\n')
    
    const loopit = Math.ceil(mytext.length/limit)
    let myarr =[]
    for(let i=0; i<loopit; i++){
      let x = mytext.splice(0,limit).join('\n')
      createCompletion(`${thisFormat}
      ${x}
      `)
      .then(res=>{
        const content= res.data.choices[0].text
        const regOut = content.match(/^(Output: )(.*)/gim)
        myarr = [...myarr, ...regOut]
        setInitialOutput(myarr)
      })
    }
    
  }
  return (
    <div className="app d-flex">
       <div>
        <FloatingLabel controlId="floatingTextarea2" label="Paste your texts..">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            className="textInput"
            onChange={e=>setText(e.target.value)}
          />
        </FloatingLabel>
        <Button className="mt-2" onClick={handleInput}>Generate</Button>
       </div>
       <div className="outputs">
        {
          outputs.map((output, id)=>{
            return (
              <div key={output+id}>
                {
                  // output.split(' ').length<10 &&
                  // output.replace(/output:/i,'')
                  output
                }
              </div>
            )
          })
        }
       </div>
    </div>
  );
}

export default App;
