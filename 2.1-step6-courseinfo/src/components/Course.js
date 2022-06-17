import React from 'react'

import Header from './Header'
import Part from './Part'

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
      
    </div>
  )
}

export default Course