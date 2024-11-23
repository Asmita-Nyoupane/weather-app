

export const Skeleton = ({ className }: { className: string }) => {
    return <div className={`bg-muted animate-pulse ${className}`} />;
};

const DashboardSkeleton = () => {
    return (
        <div className="flex flex-col bg-muted gap-5 items-center w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
            </div>
        </div>
    );
};

export default DashboardSkeleton;
