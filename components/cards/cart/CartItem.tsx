import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { ICartProductType } from "@/models/carts";

export default function CartItem({ cart }: { cart: ICartProductType }) {
  return (
    <Card className="grid grid-cols-[100px_1fr_auto] items-center gap-4 p-4">
      <Image
        src={cart.thumbnail ? cart.thumbnail : "/images/placeholder.svg"}
        alt={cart.title}
        width={100}
        height={100}
        className="rounded-md object-cover"
        style={{ aspectRatio: "100/100", objectFit: "cover" }}
      />
      <div className="grid gap-1">
        <h3 className="font-semibold">{cart.title}</h3>
        <p className="text-muted-foreground text-sm">
          Warm and Soft for Chilly Nights
        </p>
        <div className="flex items-center gap-2">
          <p className="font-semibold">
            {cart.discountPercentage
              ? (cart.price * (100 - cart.discountPercentage)) / 100
              : cart.price}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6 hover:bg-muted"
            >
              <Minus className="w-4 h-4" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <Input
              type="number"
              min="1"
              max={cart.stock}
              defaultValue={cart.quantity}
              className="w-12 text-center"
            />
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6 hover:bg-muted"
            >
              <Plus className="w-4 h-4" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="w-6 h-6 hover:bg-muted text-muted-foreground"
      >
        <X className="w-4 h-4" />
        <span className="sr-only">Remove from cart</span>
      </Button>
    </Card>
  );
}
