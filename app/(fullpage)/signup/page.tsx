"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AuthLayout from "@/app/_components/AuthLayout";
import { post_api } from "@/helper/api";
import { Loader } from "lucide-react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (email && password && name) {
      try {
        const { data, message } = await post_api("/auth/register", {
          email,
          password,
          name,
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
      title="Create an account"
      description="Enter your details to get started"
    >
      <form
        onSubmit={handleSignup}
        className="space-y-5 w-full max-w-sm mx-auto"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
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
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
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
            <>Sign Up</>
          )}
        </Button>

        <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
          <span className="text-xs text-muted-foreground">Or</span>
        </div>

        <Button variant="outline" className="w-full">
          Continue with Google
        </Button>

        <p className="text-center text-sm text-base-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Page;
