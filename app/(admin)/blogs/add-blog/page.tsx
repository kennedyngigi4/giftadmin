"use client";

import React, { useEffect, useState } from 'react';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import { Textarea } from '@/components/ui/textarea';
import RichTextEditor from '@/components/ui/rich-text-editor';
import { ApiServices } from '@/lib/api-services';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const blogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  category: z.string().min(1, "Category is required."),
  exerpt: z.string().min(5, "Exerpt should be at least 5 characters."),
  content: z.string().min(30, "Content should be at least 30 characters."),
});

const AddBlog = () => {

  const {data:session} = useSession();
  const router = useRouter();
  const [ blogImage, setBlogImage] = useState<any>({});
  const [categories, setCategories] = useState<string[]>([]);


  useEffect(() => {
    const fetchCategories = async() => {
      if(!session?.accessToken) return;
      const resp = await ApiServices.get("management/blog-categories/", session?.accessToken);
      setCategories(resp);
    }
    fetchCategories();
  }, [session]);

  const form = useForm<z.infer <typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      category: "",
      exerpt: "",
      content: "",
    }
  });
  const { isValid, isSubmitting } = form.formState;


  const handleImageChange = async(e: any) => {
    const file = e.target.files[0];
    setBlogImage(file);
  }

  const onSubmit = async(values: z.infer<typeof blogSchema>) => {

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("exerpt", values.exerpt);
    formData.append("category", values.category);
    formData.append("image", blogImage);
    formData.append("content", values.content);

    if(!session?.accessToken) return;

    const resp = await ApiServices.post("management/blogs/", session?.accessToken, formData);
    if(resp.success){
      toast.success(resp.message);
      router.push("/blogs");
    } else {
      toast.error("Something went wrong.");
    }
  }

  return (
    <section className='w-[70%] mx-auto'>
      <h1 className='text-2xl font-semibold pt-5'>Write a blog</h1>
      <div className='py-8 flex flex-col'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <FormField 
                name="title"
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Blog Title</FormLabel>
                    <FormControl>
                      <Input 
                        type="text" 
                        placeholder="e.g. Simple ways to reduce cost of owning a car in Kenya"
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
                name="exerpt"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exerpt</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder='Enter exerpt here ...'></Textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              <div>
                <FormField
                  name="category"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Category</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder="Choose category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((item:any) => (
                              <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormItem>
                  <FormLabel>Blog Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => handleImageChange(e)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            </div>

            <div>
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Content</FormLabel>
                    <FormControl>
                     <RichTextEditor {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <Button type="submit" disabled={!isValid || isSubmitting} className="cursor-pointer">Publish</Button>
            </div>

          </form>
        </Form>
      </div>
    </section>
  )
}

export default AddBlog