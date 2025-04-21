"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.getItem("latest_project")) {
      router.push(`/chat/${sessionStorage.getItem("latest_project")}`);
    } else {
      router.push("/project/new");
    }
  }, []);
  return <></>;
};

export default Page;
