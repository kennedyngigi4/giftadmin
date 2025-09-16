"use client";

import React from 'react';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { userLogin } from '@/lib/auth-services';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


const loginSchema = z.object({
    email: z.string().min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters."),
})

const LoginPage = () => {
    const router = useRouter();
    const form = useForm<z.infer <typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const { isValid, isSubmitting } = form.formState;

    const onSubmit = async(values: z.infer<typeof loginSchema>) => {
        const res = await userLogin(values.email, values.password);
        if (res.success) {
            toast.success(res.message, { position: 'top-center' });
            // window.location.href = "/"
            router.push("/");
            // router.refresh();
        } else {
            toast.error("Email or Password is invalid", { position: 'top-center' });
        }
    }

    return (
        <div className='flex h-screen w-full justify-center items-center'>
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your email below to login
                </CardDescription>
                <CardAction>
                    <Button variant="link">Sign Up</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
                        <div>
                            <FormField 
                                name="email"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="email"
                                                placeholder="e.g. johndoe@email.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="**********"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <Button className='w-full cursor-pointer'>Log In</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
        </div>
    );
}

export default LoginPage