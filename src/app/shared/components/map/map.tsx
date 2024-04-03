import { useEffect, useRef } from 'react';
import OlMap from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import View from 'ol/View';

const TILES_URL: string = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

function initMap(el: HTMLDivElement): OlMap {
  const map = new OlMap({
    target: el,
    layers: [
      new TileLayer({
        source: new XYZ({
          url: TILES_URL
        })
      })
    ],
    view: new View({
      center: [0, 0],
      zoom: 2
    })
  });

  return map;
}

const Map = () => {
  const mapRef = useRef<HTMLDivElement>();

  useEffect(() => {
    let map: OlMap;
    if (mapRef.current) {
      map = initMap(mapRef.current);
    }

    return () => {
      if (map) {
        map.dispose();
      }
    };
  }, []);

  return <div className="h-full w-full" ref={mapRef}></div>;
};

Map.displayName = 'Map';

export default Map;
