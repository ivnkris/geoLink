// fetch data from 3rd party API
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    // console.log(error);
  }
};

// Initialize and add the map
const initMap = async (location) => {
  // The location of the marker
  const markerPlacement = { lat: location.lat, lng: location.lng };
  // The map, centered at the marker
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: markerPlacement,
  });
  // The marker, positioned at the location
  const marker = new google.maps.Marker({
    position: markerPlacement,
    map: map,
  });
};

// function to create venue cards following form submit. Returns single venue card.
const createVenueCards = async (venue) => {
  const formattedAddress = venue.location.formattedAddress.join(", ");
  const venueCard = await `<div class="card cell large-3 medium-6 small-12 cards-padding cards-margin">
  <h3>${venue.name}</h3>
  <div id="map"></div>
  <div class="“card-section”">
    <p>
      Address: ${formattedAddress}
    </p>
  </div>
  <button type="button" class="button radius bordered shadow primary">
    Add to favourites
  </button>
</div>
  `;

  const latLngObject = {
    lat: venue.location.lat,
    lng: venue.location.lng,
  };

  const googleAPI =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyCSXQ8uJfo_0ylcrT6Z9_FXLzgiO9jcUkU&callback=initMap&libraries=&v=weekly";

  const googleFetchAPI = async (url) => {};

  await googleFetchAPI(googleAPI);

  return venueCard;
};

// Main function that runs on form submission. Fetches data from Foursquare and Google Places APIs and renders cards.
const onSubmit = async (event) => {
  event.preventDefault();
  $("#cards-container").empty();
  const location = $("#location-input").val();
  const interest = $("#interest-input").val();

  const fourSquareUrl = `https://api.foursquare.com/v2/venues/search?client_id=DLH22EORW1EKOQP5HEOCIADCUNESSGS0YB33AYNKKEUEDVQ5&client_secret=5WMAC0I3GLYX3TL2A3ZBLK1E1RDMWQJEOIPD5G2NZHKDQ5X4&near=${location}&query=${interest}&v=20210401`;

  const fourSquareData = await fetchData(fourSquareUrl);

  const venues = fourSquareData.response.venues;

  const venueCards = await venues.map(createVenueCards);

  await console.log(venueCards);

  $("#cards-container").append(venueCards);
};

$("#search-form").on("submit", onSubmit);
