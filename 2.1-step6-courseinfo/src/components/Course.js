import React from 'react'

import Header from './Header'
import Part from './Part'
import Sum from './Sum'

const Course = ({ course }) => { 
  console.log(course)
  
  return (
    <div>
      <Header name={course.name} />
      <ul>
      {course.parts.map((part) => 
        <li>
            <Part key={part.id} name={part.name} exercises={part.exercises} />
        </li>
        )}
      </ul>
      
      <Sum nb={course.parts.map(part => 
                                part.exercises)
                            .reduce((tmpSum, a) => 
                                tmpSum + a, 0)} />
    </div>
  )
}

export default Course