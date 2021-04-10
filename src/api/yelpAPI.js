// const token = '-FTGpJLIuc3Lbd9CTKfZ-ZajG9KmHyUCcYu0Alz20p1vL_8Z2rHwfS6oEfRSdSNkVGQjhFifC6fXb_KbvuXch8BF2pYms-1x-6JPufiDTUxm1dfJZ-xXT239J_RYYHYx'
// const config = {
//     headers: { Authorization: `Bearer ${token}` }
// }; Is set in the server for cors error


async function getRestaurantsAPI (location,search,is_closed,categories) {
    var url = 'https://restauking.azurewebsites.net/restauking?param=https://api.yelp.com/v3/businesses/search?'
    
    if(location != null)
        url += 'location="'+location+'"'
    else
        url += 'location="Lyon"'

    // url += '&limit=30'
    // url += '&offest=950'

    if(search != null)
        url += '&term="'+search+'"'

    if(is_closed != null)
        url += '&is_closed='+is_closed+''

    if(categories != null)
        url += '&categories="'+categories+'"'
    else
        url += '&categories="Restaurants"'

    const axios = require('axios');
    try {
    const response =  await axios.get(url)

    console.log('getRestaurantsAPI(location:'+location+', search:'+search+', is_closed:'+is_closed+', categories:'+categories+')',response.data.businesses)
    
    return response.data.businesses
    } catch (error) {
       console.log(error) 
    }
}
export {getRestaurantsAPI}