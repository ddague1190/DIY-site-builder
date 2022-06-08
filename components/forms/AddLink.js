import React, { useState, useEffect, useRef } from 'react'
import Portal from "../utils/Portal";
import { useForm } from "../../utils/useForm";
import { slugify } from "../../utils/slugify";
import AddContentButton from "../utils/AddContentButton";

const AddLink = ({ setLinks }) => {
    const ref = useRef();
    const [show, setShow] = useState(false);
    const [state, handleChange, setFormData] = useForm({
        'link': '',
        'slug': ''
    })


    useEffect(() => {
        setFormData({ ...state, slug: slugify(state.link) })

        return () => {
            setFormData({
                'link': '',
                'slug': ''
            })
        }
    }, [state.link])

    const submitFormHandler = (e) => {
        e.preventDefault();

        fetch('/api/links', {
            method: 'POST',
            body: JSON.stringify(state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.links) {
                    setLinks(data.links)
                }
            });
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
                <AddContentButton onClick={setShow.bind(true)} text='add a link' />


            }
        </div>
    )
}

export default AddLink