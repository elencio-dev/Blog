"use client"

import { Databases, Query } from 'appwrite';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PageParams, blogProps, multiFormatDateString } from '@/app/util/types';
import { client } from '@/app/api/config';



export default function Page({ params }: { params: PageParams }) {

  const { slug } = params;
  const [blogPost, setBlogPost] = useState<blogProps>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const databases = new Databases(client);

        const response = await databases.listDocuments(
          '65e1c83ada968e659b1f',
          '65e1c8474104439f9729',
          [Query.equal('slug', slug)]
        );

        console.log(response);

        if (response.documents.length > 0) {
          // @ts-ignore
          setBlogPost(response.documents[0]);
        } else {
          console.log('Post not found');
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {blogPost && (
        < div className='space-y-2'>
          <h2 className='text-2xl font-bold mb-4'>{blogPost.titulo}</h2>
          <h2 className='text-xl'>Atualizado em {multiFormatDateString(blogPost.$updatedAt)}</h2>
          <Image
            src={blogPost.image}
            alt="Descricao"
            width={400}
            quality={100}
            height={100}
            className='rounded'
          />

          <div className='mt-4'>
            <span className='text-gray-500'>{blogPost.metadisc}</span>       
            <div dangerouslySetInnerHTML={{__html: blogPost.Conteudo}} className='prose mt-8 prose-slate max-w-full'/>
          </div>
        </div>
      )}
    </div>
  );
}
