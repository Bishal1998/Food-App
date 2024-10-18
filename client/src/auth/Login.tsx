import {Input} from "@/components/ui/input.tsx";
import {Loader2, LockKeyhole, Mail} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Link} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import {userLoginSchema, userLoginState} from "@/Schema/userSchema.ts";

const Login = () => {
    const [input, setInput] = useState<userLoginState>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<Partial<userLoginState>>({});

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInput({...input, [name]: value});
    };

    const loginSubmitHandler = (e: FormEvent) => {
        e.preventDefault();

        const result = userLoginSchema.safeParse(input);

        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setErrors(fieldErrors as Partial<userLoginState>);
        }

        console.log(input);
    };

    const loader = false;
    return (
        <div className="flex items-center justify-center min-h-screen w-screen">
            <form
                onSubmit={loginSubmitHandler}
                className="md:p-8 w-full max-w-md md:border border-gray-200 rounded-lg"
            >
                <div className={"mb-4"}>
                    <h1 className={"font-bold text-2xl"}>Food App</h1>
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
                    {loader ? (
                        <Button
                            disabled
                            className={"bg-orange hover:bg-hoverOrange w-full"}
                        >
                            <Loader2 className={"mr-2 h-4 w-4 animate-spin"}/> Please Wait
                        </Button>
                    ) : (
                        <Button
                            type={"submit"}
                            className={"bg-orange hover:bg-hoverOrange w-full"}
                        >
                            Login
                        </Button>
                    )}
                    <div className="mt-4">
                        <Link to="/forgotpassword" className="text-blue-500">Forgot Password</Link>
                    </div>
                </div>
                <Separator/>
                <p className={"mt-2"}>
                    Don't have an account?{" "}
                    <Link to={"/signup"} className={"text-blue-500"}>
                        Signup
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
