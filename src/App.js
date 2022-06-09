import React from 'react';
import './App.css';
import Die from './die';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';

function App() {
  const[dice,setDice]=React.useState(allNewDice())
  
  function allNewDice(){ 
    const newDice =[]
    for(let i=0; i<10; i++){
      newDice.push(generateNewDie())
    }
    return newDice
  }
  function generateNewDie(){
    return{
      value:Math.ceil(Math.random()*6),
      isHeld:false,
      id:nanoid()
  }}
  const diceElements=dice.map(die=>
  <Die key={die.id}
  value={die.value}
  isHeld={die.isHeld}
  holdDice={()=> holdDice(die.id)}
  />)
  
  function rollDice(){
    if(!tenzies){
    setDice(oldDice=>oldDice.map(die=>{
      return die.isHeld?
      die:
      generateNewDie()
    }))}
    else{
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function holdDice(id){
    setDice(oldDice =>oldDice.map(die=>{
     return die.id === id? 
     {...die,isHeld:!die.isHeld} : 
     die
    }) )
  }
  const [tenzies,setTenzies]=React.useState(false)

  React.useEffect (()=>{
    const allHeld =dice.every(die=>die.isHeld)
    const firstValue=dice[0].value
    const allSameValue=dice.every(die=>die.value===firstValue)
    if(allHeld && allSameValue){
      setTenzies(true)
}},[dice])
  return (
    <main className="main">
      {tenzies && <Confetti/>}
      <h1>Tenzies</h1>
      <p>Roll till all the dice are the same</p>
      <p>Click each die to freeze it at its current value between rolls</p>
      <br/>
      <div className="dice-container">
    {diceElements}
    </div>
    <br/>
    <br/>
    <button 
    className="button" 
    onClick={rollDice}>
      {tenzies? "New Game":"Roll"}
    </button>
    </main>
  );
}

export default App;
