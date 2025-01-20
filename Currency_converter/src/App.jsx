/* eslint-disable no-unused-vars */
import { useState } from 'react'
import {InputBox} from './components/index.js' //we can write only "/components", if we want because index file is caleld by default 
import {useCurrencyInfo} from "./hooks/useCurrencyInfo.js"

function App() {

  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setconvertedAmount] = useState(0) 

  // we will receive a object over here
  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to);
    setTo(from);
    // These two lines will change our numbers also
    setconvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setconvertedAmount(amount * currencyInfo[to])
  }

  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://images.pexels.com/photos/26926276/pexels-photo-26926276/free-photo-of-elephant-on-savanna-with-kilimanjaro-behind.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                       convert()
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            onCurrencyChange={(currency) => setAmount(amount)}
                            currencyOption = {options}
                            selectCurrency={from}
                            onAmountChange={(amount) => setAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            onCurrencyChange={(currency) => setTo(currency)}
                            currencyOption = {options}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}

export default App
