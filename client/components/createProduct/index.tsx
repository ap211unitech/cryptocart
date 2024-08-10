"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProduct } from "@/hooks";
import { LoaderCircle } from "lucide-react";
import { getRandomNumber } from "@/lib/utils";
import { ethers } from "ethers";

const formSchema = z.object({
  productName: z.string().nonempty("Product name is required").min(5).max(100),
  category: z.string().nonempty("Product Category is required").min(5).max(100),
  description: z.string().nonempty("Product description is required").min(100),
  image: z.string().nonempty("Product Image is required"),
  cost: z.string(),
  stock: z.string(),
});

export const CreateProduct = () => {
  const { mutateAsync: onCreateProduct, isPending } = useCreateProduct();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      category: "",
      description: "",
      image: "",
      cost: "",
      stock: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const cost = ethers.utils.parseEther(values.cost);
    await onCreateProduct({
      ...values,
      cost,
      stock: +values.stock,
      rating: getRandomNumber(1, 5),
      id: getRandomNumber(10000, 99999),
    });
    form.reset();
  };

  return (
    <div className="sm:container px-2 py-4">
      <h1 className="font-semibold text-3xl mb-8">Create Product</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 max-w-[800px]"
        >
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Camera" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Electronics" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Image</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/camera.jpg"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={10}
                    placeholder="Discover the perfect addition to your lifestyle with this product. Designed with quality and functionality in mind, this product offers exceptional performance, making it a must-have for anyone looking to enhance their everyday experience. Whether you're at home, at work, or on the go, this versatile item is crafted to meet your needs with ease. With a sleek design and durable construction, it blends style and practicality seamlessly. Ideal for both personal use and as a thoughtful gift, our product is sure to impress. Explore the benefits today and experience the difference it can make in your life."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (ETH)</FormLabel>
                <FormControl>
                  <Input placeholder="0.124" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Availability</FormLabel>
                <FormControl>
                  <Input placeholder="10" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending}
            className="flex items-center"
          >
            {isPending && (
              <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
            )}
            Create Product
          </Button>
        </form>
      </Form>
    </div>
  );
};
