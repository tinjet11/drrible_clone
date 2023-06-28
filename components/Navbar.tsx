import React from 'react'
import AuthProviders from './AuthProviders';
import Link from 'next/link';
import Image from "next/image";
import { NavLinks } from '@/constants';
import { getCurrentUser } from '@/lib/session';

const  Navbar = async () => {
  const session = await getCurrentUser() ;
  return (
    <nav className='flexBetween navbar'>
      <div className='flex-1 flexStart gap-10'>
        <Link href='/'>
          <Image
            src='/logo.svg'
            width={116}
            height={43}
            alt='logo'
          />
        </Link>
        <ul className='xl:flex hidden text-small gap-7'>
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.text}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className='flexCenter gap-4'>
        {session?.user ? (
          <>
          {session?.user?.image &&(
            <Image 
            src={session.user.image} 
            alt={session.user.name} 
            width={40}
            height={40}
            className='rounded-full'
            />)
          }
          
            <Link href="/create-project">
              share work
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
}

export default Navbar