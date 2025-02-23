'use server'

import {signOut} from "@repo/sdk/auth";

export const logout = async () => {
  await signOut({
    redirectTo: '/',
  })
}
