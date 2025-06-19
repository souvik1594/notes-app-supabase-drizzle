"use client";
import { logoutAccountAction } from "@/actions/users";
import React from "react";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";

const Logout = () => {
  return (
    <div
      className="cursor-pointer hover:underline"
      onClick={async () => {
        const { error } = await logoutAccountAction();
        if (error) {
          toast.error(error, {
            duration: 5000,
          });
        } else {
          redirect("/login");
        }
      }}
    >
      Logout
    </div>
  );
};

export default Logout;
