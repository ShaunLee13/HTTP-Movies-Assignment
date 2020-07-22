import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'

const initialForm = {
    name:'',
    director:'',
    metascore:''
}

const UpdateMovie = () => {
    const [ form, setForm ] = useState(initialForm)
    const { location } = useLocation()
    const { params } = useParams()
    const handleForm = e => {
        setForm({...form, 
            [e.target.name]:e.target.value
        })
    }

    useEffect(() => {
        if(location?.state){
            setForm(location.state)
        }else{
            axios
                .get(`http://localhost:5000/api/movies/${params.id}`)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        }
    },[])

    return(
        <div className='form-container'>
            <h1>- Update a Movie -</h1>
            <form className='update-form'>
                <label>Title: &nbsp;
                    <input
                    type='text'
                    name='name'
                    value={form.name}
                    onChange={handleForm}
                    />
                </label>
                <label>Director: &nbsp;
                    <input 
                    type='text'
                    name='director'
                    value={form.director}
                    onChange={handleForm}
                    />
                </label>
                <label>Metascore: &nbsp;
                    <input 
                    type='number'
                    name='metascore'
                    value={form.metascore}
                    onChange={handleForm}
                    />
                </label>
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}
export default UpdateMovie