/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useId} from 'react'


function InputBox({
    // These are the props that will be passed to the InputBox component
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOption = [],
    selectCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    // This classname defines if anyone want to their css then it can be used
    className = "",
}) {
   
    const amountInputId = useId()

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label  htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    // To avoid app from crashing we some double checks over here
                    // we can't give some default value to onAmountChange as it is a function

                    /* Many time javascript gives us values in string format, 
                    so remember whenever a input field has type number
                    Do the conversion on e.target.value to Number. */
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                    disabled={amountDisable}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectCurrency}
                    disabled= {currencyDisable}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                >
                    {
                        currencyOption.map((option, index) => {
                            <option 
                            value={option} key={index}
                            >
                                {option}
                            </option>
                        })
                    }
                
                </select>
            </div>
        </div>
    );
}

export default InputBox;

