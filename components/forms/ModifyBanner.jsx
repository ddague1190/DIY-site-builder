import React, { useState, useRef } from 'react'
import Portal from "../utils/Portal";
import { useForm } from "../../utils/useForm";
import AddContentButton from "../utils/AddContentButton";
import { useRouter } from "next/router";

const ModifyBanner = ({ banner, setBanner }) => {


    const prompt = banner.text || banner.image ? 'Modify banner' : 'Add banner content';
    const ref = useRef();
    const [show, setShow] = useState(false);
    const [state, handleChange, setFormData] = useForm({
        'text': '',
        'source': '',
        'image': ''
    })
    const router = useRouter();
    const path = router.asPath === '/' ? '/home' : router.asPath;
    const submitFormHandler = (e) => {
        e.preventDefault(); 
        setBanner(state);
        fetch('/api/banner/', {
            method: 'POST',
            body: JSON.stringify({...state, route: path}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => console.log(data));
        setShow(false)
    }

    const informChildFunction = setShow.bind(false)

    return (
        <div>
            {show ?
                <Portal informChildFunction={informChildFunction} >
                    <div className='portal-content__form'>
                        <h2>Banner content</h2>
                        <form>
                            <div>
                                <label htmlFor='textarea'>Text</label>
                                <textarea autoFocus id='textarea' onChange={handleChange} name='text' value={state.text} />
                            </div>
                            <div>
                                <label htmlFor='source'>Source (if applicable)</label>
                                <input value={state.source} onChange={handleChange} id='source' type='text' name='source' />
                            </div>
                            <div>
                                <label htmlFor='image'>Image</label>
                                <input value={state.image} onChange={handleChange} id='image' type='text' name='image' />
                            </div>
                            <button onClick={submitFormHandler}>
                                Submit
                            </button>
                        </form>
                    </div>
                </Portal>
                :
                <div className="abs_top_right">
                    <AddContentButton classList={['add_top_right']} onClick={setShow.bind(true)} text={prompt} />

                </div>
            }
        </div>
    )
}

export default ModifyBanner