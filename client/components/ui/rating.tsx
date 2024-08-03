import { Star } from "lucide-react";

export const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => {
        return rating > i + 1 ? (
          <Star fill="#ffe234" strokeWidth={0} />
        ) : (
          <Star fill="#d3d3d3" strokeWidth={0} />
        );
      })}
    </div>
  );
};
