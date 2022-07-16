const Notification = ({ msg, className, ex }) => {
  if (msg === null) {
    return null
  }

  console.log(`Given exception: ${ex}`)
  let errorMsg = null
  if (ex) {
    if (ex.response.data) {
      errorMsg = ` -- Error: ${ex.response.data.error}`
    } else {
      errorMsg = ` -- Error: ${ex}`
    }
  } 

  return (
    <div className={className}>
      {msg} {errorMsg}
    </div>
  )
}

export default Notification