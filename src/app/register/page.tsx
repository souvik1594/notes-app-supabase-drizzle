"use client";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createAccountAction } from "@/actions/users";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function RegisterPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRegisterSubmit = async (formdata: FormData) => {
    console.log("🚀 ~ handleRegisterSubmit ~ formdata:", formdata);
    startTransition(async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await createAccountAction(formdata);
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
              id="myForm"
              action={handleRegisterSubmit}
              className="min-w-9/12 lg:min-w-2/3 flex flex-col gap-5"
            >
              <div className="text-2xl font-bold text-center mb-6">
                Register here!
              </div>
              <div>
                <Label htmlFor="Name">Full Name</Label>
                <Input
                  className="my-1"
                  name="fullname"
                  id="fullname"
                  type="text"
                  placeholder="Enter Full Name"
                  disabled={isPending}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  className="my-1"
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email"
                  disabled={isPending}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  className="my-1"
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  disabled={isPending}
                />
              </div>
              <div>
                <Label htmlFor="repassword">Re-enter Password</Label>
                <Input
                  className="my-1"
                  id="repassword"
                  name="repassword"
                  type="password"
                  placeholder="Re-enter Password"
                  disabled={isPending}
                />
              </div>
              <div>
                <Button className="w-full" disabled={isPending}>
                  {isPending ? "Registering..." : "Register"}
                </Button>
                <p className="text-center font-light leading-loose">
                  Already a user? Login{" "}
                  <a className="hover:underline" href="/login">
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
}

export default RegisterPage;
