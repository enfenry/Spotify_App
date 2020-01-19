import moment from 'moment';

export const displayResult = (result) => {
    let display = {
        name: ``,
        src: ``,
        location: ``,
        venue: ``,
        date: ``,
        time: ``,
        prices: ``,
        genre: ``,
        otherArtists: ``
    };
    if (result.name) {
        display.name = result.name;
        display.src = result.images[0].url;
        // check location to display
        if (result.state) {
            display.location = `${result.city}, ${result.state}`;
        }
        else if (result.city) {
            display.location = `${result.city}, ${result.country.countryCode}`;
        }
        // check venue to display
        display.venue = result.venue.length < 38 ? result.venue : `${result.venue.substring(0, 37)}...`;

        if (result.start) {
            // check date to display
            let convertedDate = moment(result.start.localDate, "YYYY-MM-DD");
            display.date = convertedDate.format("MMM Do, YYYY");
            //  check time to display
            let time = result.start.localTime;
            if (time) {
                let hour = parseInt(time.substring(0, 2));
                let minute = time.substring(2, time.length - 3);
                let tail;
                if (hour < 12) {
                    tail = 'AM';
                }
                else {
                    if (hour > 12) {
                        hour -= 12;
                    }
                    tail = 'PM';
                }
                display.time = minute === ":00" ? hour + tail : hour + minute + tail;
            }
        }
        if (result.priceRanges) {
            // check prices to display
            const price = result.priceRanges[0];
            display.prices = price.max === price.min ? `${price.min} ${price.currency}` : `${price.min} - ${price.max} ${price.currency}`;
        }
        if (result.classifications) {
            // check genre to display
            let genre = result.classifications[0].genre;
            if (genre) {
                display.genre = `Genre: ${genre.name}`;
            }
        }
        if (result.spotify_id) {
            display.spotify_id = result.spotify_id;
        }
        display.otherArtists = result.otherArtists;
    }
    return display;
}