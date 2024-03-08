import { Link, Outlet } from "react-router-dom";

export default function Root() {
    return (
      <>
        <div className="row">
          <div id="sidebar" className="col-auto">
            <h1 className="ms-3">
              UserManager
            </h1>
            <nav>
              <ul className="nav nav-pills flex-column">
                <li className="nav-link active">
                  <Link to={`users`}
                  className=" text-white text-decoration-none">
                    Users
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div id="detail" className="col-auto">
            <Outlet />
          </div>
        </div>
      </>
    );
  }