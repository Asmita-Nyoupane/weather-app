import DashboardSkeleton from "@/components/skeleton";
import { MapPin, RefreshCcw } from "lucide-react"
import { WeatherErrorCard } from "../components/alert";
import { useForecast, useReverseGeoCoding, useWeather } from "@/hooks/use-weather";
import CurrentWeather from "@/components/page-component/current-weather";
import HourlyTemprature from "@/components/page-component/hourly-temprature";
import WeatherDetails from "@/components/page-component/weather-detail";
import ForecastDetails from "@/components/page-component/forecast-details";
import { useParams, useSearchParams } from "react-router-dom";
import FavoritesButton from "@/components/page-component/favorites-button";


const CityPage = () => {
    const [searchParams] = useSearchParams()
    const params = useParams()

    const lat = parseFloat(searchParams.get("lat") || '0')
    const lon = parseFloat(searchParams.get("lon") || '0')
    const coordinates = { lat, lon }


    const { data: locationData, error: reverseError, isLoading: isLocationLoading, } = useReverseGeoCoding(coordinates);
    const { data: weatherData, error: weatherError, isLoading: isweatherLoading, } = useWeather(coordinates);
    const { data: forecastData, error: forecastError, isLoading: isforecastLoading } = useForecast(coordinates);

    const enableLocation = () => { };


    // Prioritize loading state first
    if (
        isLocationLoading ||
        isweatherLoading ||
        isforecastLoading ||
        !forecastData ||
        !weatherData ||
        !params.cityName
    ) {
        return <DashboardSkeleton />
    }

    // Handle errors after loading states
    if (forecastError || weatherError) {
        return (
            <WeatherErrorCard
                title="Weather Error"
                errorMessage={"Failed to fetch Weather information"}
                enableLocation={enableLocation}
                icon={<RefreshCcw className="mr-2 h-4 w-4" />}
                btnMessage="Try Again"
            />
        );
    }

    if (!coordinates || reverseError) {
        return (
            <WeatherErrorCard
                title="Location Error"
                errorMessage={"Please enable location to see your local weather"}
                enableLocation={enableLocation}
                icon={<MapPin className="mr-2 h-4 w-4" />}
                btnMessage="Enable Location"
            />
        );
    }

    const locationName = locationData && locationData[0];

    return (
        <div className="space-y-10">
            {/* fav city */}
            <div className="flex justify-between  gap-2 items-center">
                <h1 className="header">

                    {params.cityName},
                    <span className=" title ">
                        {weatherData.sys.country}
                    </span>
                </h1>
                <div>
                    <FavoritesButton weatherData={{ ...weatherData, name: params.cityName }} />
                </div>


            </div>

            {/* current and hourly weather */}
            <div className="grid gap-10">
                <div className="flex flex-col gap-10">
                    <CurrentWeather locationName={locationName!} weatherData={weatherData} />
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

export default CityPage;



