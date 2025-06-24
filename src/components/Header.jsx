import React from 'react'
import Container from './Container/container'
import Logo from './logo'
import LogoutBtn from './logoutBtn'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
    const authstatus = useSelector((state)=> state.auth.status)
    const navigate = useNavigate()
    const navLinks = [
        {
            name: 'Home',
            url: '/',
            active: true,
        },
        {
            name: 'Login',
            url: '/login',
            active: !authstatus,
        },
        {
            name: 'SignUp',
            url: '/signup',
            active: !authstatus,
        },
        {
            name: 'All Posts',
            url: '/all-posts',
            active: authstatus,
        },
        {
            name: 'Add Post',
            url: '/add-post',
            active: authstatus,
        },
    ]
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-md">
  <Container>
    <nav className="flex items-center justify-between py-3">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <Logo width="48px" />
        <span className="text-lg font-bold text-gray-800">MyBlog</span>
      </Link>

      {/* Nav Links */}
      <ul className="flex items-center space-x-4">
        {navLinks.map((navlink) =>
          navlink.active ? (
            <li key={navlink.name}>
              <button
                onClick={() => navigate(navlink.url)}
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
              >
                {navlink.name}
              </button>
            </li>
          ) : null
        )}

        {authstatus && (
          <li>
            <LogoutBtn />
          </li>
        )}
      </ul>
    </nav>
  </Container>
</header>

  )
}

export default Header