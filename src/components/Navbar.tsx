import { Link } from "react-router-dom"

const Navbar = ({handleLogout}:any) => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
        <div className="container">
          <Link className="navbar-brand" to="/account">
            Account Manager
          </Link>
   
            <ul className="navbar-nav ms-auto">
             
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar