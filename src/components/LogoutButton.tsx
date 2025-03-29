"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
        return console.log("ok")
    } catch (error) {
      console.log("something went wrong");
    }
    return (
      <Button className="w-24" variant={"outline"} onClick={handleLogout}>
        {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
      </Button>
    );
  };
}

export default LogoutButton;
