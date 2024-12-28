import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  restaurantFormSchema,
  RestaurantFormSchema,
} from "@/Schema/restaurantSchema";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const Restaurant = () => {
  const loading = false;
  const restaurantExist = false;

  const [restaurantDetail, setRestaurantDetail] =
    useState<RestaurantFormSchema>({
      name: "",
      city: "",
      country: "",
      deliveryTime: 0,
      cuisines: [""],
      image: undefined,
    });

  const [errors, setErrors] = useState<Partial<RestaurantFormSchema>>({});

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setRestaurantDetail({
      ...restaurantDetail,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = restaurantFormSchema.safeParse(restaurantDetail);
    if (!result.success) {
      const errorFields = result.error.formErrors.fieldErrors;

      setErrors(errorFields as Partial<RestaurantFormSchema>);
      return;
    }
    console.log(restaurantDetail);
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div>
        <div>
          <h1 className="font-extrabold text-2xl mb-5">Add Restaurant</h1>
          <form onSubmit={submitForm}>
            <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
              <div>
                <Label>Restaurant Name</Label>
                <Input
                  type="text"
                  name="name"
                  onChange={changeEventHandler}
                  value={restaurantDetail.name}
                  placeholder="Enter your restaurant name"
                />
                {errors && (
                  <span className="text-sm text-red-500 font-medium">
                    {errors.name}
                  </span>
                )}
              </div>
              <div>
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  placeholder="Enter city"
                  value={restaurantDetail.city}
                  onChange={changeEventHandler}
                />
                {errors && (
                  <span className="text-sm text-red-500 font-medium">
                    {errors.city}
                  </span>
                )}
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  type="text"
                  name="country"
                  placeholder="Enter country"
                  value={restaurantDetail.country}
                  onChange={changeEventHandler}
                />
                {errors && (
                  <span className="text-sm text-red-500 font-medium">
                    {errors.country}
                  </span>
                )}
              </div>
              <div>
                <Label>Estimated Delivery Time (minutes)</Label>
                <Input
                  type="number"
                  name="deliveryTime"
                  placeholder=""
                  value={restaurantDetail.deliveryTime}
                  onChange={changeEventHandler}
                />
                {errors && (
                  <span className="text-sm text-red-500 font-medium">
                    {errors.deliveryTime}
                  </span>
                )}
              </div>
              <div>
                <Label>Cuisines</Label>
                <Input
                  type="text"
                  name="cuisines"
                  placeholder="e.g. Italian, Chinese, Nepali"
                  value={restaurantDetail.cuisines}
                  onChange={(e) =>
                    setRestaurantDetail({
                      ...restaurantDetail,
                      cuisines: e.target.value.split(","),
                    })
                  }
                />
                {errors && (
                  <span className="text-sm text-red-500 font-medium">
                    {errors.cuisines}
                  </span>
                )}
              </div>
              <div>
                <Label>Upload Image</Label>
                <Input
                  type="file"
                  name="image"
                  placeholder="Enter your restaurant name"
                  accept="image/*"
                  onChange={(e) =>
                    setRestaurantDetail({
                      ...restaurantDetail,
                      image: e.target.files?.[0] || undefined,
                    })
                  }
                />
                {errors && (
                  <span className="text-sm text-red-500 font-medium">
                    {errors.image?.name}
                  </span>
                )}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
