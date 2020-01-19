import { keys } from '../../keys';

export const searchTicketmaster = async (coords) => {
    const ticketURL = `http://app.ticketmaster.com/discovery/v2/events.json?latlong=${coords.lat},${coords.lng}&radius=25&unit=miles&size=15&classificationName=music&sort=date,asc&apikey=${keys.ticketmaster}`;

    return fetch(ticketURL)
        .then(response => response.json())
        .then(jsonData => {
            console.log('tmResults', jsonData._embedded.events);
            return jsonData._embedded.events;
        })
        // TODO: DECIDE HOW TO HANDLE RESULTS WITHOUT AN ATTRACTION PROPERTY
        // TEMPORARY FIX TO FILTER OUT
        .then(results => { 
            return results.filter(result => { return result._embedded.attractions }) 
        })
        .then(filteredResults => {
            return filteredResults.map(result => {
                const venue = result._embedded.venues[0];
                const attractions = result._embedded.attractions
                return {
                    name: attractions[0].name,
                    images: attractions[0].images,
                    city: venue.city.name,
                    state: venue.state.stateCode,
                    country: venue.country.countryCode,
                    venue: venue.name,
                    start: result.dates.start || undefined,
                    priceRanges: result.priceRanges,
                    classifications: result.classifications,
                    otherArtists: attractions.slice(1).map(attraction => {return attraction.name})
                };
            })
        })
}