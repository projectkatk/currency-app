import { useState, useEffect } from 'react'
import "../scss/Navigation.scss"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const Navigation = () => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <div className="nav nav-pills d-flex justify-content-between p-4 bg-info">
                <div className="d-flex align-items-center h-100 gap-3">
                    <span className="material-symbols-outlined text-white">savings</span>
                    <span className="text-white">Piggy FX Converter</span>
                </div>                
                <Button variant="outline-light" className="swapButton" onClick={handleShow}>Compare Rates</Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <div className="fw-bold">Compare rates from different sources</div>
                </Modal.Header>
                <Modal.Body className="d-flex gap-4 justify-content-center flex-wrap">
                    <a href="https://www.oanda.com/currency-converter/en/?from=EUR&to=USD&amount=1">
                        <Button title="https://www.oanda.com/currency-converter/en/?from=EUR&to=USD&amount=1" variant="light">www.oanda.com</Button>
                    </a>
                    <a href="https://www.xe.com/currencyconverter/" >
                        <Button title="https://www.xe.com/currencyconverter/" variant="light">www.xe.com</Button>
                    </a>
                    <a href="https://www.ofx.com/en-au/exchange-rates/">
                        <Button title="https://www.ofx.com/en-au/exchange-rates/" variant="light">www.ofx.com</Button>
                    </a>
                    <a href="https://www.bloomberg.com/markets/currencies">
                        <Button title="https://www.bloomberg.com/markets/currencies" variant="light">www.bloomberg.com</Button>
                    </a>                    
                </Modal.Body>
                <Modal.Footer>
                <Button variant="dark" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Navigation
