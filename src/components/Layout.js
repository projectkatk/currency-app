import Navigation from "./Navigation"
import Content from "./Content"
import { useState } from 'react'
import '../scss/Layout.scss'

const Layout = () => {
    const [dataFromChild, setDataFromChild] = useState([])
    function handleDataFromChild([key, value, data]) {
        setDataFromChild([key, value, data])
    }
    return (
        <>
            <header>
                {/* <Navigation sendDataToParent={handleDataFromChild} />       */}
                <Navigation />      
            </header>
            <main className="Layout-main">
                <h2 className="fw-bold !h-auto">Currency Converter</h2>
                {/* <Content selectedCurrency={dataFromChild}/>                 */}
                <Content className="h-auto"/>                
            </main>
            
            <footer className="h-10 bg-info p-4">
                <a href="https://dribbble.com/kat-project" className="text-white text-decoration-none" target="_blank">Dribbble Profile</a>
            </footer>
        </>
    )
}

export default Layout
