import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {

    const [data, setData] = useState({});

    let url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`

    useEffect(() => {
        // Fetch gives us data in string format we need to convert it to json
        fetch(url)
        .then((resp) => {resp.json()})
        .then((data) => {
            setData(data[currency]);
            console.log(data);
        })
        .catch((error) => {console.error(error)});
    }, [currency])

    return data;
}

export {useCurrencyInfo}