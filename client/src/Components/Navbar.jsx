import { useNavigate } from "react-router-dom";

const Navbar = ({ user, dispatch }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "logout" });
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
      <div className="container-fluid justify-content-end">
        <div className="dropdown">
          <div data-bs-toggle="dropdown" aria-expanded="false">
            <span>{user?.hoten}</span>
            <i className="fa-regular fa-user px-2"></i>
          </div>
          <ul className="dropdown-menu dropdown-menu-end mt-3">
            <li>
              <span className="dropdown-item" onClick={handleLogout}>
                Đăng xuất
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
