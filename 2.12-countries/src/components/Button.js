const Button = (props) => {
  if (props.display) {
    return (
    <button onClick={props.handleClick}>
        {props.text}
    </button>   
    )
  }
}

export default Button