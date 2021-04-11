// const token = '-FTGpJLIuc3Lbd9CTKfZ-ZajG9KmHyUCcYu0Alz20p1vL_8Z2rHwfS6oEfRSdSNkVGQjhFifC6fXb_KbvuXch8BF2pYms-1x-6JPufiDTUxm1dfJZ-xXT239J_RYYHYx'
// const config = {
//     headers: { Authorization: `Bearer ${token}` }
// }; Is set in the server for cors error
const serverUrl = 'https://restauking.azurewebsites.net/restauking?param='
const searchUrl = 'https://api.yelp.com/v3/businesses/search?'
const detailsUrl = 'https://api.yelp.com/v3/businesses/'
const autoCompleteUrl = 'https://api.yelp.com/v3/autocomplete?'
const categoriesUrl = 'https://api.yelp.com/v3/categories'

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
        url += '&categories="restaurants"'

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
async function getAutoCompleteRestaurantsAPI (search,latitude,longitude) {
    var url = '&text="'+search+'"'
    url += '&latitude="'+latitude+'"'
    url += '&longitude="'+longitude+'"'

    const axios = require('axios');
    try {
        console.log('axios.get()',serverUrl + encodeURIComponent(autoCompleteUrl+url))
    
    const response =  await axios.get(serverUrl + encodeURIComponent(autoCompleteUrl+url))

    console.log('getRestaurantsAPI(search:'+search+', latitude:'+latitude+', longitude:'+longitude+')',response.data.businesses)
    
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
async function getCategoriesAPI () {
    const axios = require('axios');
    try {
        console.log('axios.get()',serverUrl + encodeURIComponent(categoriesUrl))
    
    const response =  await axios.get(serverUrl + encodeURIComponent(categoriesUrl))

    console.log('getCategoriesAPI()',response.data.categories.filter(d => d.parent_aliases[0] == "restaurants" && d.country_whitelist.includes("FR")))
    
    return response.data.categories.filter(d => d.parent_aliases[0] == "restaurants" && d.country_whitelist.length == 0 && d.country_blacklist.length == 0)
    } catch (error) {
       console.log(error) 
    }
}
export {getRestaurantsAPI,getRestaurantDetailsAPI,getCategoriesAPI,getAutoCompleteRestaurantsAPI}