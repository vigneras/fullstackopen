const Course = (props) => {
    console.log(props)
    return (
            <>
            <h1>{props.name}</h1>
            </>
    )
}

const Part = (props) => {
    console.log(props)
    return (
            <>
            {props.part.name} {props.part.exercises} <br/>
            </>
    )
}

const Content = (props) => {
    console.log(props)
    return (
        <>
            <p>
            <Part part={props.parts[0]} />
            <Part part={props.parts[1]} />
            <Part part={props.parts[2]} />
        </p>
        </>
    )
}

const Total = (props) => {
    console.log(props)
    let total = 0;
    for (let i = 0; i < props.parts.length; i++) {
        total += props.parts[i].exercises
    }
    return (
            <>
            <p>Number of exercises {total}</p>
            </>
    )
}


const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }]
    }
    
    return (
            <div>
            <Course name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
            </div>
    )
}

export default App
