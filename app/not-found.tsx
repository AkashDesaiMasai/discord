import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex flex-col h-[100%] justify-center items-center'>
        <h1 className='text-9xl'>404</h1>
      <h2>Page Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/channels/@me">Return Home</Link>
    </div>
  )
}