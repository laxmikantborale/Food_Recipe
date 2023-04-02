import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { fetchData } from '../service'

const RecipeList = (props) => {
    const [searchedTerm, setSearchedTerm] = useState('')
    const [query, setQuery] = useState('')
    const [data, setData] = useState('');

    const searchRecipe = (searchedQuery)=> {
        fetchData(searchedQuery)
        .then((response)=> {
            console.log(response);
            setData(response)
            props.setLoader(false)
        })
    }

    useEffect(() => {
        fetchData(query).then((response) => {
            setData(response)
            props.setLoader(false)
        })
    }, [])

    return (
        <div className='container'>
            <div className='heading-line'>
                <strong>Search Your Recipes</strong>
                <div className='input-wrapper' >
                    <input
                        type="text"
                        placeholder='Search'
                        onChange={(e) => setSearchedTerm(e.target.value)}
                        value={searchedTerm}
                    />
                    <button onClick={()=> (searchRecipe(searchedTerm), props.setLoader(true))}><BsSearch /></button>
                </div>
            </div>
            <div className='flexbox'>
                {
                    data && data.hits.map((item, index) => {

                        return <div key={index} className='flexItem'>
                            <div className='img-wrapper'>
                                <img src={item.recipe.image} alt={item.recipe.label} />
                            </div>
                            <p>{item.recipe.label}</p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default RecipeList