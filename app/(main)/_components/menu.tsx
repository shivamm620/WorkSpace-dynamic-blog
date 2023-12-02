"use client"

import { Id } from "@/convex/_generated/dataModel";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
interface menuProps{
    documentId : Id<"documents">
}
const Menu = ({
    documentId
}:menuProps) => {
    const router = useRouter()
    const {user} = useUser()
    const archive = useMutation(api.documents.archived)
    const onArchive = () =>{
        const promise = archive({id:documentId})
        toast.promise (promise,{
            loading:"Moving to trash",
            success:"Note moved to trash",
            error:"Failed to archive note"
        })
        router.push("/documents")
    }
    return ( 
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
            className="w-60"
            align="end"
            alignOffset={8}
            forceMount
            >
                <DropdownMenuItem onClick={onArchive}>
                    <Trash className="h-4 w-4 mr-2"/>
                    <div>
                        Delete
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="mb-4">
                    <div className="pt-1 pl-3 text-xs text-muted-foreground">
                        Last edited by : {user?.fullName}
                    </div>
                </DropdownMenuSeparator>
            </DropdownMenuContent>
        </DropdownMenu>
     );
}
 
export default Menu;