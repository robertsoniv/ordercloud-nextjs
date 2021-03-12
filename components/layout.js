import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { isJSDocAugmentsTag } from 'typescript'
import useOrderCloud from '../lib/use-ordercloud'
import { getUser, logout } from '../redux/slices/ordercloud'
import NavLink from './nav-link'

export const siteTitle = 'Next.js OrderCloud Authentication '

export default function Layout({ children, home }) {
  const {isAnonymous, isAuthenticated, user} = useOrderCloud();
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('user')
    if (isAnonymous && !isAuthenticated) {
      dispatch(logout())
    } else if (!isAnonymous && !user) {
      dispatch(getUser())
    }
  }, [isAnonymous, user])
  
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Example showing one pattern on using OrderCloud authentication with Next.JS. This does not include the client credentials grant-type as that is not recommended for use in client-side applications."
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header>
      <nav className="bg-white shadow-md z-50 relative">
        <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* <!-- Mobile menu button--> */}
              <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                {/* <!-- Icon when menu is closed. -->
                <!--
                  Heroicon name: outline/menu

                  Menu open: "hidden", Menu closed: "block"
                --> */}
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* <!-- Icon when menu is open. -->
                <!--
                  Heroicon name: outline/x

                  Menu open: "block", Menu closed: "hidden"
                --> */}
                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="font-black text-grey-900">OrderCloud Next.JS</h1>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-2">
                  <NavLink href="/">Home</NavLink>
                  <NavLink href="/products">Products</NavLink>
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <!-- Profile dropdown --> */}
                  {isAnonymous ? (
                    <NavLink href="/login">Login</NavLink>
                    ) : (
                      <>
                    <button onClick={() => dispatch(logout())} className="hidden sm:block text-red-500 hover:bg-red-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                    {user && (
                      <>
                        <p className="hidden sm:block text-red-500 px-3 py-2 rounded-md text-sm font-medium">{`Welcome, ${user.FirstName} ${user.LastName}!`}</p>
                        <div className="ml-3 relative">
                          <div>
                              <div className="bg-red-500 text-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">Open user menu</span>
                                <svg className="h-6 w-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                          </div>
                        </div>
                      </>
                    )}
                    </>
                  )}
                  
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink href="/" fullWidth>Home</NavLink>
              <NavLink href="/products" fullWidth>Products</NavLink>
              {!isAnonymous && (
                <button onClick={logout} className="sm:hidden w-full border-solid border border-red-500 text-red-500 hover:border-red-900 hover:bg-red-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
              )}

          </div>
        </div>
      </nav>
      </header>
      <main className="full-height bg-gray-50">{children}</main>
      <footer className="bg-white border-t border-gray-300 flex space-x-4 items-center justify-center" style={{minHeight: 64}}>
          <p>
            {`Made by `}
            <a className="text-green-600" href="https://github.com/robertsoniv" target="_blank">@robertsoniv</a>
            {` using `}
            <a className="text-green-600" href="https://ordercloud.io" target="_blank">Four51 OrderCloud™</a>
            {`, `}
            <a className="text-green-600" href="https://nextjs.org" target="_blank">Next.js</a>
            {`, and `}
            <a className="text-green-600" href="https://tailwindcss.com" target="_blank">tailwindcss</a>
          </p>
      </footer>
    </div>
  )
}