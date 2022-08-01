import React, { useRef } from "react";

function Start({ setUsername }) {
  const inputRef = useRef();

  const handleClick = (e) => {
    e.preventDefault()
    inputRef.current.value && setUsername(inputRef.current.value)
  }

  return (
    <div className="start-field">
      <form>
        <input type="text" placeholder="enter an username" ref={inputRef} />
        <button type="submit" onClick={handleClick}>
          Play
        </button>
      </form>
    </div>
  );
}

export default Start;
