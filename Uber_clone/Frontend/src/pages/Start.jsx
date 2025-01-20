import { Link } from "react-router-dom"

const Start = () => {
  return (
    <div>
      <div className="bg-red-900 h-screen w-full flex justify-betweenflex-col justify-center">
        <img src="" alt="" />
        <div>
          <h1>Get started with uber</h1>
          <Link to="/login" >Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start
