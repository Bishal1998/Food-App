import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

const AddMenu = () => {
  const [open, setOpen] = useState<boolean>(false);

  const loading = false;
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between">
        <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">
          Available Menus
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="bg-orange hover:bg-hoverOrange">
              <Plus className="mr-2" />
              Add Menus
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new Menu</DialogTitle>
              <DialogDescription>
                Create a menu that will make your restaurant standout.
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input type="text" name="name" placeholder="Enter menu name" />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="desc"
                  placeholder="Enter menu description"
                />
              </div>
              <div>
                <Label>Price in Rs.</Label>
                <Input type="text" name="price" placeholder="Enter price" />
              </div>
              <div>
                <Label>Upload Menu Image</Label>
                <Input type="file" name="img" placeholder="Enter menu Image" />
              </div>
              <DialogFooter className="mt-5">
                {loading ? (
                  <Button disabled className="bg-orange hover:bg-hoverOrange">
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Please Wait
                  </Button>
                ) : (
                  <Button className="bg-orange hover:bg-hoverOrange">
                    Submit
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AddMenu;
