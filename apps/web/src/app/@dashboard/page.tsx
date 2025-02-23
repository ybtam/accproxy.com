import Link from "next/link";
import {LogoutButton} from "@/app/@dashboard/_components/logout-button";

export default function Login() {
  return <>
    <h1>Auth</h1>
    <Link href={'/expenses'}>Expenses</Link>
    <LogoutButton/>
  </>
}
