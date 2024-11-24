import DashboardSkeleton from "@/components/skeleton";
import { Button } from "@/components/ui/button"
import { useGeoLocation } from "@/hooks/use-geolocation"
import { MapPin, RefreshCcw } from "lucide-react"
import { useForecast, useReverseGeoCoding, useWeather } from "@/hooks/use-weather";
import CurrentWeather from "@/components/page-component/current-weather";
import HourlyTemprature from "@/components/page-component/hourly-temprature";
import WeatherDetails from "@/components/page-component/weather-detail";
import ForecastDetails from "@/components/page-component/forecast-details";
import FavoriteCities from "@/components/page-component/favorites-cities";
import { WeatherErrorCard } from "@/components/alert";


const WeatherPage = () => {
    const { getLocation, coordinates, error: locationError, isLoading: isGeoLocationLoading } = useGeoLocation();

    const { data: locationData, error: reverseError, isLoading: isLocationLoading, refetch: loactionReftch } = useReverseGeoCoding(coordinates);
    const { data: weatherData, error: weatherError, isLoading: isweatherLoading, refetch: weatherReftch, isFetching: isWeatherFetching } = useWeather(coordinates);
    const { data: forecastData, error: forecastError, isLoading: isforecastLoading, refetch: forecastReftch, isFetching: isForecastFetching } = useForecast(coordinates);

    const enableLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                // You can call your getLocation function here if needed
                getLocation();
            },
            (error) => {
                console.error("Error fetching location:", error.message);
                alert("Please allow location access to use this feature.");
            }
        );
    };


    const handleRefresh = () => {
        getLocation();
        if (coordinates) {
            loactionReftch();
            weatherReftch();
            forecastReftch();
        }
    };

    // Prioritize loading state first
    if (
        isGeoLocationLoading ||
        isLocationLoading ||
        isweatherLoading ||
        isforecastLoading

    ) {
        return <DashboardSkeleton />
    }

    // Handle errors after loading states
    if (forecastError || weatherError || !forecastData ||
        !weatherData) {
        return (
            <WeatherErrorCard
                title="Weather Error"
                errorMessage={locationError || "Failed to fetch Weather information"}
                enableLocation={enableLocation}
                icon={<RefreshCcw className="mr-2 h-4 w-4" />}
                btnMessage="Try Again"
            />
        );
    }

    if (locationError || !coordinates || reverseError) {
        return (
            <WeatherErrorCard
                title="Location Error"
                errorMessage={locationError || "Please enable location to see your local weather"}
                enableLocation={enableLocation}
                icon={<MapPin className="mr-2 h-4 w-4" />}
                btnMessage="Enable Location"
            />
        );
    }

    const locationName = locationData && locationData[0];

    return (
        <div className="space-y-6">
            {/* fav city */}
            <FavoriteCities />
            <div className="flex justify-between items-center">
                <h1 className="header">My Location</h1>

                <Button
                    onClick={handleRefresh}
                    size={'icon'}
                    disabled={isForecastFetching || isWeatherFetching}
                    variant={'outline'}
                >
                    <RefreshCcw className={`size-4 ${isForecastFetching || isWeatherFetching ? "animate-spin" : ""}`} />
                </Button>
            </div>

            {/* current and hourly weather */}
            <div className="grid gap-10">
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="lg:w-[50%]">

                        <CurrentWeather locationName={locationName!} weatherData={weatherData} />
                    </div>
                    <HourlyTemprature forecastData={forecastData} />
                </div>
                <div className="flex flex-col lg:flex-row gap-10">
                    <WeatherDetails weatherData={weatherData} />
                    <ForecastDetails forecastData={forecastData} />
                </div>
            </div>
        </div>
    );
};

export default WeatherPage;



