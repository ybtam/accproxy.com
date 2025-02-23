'use client'

import {logout} from "@/app/actions";
import {Button} from "@repo/ui";

export const LogoutButton = () => {
  return <Button onClick={() => logout()}>Logout</Button>
}
