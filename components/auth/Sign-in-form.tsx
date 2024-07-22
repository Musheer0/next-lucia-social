"use client";
import React, { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  SignUpSchema } from "@/lib/validation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signup } from "@/app/(auth)/sign-up/actions";
import LoadingButton from "../LoadingButton";
import { signin } from "@/app/(auth)/sign-in/actions";

const SignInForm = () => {
  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });
 const [error, setError]= useState<any>(false);
 const [ispending, startTranstions] = useTransition()
  const handleSubmit = async (data:{username:string, password:string}) => {
    // Your submission logic here
    setError(undefined);
    startTranstions(async()=>{
      const {error} = await signin(data);
      if(error) setError(error);
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-2 w-full max-w-[500px] p-2  ">

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
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
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
              {error &&               <p className="w-full bg-destructive/15 text-destructive flex items-center py-2 justify-center rounded-md">Somthing went wrong</p>
       }
        <LoadingButton loading={ispending} type="submit">
          Login
        </LoadingButton>
      </form>
    </Form>
  );
};

export default SignInForm;
