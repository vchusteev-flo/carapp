import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface OrderCardProps {
  order: {
    id?: number
    image: string
    make?: string
    model?: string
    price?: string
    finalPrice?: string
    status?: string
  }
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <Link href={`/car/${order.id}`}>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex gap-4">
            <div className="relative w-32 h-32">
              <Image
                src={order.image}
                alt={`${order.make} ${order.model}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="py-4 pr-4">
              <h3 className="font-medium mb-1">Заказ #{order.id}</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  <span className="inline-block w-32">Марка:</span>
                  {order.make}
                </p>
                <p>
                  <span className="inline-block w-32">Модель:</span>
                  {order.model}
                </p>
                <p>
                  <span className="inline-block w-32">Цена:</span>
                  {order.price}
                </p>
                <p>
                  <span className="inline-block w-32">Цена под ключ:</span>
                  {order.finalPrice}
                </p>
                <p>
                  <span className="inline-block w-32">Статус:</span>
                  <span className="text-orange-500">{order.status}</span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

