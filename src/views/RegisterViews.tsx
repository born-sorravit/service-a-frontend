import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { encryptPassword } from "@/utils/hashPassword";
import { AuthServices } from "@/app/api/auth.api";

function RegisterViews() {
  const handleRegister = async () => {
    try {
      const encryptedPassword = await encryptPassword("", "", "");

      const registerDto = {
        name: "",
        email: "",
        username: "",
        password: encryptedPassword,
      };

      const response = await AuthServices.register(registerDto);

      if (response) {
        // Handle successful registration
      }
    } catch (error) {
      // Handle registration error
      console.error("Registration error:", error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-semibold text-center">Register</h1>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              id="fullname"
              type="text"
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label>Username</Label>
            <Input id="username" type="text" placeholder="Choose a username" />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
            />
          </div>
          <Button className="w-full">Create Account</Button>
        </div>
      </div>
    </div>
  );
}

export default RegisterViews;
