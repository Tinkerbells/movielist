import React from 'react'
import CustomButton from '../UI/CustomButton'
import { signIn, signOut, useSession } from 'next-auth/react'
import UserWidget from '../auth/UserWidget'
const Header = () => {
    const { data: sessionData } = useSession()
    return (
        <header className="absolute top-0 left-0 flex h-20 w-full items-center justify-end gap-6 bg-primary px-7">
            {sessionData ? (
            <UserWidget signOut={signOut} name={sessionData.user?.name as string} avatar={sessionData.user?.image as string}/>
            ) : (
                <CustomButton
                    styles="bg-white font-bold text-lg text-primary h-12 w-36"
                    onClick={() => signIn()}
                >
                    Log in
                </CustomButton>
            )}
        </header>
    )
}

export default Header
