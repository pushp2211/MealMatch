import { useState, useEffect } from "react";
import { FiMapPin, FiSearch, FiFilter, FiCrosshair, FiSend } from "react-icons/fi";
import MapComponent from "./MapComponent";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

const geocodingClient = mbxGeocoding({
    accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
});

const sampleSeekers = [
  {
    _id: "1",
    name: "Seeker A (Prayagraj)",
    rating: 4.5,
    location: {
      type: "Point",
      coordinates: [81.9463, 25.4358], // Prayagraj itself
    },
    foodDetails: {
      title: "Dal Chawal",
      foodType: "veg",
    },
  },
  {
    _id: "2",
    name: "Seeker B (Nearby - Varanasi)",
    rating: 4.2,
    location: {
      type: "Point",
      coordinates: [82.9739, 25.3176], // ~120km
    },
    foodDetails: {
      title: "Poori Sabzi",
      foodType: "veg",
    },
  },
  {
    _id: "3",
    name: "Seeker C (Nearby - Kanpur)",
    rating: 4.0,
    location: {
      type: "Point",
      coordinates: [80.3319, 26.4499], // ~200km
    },
    foodDetails: {
      title: "Kachori & Aloo",
      foodType: "veg",
    },
  },
  {
    _id: "4",
    name: "Seeker D (Far - Delhi)",
    rating: 3.9,
    location: {
      type: "Point",
      coordinates: [77.1025, 28.7041], // ~650km
    },
    foodDetails: {
      title: "Rajma Chawal",
      foodType: "veg",
    },
  },
  {
    _id: "5",
    name: "Seeker E (Far - Mumbai)",
    rating: 4.5,
    location: {
      type: "Point",
      coordinates: [72.8777, 19.0760], // ~1300km
    },
    foodDetails: {
      title: "Pav Bhaji",
      foodType: "veg",
    },
  },
];

