import "../scss/CurrencyConverter.scss"
import CurrencyRateChart from "./CurrencyRateChart"
import ExchangeRateComparison from "./ExchangeRateComparison"
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Form from 'react-bootstrap/Form'
import { useState, useEffect } from "react"

const CurrencyConverter = (props) => {
    const [data, setData] = useState({})
    const [baseSelected, setBaseSelection] = useState("EUR")
    const [baseValue, setBaseValue] = useState(1)
    const [targetValue, setTargetValue] = useState(1)
    const [targetSelected, setTargetSelection] = useState("USD")
    const [tableData, setTableData] = useState({})

    const host = "api.frankfurter.app"
    useEffect(() => {
        const url = `https://${host}/latest?from=${baseSelected}`

        const fetchUrl = async () => {
            await fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setTargetValue(data.rates[targetSelected])
                setTableData(data)               
            })
        }
        fetchUrl()
    }, [baseValue, baseSelected, targetSelected])
    
    const handleBaseSelection = (key) => {
        setBaseSelection(key)
        setBaseValue(baseValue)
        setTargetValue(baseValue / data.rates[targetSelected])
    }

    const handleTargetSelection = (key) => {
        setTargetSelection(key)
        setBaseValue(baseValue)
        setTargetValue(baseValue * data.rates[key])
    }

    const handleBaseAmountChange = (e) => {
        let baseValue = Number(e.target.value)
        setTimeout(() => {
            setBaseValue(baseValue)
            let targetValue = Number(data.rates[targetSelected])
            setTargetValue(baseValue * targetValue)
        }, 500)
    }

    const handleSwap = (e) => {
        setBaseSelection(targetSelected)
        setTargetSelection(baseSelected)
    }

    if (tableData && tableData.rates) {
        return (
            <>
                <div className="w-100 d-flex flex-column align-items-center gap-4 my-5 p-4 bg-light rounded">
                    <div className="w-100 d-flex flex-column align-items-center flex-md-row gap-2 justify-content-center px-5">
                        <DropdownButton
                            id="dropdown-basic-button"
                            variant="info"
                            title={ `From ${baseSelected}`}
                        >
                            {
                                Object.entries(props.currencies).map(([key, value]) => {
                                    if(key !== targetSelected) {
                                        return (
                                            <Dropdown.Item onClick={() => handleBaseSelection(key)} key={key}>
                                                <div className={`currency-flag currency-flag-${key}`}></div>
                                                <b>{key} </b>
                                                {value}
                                            </Dropdown.Item>
                                        )
                                    }                                
                                })
                            }
                        </DropdownButton>
                        <Form>
                            <Form.Control
                                type="text"
                                className="formInput"
                                defaultValue={baseValue}
                                onChange={handleBaseAmountChange}
                            />
                        </Form>
                    </div>
                    {/* The Swap button below */}
                    <div className="material-symbols-outlined swap-pointer" onClick={handleSwap}>swap_vert</div>
                    <div className="w-100 d-flex flex-column align-items-center flex-md-row gap-2 justify-content-center px-5">
                        <DropdownButton
                            id="dropdown-target-button"
                            variant="info"
                            title={ `To ${targetSelected}`}
                        >
                            {
                                Object.entries(props.currencies).map(([key, value]) => {
                                    if (key !== baseSelected) {
                                        return (
                                            <Dropdown.Item onClick={() => handleTargetSelection(key)} key={key}>
                                                <b>{key} </b>
                                                {value}
                                            </Dropdown.Item>
                                        )
                                    }                               
                                })
                            }
                        </DropdownButton>
                        <Form>
                            <Form.Control
                                type="text"
                                className="formInput"
                                value={(baseValue * targetValue).toFixed(5)}
                                onChange={() => handleBaseAmountChange}
                            />
                        </Form>
                    </div>
                </div>
                <CurrencyRateChart
                    data={
                        {
                            baseSelected,
                            baseValue,
                            targetSelected,
                            targetValue,
                        }
                    }
                />
                <ExchangeRateComparison
                    tableData={tableData}
                    baseSelected={baseSelected}
                />    
            </>
        )
    }    
}

export default CurrencyConverter