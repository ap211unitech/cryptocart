import { OrderStatus } from "@/types";

export const availableStatuses = [
  {
    name: "Payment Done",
    type: OrderStatus.PaymentDone,
    bg: "",
  },
  {
    name: "Shipped",
    type: OrderStatus.Shipped,
    bg: "bg-yellow-100",
  },
  {
    name: "Reject",
    type: OrderStatus.Cancelled,
    bg: "bg-red-100",
  },
  {
    name: "Delivered",
    type: OrderStatus.Completed,
    bg: "bg-green-100",
  },
];
