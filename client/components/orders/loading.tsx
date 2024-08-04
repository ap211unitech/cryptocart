import { Skeleton } from "../ui/skeleton";

export const Loading = () => {
  return (
    <div className="md:container p-4 my-4">
      <div className="flex flex-col gap-8">
        {Array.from({ length: 3 }).map((_, i) => {
          return (
            <div key={i} className="flex gap-8">
              <Skeleton className="w-[200px] h-[200px]" />
              <div className="flex flex-col gap-4 w-full">
                <Skeleton className="w-40 h-6" />
                <Skeleton className="w-[50%] h-20" />
                <section className="flex gap-4 mt-4">
                  <Skeleton className="w-28 h-10" />
                  <Skeleton className="w-28 h-10" />
                </section>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
