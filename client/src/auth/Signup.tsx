import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { Loader2, LockKeyhole, Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Link } from "react-router-dom";
import { userSignUpSchema, userSignUpState } from "@/Schema/userSchema.ts";

const Signup = () => {
  const [input, setInput] = useState<userSignUpState>({
    fullName: "",
    email: "",
    password: "",
    contact: "",
  });

  const [errors, setErrors] = useState<Partial<userSignUpState>>({});

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const singupHandler = (e: FormEvent) => {
    e.preventDefault();

    // form validation
    const result = userSignUpSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<userSignUpState>);
    }

    console.log(input);
  };

  const loader = false;
  return (
    <div className="flex items-center justify-center min-h-screen w-screen">
      <form
        onSubmit={singupHandler}
        className="md:p-8 w-full max-w-md md:border border-gray-200 rounded-lg"
      >
        <div className={"mb-4"}>
          <h1 className={"font-bold text-2xl"}>Food App</h1>
        </div>

        <div className={"mb-4"}>
          <div className={"relative"}>
            <Input
              type="text"
              placeholder="Enter your full name"
              className={"pl-10 focus-visible:ring-1"}
              name={"fullName"}
              value={input.fullName}
              onChange={changeEventHandler}
            />
            <User
              className={
                "absolute inset-y-2 left-2 text-gray-500 pointer-events-none"
              }
            />
            {errors && (
              <span className="text-sm text-red-500">{errors.fullName}</span>
            )}
          </div>
        </div>
        <div className={"mb-4"}>
          <div className={"relative"}>
            <Input
              type="email"
              placeholder="Enter your email"
              className={"pl-10 focus-visible:ring-1"}
              name={"email"}
              value={input.email}
              onChange={changeEventHandler}
            />
            <Mail
              className={
                "absolute inset-y-2 left-2 text-gray-500 pointer-events-none"
              }
            />
            {errors && (
              <span className="text-sm text-red-500">{errors.email}</span>
            )}
          </div>
        </div>
        <div className={"mb-4"}>
          <div className={"relative"}>
            <Input
              type="password"
              placeholder="Enter your password"
              className={"pl-10 focus-visible:ring-1"}
              name={"password"}
              value={input.password}
              onChange={changeEventHandler}
            />
            <LockKeyhole
              className={
                "absolute inset-y-2 left-2 text-gray-500 pointer-events-none"
              }
            />
            {errors && (
              <span className="text-sm text-red-500">{errors.password}</span>
            )}
          </div>
        </div>

        <div className={"mb-4"}>
          <div className={"relative"}>
            <Input
              type="text"
              placeholder="Enter your contact number"
              className={"pl-10 focus-visible:ring-1"}
              name={"contact"}
              value={input.contact}
              onChange={changeEventHandler}
            />
            <Phone
              className={
                "absolute inset-y-2 left-2 text-gray-500 pointer-events-none"
              }
            />
            {errors && (
              <span className="text-sm text-red-500">{errors.contact}</span>
            )}
          </div>
        </div>
        <div className={"mb-10"}>
          {loader ? (
            <Button
              disabled
              className={"bg-orange hover:bg-hoverOrange w-full"}
            >
              <Loader2 className={"mr-2 h-4 w-4 animate-spin"} /> Please Wait
            </Button>
          ) : (
            <Button
              type={"submit"}
              className={"bg-orange hover:bg-hoverOrange w-full"}
            >
              Signup
            </Button>
          )}
        </div>
        <Separator />
        <p className={"mt-2"}>
          Already have an account?{" "}
          <Link to={"/login"} className={"text-blue-500"}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
