"use client"

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface bannnerProps{
    documentId:Id<"documents">
}

const Banner = ({
    documentId
}:bannnerProps) => {
    const router = useRouter()
    const remove = useMutation(api.documents.remove)
    const restore = useMutation(api.documents.resotre)
    const onRemove = () =>{
        const promise = remove({id:documentId})
        toast.promise(promise,{
            loading:"deleting note..",
            success:"Note Deleted",
            error:"Failed to delet note"
        })
        router.push("/documents")
        ;
    }
    const onRestore = () =>{
        const promise = restore({id:documentId})
        toast.promise(promise,{
            loading:"restoring note..",
            success:"Note restored",
            error:"Failed to restored note"
        });
    }
    return ( 
        <div className="w-full bg-rose-500 text-center text-sm p-2
        text-white flex itmes-center gap-x-2 justify-center">
            <p>
                This page is in Trash
            </p>
            <Button 
            size='sm'
            onClick={onRestore}
            variant='outline'
            className="border-white p-1 px-2 h-auto font-normal hover:text-white bg-transparent hover:bg-primary/5 text-white"
            >
                Restore page
            </Button>
            <ConfirmModal onConfirm={onRemove}>
            <Button 
            size='sm'
            variant='outline'
            className="border-white p-1 px-2 h-auto font-normal hover:text-white bg-transparent hover:bg-primary/5 text-white"
            >
                Delete page
            </Button>
            </ConfirmModal>
        </div>
     );
}
 
export default Banner ;