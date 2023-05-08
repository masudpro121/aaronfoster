import { useEffect, useRef, useState } from "react";
import "./App.css";
import { msgs, specailPrompt, thisFormat } from "./config";
import { createChatCompletion, createCompletion } from "./api/my-openai";
import UserImg from "./img/user.png";
import BotImg from "./img/bot.jpg";
import {  BsFillFileArrowDownFill } from "react-icons/bs";
import {  AiOutlineAppstoreAdd } from "react-icons/ai";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import debounce from "./utils/utils";
function App() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [outputs, setOutputs] = useState([]);
  const [initialOutput, setInitialOutput] = useState([]);


  useEffect(()=>{
    const myoutput = initialOutput.filter(i=>i.length>1)
    setOutputs(myoutput)
    setLoading(false)
  },[initialOutput])

  const handleInput = () =>{
    if(text.length>1){
    setLoading(true)
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
        const regOut = content.split('\n')
        myarr = [...myarr, ...regOut]
        setInitialOutput(myarr)
      })
    }
  }else{
    window.alert('Fill the input field')
  }
  }
  console.log(outputs, 'outputs');
  return (
    <div className="app d-flex">
       <div className="inputSection">
        <FloatingLabel controlId="floatingTextarea2" >
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            className="textInput"
            onChange={e=>setText(e.target.value)}
          />
        </FloatingLabel>
        <Button className="mt-2" onClick={debounce(handleInput, 300)}>Generate</Button>
       </div>
       <div className="outputs">
        {
          loading ? 'Loading...':
          outputs.map((output, id)=>{
            return (
              <div key={output+id}>
                {
                  output.split(' ').length<10 &&
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
