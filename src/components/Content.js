import 'chartjs-adapter-date-fns';
import CurrencyConverter from "./CurrencyConverter"
import { useEffect, useState } from "react"

const Content = () => {

    const [currencies, setCurrencies] = useState({})
    
    const host = "api.frankfurter.app"

    useEffect(() => {        
        fetch(`https://${host}/currencies`)
        .then((res) => res.json())
        .then((data) => setCurrencies(data))
    }, [])


    return (
        <div>                
            <CurrencyConverter
                currencies={currencies}
            />            
        </div>
    )   
}

export default Content