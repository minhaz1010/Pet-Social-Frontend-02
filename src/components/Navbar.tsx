"use client"
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { UserButton, useAuth } from '@clerk/nextjs';
import petImage from "../../public/pet-dress.png"
import Image from 'next/image';
import { protest_strike } from '@/config/font';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className = '', onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? 'text-blue-600' : 'text-gray-300'
        } hover:text-blue-500 transition-all duration-300 relative group`}
      onClick={onClick}
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
    </Link>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={` sticky top-0 z-50 ${protest_strike.className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="overflow-hidden rounded-full">
                <Image
                  src={petImage}
                  alt="PetBook Logo"
                  className="size-10 rounded-full transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-3xl text-gray-200 transform group-hover:scale-105 transition-transform duration-300">
                PetBook
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavLink href="/" className='text-xl transform hover:-translate-y-0.5 transition-transform duration-200'>
              Home
            </NavLink>
            <NavLink href="/story" className='text-xl transform hover:-translate-y-0.5 transition-transform duration-200'>
              Story
            </NavLink>
            <NavLink href="/tips" className='text-xl transform hover:-translate-y-0.5 transition-transform duration-200'>
              Tips
            </NavLink>
            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <NavLink href="/profile" className='text-xl transform hover:-translate-y-0.5 transition-transform duration-200'>
                  Profile
                </NavLink>
                <div className="transform hover:scale-110 transition-transform duration-200">
                  <UserButton />
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <NavLink href="/sign-in" className='text-xl transform hover:-translate-y-0.5 transition-transform duration-200'>
                  Sign In
                </NavLink>
                <NavLink
                  href="/sign-up"
                  className='text-xl transform hover:-translate-y-0.5 transition-transform duration-200'
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none transform hover:scale-110 transition-transform duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={24} className="transform rotate-0 transition-transform duration-300" />
              ) : (
                <Menu size={24} className="transform rotate-0 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transform transition-all duration-300 ease-in-out ${isOpen
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-full pointer-events-none'
          }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg">
          <NavLink
            href="/"
            className="block px-3 py-2 rounded-md text-xl font-medium transform hover:translate-x-2 transition-transform duration-200"
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            href="/story"
            className="block px-3 py-2 rounded-md text-xl font-medium transform hover:translate-x-2 transition-transform duration-200"
            onClick={closeMenu}
          >
            Story
          </NavLink>
          <NavLink
            href="/tips"
            className="block px-3 py-2 rounded-md text-xl font-medium transform hover:translate-x-2 transition-transform duration-200"
            onClick={closeMenu}
          >
            Tips
          </NavLink>
          {isSignedIn ? (
            <div className="space-y-1">
              <NavLink
                href="/profile"
                className="block px-3 py-2 rounded-md text-xl font-medium transform hover:translate-x-2 transition-transform duration-200"
                onClick={closeMenu}
              >
                Profile
              </NavLink>
              <div className="px-3 py-2 transform hover:scale-105 transition-transform duration-200">
                <UserButton />
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <NavLink
                href="/sign-in"
                className="block px-3 py-2 rounded-md text-xl font-medium transform hover:translate-x-2 transition-transform duration-200"
                onClick={closeMenu}
              >
                Sign In
              </NavLink>
              <NavLink
                href="/sign-up"
                className="block px-3 py-2 rounded-md text-xl font-medium transform hover:translate-x-2 transition-transform duration-200"
                onClick={closeMenu}
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;