export type Place = {
  placeId: string;
  name: string;
  address: string;
  hours: string;
  highlights: string;
  lat: number;
  lng: number;
  city: string;
};

export const mockPlacesDB: Place[] = [
  {
    placeId: 'soho_matcha_bar',
    name: 'SoHo Matcha Bar',
    address: '123 Prince St, New York, NY',
    hours: '8am-7pm',
    highlights: 'order the lavender matcha',
    lat: 40.7255,
    lng: -73.998,
    city: 'NYC',
  },
  {
    placeId: 'east_village_espresso',
    name: 'East Village Espresso',
    address: '55 Ave A, New York, NY',
    hours: '7am-6pm',
    highlights: 'quiet weekday mornings',
    lat: 40.7243,
    lng: -73.9837,
    city: 'NYC',
  },
  {
    placeId: 'brooklyn_bagel_co',
    name: 'Brooklyn Bagel Co.',
    address: '77 Bedford Ave, Brooklyn, NY',
    hours: '8am-3pm',
    highlights: 'line moves fast',
    lat: 40.7167,
    lng: -73.956,
    city: 'NYC',
  },
  {
    placeId: 'little_italy_pizza_spot',
    name: 'Little Italy Pizza Spot',
    address: '10 Mulberry St, New York, NY',
    hours: '11am-11pm',
    highlights: 'thin crust',
    lat: 40.7197,
    lng: -73.9975,
    city: 'NYC',
  },
  {
    placeId: 'central_park_coffee_cart',
    name: 'Central Park Coffee Cart',
    address: 'Central Park W, New York, NY',
    hours: '9am-5pm',
    highlights: 'best view',
    lat: 40.7713,
    lng: -73.9742,
    city: 'NYC',
  },
  {
    placeId: 'west_village_roastery',
    name: 'West Village Roastery',
    address: '88 Hudson St, New York, NY',
    hours: '7am-8pm',
    highlights: 'smooth cold brew',
    lat: 40.7281,
    lng: -74.0056,
    city: 'NYC',
  },
];
