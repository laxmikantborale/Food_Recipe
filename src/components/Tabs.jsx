import React, { useEffect, useState } from 'react'
import { CiPizza } from 'react-icons/ci'
import { GiNoodles, GiFruitBowl, GiCheckMark } from 'react-icons/gi'
import { MdOutlineIcecream } from 'react-icons/md'
import { fetchTabData } from '../service'

const Tabs = (props) => {
    const [active, setActive] = useState('Pizza')

    const [tabData, setTabData] = useState('')

    const [tabLabel, setTabLabel] = useState([
        {
            name: "Pizza",
            icon: <CiPizza />,
            id: "99f673fe102180db00908baa87abfa32"
        },
        {
            name: "Noodles",
            icon: <GiNoodles />,
            id: "a243e3cd56da95b31e5a86ef52578908"
        },
        {
            name: "Desert",
            icon: <GiFruitBowl />,
            id: "bc865476ffe2b8a03fbe9aee2f739740"
        },
        {
            name: "Icecream",
            icon: <MdOutlineIcecream />,
            id: "f74be31111bbf39de034ee9f58d6f329"
        }
    ])

    const handleClick = (name, id) => {
        setActive(name)
        fetchTabData(id)
            .then((response) => {
                setTabData(response)
                props.setLoader(false)
            })
    }

    useEffect(() => {
        fetchTabData(tabLabel[0].id)
            .then((response) => setTabData(response))
        // console.log(tabData);
        props.setLoader(false)

    }, [])


    return (
        <div className="container">
            <h1 className='recipeHeading'>What would you like to have!</h1>
            <div className="tabs">
                {tabLabel.map((item, index) => (
                    <div key={index} 
                    className={`tablist ${active === item.name ? 'active' : ""}`} 
                    onClick={() =>(handleClick(item.name, item.id),props.setLoader(true))}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </div>
                ))}


            </div>
            <div className='recipe_banner'>
                {tabData !== '' && <div className="left-col">
                    <span className='badge'>{tabData.recipe.cuisineType[0].toUpperCase()}</span>
                    <h1>{tabData.recipe.label}</h1>
                    <p><strong>Recipe by:</strong><small>{tabData.recipe.source}</small></p>
                    <h3>Ingredients</h3>
                    <div className='ingredients'>
                        <ul>
                            {tabData.recipe.ingredientLines.map((list, index) => {
                                return <li key={index}><GiCheckMark size="18px" color="#6fcb9f" />&nbsp;<span>{list}</span></li>
                            })}
                            <li><GiCheckMark size="18px" color="#6fcb9f" />&nbsp;<span>Fresh ground pepper</span></li>
                            <li><GiCheckMark size="18px" color="#6fcb9f" />&nbsp;<span>Fresh ground pepper</span></li>
                            <li><GiCheckMark size="18px" color="#6fcb9f" />&nbsp;<span>Fresh ground pepper</span></li>
                            <li><GiCheckMark size="18px" color="#6fcb9f" />&nbsp;<span>Fresh ground pepper</span></li>
                            <li><GiCheckMark size="18px" color="#6fcb9f" />&nbsp;<span>Fresh ground pepper</span></li>
                            <li><GiCheckMark size="18px" color="#6fcb9f" />&nbsp;<span>Fresh ground pepper</span></li>
                        </ul>
                    </div>
                </div>}
                {tabData !== '' && <div className="right-col">
                    <div className="image-wrapper">
                        <img src={tabData.recipe.image} alt="" />
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Tabs