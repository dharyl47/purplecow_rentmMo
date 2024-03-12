import React from 'react';
import TextField from '@material-ui/core/TextField';

interface Props {
  apiKey: string;
}

const useGoogleAutocomplete = ({ apiKey }: Props): [React.RefObject<HTMLInputElement>, Address] => {
  const [address, setAddress] = React.useState<Address>({
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    lat: null,
    lon: null,
  });
  const searchInput = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const loadMapScript = () => {
      if ((window as any).google) {
        return Promise.resolve();
      }
      const mapApiJs = 'https://maps.googleapis.com/maps/api/js';
      const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
      return loadScript(src);
    };

    const initAutocomplete = () => {
      if (!searchInput.current) return;

      const autocomplete = new window.google.maps.places.Autocomplete(
        searchInput.current
      );

      autocomplete.setFields(["address_component", "geometry"]);
      autocomplete.addListener("place_changed", () =>
        handlePlaceChange(autocomplete)
      );
    };

    loadMapScript().then(() => initAutocomplete());
  }, [apiKey]);

  const handlePlaceChange = (autocomplete: google.maps.places.Autocomplete) => {
    const place = autocomplete.getPlace();
    const newAddress = extractAddress(place);
    setAddress(newAddress);
  };

  const extractAddress = (place: google.maps.places.PlaceResult): Address => {
    const newAddress: Partial<Address> = {};
    const componentMap: Record<string, keyof Address> = {
      route: "street1",
      neighborhood: "street2",
      locality: "city",
      administrative_area_level_2: "state",
      postal_code: "zipCode",
      country: "country",
    };

    place.address_components?.forEach((component: google.maps.GeocoderAddressComponent) => {
      const { types, long_name } = component;
      types.forEach((type: string) => {
        if (type in componentMap) {
          newAddress[componentMap[type]] = long_name;
        }
      });
    });

    newAddress.lat = place.geometry?.location.lat() || null;
    newAddress.lon = place.geometry?.location.lng() || null;

    return { ...address, ...newAddress } as Address;
  };

  const loadScript = (src: string): Promise<HTMLScriptElement> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      Object.assign(script, {
        type: "text/javascript",
        async: true,
        src,
      });
      script.addEventListener("load", () => resolve(script));
      document.head.appendChild(script);
    });
  };

  return [searchInput, address];
};

const YourComponent: React.FC<Props> = ({ apiKey }) => {
  const [searchInput, address] = useGoogleAutocomplete({ apiKey });

  return (
    <div>
      <div className="flex flex-col mb-6">
        <label className="mb-2 font-semibold" htmlFor="outlined-basic">
          Pickup & Return Location
        </label>
        <TextField
          id="outlined-basic"
          label="Pickup & Return Location"
          variant="outlined"
          size="small"
          inputRef={searchInput}
        />
      </div>
      {/* Display the address components as needed */}
    </div>
  );
};

export default YourComponent;
