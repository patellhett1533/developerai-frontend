"use client";

import { useState, useId } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/app/_components/AuthLayout";
import { post_api } from "@/helper/api";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const id = useId();
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && name) {
      const { data, message } = await post_api("/auth/register", {
        name,
        email,
        password,
      });

      if (!data) {
        toast.error(message);
      } else {
        toast.success("Check your inbox for verification email");
        router.push("/login");
      }
    } else {
      toast("Please fill in all fields");
    }
  };

  return (
    <AuthLayout
      title="Sign up to ReCode.ai"
      description="We just need a few details to get you started."
    >
      <form onSubmit={handleSignup} className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`${id}-name`}>Full name</Label>
            <Input
              id={`${id}-name`}
              placeholder="Matt Welsh"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-email`}>Email</Label>
            <Input
              id={`${id}-email`}
              placeholder="hi@yourcompany.com"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-password`}>Password</Label>
            <Input
              id={`${id}-password`}
              placeholder="Enter your password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-600/80 text-white"
        >
          Sign up
        </Button>

        <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
          <span className="text-xs text-muted-foreground">Or</span>
        </div>

        <Button variant="outline" type="button" className="w-full">
          Continue with Google
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-4">
          By signing up you agree to our{" "}
          <a className="underline hover:no-underline" href="#">
            Terms
          </a>
          .
        </p>
      </form>
    </AuthLayout>
  );
};

export default SignupPage;
