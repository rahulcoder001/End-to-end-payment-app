"use client"
import "../app/globals.css"

import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title, icon}: { href: string; title: string; icon: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const select = pathname === href;
    return <div className="flex items-center">
        <button  className="flex" onClick={()=>{router.push(href)}}>
           <div className="px-2">
             {icon}
           </div>
           <div className={`${select?`text-purple-600`:`text-black mt-2`} font-medium`}>
              {title}
           </div>
        </button>
    </div>
}