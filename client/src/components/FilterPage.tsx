import { Label } from "@radix-ui/react-menubar";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

export interface IFilterOptions {
  id: string;
  label: string;
}

const filterOptions: IFilterOptions[] = [
  {
    id: "thali",
    label: "Thali",
  },
  {
    id: "burger",
    label: "Burger",
  },
  {
    id: "pizza",
    label: "Pizza",
  },
  {
    id: "biryani",
    label: "Biryani",
  },
];

const FilterPage = () => {
  const filterHandler = (value: string) => {};
  return (
    <div className="md:w-72">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Filter by Cuisines</h1>
        <Button variant={"link"}>Reset</Button>
      </div>
      {filterOptions.map((option) => (
        <div key={option.id} className="flex items-center space-x-2 my-5">
          <Checkbox
            id={option.id}
            onClick={() => filterHandler(option.label)}
          />
          <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{option.label}</Label>
        </div>
      ))}
    </div>
  );
};

export default FilterPage;
