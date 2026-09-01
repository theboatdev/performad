import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Import icons

export default function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <header className="relative ">
      {/* Announcement Bar */}
      <div className="w-full bg-[#22A18D] text-white text-center py-2 text-sm font-medium">
        All Started with a Comprehensive Strategy -{" "}
        <a
          href="/contactUs"
          className="underline font-semibold hover:opacity-80 transition-opacity"
        >
          Get Your Free Strategy Call Now 🚀
        </a>
      </div>

      <div className="flex flex-col px-4 pt-4 mx-auto text-black roboto-regular max-w-7xl md:mx-10 lg:mx-20 xl:mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex flex-row items-center justify-between p-4">
          {/* Logo */}
          <Link href="/">
            <a>
              <img src="/images/logo.png" width={150} height={20} alt="Logo" />
            </a>
          </Link>

          {/* Hamburger Menu Button (Mobile) */}
          <button
            className="px-3 py-1 bg-white rounded-full cursor-pointer bg-opacity-30 focus:outline-none md:hidden"
            type="button"
            aria-label="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            {navbarOpen ? (
              <X size={24} className="text-gray-800" />
            ) : (
              <Menu size={24} className="text-gray-800" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center">
          <NavLinks />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${navbarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 z-50 md:hidden`}
      >
        <div className="flex justify-between p-5 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
          <button onClick={() => setNavbarOpen(false)}>
            <X size={24} className="text-gray-800" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="flex flex-col space-y-6 p-6">
          <NavLinks closeMenu={() => setNavbarOpen(false)} isMobile={true} />
        </nav>
      </div>

      {/* Overlay (Click outside to close) */}
      {navbarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-40"
          onClick={() => setNavbarOpen(false)}
        ></div>
      )}
    </header>
  );
}

// Navigation Links Component
function NavLinks({ closeMenu, isMobile }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdown2Open, setDropdown2Open] = useState(false);

  return (
    <ul className={`${isMobile ? "flex flex-col space-y-6" : "flex flex-wrap items-center justify-end flex-grow gap-2 pr-4 space-x-2 md:gap-6 md:space-x-6"}`}>
      {/* Services Dropdown */}
      <li
        className="relative group"
        onMouseEnter={() => !isMobile && setDropdownOpen(true)}
        onMouseLeave={() => !isMobile && setDropdownOpen(false)}
      >
        <button
          className="flex items-center gap-1 text-lg font-semibold text-gray-800 hover:text-gray-700 focus:outline-none transition-colors"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          Services
          <svg
            className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        <div
          className={`
            ${isMobile
              ? `mt-2 pl-4 space-y-3 ${dropdownOpen ? 'block' : 'hidden'}`
              : `absolute left-0 mt-2 w-48 bg-white shadow-xl rounded-lg border border-gray-100 py-2 z-50 transition-all duration-200 ${dropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1'}`
            }
          `}
        >
          <Link href="/services">
            <a
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#22A18D] transition-colors"
              onClick={() => {
                setDropdownOpen(false);
                closeMenu && closeMenu();
              }}
            >
              SEO
            </a>
          </Link>
          <Link href="/googleAds">
            <a
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#22A18D] transition-colors"
              onClick={() => {
                setDropdownOpen(false);
                closeMenu && closeMenu();
              }}
            >
              Google Ads
            </a>
          </Link>
          <Link href="/socialMediaAds">
            <a
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#22A18D] transition-colors"
              onClick={() => {
                setDropdownOpen(false);
                closeMenu && closeMenu();
              }}
            >
              Social Media Ads
            </a>
          </Link>
          <Link href="/marketplaceManagement">
            <a
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#22A18D] transition-colors"
              onClick={() => {
                setDropdownOpen(false);
                closeMenu && closeMenu();
              }}
            >
              Marketplace Management
            </a>
          </Link>
          <Link href="/webDesignDevelopment">
            <a
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#22A18D] transition-colors"
              onClick={() => {
                setDropdownOpen(false);
                closeMenu && closeMenu();
              }}
            >
              Web Design And Development
            </a>
          </Link>
        </div>
      </li>

      {[
        { href: "/blogs", label: "Blogs" },
        { href: "/aboutUs", label: "About" },
      ].map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            className="text-lg font-semibold text-gray-800 hover:text-gray-700 transition-colors"
            onClick={closeMenu}
          >
            {item.label}
          </a>
        </li>
      ))}
      <li
        className="relative group"
        onMouseEnter={() => !isMobile && setDropdown2Open(true)}
        onMouseLeave={() => !isMobile && setDropdown2Open(false)}
      >
        <button
          className="flex items-center gap-1 text-lg font-semibold text-gray-800 hover:text-gray-700 focus:outline-none transition-colors"
          onClick={() => setDropdown2Open(!dropdown2Open)}
        >
          Case Study
          <svg
            className={`w-4 h-4 transition-transform ${dropdown2Open ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        <div
          className={`
            ${isMobile
              ? `mt-2 pl-4 space-y-3 ${dropdown2Open ? 'block' : 'hidden'}`
              : `absolute left-0 mt-2 w-48 bg-white shadow-xl rounded-lg border border-gray-100 py-2 z-50 transition-all duration-200 ${dropdown2Open ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1'}`
            }
          `}
        >
          <Link href="/milestones-xversion">
            <a
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#22A18D] transition-colors"
              onClick={() => {
                setDropdown2Open(false);
                closeMenu && closeMenu();
              }}
            >
              XVERSION
            </a>
          </Link>
          <Link href="/milestones-active">
            <a
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#22A18D] transition-colors"
              onClick={() => {
                setDropdown2Open(false);
                closeMenu && closeMenu();
              }}
            >
              Active Products
            </a>
          </Link>
          <Link href="/milestones-gnzbioscience">
            <a
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#22A18D] transition-colors"
              onClick={() => {
                setDropdown2Open(false);
                closeMenu && closeMenu();
              }}
            >
              GNZ - Bio Science
            </a>
          </Link>
        </div>
      </li>
      {[
        { href: "/contactUs", label: "Contact" },
      ].map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            className="text-lg font-semibold text-gray-800 hover:text-gray-700 transition-colors"
            onClick={closeMenu}
          >
            {item.label}
          </a>
        </li>
      ))}

      <li>
        <a
          href="#contact"
          className="border-2 border-[#22A18D] rounded-full font-bold px-4 text-lg text-[#22A18D] shadow-sm transition-colors duration-75 group gap-[0.25em] inline-flex items-center py-1.5 hover:cursor-pointer hover:bg-opacity-90 mt-2 md:mt-0"
          onClick={closeMenu}
        >
          FREE STRATEGY CALL
          <svg
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative transition-transform duration-200 motion-safe:-translate-x-1 group-hover:translate-x-0"
          >
            <path
              fill="currentColor"
              d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"
            ></path>
            <path
              stroke="currentColor"
              d="M1.75 8H11"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="origin-left transition-all duration-200 opacity-0 motion-safe:-translate-x-1 group-hover:translate-x-0 group-hover:opacity-100"
            ></path>
          </svg>
        </a>
      </li>
    </ul>
  );
}
