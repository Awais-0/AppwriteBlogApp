import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/pages/Home.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import SignUp from './components/pages/SignUp.jsx'
import AllPosts from './components/pages/AllPosts.jsx'
import AddPost from './components/pages/AddPost.jsx'
import EditPost from './components/pages/editPost.jsx'
import Post from './components/pages/post.jsx'
import LOGIN from './components/pages/Login.jsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/home',
          element: <Home />,
        },
        {
          path: '/login',
          element: (
            <AuthLayout authentication={false}>
              <LOGIN />
            </AuthLayout>
          )
        },
        {
          path: '/signup',
          element: (
            <AuthLayout authentication={false}>
              <SignUp />
            </AuthLayout>
          )
        },
        {
          path: '/all-posts',
          element: (
            <AuthLayout authentication>
              <AllPosts />
            </AuthLayout>
          )
        },
        {
          path: '/add-post',
          element: (
            <AuthLayout authentication>
              <AddPost />
            </AuthLayout>
          )
        },
        {
          path: '/edit-post/:slug',
          element: (
            <AuthLayout authentication>
              <EditPost />
            </AuthLayout>
          )
        },
        {
          path: '/posts/:slug',
          element: <Post />
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>,
)
