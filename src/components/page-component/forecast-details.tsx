import { TForecastData, TWeatherCondition } from "@/api/type";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ArrowDown, ArrowUp, Calendar, Droplets, FileSpreadsheet, Wind } from "lucide-react";

type TDailyForecast = {
    temp_min: number;
    temp_max: number;
    humidity: number;
    wind: number;
    weather: TWeatherCondition;
    date: number;
};

const ForecastDetails = ({ forecastData }: { forecastData: TForecastData }) => {
    const dailyForecast = forecastData.list.reduce((acc, forecast) => {
        const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");
        if (!acc[date]) {
            acc[date] = {
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                humidity: forecast.main.humidity,
                wind: forecast.wind.speed,
                weather: forecast.weather[0],
                date: forecast.dt,
            };
        } else {
            acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
            acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
        }
        return acc;
    }, {} as Record<string, TDailyForecast>);

    const nextDays = Object.values(dailyForecast).slice(0, 6);

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle className="title">5 Days Forecast</CardTitle>
            </CardHeader>
            <CardContent>
                <Table >
                    <TableHeader>
                        <TableRow className=" text-md md:text-base">
                            <TableHead>Date
                                <Calendar className="size-4 text-blue-500 mt-2" />
                            </TableHead>
                            <TableHead className="text-left"><span>Min Temp</span>
                                <ArrowUp className="size-4 text-green-500 mt-2" /> </TableHead>

                            <TableHead className=" items-center"><span>Max Temp</span>
                                <ArrowDown className="size-4 text-red-500 mt-2" /> </TableHead>
                            <TableHead className=" items-center"><span>Humidity </span>
                                <Droplets className="size-5 text-blue-500 mt-2" /> </TableHead>
                            <TableHead className=" items-center"><span>Wind Speed</span>
                                <Wind className="size-5 text-blue-500 mt-2" /> </TableHead>
                            <TableHead>Condition
                                <FileSpreadsheet className="size-4 mt-2 text-blue-500" />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-md  md:text-base">
                        {nextDays.map((day) => (
                            <TableRow key={day.date}>
                                <TableCell>{format(new Date(day.date * 1000), "MMM dd, yyyy")}</TableCell>
                                <TableCell>{day.temp_min}°</TableCell>
                                <TableCell>{day.temp_max}°</TableCell>
                                <TableCell>{day.humidity} %</TableCell>
                                <TableCell>{day.wind} m/s</TableCell>
                                <TableCell className=" capitalize">{day.weather.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default ForecastDetails;
