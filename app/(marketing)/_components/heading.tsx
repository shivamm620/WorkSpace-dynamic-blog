"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const Heading =() =>{

    return(
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Your Ideas ,Documents,Plans Unified. Welcome to<span className="underline">
                  WorkSpace
                </span>
            </h1>
            <h3 className="text-base sm:text md:text-2xl font-medium">
                WorkSpace is the conneted workspace where <br/>
                better,faster work done
            </h3>
            <Button>
            <Link href='/documents'>
            WorkSpace <ArrowRight className="h-4 w-4 ml-1"/>
            </Link>
                
            </Button>
        </div>
    )
}