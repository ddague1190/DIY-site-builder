import React, { useContext } from 'react'
import BaseContext from "../store/base-context"
import Message from "./ui/message"

const Layout = ({ children }) => {
    const context = useContext(BaseContext);
    const activeMessage = context.message

    return (
        <>
            {children}
            {activeMessage &&
                <Message
                    message={activeMessage.message}
                    title={activeMessage.title}
                    status={activeMessage.status}
                />
            }
        </>

    )
}

export default Layout