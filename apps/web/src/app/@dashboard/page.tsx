import Link from "next/link";

export default function Login() {
  return <div>
    <h1>Auth</h1>
    <Link href={'/expenses'}>Expenses</Link>
  </div>
}
