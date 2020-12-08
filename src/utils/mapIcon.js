import Leaflet from 'leaflet';
import mapMarkerIcon from '../images/map-marker.svg';
import mapMarkerSecondaryIcon from '../images/map-marker-secondary.svg';

export const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerIcon,

  iconSize: [36, 36],
  iconAnchor: [18, 36]
});

export const mapSecondaryIcon = Leaflet.icon({
  iconUrl: mapMarkerSecondaryIcon,

  iconSize: [24, 24],
  iconAnchor: [12, 24]
});