// Helper function to calculate distance in KM
const getDistanceInKm = ([lng1, lat1], [lng2, lat2]) => {
    const R = 6371; // Radius of the earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

function GoogleMapView() {
    const [searchText, setSearchText] = useState("");
    const [userLocation, setUserLocation] = useState([81.8463, 25.4358]); // Prayagraj default
    const [suggestions, setSuggestions] = useState([]);
    const [radius, setRadius] = useState(5000); // default 5km in meters
    const [filteredSeekers, setFilteredSeekers] = useState([]);

    // Get current location
    const getCurrentLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([longitude, latitude]);
                    setSearchText("");
                    setSuggestions([]);
                },
                (err) => {
                    console.error("Error getting location:", err);
                    alert("Location access denied.");
                }
            );
        } else {
            alert("Geolocation not supported by your browser.");
        }
    };

    // Fetch suggestions for manual input
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchText.trim() === "") {
                setSuggestions([]);
                return;
            }

            geocodingClient
                .forwardGeocode({
                    query: searchText,
                    autocomplete: true,
                    limit: 5,
                })
                .send()
                .then((response) => {
                    const matches = response.body.features;
                    setSuggestions(matches);
                })
                .catch(console.error);
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [searchText]);

    // Filter seekers by radius from userLocation
    useEffect(() => {
        if (!userLocation) {
            setFilteredSeekers([]);
            return;
        }

        const nearby = sampleSeekers.filter((seeker) => {
            const seekerCoords = seeker.location.coordinates;
            const distance = getDistanceInKm(userLocation, seekerCoords);
            return distance <= radius / 1000;
        });

        setFilteredSeekers(nearby);
    }, [userLocation, radius]);

    return (
        <div className="bg-dashbg1 w-full h-full px-5 py-7 flex flex-col gap-y-5 overflow-auto scrollbar-thin scrollbar-webkit">
            {/* Title */}
            <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-darkblack1">
                    Find Food Seekers Near You
                </div>
                <div className="text-md text-gray-600">
                    Connect with people looking for food in your area
                </div>
            </div>

            {/* Action bar */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center gap-3 relative z-10">
                {/* Manual Search Input */}
                <div className="w-full flex gap-3 p-1 bg-white border-1 border-gray-300 rounded-sm relative">
                    <div className="flex bg-white items-center w-full rounded-sm px-3">
                        <FiMapPin className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            className="w-full outline-none text-md"
                            placeholder="Enter your location manually"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>

                    <button
                        className="flex items-center justify-center bg-black hover:bg-black/80 active:scale-95 cursor-pointer text-white pl-3 pr-4 py-2 rounded-sm text-md sm:w-auto"
                        onClick={() => {
                            if (!userLocation) alert("Please select a suggestion or use your location.");
                        }}
                    >
                        <FiSend className="mr-2" />
                        Set
                    </button>

                    {/* Autocomplete Suggestions */}
                    {suggestions.length > 0 && (
                        <div className="absolute top-full mt-1 left-0 right-0 bg-white shadow-md border border-gray-200 rounded-sm z-20">
                            {suggestions.map((item) => (
                                <div
                                    key={item.id}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        const [lng, lat] = item.center;
                                        setUserLocation([lng, lat]);
                                        setSearchText(item.place_name);
                                        setSuggestions([]);
                                    }}
                                >
                                    {item.place_name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* My Location Button */}
                <div className="relative group">
                    <button
                        onClick={getCurrentLocation}
                        className="flex items-center justify-center border-1 bg-black text-white border-black cursor-pointer active:scale-95 px-4 py-2 sm:py-3 rounded-sm text-sm w-full sm:w-auto"
                    >
                        <FiCrosshair className="size-5" />
                        <div className="sm:hidden text-white text-md ml-3">
                            Use my current location
                        </div>
                    </button>
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 sm:block hidden opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                        My Location
                    </div>
                </div>

                {/* Radius Selector */}
                <select
                    className="border border-gray-300 rounded-sm px-3 py-2 text-md"
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                >
                    <option value={1000}>1 km</option>
                    <option value={5000}>5 km</option>
                    <option value={10000}>10 km</option>
                    <option value={50000}>50 km</option>
                    <option value={100000}>100 km</option>
                    <option value={500000}>500 km</option>
                    <option value={1000000}>1000 km</option>
                </select>

                {/* Filters Placeholder */}
                <button className="flex items-center justify-center bg-white hover:bg-gray-100 border-1 border-gray-300 cursor-pointer text-black px-4 py-2 sm:text-lg rounded-sm text-md w-full sm:w-auto">
                    <FiFilter className="mr-2" />
                    Filters
                </button>
            </div>

            {/* Map and Active Seekers */}
            <div className="bg-pink1 grid grid-rows lg:grid-cols-3 gap-5">
                <div className="bg-pink1 col-span-3 lg:col-span-2">
                    <MapComponent userLocation={userLocation} seekers={filteredSeekers} />
                </div>

                {/* RHS Active Cards */}
                <div className="bg-dashcard1 flex flex-col gap-y-2 col-span-3 lg:col-span-1 rounded-sm py-2">
                    <div className="p-4 text-xl font-medium text-darkblack1">
                        Active Seekers
                    </div>
                    <div className="w-full bg-dashcard1 max-h-96 overflow-auto scrollbar-webkit p-3 flex flex-col gap-y-4">
                        {filteredSeekers.map((seeker) => (
                            <ActiveCard
                                key={seeker._id}
                                name={seeker.foodDetails?.title || "Available Food"}
                                location={seeker.name}
                                tag={seeker.foodDetails?.foodType || "unknown"}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ActiveCard({ key, name, location, tag }) {
    return (
        <div className="border-1 bg-green-100/60 border-gray-400 p-2 flex flex-col rounded-md">
            <div>{name}</div>
            <div>{location}</div>
            <div>{tag}</div>
        </div>
    );
}

export default GoogleMapView;
