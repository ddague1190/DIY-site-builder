import React, { useState, useEffect, useRef } from 'react'
import Portal from "../utils/Portal";
import { useForm } from "../../utils/useForm";
import AddContentButton from "../utils/AddContentButton";
import { useRouter } from "next/router";

const ModifyBanner = ({ banner, setBanner }) => {
    const prompt = banner ? 'Modify banner' : 'Add banner content';
    const ref = useRef();
    const [show, setShow] = useState(false);
    const [state, handleChange, setFormData] = useForm({
        'text': '',
        'source': '',
        'image': ''
    })

    const router = useRouter();
    


    const submitFormHandler = (e) => {
        e.preventDefault();

        fetch('/api/banner/', {
            method: 'POST',
            body: JSON.stringify({ ...state, }),
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
                        <h2>Add link</h2>
                        <form>
                            <div>
                                <label htmlFor='link'>Link name</label>
                                <input autoFocus ref={ref} value={state.link} onChange={handleChange} id='link' type='text' name='link' />
                            </div>
                            <div>
                                <label htmlFor='slug'>Slug</label>
                                <input value={state.slug} onChange={handleChange} id='slug' type='text' name='slug' />
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