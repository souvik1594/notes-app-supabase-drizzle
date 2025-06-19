"use client";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { loginAccountAction } from "@/actions/users";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLoginSubmit = async (formdata: FormData) => {
    const { email, password } = Object.fromEntries(formdata);
    console.log("🚀 ~ handleRegisterSubmit ~ formdata:", email, password);
    startTransition(async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await loginAccountAction(formdata);
      if (!error) {
        router.replace("/");
        toast.success("Account Created Successfully & You are Logged In", {
          duration: 5000,
        });
      } else {
        toast.error(error, {
          duration: 5000,
        });
      }
    });
  };
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="min-w-9/12 lg:min-w-1/3 h-2/3 bg-secondary rounded-2xl">
          <div className="flex justify-center items-center h-full ">
            <form
              action={handleLoginSubmit}
              className="min-w-9/12 lg:min-w-2/3 flex flex-col gap-5"
            >
              <div className="text-2xl font-bold text-center mb-6">
                Login here!
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  className="my-1"
                  id="email"
                  type="email"
                  placeholder="Email"
                  disabled={isPending}
                  name="email"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  className="my-1"
                  id="password"
                  type="password"
                  placeholder="Password"
                  disabled={isPending}
                  name="password"
                />
              </div>
              <div>
                <Button className="w-full" disabled={isPending}>
                  {isPending ? "..." : "Login"}
                </Button>
                <p className="text-center font-light leading-loose">
                  Not a user? Register{" "}
                  <a className="hover:underline" href="/register">
                    here
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
