import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

export const Loading = () => {
  return (
    <>
      {Array.from({ length: 2 }).map((_, i) => {
        return (
          <Fragment key={i}>
            <Skeleton className="w-40 h-8 my-4" />
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <Skeleton className="h-[350px] w-full" />
              <Skeleton className="h-[350px] w-full" />
              <Skeleton className="h-[350px] w-full" />
            </div>
          </Fragment>
        );
      })}
    </>
  );
};
