import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const Restaurant = () => {
  const loading = false;
  const restaurantExist = false;
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div>
        <div>
          <h1 className="font-extrabold text-2xl mb-5">Add Restaurant</h1>
          <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
            <div>
              <Label>Restaurant Name</Label>
              <Input
                type="text"
                name="restaurantName"
                placeholder="Enter your restaurant name"
              />
            </div>
            <div>
              <Label>City</Label>
              <Input type="text" name="city" placeholder="Enter city" />
            </div>
            <div>
              <Label>Country</Label>
              <Input type="text" name="country" placeholder="Enter country" />
            </div>
            <div>
              <Label>Estimated Delivery Time (minutes)</Label>
              <Input type="text" name="time" placeholder="" />
            </div>
            <div>
              <Label>Cuisines</Label>
              <Input
                type="text"
                name="cuisines"
                placeholder="e.g. Italian, Chinese, Nepali"
              />
            </div>
            <div>
              <Label>Upload Image</Label>
              <Input
                type="file"
                name="image"
                placeholder="Enter your restaurant name"
                accept="image/*"
              />
            </div>
          </div>
          <div className="my-5 w-fit">
            {loading ? (
              <Button disabled className="bg-orange hover:bg-hoverOrange">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button className="bg-orange hover:bg-hoverOrange">
                {restaurantExist ? "Update Restaurant" : "Add Restaurant"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
