/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useCallback, useRef, useEffect } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState('');
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charactersAllowed) str += "$#@!%^&*(){}:[]";

    for (let i = 1; i <= length; i++) {
      // we will get a index over here, not a character
      let char = Math.floor(Math.random() * str.length + 1);

      pass = pass + str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, charactersAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charactersAllowed, passwordGenerator]);

  // useRef hook
  const passwordRef = useRef(null)

  const copyPasswordToClipBoard = useCallback(() => {
    //selects the current value present in passwordRef
    passwordRef.current?.select();
    // only selects first 3 character in the passwordRef
    passwordRef.current?.setSelectionRange(0, 100);
    // It is used to copy the password to the clipboard
    window.navigator.clipboard.writeText(password);
  }, [password])

  return (

    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipBoard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charactersAllowed}
            id="characterInput"
            onChange={() => {
              setCharactersAllowed((prev) => !prev)
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>

  )
}

export default App
