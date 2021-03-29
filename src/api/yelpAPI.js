// const token = '-FTGpJLIuc3Lbd9CTKfZ-ZajG9KmHyUCcYu0Alz20p1vL_8Z2rHwfS6oEfRSdSNkVGQjhFifC6fXb_KbvuXch8BF2pYms-1x-6JPufiDTUxm1dfJZ-xXT239J_RYYHYx'
// const config = {
//     headers: { Authorization: `Bearer ${token}` }
// }; Is set in the server for cors error

const serverUrl = 'https://restauking.azurewebsites.net/restauking?param='
const searchUrl = 'https://api.yelp.com/v3/businesses/search?'
const detailsUrl = 'https://api.yelp.com/v3/businesses/'

async function getRestaurantsAPI (location,search,open_now,categories) {
    var url = 'limit=50&offest=940';
    if(location != null && location != '')
    url += '&location="'+location+'"'
    else
    url += '&location="Lyon"'

    if(search != null && search != '')
    url += '&term="'+search+'"'

    if(open_now != null)
    url += '&open_now='+open_now+''

    if(categories != null && categories != '')
        url += '&categories="'+categories+'"'
    else
        url += '&categories="Restaurants"'

    const axios = require('axios');
    try {
        console.log('axios.get()',serverUrl + encodeURIComponent(searchUrl+url))
    
    const response =  await axios.get(serverUrl + encodeURIComponent(searchUrl+url))

    console.log('getRestaurantsAPI(location:'+location+', search:'+search+', open_now:'+open_now+', categories:'+categories+')',response.data.businesses)
    
    return response.data.businesses
    } catch (error) {
       console.log(error) 
    }
}

async function getRestaurantDetailsAPI (id) {
    const axios = require('axios');
    try {
        console.log('axios.get()',serverUrl + encodeURIComponent(detailsUrl+id))
    
    const response =  await axios.get(serverUrl + encodeURIComponent(detailsUrl+id))

    console.log('getRestaurantDetailsAPI(id:'+id+')',response.data)
    
    return response.data
    } catch (error) {
       console.log(error) 
    }
}
export {getRestaurantsAPI,getRestaurantDetailsAPI}