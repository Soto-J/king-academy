"use client";

import { useState } from "react";
import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { CircleDot, OctagonAlertIcon } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

import { AuthHeader } from "@/modules/auth/ui/components/auth-header";
import { AuthBrandPannel } from "@/modules/auth/ui/components/auth-brand-pannel";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth/auth-client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const SignInView = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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

    authClient.signIn.email(
      { ...values, callbackURL: "/" },
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
    <>
      <Card className="bg-card/50 overflow-hidden border-0 p-0 shadow-2xl backdrop-blur-sm">
        <CardContent className="grid md:grid-cols-2 md:p-0">
          <div className="mx-auto flex w-full max-w-sm flex-col gap-8 p-6">
            <AuthHeader
              title="Welcome Back"
              description="Access your King Academy dashboard"
            />

            <form
              className="space-y-4 px-6 text-center"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FieldSet>
                <FieldGroup>
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel
                          htmlFor="email"
                          className="text-foreground text-sm font-semibold"
                        >
                          Email Address
                        </FieldLabel>

                        <Input
                          {...field}
                          id="email"
                          type="email"
                          placeholder="coach@kingacademy.com"
                          data-lpignore="true"
                          aria-invalid={fieldState.invalid}
                          className="focus:border-primary -mb-4 h-12 rounded-lg border-2 text-base transition-all duration-300"
                        />

                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="text-start text-xs"
                          />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel
                          htmlFor="password"
                          className="text-foreground text-sm font-semibold"
                        >
                          Password
                        </FieldLabel>

                        <Input
                          {...field}
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          aria-invalid={fieldState.invalid}
                          className="focus:border-primary -mb-4 h-12 rounded-lg border-2 text-base transition-all duration-300"
                        />

                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="text-start text-sm"
                          />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </FieldSet>

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
                className="mt-8 h-12 w-full rounded-lg text-base font-semibold transition-all duration-300 hover:shadow-lg"
              >
                {isPending ? "Signing in..." : "Sign In"}
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
            </form>
          </div>

          <AuthBrandPannel />
        </CardContent>
      </Card>

      <div className="text-muted-foreground mt-6 text-center text-sm">
        By signing in you agree to our{" "}
        <Link
          href="/"
          className="text-primary hover:text-brand-red font-medium underline-offset-4 transition-colors hover:underline"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/"
          className="text-primary hover:text-brand-red font-medium underline-offset-4 transition-colors hover:underline"
        >
          Privacy Policy
        </Link>
      </div>
    </>
  );
};
