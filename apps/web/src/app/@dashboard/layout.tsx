import {ReactNode} from "react";
import {SidebarProvider, SidebarTrigger} from "@repo/ui";
import {AppSidebar} from "@/app/@dashboard/_components/sidebar/app-sidebar";

export default function Layout({children}: {children: ReactNode}) {
  return <SidebarProvider>
    <AppSidebar/>
    <div className={'p-4 w-full'}>
      <SidebarTrigger/>
      {children}
    </div>
  </SidebarProvider>
}
