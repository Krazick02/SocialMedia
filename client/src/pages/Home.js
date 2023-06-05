import { Link } from "react-router-dom"


export function Home() {




  return (
    <div className="flex-wrap mx-auto px-4 text-white border-4 align-middle justify-center">
      <p className="text-9xl text-amber-300 px-10">Welcome!</p>
      <div className="justify-center px-10 py-10 content-center">
        <p className="text-5xl px-10 py-10 border-4 justify-center">Do you have an account?</p>
        <Link to="/login" className="m-5 my-10 text-5xl bg-indigo-500 text-white rounded hover:bg-indigo-400 "> Login</Link>
        <p className="text-5xl px-10 py-10 border-4">You don't have an account?</p>
        <Link to="/newUser" className="bg-indigo-500 m-5 my-10 text-5xl text-white rounded hover:bg-indigo-400"> Register</Link>
      </div>
    </div>
  )
}