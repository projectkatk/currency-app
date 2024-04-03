import Navigation from "./Navigation"
import Content from "./Content"
import { useState } from 'react'
import '../scss/Layout.scss'

const Layout = () => {
 
    return (
        <>
            <header>
                <Navigation />      
            </header>
            <main className="Layout-main">
                <h2 className="fw-bold !h-auto">Currency Converter</h2>
                <Content className="h-auto"/>                
            </main>
            
            <footer className="h-10 bg-info p-4">
                <a href="https://dribbble.com/kat-project" className="text-white text-decoration-none" rel="noreferrer" target="_blank">Dribbble Profile</a>
            </footer>
        </>
    )
}

export default Layout
