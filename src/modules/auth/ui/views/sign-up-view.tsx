"use client";

import { useState } from "react";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CircleDot, Crown, OctagonAlertIcon } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/auth-client";

import { AuthBrandPannel } from "../components/auth-brand-pannel";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name required." }),
  lastName: z.string().min(1, { message: "Last name required." }),
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const SignUpView = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onGoogleSubmit = () => {
    setIsPending(true);
    setError(null);

    authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setIsPending(false);
          setError(null);
        },

        onError: ({ error }) => {
          setIsPending(false);
          setError(error.message);
        },
      },
    );
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsPending(true);
    setError(null);

    const { firstName, lastName } = values;

    authClient.signUp.email(
      {
        ...values,
        name: `${firstName} ${lastName}`,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setIsPending(false);
          setError(null);
        },

        onError: ({ error }) => {
          setError(error.message);
          setIsPending(false);
        },
      },
    );
  };

  return (
    <div className="">
      <Card className="bg-card/50 overflow-hidden border-0 p-0 shadow-2xl backdrop-blur-sm">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col justify-center py-8 md:p-12"
            >
              <div className="mx-auto flex w-full max-w-sm flex-col gap-8">
                <div className="space-y-4 text-center">
                  <Crown className="text-primary mx-auto h-8 w-8" />

                  <h1 className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
                    Let&apos;s get started
                  </h1>

                  <p className="text-muted-foreground text-lg">
                    Create your King Academy account
                  </p>
                </div>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground text-sm font-semibold">
                          First Name
                        </FormLabel>

                        <FormControl>
                          <Input
                            type="text"
                            placeholder="John"
                            data-lpignore="true"
                            className="focus:border-primary h-12 rounded-lg border-2 text-base transition-all duration-300"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="text-brand-red" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground text-sm font-semibold">
                          Last Name
                        </FormLabel>

                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Doe"
                            data-lpignore="true"
                            className="focus:border-primary h-12 rounded-lg border-2 text-base transition-all duration-300"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="text-brand-red" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground text-sm font-semibold">
                          Email Address
                        </FormLabel>

                        <FormControl>
                          <Input
                            type="email"
                            placeholder="coach@kingacademy.com"
                            data-lpignore="true"
                            className="focus:border-primary h-12 rounded-lg border-2 text-base transition-all duration-300"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="text-brand-red" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground text-sm font-semibold">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="focus:border-primary h-12 rounded-lg border-2 text-base transition-all duration-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-brand-red" />
                      </FormItem>
                    )}
                  />

                  {!!error && (
                    <Alert className="bg-brand-red/10 border-brand-red/30 rounded-lg">
                      <OctagonAlertIcon className="text-brand-red h-4 w-4" />
                      <AlertTitle className="text-brand-red font-semibold">
                        {error}
                      </AlertTitle>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    variant="cta"
                    disabled={isPending}
                    className="h-12 w-full rounded-lg text-base font-semibold transition-all duration-300 hover:shadow-lg"
                  >
                    {isPending ? "Signing up..." : "Sign Up"}
                    <CircleDot className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="border-muted-foreground/20 w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-card text-muted-foreground px-4 font-medium">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => onGoogleSubmit()}
                    disabled={isPending}
                    variant="outline"
                    type="button"
                    className="hover:border-primary h-12 w-full rounded-lg border-2 transition-all duration-300"
                  >
                    <FaGoogle className="h-4 w-4" />
                    <span className="ml-2">Continue with Google</span>
                  </Button>

                  <div className="text-muted-foreground text-center text-sm">
                    New to King Academy?{" "}
                    <Link
                      href="/sign-up"
                      className="text-primary hover:text-brand-red font-semibold underline-offset-4 transition-colors duration-300 hover:underline"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </Form>

          <AuthBrandPannel />
        </CardContent>
      </Card>

      <div className="text-muted-foreground mt-6 text-center text-sm">
        By signing in you agree to our{" "}
        <Link
          href="/terms"
          className="text-primary hover:text-brand-red font-medium underline-offset-4 transition-colors hover:underline"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="text-primary hover:text-brand-red font-medium underline-offset-4 transition-colors hover:underline"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};
