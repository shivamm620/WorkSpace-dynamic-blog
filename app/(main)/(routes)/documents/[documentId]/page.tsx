"use client"

import Cover from "@/components/cover";
import Toolbar from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import dynamic from 'next/dynamic'
import React, { useMemo } from 'react'
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
interface documentIdProps {
    params:{documentId : Id<"documents">}
}
const DocumentId = ({params}:
    documentIdProps) => {
         const Editor = useMemo(() => dynamic(() => import("@/components/editor"), { ssr: false }) ,[]);
        const update = useMutation(api.documents.update)
        const document = useQuery(api.documents.getById,{
            documentId:params.documentId
        })
    if(document === undefined){
        return(
            <div>
                loading ...
            </div>
        )
    }
    if(document === null){
        return(
            <div>
                not found
            </div>
        )
    }
    
    const onChange = (content:string)=>{
        update({
            id:params.documentId,
            content
        })
    }
    return ( 
        <div className="pb-40">
            <Cover url={document.coverImage}/>
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar initialData={document}/>
                <Editor
                onChange={onChange}
                initialContent={document.content}
                />
            </div>
        </div>
     );
}
 
export default DocumentId;