import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
    return (
        <div className="space-y-6">
            {/* Favorite Cities */}
            <div>
                {/* <h2 className="text-lg font-semibold mb-4">Favorite Cities</h2> */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Skeleton className="h-16 w-full rounded-lg" />
                    <Skeleton className="h-16 w-full rounded-lg" />
                    <Skeleton className="h-16 w-full rounded-lg" />
                    <Skeleton className="h-16 w-full rounded-lg" />
                </div>
            </div>

            {/* My Location */}
            <div className="flex justify-between items-center">
                {/* <h1 className="text-2xl font-bold">My Location</h1> */}
                <Skeleton className="h-10 w-10 rounded-full" />
            </div>

            {/* Current Weather and Hourly Temperature */}
            <div className="grid gap-10">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Current Weather */}
                    <div className="lg:w-[50%]">
                        <Skeleton className="h-10 w-1/2 mb-4" />
                        <div className="space-y-4">
                            <Skeleton className="h-24 w-full rounded-lg" />
                            <Skeleton className="h-8 w-3/4 rounded-lg" />
                            <Skeleton className="h-8 w-1/2 rounded-lg" />
                        </div>
                    </div>

                    {/* Hourly Temperature */}
                    <div className="flex flex-col gap-4">
                        {/* <h2 className="text-lg font-semibold">Hourly Temperature</h2> */}
                        <div className="grid grid-cols-4 gap-4">
                            <Skeleton className="h-20 w-16 rounded-lg" />
                            <Skeleton className="h-20 w-16 rounded-lg" />
                            <Skeleton className="h-20 w-16 rounded-lg" />
                            <Skeleton className="h-20 w-16 rounded-lg" />
                        </div>
                    </div>
                </div>

                {/* Weather Details and Forecast Details */}
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Weather Details */}
                    <div className="lg:w-[50%] space-y-4">
                        {/* <h2 className="text-lg font-semibold">Weather Details</h2> */}
                        <Skeleton className="h-8 w-full rounded-lg" />
                        <Skeleton className="h-8 w-full rounded-lg" />
                        <Skeleton className="h-8 w-full rounded-lg" />
                        <Skeleton className="h-8 w-full rounded-lg" />
                    </div>

                    {/* Forecast Details */}
                    <div className="lg:w-[50%] space-y-4">
                        {/* <h2 className="text-lg font-semibold">Forecast Details</h2> */}
                        <Skeleton className="h-8 w-full rounded-lg" />
                        <Skeleton className="h-8 w-full rounded-lg" />
                        <Skeleton className="h-8 w-full rounded-lg" />
                        <Skeleton className="h-8 w-full rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSkeleton;
