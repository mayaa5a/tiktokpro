import { Place, mockPlacesDB } from '../data/mockPlacesDB';
import { mockVideoPlaceLinks } from '../data/mockVideoPlaceLinks';

export function getPlacesForFolder(videoIds: string[]): Place[] {
  const placeIds = new Set<string>();
  videoIds.forEach((videoId) => {
    const linked = mockVideoPlaceLinks[videoId] ?? [];
    linked.forEach((placeId) => placeIds.add(placeId));
  });

  return mockPlacesDB.filter((place) => placeIds.has(place.placeId));
}
