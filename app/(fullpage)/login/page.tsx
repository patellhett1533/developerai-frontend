"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AuthLayout from "@/app/_components/AuthLayout";
import { post_api } from "@/helper/api";
import { Loader } from "lucide-react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (email && password) {
      try {
        const { data, message } = await post_api("/auth/login", {
          email,
          password,
        });

        if (data) {
          toast.success(message);
          router.push("/dashboard");
        } else {
          toast.error(message);
        }
      } catch {
        toast.warning("Something went wrong");
      }
    } else {
      toast("Please fill in all fields");
    }
    setIsLoading(false);
  };

  return (
    <AuthLayout
      title="Welcome back to Recode.ai"
      description="Enter your credentials to access your account"
    >
      <form
        onSubmit={handleLogin}
        className="space-y-5 w-full max-w-sm mx-auto"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="hi@yourcompany.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
        </div>

        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={() => setRememberMe(!rememberMe)}
            />
            <Label
              htmlFor="remember"
              className="font-normal text-muted-foreground"
            >
              Remember me
            </Label>
          </div>
          <a className="text-sm underline hover:no-underline" href="#">
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-700/60 hover:bg-blue-700/80"
        >
          {isLoading ? (
            <>
              <Loader className="animate-spin" />
            </>
          ) : (
            <>Sign In</>
          )}
        </Button>

        <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
          <span className="text-xs text-muted-foreground">Or</span>
        </div>

        <Button variant="outline" className="w-full">
          Continue with Google
        </Button>

        <p className="text-center text-sm text-base-600">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Page;
