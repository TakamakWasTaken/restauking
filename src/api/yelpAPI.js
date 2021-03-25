const token = '-FTGpJLIuc3Lbd9CTKfZ-ZajG9KmHyUCcYu0Alz20p1vL_8Z2rHwfS6oEfRSdSNkVGQjhFifC6fXb_KbvuXch8BF2pYms-1x-6JPufiDTUxm1dfJZ-xXT239J_RYYHYx'
const config = {
    headers: { Authorization: `Bearer ${token}` }
};


function getRestaurantsAPI (search) {
    if(search == null)
    search ='';
    const axios = require('axios');
    axios
    .get('https://restauking.azurewebsites.net/restauking?param=https://api.yelp.com/v3/businesses/search?location="Lyon"&categories="Restaurants"',
    config)
    .then(response => (console.log( response)));
}
export {getRestaurantsAPI}