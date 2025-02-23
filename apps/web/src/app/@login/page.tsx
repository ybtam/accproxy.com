import {signIn} from "@repo/sdk/auth";
import {Button, Input} from "@repo/ui";

export default function Login() {
  const handleSubmit = async (formData: FormData) => {
    'use server'

    await signIn('credentials', {
      redirectTo: '/',
      ...Object.fromEntries(formData.entries()),
    })
  }

  return <div className={'flex flex-col items-center justify-center gap-4'}>
    <h1 className={'text-3xl'}>Login</h1>
    <form action={handleSubmit} className={'flex flex-col gap-4'}>
      <Input type="email" name="email" placeholder={'Email'}/>
      <Input type="password" name="password" placeholder={'Password'}/>
      <Button type="submit">Login</Button>
    </form>
  </div>
}
