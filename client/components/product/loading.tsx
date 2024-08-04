import { Skeleton } from "../ui/skeleton";

export const Loading = () => {
  return (
    <div className="md:container px-8 grid lg:grid-cols-2 my-8">
      <div className="lg:px-20 mb-10">
        <Skeleton className="w-full h-[400px]" />
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="w-40 h-8" />
        <Skeleton className="w-full h-[350px]" />
      </div>
    </div>
  );
};
