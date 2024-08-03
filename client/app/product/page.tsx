import { ProductItem } from "@/components/product";
import { notFound } from "next/navigation";

const Page = ({ searchParams }: { searchParams: { id: string } }) => {
  if (!searchParams || !searchParams.id) return notFound();

  return <ProductItem productId={searchParams.id} />;
};

export default Page;
