"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { databases } from "@/app/api/config"
import { ID } from "appwrite"
import { toast } from "@/components/ui/use-toast"


const formSchema = z.object({
    titulo: z.string().min(2).max(50),
    Conteudo: z.string(),
    metadisc: z.string(),
    slug: z.string().min(2).max(100),
    image: z.string()
})

//@ts-ignore
export default function CreatBlog({ acccount }: { account: unknown}) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            titulo: "",
            Conteudo: "",
            metadisc: "",
            slug: "",
            image: ""
        },
    })



    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await databases.createDocument(
                '65e1c83ada968e659b1f', 
                '65e1c8474104439f9729',
                ID.unique(),
                {
                    titulo: values.titulo,
                    image: values.image,
                    Conteudo: values.Conteudo,
                    metadisc: values.metadisc,
                    slug: values.slug.trim(),
                    authorname: acccount.name,
                    authoremail: acccount.email, 
                }
            );
    
            console.log("Blog post created successfully:", response);
            toast({
                title: "Publicacao gerada com sucesso!!!",
              })
            form.reset();
        } catch (error) {
            //@ts-ignore    
            console.error("Error creating blog post:", error.message);
        }
    }
    
    



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="titulo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Titulo</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Imagem (Link)</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="metadisc"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descricao</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Slug (com hifen)</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="Conteudo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Conteudo</FormLabel>
                            <FormControl>
                                <ReactQuill theme="snow" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}