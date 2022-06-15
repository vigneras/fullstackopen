import { useState } from 'react'

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

const Button = (props) => (
        <button onClick={props.handleClick}>
        {props.text}
    </button>   
)

const Anecdote = (props) => {
    return (
            <div>
            {anecdotes[props.selected]}
            <br/>
            has {props.vote} votes
        </div>
    )
}


const App = () => {
  
   
    const [selected, setSelected] = useState(-1)
    const [votes, setVote] = useState(new Array(anecdotes.length).fill(0))

    const setToValue = (setStuff, newValue) => {
        setStuff(newValue)
    }

    const addVote = (i) => {
        const copy = [...votes]
        copy[i] += 1
        setVote(copy)
    }

    const getRandomAnectode = () => {
        return Math.floor(Math.random() * anecdotes.length)
    }

    const common = (
            <>
            <Button handleClick={() => setToValue(setSelected, getRandomAnectode())} text="Next anectode" />
          </>
          )
          
          if (selected === -1) {
              return (
                      <div>
                      {common}
                  </div>
              )
          }

    const famousIdx = votes.indexOf(Math.max(...votes))
    
    return ( <div>
             {common}
             <br/>
             <h1>Anectode of the day</h1>
             <Anecdote selected={selected} vote={votes[selected]}/>
             <br/>
             <Button handleClick={() => addVote(selected)} text="Vote" />
             <br/>
             <h1>Anecdote with most votes</h1>
             <Anecdote selected={famousIdx}
                                 vote={votes[famousIdx]}/>
             </div>
           )
}
export default App;
