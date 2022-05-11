import {
  useContext,
  useState,
  useEffect,
  createContext,
  useReducer,
} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "App";
import { Dashboard, Navbar } from "Components/index";
import usersApi from "Helpers/usersApi";
import "Scss/Account.scss";

const initialForm = {
  username: "",
  password: "",
  hoten: "",
  khoa: "",
  vaitro: "",
};

const FormContext = createContext(initialForm);

const FormReducer = (state, action) => {
  switch (action.type) {
    case "add": {
      return action.payload;
    }
    default:
      throw new Error();
  }
};

const Workspace = ({ faculty }) => {
  const [state, dispatch] = useReducer(FormReducer, initialForm);
  const [data, setData] = useState([]);

  useEffect(() => {
    const GetScore = async () => {
      let response;
      switch (faculty) {
        case "CNTT":
          response = await usersApi.getCNTT();
          break;
        case "NN":
          response = await usersApi.getNN();
          break;
        default:
          response = "";
      }
      setData(response.data);
    };
    GetScore();
  }, [faculty, state]);

  const datas = data?.map((e) => (
    <div className="row row-line text-center p-2" key={e.username}>
      <div className="col-3">{e.username}</div>
      <div className="col-3">{e.hoten}</div>
      <div className="col-3">{e.khoa}</div>
      <div className="col-3">{e.vaitro}</div>
    </div>
  ));
  return (
    <FormContext.Provider value={{ state, dispatch }}>
      <div id="flash-alert" className="alert alert-success text-center">
        <span id="flash-content"></span>
      </div>
      <div className="container d-flex flex-column px-5 ws">
        <div className="pt-5 mx-auto">
          <h1>QUẢN LÝ TÀI KHOẢN</h1>
        </div>
        <button
          className="btn btn-primary btn-register align-self-end mb-3"
          data-bs-toggle="modal"
          data-bs-target="#modal-scores"
        >
          Tạo tài khoản
        </button>
        <div className="card">
          <div className="row row-line text-center p-2">
            <div className="col-3">Username</div>
            <div className="col-3">Họ và tên</div>
            <div className="col-3">Khoa</div>
            <div className="col-3">Vai trò</div>
          </div>
          {datas}
        </div>
      </div>
      <Modal faculty={faculty} />
    </FormContext.Provider>
  );
};

const Modal = ({ faculty }) => {
  const { dispatch } = useContext(FormContext);
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm((data) => ({
      ...data,
      khoa: faculty,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (faculty === "CNTT") {
        await usersApi.registerCNTT(form);
      }
      if (faculty === "NN") {
        await usersApi.registerNN(form);
      }

      dispatch({ type: "add", payload: form });
      setForm(initialForm);

      setTimeout(() => {
        const alert = document.querySelector("#flash-alert");
        alert.style.display = "block";
        document.querySelector("#flash-content").innerHTML = "Tạo thành công";
        const fadeEffect = setInterval(function () {
          if (!alert.style.opacity) {
            alert.style.opacity = 1;
          }
          if (alert.style.opacity > 0) {
            alert.style.opacity -= 0.05;
          } else {
            alert.style.display = "none";
            alert.style.opacity = 1;
            clearInterval(fadeEffect);
          }
        }, 100);
      }, 500);
    } catch (error) {
      setTimeout(() => {
        const alert = document.querySelector("#flash-alert");
        alert.style.display = "block";
        document.querySelector("#flash-content").innerHTML = error.message;
        const fadeEffect = setInterval(function () {
          if (!alert.style.opacity) {
            alert.style.opacity = 1;
          }
          if (alert.style.opacity > 0) {
            alert.style.opacity -= 0.05;
          } else {
            alert.style.display = "none";
            alert.style.opacity = 1;
            clearInterval(fadeEffect);
          }
        }, 100);
      }, 500);
    }
  };
  return (
    <div
      className="modal fade"
      id="modal-scores"
      tabIndex="-1"
      aria-labelledby="modal-scores-label"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modal-scores-label">
              Scores management
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="modal-body">
              <div className="d-flex align-items-center mb-2">
                <div className="col-3">
                  <label htmlFor="mssv">Username :</label>
                </div>
                <div className="col-9">
                  <input
                    className="form-control"
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="col-3">
                  <label htmlFor="mssv">Passwod :</label>
                </div>
                <div className="col-9">
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="col-3">
                  <label htmlFor="mssv">Họ và tên :</label>
                </div>
                <div className="col-9">
                  <input
                    className="form-control"
                    type="text"
                    name="hoten"
                    value={form.hoten}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="col-3">
                  <label htmlFor="mssv">Khoa :</label>
                </div>
                <div className="col-9">
                  <input
                    className="form-control"
                    type="text"
                    value={faculty || form.khoa}
                    disabled
                  />
                </div>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="col-3">
                  <label htmlFor="mssv">Vai trò :</label>
                </div>
                <div className="col-9">
                  <select
                    className="form-select"
                    name="vaitro"
                    value={form.vaitro}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="GIAOVU">Giáo vụ</option>
                    <option value="TRUONGKHOA">Trưởng Khoa</option>
                    <option value="GIANGVIEN">Giảng Viên</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-success btn-register"
                data-bs-dismiss="modal"
              >
                Create
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Aaccount = () => {
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
    <div className="d-flex h-100 hm-100">
      <div className="col-2 dashboard-bar">
        <Dashboard user={userData} />
      </div>
      <div className="col-10 d-flex flex-column">
        <Navbar user={userData} dispatch={dispatch} />
        <Workspace faculty={userData?.khoa} />
      </div>
    </div>
  );
};

export default Aaccount;
