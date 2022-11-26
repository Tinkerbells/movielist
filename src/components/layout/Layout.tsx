import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
interface LayoutProps {
    children: React.ReactNode
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <Sidebar />
            <main>{children}</main>
        </>
    )
}

export default Layout
