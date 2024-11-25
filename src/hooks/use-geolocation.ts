import { TCordinate } from "@/api/type";
import { useEffect, useState } from "react";
type TGeoLocationState = {
    coordinates: TCordinate | null;
    error: string | null,
    isLoading: boolean
}

export function useGeoLocation() {
    const [locationData, setLoactionData] = useState<TGeoLocationState>({
        coordinates: null,
        error: null,
        isLoading: true
    })

    const getLocation = () => {
        setLoactionData((prev) => ({
            ...prev,
            isLoading: true,
            error: null
        }))
        if (!navigator.geolocation) {
            setLoactionData({
                coordinates: null,
                error: "GeoLoation is not supported in your browser",
                isLoading: false
            })
            return
        }

        navigator.geolocation.getCurrentPosition((position) => {
            setLoactionData({
                coordinates: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                },
                error: null,
                isLoading: false
            })
        }, (error) => {

            let errorMessage: string;
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = "Location permission denied. Please enable location access"
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Location information is unavailable"
                    break;
                case error.TIMEOUT:
                    errorMessage = "Location request time out"
                    break;
                default:
                    errorMessage = "Unknown error occurred"
                    break;
            }
            setLoactionData({
                coordinates: null,
                isLoading: false,
                error: errorMessage
            })
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        })
    };
    useEffect(() => {
        getLocation()
    }, [])
    return {
        ...locationData,
        getLocation
    }
}