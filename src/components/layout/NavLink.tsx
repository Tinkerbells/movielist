import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
interface NavLinkProps {
    href: string
    children: React.ReactNode
}
const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
    const router = useRouter()
    const { data: sessionData } = useSession()
    let className =
        'w-full h-11 rounded-lg flex items-center gap-4 p-3 text-white text-base font-medium transition duration-75 ease-in-out hover:bg-gray'

    if (router.pathname == href) {
        className += ' bg-gray'
    }

    return (
        <Link href={href} className={className}>
            {sessionData && <div>Hello</div>}
            {children}
        </Link>
    )
}

export default NavLink
