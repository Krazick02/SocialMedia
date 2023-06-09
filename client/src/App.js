import { PostForm, NotFounfPage, Posts, Home, Register, Login , PostWComments} from './pages'
import { Routes, Route } from 'react-router-dom'
import { PostProvider } from './context/postContext';
import AuthProvider from './context/AuthProvider';
import { Toaster } from 'react-hot-toast'


function App() {
  return (
    <div className=' bg-neutral-900 '>
      <div className='bg-neutral-900'>
        <AuthProvider>
          <PostProvider>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/newUser' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/posts' element={<Posts />} />
              <Route path='/new' element={<PostForm />} />
              {/* <Route path='/posts/:id' element={<PostForm />} /> */}
              <Route path='/comments/:id' element={<PostWComments />} />
              <Route path='*' element={<NotFounfPage />} />
            </Routes>
            <Toaster />
          </PostProvider>
        </AuthProvider>
      </div>
    </div >
  );
}

export default App;

