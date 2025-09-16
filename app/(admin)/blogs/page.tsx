"use client";

import React, { useEffect, useState } from 'react';
import { ApiServices } from '@/lib/api-services';
import { BlogModel } from '@/lib/models';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const BlogsPage = () => {
  const {data:session} = useSession();
  const [ blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async() => {
      if(!session?.accessToken) return;

      const resp = await ApiServices.get("management/blogs/", session?.accessToken);
      console.log(resp);
      setBlogs(resp);
    }
    fetchBlogs();
  }, [session]);

  return (
    <section>

      {blogs.length > 0 ? (
        <div className="grid md:grid-cols-4 grid-cols-1 gap-5 pt-5">
          {blogs.map((blog: BlogModel) => (
            <div className='shadow-sm p-3' key={blog.id}>
              <div>
                <div className='relative h-[180px] w-full'>
                  <Image src={`http://127.0.0.1:8000${blog.image}`} alt={blog.title} fill className="object-cover absolute" />
                </div>
                <h1 className='pt-2'>{blog.title}</h1>
                <p className='text-slate-500 line-clamp-3 text-sm'>{blog.exerpt}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">No blogs yet.</div>
      )}
    </section>
  )
}

export default BlogsPage