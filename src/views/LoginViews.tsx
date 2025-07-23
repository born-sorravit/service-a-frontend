"use client";
import { AuthServices } from "@/app/api/auth.api";
import { CustomDialog } from "@/components/common/CustomDialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IResponse } from "@/interfaces/response.interface";
import { IUserInfo } from "@/interfaces/user.interface";
import { loginSchema } from "@/schema/login.schema";
import { useUserStore } from "@/stores/user/user.modal";
import { encryptPassword } from "@/utils/hashPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

function LoginViews() {
  const router = useRouter();
  const { setUser } = useUserStore();
  const [open, setOpen] = React.useState(false);
  const [titleDialog, setTitleDialog] = React.useState("");
  const [descriptionDialog, setDescriptionDialog] = React.useState("");
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const username = values.username;
      const password = values.password;
      const passwordSecret = process.env.NEXT_PUBLIC_SECRET || "";

      const encryptedPassword = await encryptPassword(
        password,
        passwordSecret,
        username
      );

      const response = (await AuthServices.login(
        username,
        encryptedPassword
      )) as IResponse<unknown>;

      if (response.data) {
        router.push("/home");
        setUser(response.data as IUserInfo);
        form.reset();
        form.clearErrors();
      } else {
        // Handle registration error
        setOpen(true);
        setTitleDialog("Login Failed ❌");
        setDescriptionDialog("Something went wrong. Please try again.");
      }
    } catch (error) {
      // Handle registration error
      console.error("Login error:", error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        <div className="space-y-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
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
              <Button className="w-full">Sign In</Button>
            </form>
          </Form>
          <Button
            className="w-full"
            variant="ghost"
            onClick={() => router.push("/register")}
          >
            Sign Up
          </Button>
        </div>
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

export default LoginViews;
