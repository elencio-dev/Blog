"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { blogProps } from "./util/types";
import { databases } from "./api/config";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";



export default function Home() {

  const [blogPost, setBlogPost] = useState<blogProps[]>()

  useEffect(() => {

    let promise = databases.listDocuments(
      "65e1c83ada968e659b1f",
      "65e1c8474104439f9729",
    );

    promise.then(function (response) {
      console.log(response);
      // @ts-ignore
      setBlogPost(response.documents);
    }, function (error) {
      console.log(error);
    });
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">



        <h1 className="text-3xl font-extrabold">Kutiwa</h1>
      {/* <div className="text-center mt-6">
        <h2 className="text-3xl text-extrabold">Kutiwa</h2>
        <div className="flex justify-center mt-2">
          <span className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">React</span>
          <span className="bg-green-500 text-white px-2 py-1 rounded-md mr-2">Node.js</span>
          <span className="bg-indigo-500 text-white px-2 py-1 rounded-md mr-2">Tailwind CSS</span>
        </div>
      </div> */}



      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
        {blogPost &&
          blogPost.map((post) => (
            <Card key={post.id} className="border-none ">
              <CardHeader>
                <Image
                  src={post.image}
                  alt="Descricao"
                  width={400}
                  quality={100}
                  height={100}
                  className="rounded"
                />
                <CardTitle className="text-base">{post.titulo}</CardTitle>
                <CardDescription>
                  {post.metadisc.length > 45
                    ? `${post.metadisc.slice(0, 45)}...`
                    : post.metadisc
                  }
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href={`/blog/${post.slug}`}>
                  <Button>
                    Ler mais
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        }
      </div>
    </main>
  );
}
