import Pizza from "@/assets/pizza.jpg";
import { Badge } from "./ui/badge";
import { Timer } from "lucide-react";
import RestaurantMenu from "./RestaurantMenu";

const DetailPage = () => {
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="w-full">
        <div className="relative w-full h-32 md:h64 lg:h-72">
          <img
            src={Pizza}
            alt="Pizza"
            className="object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h1 className="font-medium text-xl">Brij Mohan</h1>
            <div className="flex gap-2 my-2">
              {["Biryani", "Momos"].map((cuisine: string, index: number) => (
                <div key={index}>
                  <Badge className="cursor-pointer">{cuisine} </Badge>
                </div>
              ))}
            </div>
            <div className="flex md:flex-row flex-col gap-2 my-5">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <h1 className="flex items-center gap-5 font-medium">
                  Delivery Time:<span className="text-[#D19254]">35 mins</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <RestaurantMenu />
      </div>
    </div>
  );
};

export default DetailPage;
