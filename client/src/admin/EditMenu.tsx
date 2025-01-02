import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuFormSchema } from "@/Schema/menuSchema";
import { Loader2 } from "lucide-react";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

const EditMenu = ({
  selectedMenu,
  editOpen,
  setEditOpen,
}: {
  selectedMenu: MenuFormSchema;
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [inputData, setInputData] = useState<MenuFormSchema>({
    name: "",
    desc: "",
    price: 0,
    img: undefined,
  });

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInputData({
      ...inputData,
      [name]: type === "number" ? Number(value) : value,
    });
  };
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputData);
  };
  const loading = false;

  useEffect(() => {
    console.log(inputData);
    setInputData({
      name: selectedMenu?.name || " ",
      desc: selectedMenu?.desc || " ",
      price: selectedMenu?.price || 0,
      img: undefined,
    });
  }, [selectedMenu]);
  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>
            Update your menu to keep your offerings fresh and exciting!
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={submitHandler}>
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              value={inputData.name}
              placeholder="Enter menu name"
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="desc"
              value={inputData.desc}
              onChange={changeEventHandler}
              placeholder="Enter menu description"
            />
          </div>
          <div>
            <Label>Price in Rs.</Label>
            <Input
              type="number"
              name="price"
              placeholder="Enter price"
              value={inputData.price}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Upload Menu Image</Label>
            <Input
              type="file"
              name="img"
              onChange={(e) =>
                setInputData({
                  ...inputData,
                  img: e.target.files?.[0] || undefined,
                })
              }
            />
          </div>
          <DialogFooter className="mt-5">
            {loading ? (
              <Button disabled className="bg-orange hover:bg-hoverOrange">
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button className="bg-orange hover:bg-hoverOrange">Submit</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenu;
