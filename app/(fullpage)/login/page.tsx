"use client";
import { useState, useId } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/app/_components/AuthLayout";
import { post_api } from "@/helper/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const id = useId();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      try {
        const {data, message} = await post_api("/auth/login", {
          email,
          password,
        })

        if (data) {
          toast.success("Login successful");
          if(data.projects.length > 0){
            router.push(`/chat/${data.projects[0].id}`);
          }
          else{
            router.push("/project/new");
          }
          // router.push("/dashboard");
        } else {
          toast.error(message);
        }
      } catch {
        toast.warning("Something went wrong");
      }
    } else {
      toast("Please fill in all fields");
    }
  };

  return (
    <AuthLayout
      title="Sign in to ReCode.ai"
      description="Enter your credentials to access your account"
    >
      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`${id}-email`}>Email</Label>
            <Input
              id={`${id}-email`}
              type="email"
              placeholder="hi@yourcompany.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-password`}>Password</Label>
            <Input
              id={`${id}-password`}
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-2">
            <Checkbox id={`${id}-remember`} />
            <Label htmlFor={`${id}-remember`} className="font-normal text-muted-foreground">
              Remember me
            </Label>
          </div>
          <a className="text-sm underline hover:no-underline" href="#">
            Forgot password?
          </a>
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-600/80 text-white">
          Sign in
        </Button>

        <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-base-400 after:h-px after:flex-1 after:bg-base-400">
          <span className="text-xs text-muted-foreground">Or</span>
        </div>

        <Button variant="outline" type="button" className="w-full">
          Login with Google
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
