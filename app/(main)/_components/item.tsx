import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash } from 'lucide-react';
import React from 'react'
import{useMutation} from 'convex/react'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useUser } from '@clerk/clerk-react';
interface ItemProps{
    id?: Id<"documents">;
    documentIcon?:string;
    active?:boolean;
    expanded?:boolean;
    isSearch?:boolean;
    level?:number;
    onExpand?:()=>void;
    label:string;
    onClick? :()=>void
    icon:LucideIcon
}

export  const Item= ({
    id,
    active,
    documentIcon,
    isSearch,
    level=0,
    onExpand,
    expanded,
    label,
    onClick,
    icon :Icon
}:ItemProps) => {
    const {user} = useUser()
    const archive = useMutation(api.documents.archived)
    const onArchive =(
        event:React.MouseEvent<HTMLDivElement,MouseEvent>
    )=>{
        event.stopPropagation()
        if(!id) return;
        const promise = archive({id})
            .then(()=>router.push("/documents"))
        toast.promise(promise,{
            loading:"Moving to trash...",
            success:"Note moved to Trash",
            error:"Faild to archive note"
        })
    }
    const ChevronIcon = expanded ? ChevronDown :ChevronRight;
    const router = useRouter()
    const handelExpand = (event:React.MouseEvent<HTMLDivElement,MouseEvent>) =>{
        event.stopPropagation()
        onExpand?.()
    }
    const create = useMutation(api.documents.create)
    const onCreate = (
        event:React.MouseEvent<HTMLDivElement,MouseEvent>
    )=>{
        event.stopPropagation()
        if(!id)return;
        const promise = create({title:"Untitled",parentDocument:id})
        .then ((documentId)=>{
            if(!expanded){
                onExpand?.();
            }
            router.push(`/documents/${documentId}`)
        })
        toast.promise(promise,{
            loading:"Creating a new Note ...",
            success:"New note Created",
            error:"Failed to create a new note."
        })
    }
  return (
    <div
    onClick={onClick}
    role="button"
    style={{
        paddingLeft:level ? `${(level*12) +12}px` : "12px"
    }}
    className={cn(
    'group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium',
    active && "bg-primary/5 text-primary"
    )}
    >
        {!!id && (
            <div 
            role='button'
            className='h-full rounded-sm hover:bg-neutral-300
            dark:bg-neutral-600 mr-1'
            onClick={handelExpand}
            >
                <ChevronIcon 
                className='h-4 w-4 shirnk-0 text-muted-foreground'
                />
            </div>
        )}
        {documentIcon ?(
            <div className='shrink-0 mr-2 text-[18px]'>
                {documentIcon}
            </div>
        ):(
            <Icon className='shirnk-0 h-[18px] mr-2
            text-muted-foreground'/>
        )}

        <span className='truncate'>
        {label}
        </span>
        {
            isSearch && (
                <kbd className='ml-auto pointer-events-none inline-flex h-5
                select-none items-center gap-1 px-1.5 font-mono text-[10px] font-medium 
                text-muted-foreground opacity-100  rounded border bg-muted'>
                    <span className='text-xs'>
                        CTRL
                    </span>K
                </kbd>
            )
        }
        {!!id && (
            <div className='ml-auto flex items-center gap-x-2'>
                <DropdownMenu>
                    <DropdownMenuTrigger 
                    onClick={(e)=>e.stopPropagation()}
                    asChild>
                        <div role='button'
                        className='opacity-0 group-hover:opacity-100 h-full ml-auto 
                        rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600'
                        >
                            <MoreHorizontal className='h-4 w-4 text-muted-foreground'/>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                    className='w-60'
                    align='start'
                    side='right'
                    forceMount
                    >
                        <DropdownMenuItem onClick={onArchive}>
                            <Trash className='h-4 w-4 mr-2 '/>
                            Delete
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className='paddingLeft-10px mb-3 '>
                            <div className='text-xs text-muted-foreground'>
                                Last Edited by:{user?.fullName}
                            </div>
                        </DropdownMenuSeparator>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div
                role='button'
                onClick={onCreate}
                className='opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm 
                hover:bg-netural-300 dark:hover:bg-neutral-600 '
                >
                    <Plus className='h-4 w-4 text-muted-foreground'/>
                </div>
            </div>
        )}
        </div>
  )
}
Item.Skeleton = function ItemSkeleton({level } :{level ?: number}){

return(
    <div
    style={{
        paddingLeft : level ? `${(level *12)  + 25}px` :"12px"
    }}
    className='flex gap-x-2 py-[3px]'
    >
         <Skeleton className='h-4 w-4 '/>
         <Skeleton className='h-4 w-[30%] '/>
    </div>
)
}