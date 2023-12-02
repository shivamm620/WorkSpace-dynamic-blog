import { useState,useEffect } from "react";

export const useScrollTop = (threshlod=10) =>{
    const [scrolled , setScrolled] = useState(false)
    useEffect(()=>{
        const handleScroll =() =>{
            if(window.scrollY>threshlod){
                setScrolled(true)
            }else{
                setScrolled(false)
            }
        }
        window.addEventListener('scroll',handleScroll);
        return()=>window.removeEventListener('scroll',handleScroll)
    },[threshlod])
    return scrolled
}