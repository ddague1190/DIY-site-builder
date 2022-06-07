import { useEffect, useState, useRef } from "react"
import { createPortal } from "react-dom"

const Portal = ({ children, informChildFunction }) => {
    const [mounted, setMounted] = useState(false)
    const ref = useRef();
    const outsideClickHandler = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setMounted(false);
            if (informChildFunction) informChildFunction();
        }
    }

    useEffect(() => {
        window.addEventListener('click', outsideClickHandler)
        setMounted(true)
        return () => {
            window.removeEventListener('click', outsideClickHandler);
            setMounted(false);
        }
    }, [])

    return mounted
        ? createPortal(
            <div ref={ref} className='portal-content'>
                {children}
                <button onClick={() => informChildFunction()} className="cursor-pointer portal-content__close-button">
                    close
                </button>
            </div>,
            document.getElementById("portal"))
        : null
}

export default Portal