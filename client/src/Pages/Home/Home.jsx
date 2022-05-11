import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "App";
import { Dashboard, Navbar } from "Components/index";
import "Scss/Home.scss";

const Workspace = () => {
  return (
    <div className="d-flex flex-wrap home-wrap">
      <div className="calendar">
        <table align="center">
          <caption className="my-3" align="top">
            <div className="d-flex align-items-center justify-content-between">
              <div className="col-9 caption">LỊCH LÀM VIỆC THÁNG 5/2022</div>
              <div className="col-3 d-flex flex-column align-items-end">
                <div className="text-red">
                  Họp
                  <i className="ms-2 fa-solid fa-circle"></i>
                </div>
                <div className="text-blue">
                  Công tác
                  <i className="ms-2 fa-solid fa-circle"></i>
                </div>
              </div>
            </div>
          </caption>
          <tbody>
            <tr>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
              <th>Sun</th>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>1</td>
            </tr>
            <tr></tr>
            <tr>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
            </tr>
            <tr>
              <td>
                <div className="d-flex flex-column justify-content-between h-100 w-100">
                  <div className="align-self-end">9</div>
                  <div className="align-self-start w-100 text-red">
                    <i className="fa-solid fa-circle"></i>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex flex-column justify-content-between h-100 w-100">
                  <div className="align-self-end">10</div>
                  <div className="align-self-start w-100 text-red">
                    <i className="fa-solid fa-circle"></i>
                  </div>
                </div>
              </td>
              <td>11</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
              <td>15</td>
            </tr>
            <tr>
              <td>16</td>
              <td>17</td>
              <td>
                <div className="d-flex flex-column justify-content-between h-100 w-100">
                  <div className="align-self-end">18</div>
                  <div className="align-self-start w-100 text-red">
                    <i className="fa-solid fa-circle"></i>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex flex-column justify-content-between h-100 w-100">
                  <div className="align-self-end">19</div>
                  <div className="align-self-start w-100 text-red">
                    <i className="fa-solid fa-circle"></i>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex flex-column justify-content-between h-100 w-100">
                  <div className="align-self-end">20</div>
                  <div className="align-self-start w-100 text-blue">
                    <i className="fa-solid fa-circle"></i>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex flex-column justify-content-between h-100 w-100">
                  <div className="align-self-end">21</div>
                  <div className="align-self-start w-100 text-blue">
                    <i className="fa-solid fa-circle"></i>
                  </div>
                </div>
              </td>
              <td>22</td>
            </tr>
            <tr>
              <td>23</td>
              <td>24</td>
              <td>25</td>
              <td>26</td>
              <td>27</td>
              <td>28</td>
              <td>29</td>
            </tr>
            <tr>
              <td>30</td>
              <td>31</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="notification ms-5 w-s-100">
        <div className="d-flex flex-column notification-table">
          <div className="list align-self-center py-3">DANH SÁCH THÔNG BÁO</div>
          <div className="d-flex flex-column">
            <div className="mb-2 date">[Phòng Giáo Vụ] 08-05-2022</div>
            <div className="title">Thông báo: Lịch sinh hoạt chủ nhiệm</div>
          </div>
          <div className="d-flex flex-column">
            <div className="mb-2 date">[Phòng Giáo Vụ] 06-05-2022</div>
            <div className="title">Thông báo: Họp chi bộ</div>
          </div>
          <div className="d-flex flex-column">
            <div className="mb-2 date">[Phòng Giáo Vụ] 04-05-2022</div>
            <div className="title">Thông báo: Lịch công tháng 5</div>
          </div>
          <div className="d-flex flex-column">
            <div className="mb-2 date">[Phòng Đại Học] 03-05-2022</div>
            <div className="title">Thông báo: Danh sách lớp vét HK2</div>
          </div>
          <div className="d-flex flex-column">
            <div className="mb-2 date">[Phòng Đại Học] 02-05-2022</div>
            <div className="title">Thông báo: Danh sách lớp kỹ năng tập sự</div>
          </div>
          <div className="d-flex flex-column">
            <div className="mb-2 date">[Khoa NN] 02-05-2022</div>
            <div className="title">Thông báo: Lịch chấm thi môn Write1</div>
          </div>
          <div className="d-flex flex-column">
            <div className="mb-2 date">[Khoa CNTT] 01-05-2022</div>
            <div className="title">Thông báo: Lịch chấm thi môn Web1</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const { user, dispatch } = useContext(UserContext);
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    user().then((user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, [navigate, user]);
  user().then((user) => {
    setUserData(user);
  });
  return (
    <div className="d-flex h-100">
      <div className="col-2 h-100 dashboard-bar">
        <Dashboard user={userData} />
      </div>
      <div className="col-10 d-flex flex-column">
        <Navbar user={userData} dispatch={dispatch} />
        <Workspace />
      </div>
    </div>
  );
};

export default Home;
