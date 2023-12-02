"use client"
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {useQuery,useMutation} from "convex/react"
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { toast } from 'sonner'
import { Spinner } from '@/components/spiner'
import { Search, Trash, Undo } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ConfirmModal } from '@/components/modals/confirm-modal'

function TrashBox() {
    const router = useRouter()
    const paramas = useParams()
    const document = useQuery(api.documents.getTrash)
    const restore = useMutation(api.documents.resotre);
    const remove = useMutation(api.documents.remove)
    const [search ,setSearch] = useState("")
    const filterDocuments = document?.filter((document)=>{
        return document.title.toLowerCase().includes(search.toLowerCase())
    })
    const onClick = (documentId:string)=>{
        router.push(`/documents/${documentId}`)
    }
    const onRestore = (  event:React.MouseEvent<HTMLDivElement,MouseEvent>,
        documentId: Id<"documents">
        )=>{
            event.stopPropagation()
            const promise = restore({id:documentId})
            toast.promise(promise,{
                loading:"Restoring note..",
                success:"Note resotored",
                error:"Failed to restore"
            })
        }
        const onRemove = ( 
            documentId: Id<"documents">
            )=>{
                const promise = remove({id:documentId})
                toast.promise(promise,{
                    loading:"deleting note..",
                    success:"Note Deleted",
                    error:"Failed to delet note"
                });
                if(paramas.documentId === documentId){
                    router.push("/documents")
                }
            }

            if (document === undefined){
                return(
                    <div className='h-full flex items-center justify-center p-4'>
                        <Spinner size="lg"/>       
                    </div>
                )
            }
    return (
    <div className='text-sm'>
        <div className="flex items-center gap-x-1 p-2">
        <Search/>
        <Input
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        placeholder='filter by page title'
        className='h-7 px-2 focus-visible:ring-transparent bg-secondary'
        />
        </div> 
      <div className='mt-2 px-1 pb-1'>
        <p className='hidden last:block text-xs text-center 
        text-muted-foreground'>
            No Documents found
        </p>
        {
            filterDocuments?.map((document)=>(
                <div 
                key={document._id}
                role='button'
                onClick={()=>onClick(document._id)}
                className='text-sm rounded-sm w-full hover:bg-primary/5 flex
                item-center text-primary justify-between'
                >
                    <span className='truncate pl-2'>
                        {document.title}
                    </span>
                    <div className='flex items-center'>
                        <div 
                        onClick={(e)=>onRestore(e,document._id)}
                        className='rounded-sm p-2 hover:bg-neutral-200'>
                            <Undo className='h-4 w-4 text-muted-foreground'/>
                        </div>
                        <ConfirmModal onConfirm={()=>onRemove(document._id)}>
                        <div 
                        onClick={(e)=>{}}
                        className="rounded-sm p-2 hover:bg-netural-200"
                        role='button'

                        >
                        <Trash
                        className='h-4 w-4 text-muted-foreground'
                        />
                        </div>
                        </ConfirmModal>
                    </div>
                </div>
            ))
        }
        </div>  
    </div>
  )
}

export default TrashBox