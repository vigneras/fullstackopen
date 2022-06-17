import React from 'react'

const Part = ({ name, exercises }) => {
    console.log(name, exercises)
    return (
        <>
        { name } { exercises }
        </>
        )
}

export default Part
