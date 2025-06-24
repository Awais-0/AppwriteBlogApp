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
    <header className='py-3 shadow bg-gray-500'>
        <Container>
            <nav className='flex'>
                <div className='mr-4 '>
                    <Link to='/'>
                    <Logo  width='50px'/>
                    </Link>
                </div>
                <ul className='flex ml-auto'>
                    {navLinks.map((navlink) => 
                        navlink.active ? (
                            <li key={navlink.name}>
                                <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={()=> navigate(navlink.url)}>
                                    {navlink.name}
                                </button>
                            </li>
                        ) : null
                    )}
                    { authstatus && (
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