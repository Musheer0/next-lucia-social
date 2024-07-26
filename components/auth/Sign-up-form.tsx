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
import Link from "next/link";

const SignUpForm = () => {
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
  const handleSubmit = async (data:{username:string, email:string, password:string}) => {
    // Your submission logic here
    setError(undefined);
    startTranstions(async()=>{
      const {error} = await signup(data);
      if(error) setError(error);
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col rounded-md gap-2 w-full max-w-[500px]  ">
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
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
       {error &&               <p className="w-full bg-destructive/15 text-destructive flex items-center py-2 justify-center rounded-md">{error}</p>
       }
        <LoadingButton disabled={ispending} loading={ispending} type="submit">
          Login
        </LoadingButton>
        <Link href={'/sign-in'} className="text-blue-600">Already have an account?<span className="underline">Login?</span></Link>
      </form>
    </Form>
  );
};

export default SignUpForm;
