import { Link } from "react-router-dom"


export function Home() {




  return (
    <div className="flex-wrap mx-auto px-4 justify-center content-center text-white block">
      <div className="box-border justify-center h-32 w-32 p-4">
        <Link to="/login" className="bg-indigo-500 bg-indigo-600 text-white rounded"> Login</Link>
        <Link to="/newUser" className="bg-indigo-500 bg-indigo-600 text-white rounded w-64"> Register</Link>

      </div>
    </div>
  )
}