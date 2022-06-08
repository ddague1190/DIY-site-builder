import { createContext, useState } from "react";

const BaseContext = createContext({
    loading: null,
    message: null, // {title, message, status}
    showMessage: function (messageData) { },
    hideMessage: function () {}
});

export const BaseContextProvider = ({ children }) => {
    const [activeMessage, setActiveMessage] = useState();

    const showMessageHandler = ({ messageData }) => {
        setActiveMessage(messageData)
    }

    const hideMessageHandler = () => {
        setActiveMessage(null);
    }

    const context = {
        message: activeMessage,
        showMessage: showMessageHandler,
        hideMessage: hideMessageHandler
    }

    return (
        <BaseContext.Provider value={context}>
            {children}
        </BaseContext.Provider>
    )
}


export default BaseContext;

