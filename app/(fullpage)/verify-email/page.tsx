"use client";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { post_api } from "@/helper/api";
import verifyanimate from "@/public/icons/verify.gif";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const verifyEmail = async () => {
    const { data, message } = await post_api("/auth/verify-email", {
      token,
    });

    if (data) {
      toast.success(message);
      if (data.projects.length > 0) {
        sessionStorage.setItem("latest_project", data.projects[0].id);
        router.push(`/chat/${data.projects[0].id}`);
      }
      router.push("/project/new");
    } else {
      toast.error(message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      verifyEmail();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-50 p-4">
      <Card className="w-full max-w-sm">
        <CardContent className="mb-10">
          <Image
            src={verifyanimate}
            width={150}
            height={150}
            alt="verify animation"
            className="mx-auto"
          />
          <h1 className="text-xl font-bold text-center">Congratulations!</h1>
          <p className="text-lg text-center">You&apos;re not a robot.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
