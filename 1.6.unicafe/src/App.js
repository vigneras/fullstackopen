import { useState } from 'react'

const Button = (props) => (
        <button onClick={props.handleClick}>
        {props.text}
    </button>   
)

const Display = (props) => {
    return (
            <div>
            {props.text} {props.value}
        </div>
    )
}

const getAll = (v) => {
    console.log(v)
    let sum = 0;
    for (let i = 0; i < v.length;i++) {
        sum += v[i]
    }
    return sum
}

const getAverage = (v) => {
    return getAll(v) / v.length
}

const getPercent = (part, v) => {
    return part / getAll(v) * 100
}

const StatLine = (props) => {
    return (
            <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
            </tr>
    )
}
  
const Stats = (props) => {
    console.log(props.state)
    let single = Object.entries(props.state).map(([k, v]) => 
                                                 <StatLine text={k} value={v} />
                                                );
    let percent = Object.entries(props.state).map(([k,v]) =>
                                                  <StatLine text={k} value={getPercent(v, Object.values(props.state))} />);
    
    return (
        <>
            <h1>Stats</h1>
            <table>
            {single}
            <StatLine text="all" value={getAll(Object.values(props.state))} />
            <StatLine text="average" value={getAverage(Object.values(props.state))} />
            {percent}
        </table>
        </>
    )
}
    

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const setToValue = (setStuff, newValue) => {
        setStuff(newValue)
    }

    const common = (
        <>
            <h1>Give feedback</h1>
            <Button handleClick={() => setToValue(setGood, good + 1)} text="good" />
            <Button handleClick={() => setToValue(setNeutral, neutral + 1)} text="neutral" />
            <Button handleClick={() => setToValue(setBad, bad + 1)} text="bad" />
            </>
    )
    
    if (good + neutral + bad === 0) {    
        return (
                <div>
                {common}
            </div>
        )
    }
    return (
            <div>
            {common}
            <Stats state={{'good': good,
                           'neutral': neutral,
                           'bad': bad}} />
            </div>
    )
}

export default App
