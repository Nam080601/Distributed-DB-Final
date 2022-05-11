import { NavLink } from "react-router-dom";

const Dashboard = ({ user }) => {
  const list = [
    {
      id: 1,
      name: "Quản lý điểm",
      subname: [
        { name: "Khoa CNTT", href: "/scores" },
        { name: "Khoa NN", href: "/scores" },
      ],
    },
    {
      id: 2,
      name: "Quản lý in",
      subname: [
        { name: "Danh sách sinh viên", href: "/print/list-student" },
        { name: "Bảng điểm môn học", href: "/print/course-score" },
        { name: "Phiếu điểm", href: "/print/report-card" },
        { name: "Bảng điểm tổng kết", href: "/print/final-score" },
      ],
    },
    {
      id: 3,
      name: "Quản lý tài khoản",
      subname: [{ name: "Danh sách tài khoản", href: "/account" }],
    },
  ];
  const dashboard_rows = list.map((e, i, a) => {
    if (
      (user?.vaitro === "TRUONGKHOA" || user?.vaitro === "GIANGVIEN") &&
      a[i].id === 3
    )
      return "";
    if (user?.vaitro === "GIANGVIEN" && a[i].id === 2) return "";
    return (
      <li className="nav-item" key={i}>
        <div className="accordion" id={`accordion-${i}`}>
          <div className="accordion-item">
            <h2 className="accordion-header" id={`heading-${i}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${i}`}
                aria-expanded="false"
                aria-controls={`collapse-${i}`}
              >
                {e.name}
              </button>
            </h2>
            {e.subname.map((se, si, sa) => {
              if (user?.khoa === "CNTT" && a[i].id === 1 && si === 1) return "";
              if (user?.khoa === "NN" && a[i].id === 1 && si === 0) return "";
              return (
                <div
                  id={`collapse-${i}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading-${i}`}
                  data-bs-parent={`#accordion-${i}`}
                  key={si}
                >
                  <div className="accordion-body">
                    <NavLink className="" type="button" to={se.href}>
                      {se.name}
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </li>
    );
  });
  return (
    <div className="d-flex flex-column flex-shrink-0 h-100">
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <NavLink className="dashboard text-white pt-3 ps-3" to="/">
          DASHBOARD
        </NavLink>
      </div>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">{dashboard_rows}</ul>
    </div>
  );
};
export default Dashboard;
