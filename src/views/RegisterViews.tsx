"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { encryptPassword } from "@/utils/hashPassword";
import { AuthServices } from "@/app/api/auth.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { registerSchema } from "@/schema/register.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CustomDialog } from "@/components/common/CustomDialog";

function RegisterViews() {
  const [open, setOpen] = React.useState(false);
  const [titleDialog, setTitleDialog] = React.useState("");
  const [descriptionDialog, setDescriptionDialog] = React.useState("");
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      setOpen(true);
      const name = values.name;
      const email = values.email;
      const username = values.username;
      const password = values.password;

      const encryptedPassword = await encryptPassword(password, name, email);
      const registerDto = {
        name,
        email,
        username,
        password: encryptedPassword,
      };

      const response = await AuthServices.register(registerDto);
      console.log(response);

      if (response) {
        // Handle successful registration
        setTitleDialog("Registration Successful");
        setDescriptionDialog(
          "Thank you for registering! You can now log in to your account."
        );
        form.reset();
        form.clearErrors();
      }
    } catch (error) {
      // Handle registration error
      console.error("Registration error:", error);
    } finally {
      setTitleDialog("Registration Failed");
      setDescriptionDialog("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-semibold text-center">Register</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Choose a username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Create a password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <CustomDialog
        open={open}
        setOpen={setOpen}
        title={titleDialog}
        description={descriptionDialog}
      />
    </div>
  );
}

export default RegisterViews;
