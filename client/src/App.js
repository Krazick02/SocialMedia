import { PostForm, NotFounfPage, Posts, Home, Register, Login } from './pages'
import { Routes, Route } from 'react-router-dom'
import { PostProvider } from './context/postContext';
import { Toaster } from 'react-hot-toast'
import PrivateRoute from './components/PrivateRoute.js';


function App() {
  return (
    <div className='bg-neutral-900 min-h-screen flex items-center'>
      <div className='px-10 container m-auto'>
          <PostProvider>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/newUser' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/posts' element={<Posts />} />
              <Route path='/new' element={<PostForm />} />
              <Route path='/posts/:id' element={<PostForm />} />
              <Route path='*' element={<NotFounfPage />} />
            </Routes>
            <Toaster />
          </PostProvider>
      </div>
    </div >
  );
}

export default App;

