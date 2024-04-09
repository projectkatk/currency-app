import { Line } from "react-chartjs-2"
import 'chartjs-adapter-date-fns';
import '../scss/custom.scss';
import '../scss/CurrencyRateChart.scss';
import { Card, ToggleButton } from "react-bootstrap"
import { useState, useRef, useEffect } from "react"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    TimeSeriesScale,
    TimeScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    TimeSeriesScale,
    TimeScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


const CurrencyRateChart = (props) => {
    const start = new Date()
    
    const startISOString = start.toISOString().slice(0, 10)
    const daysPriorISOString14Days = new Date(Date.parse(start) - (1000 * 60 * 60 * 24 * 14)).toISOString().slice(0, 10)
    const daysPriorISOString6months = new Date(Date.parse(start) - (1000 * 60 * 60 * 24 * 182.5)).toISOString().slice(0, 10)
    const daysPriorISOString12months = new Date(Date.parse(start) - (1000 * 60 * 60 * 24 * 365)).toISOString().slice(0, 10)

    const [pastDateValue, setPastDateValue] = useState(daysPriorISOString14Days)
    const [rateData, setRateData] = useState({})

    const [radioValue, setRadioValue] = useState('1');

    const [chartData, setChartData] = useState({
        datasets: [{
            label: "",
            data: [{
                x: [],
                y: null,
                display: false,
                borderColor: 'transparent'
            }],
        }]
    })
    
    const host = "api.frankfurter.app"
    useEffect(() => {
        fetch(`https://${host}/${pastDateValue}..${startISOString}?amount=1&from=${props.data.baseSelected}&to=${props.data.targetSelected}`)
        .then((res) => res.json())
        .then((data) => {
            let days = []
            setRateData(data)

            // capture the data rates as updated and add to the days array for updating datasets
            Object.entries(data.rates).forEach(([key, value]) => {
                days.push({
                    x: Date.parse(key),
                    y: Object.values(value)[0]
                })
            })
            return days
        })
        .then((days) => {
            // render the graph based on the dynamic dataset data
            setChartData({
                datasets: [{
                    label: "",
                    data: days,
                    borderColor: 'rgb(160, 16, 115)',
                    borderWidth: 3,
                    pointStyle: false
                }]
            })
            
            // to ensure the correct dynamic legend is updated
            setOptions({
                ...{
                    plugins: {
                        legend: {
                            display: false,
                        },
                        title: {
                            display: true,
                            text:  props.data.baseSelected + " to " + props.data.targetSelected
                        },
                        tooltip: {
                            enabled: true
                        }
                    }
                }
            })            
        })
        
    },[radioValue, startISOString, pastDateValue, props.data.baseSelected, props.data.targetSelected ])

    // basis option value
    const [options, setOptions] = useState({
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.7/1,
        scales: {
            x: {
                type: 'timeseries',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'dd MMM',
                    }
                }
            },
            y: {
                beginAtZero: false
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text:  props.data.baseSelected + " to " + props.data.targetSelected + " rate"
            },
            tooltip: {
                enabled: true
            }
        }
    })

    

    const dynamicChartData = (datasetsData, label, time) => {
        // chart data dynamically changes based on the timeseries button click
        setChartData({
            datasets: [{
                label,
                data: datasetsData,
                display: false,
                borderColor: 'transparent',
                pointStyle: false,
                tension: 0.1
            }]
        })

        // option time value also changes depending on day, week or year etc
        setOptions({
            ...{
                scales: {
                    x: {
                        type: 'timeseries',
                        time
                    },
                    y: {
                        beginAtZero: false
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text:  props.data.baseSelected + " to " + props.data.targetSelected
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            }
        })
    }

    // capture the date value from the event calling below and set the new past date
    const dataToRender = (pastDateData) => {
        if (rateData && rateData.rates) {
            setPastDateValue(pastDateData)
        }
    }

    // 14 days - calling this and changing the radio value and render chart dynamically
    const changeToDaily = (e) => {
        setRadioValue(e.target.value)

        dynamicChartData(
            dataToRender(daysPriorISOString14Days),
            "Last 14 days",
            {
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'dd MMM'
                    }
                }
            }
        )
    }
    // 6 months - calling this and changing the radio value and render chart dynamically
    const changeTo6Mths = (e) => {
        setRadioValue(e.target.value)

        dynamicChartData(
            dataToRender(daysPriorISOString6months),
            "Last 6 months",
            {
                time: {
                    unit: 'week',
                    displayFormats: {
                        week: 'MM yyyy',
                    }
                }
            }
        )        
    }

    // 1 year - calling this and changing the radio value and render chart dynamically
    const changeToFullYear = (e) => {
        setRadioValue(e.target.value)

        dynamicChartData(
            dataToRender(daysPriorISOString12months),
            "1 year",
            {
                time: {
                    unit: 'year',
                    displayFormats: {
                        year: 'MM yyyy'
                    }
                }
            }
        )
    }

    // chart toggle button data
    const chartDataRadio = [
        { name: 'Last 14 days', value: '1'},
        { name: 'Last 6 months', value: '2'},
        { name: '1 year', value: '3'},
    ]

    // ensure the correct functions are called on toggle button change 
    const callChartEventByName = (e, radio) => {        
        if (radio.value === "1") {
            changeToDaily(e)
        }
        else if (radio.value === "2") {
            changeTo6Mths(e)
        }
        else if (radio.value === "3") {
            changeToFullYear(e)
        }
    }

    // Resizing chart
    const myChart = useRef("chart")

    window.addEventListener('beforeprint', () => {
        myChart.resize(600, 600);
    });

    window.addEventListener('afterprint', () => {
        myChart.resize();
    });

    return (
        <>  
            {/* <div > */}
                <Card className="d-flex text-primary border-info flex-column flex-md-row gap-3 p-3 mx-4 justify-content-between align-items-center my-4">
                    <div className="fw-semibold">Trend by Timeline</div>
                    <div className="d-flex flex-wrap justify-content-center flex-md-row gap-2">
                        { chartDataRadio.map((radio, idx) => {
                            return (
                                <ToggleButton
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type="radio"
                                    variant='outline-info'
                                    size="sm"
                                    name="radio"
                                    value={radio.value}
                                    checked={radioValue === radio.value}
                                    onChange={(e) => callChartEventByName(e, radio)}
                                >
                                    {radio.name}
                                </ToggleButton>                            
                            )
                        })}
                    </div>
                </Card>                
            {/* </div> */}
            <Line
                id="fxRateChart"
                refs="chart"
                options={options}
                data={chartData}
            />
        </>
    )    
}

export default CurrencyRateChart