// geodb api to extract city 


export const geodb_api_url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';

export const geodbApiOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_X_RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_X_RAPIDAPI_HOST
    }
};
