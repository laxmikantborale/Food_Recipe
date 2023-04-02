const queryStrings = {
    app_id: process.env.REACT_APP_APP_ID,
    app_key:process.env.REACT_APP_APP_KEY
}

//https://api.edamam.com/api/recipes/v2?type=public&q=pizza&app_id=8e001b83&app_key=REACT_APP_APP_KEY%3D2169bed042ca01468a324e1327d2b6d0


export const fetchData = async (dQuery) => {
    const { app_id, app_key } = queryStrings;

    try {
        const data = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${dQuery}&app_id=${app_id}&app_key=${app_key}`)
        const response = await data.json()
        return response;
    } catch (e) {
        console.log(e, 'something went wrong')
        return e
    }
}

export const fetchTabData = async (defaultQuery) => {
    const { app_id, app_key } = queryStrings;

    try {
        const data = await fetch(`https://api.edamam.com/api/recipes/v2/${defaultQuery}?type=public&app_id=${app_id}&app_key=${app_key}`)
        const response = await data.json()
        return response;
    } catch (e) {
        console.log(e, 'something went wrong')
        return e
    }
}