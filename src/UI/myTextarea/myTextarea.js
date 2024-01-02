import './myTextarea.css'
import { useState, useEffect, useRef } from 'react'

export const MyTextarea = (props) => {
    const textarearef = useRef(null)

    // useEffect(() => {
    //     textarearef.current.style.height = 'auto'
    //     textarearef.current.style.height = textarearef.current.scrollHeight + 3 + 'px'
    // }, [props. val])

    return (
        <textarea 
            className="myTextarea" 
            {...props}
            ref={textarearef}
            rows="5"
            
        ></textarea>
    )
}