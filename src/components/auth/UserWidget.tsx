import React from 'react'
interface UserWidgetProps {
    avatar: string
    name: string
    signOut: () => void
}
const UserWidget: React.FC<UserWidgetProps> = ({ avatar, name, signOut }) => {
    return (
        <div className="mr-7 flex h-12 items-center justify-center gap-4 rounded-full bg-darkGray transition delay-100 ease-out hover:bg-gray">
            <img
                src={avatar}
                alt="avatar"
                className="h-full w-full rounded-full border-[2px] border-lightGray"
            />
            <p className="mr-4 text-base font-bold text-white" title="username">
                {name}
            </p>
            <button></button>
        </div>
    )
}

export default UserWidget
