import { ArrowBigLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NotFoundImage from "@/public/notFound.png";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="m-auto text-center overflow-x-hidden">
      <div className="mx-auto relative w-[300px] h-[300px] sm:w-[350px] md:w-[400px] sm:h-[350px]">
        <Image
          src={NotFoundImage}
          alt="Not found image"
          placeholder="blur"
          fill
        />
      </div>
      <p className="text-xl mb-5">This page could not be found</p>
      <Button className="mb-12 xl:mb-0 dark:hover:text-white transition-all duration-500">
        <Link href={"/"} className="gap-2 flex items-center">
          <ArrowBigLeft />
          Back to home
        </Link>
      </Button>
    </div>
  );
}
