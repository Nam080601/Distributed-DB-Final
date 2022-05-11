import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "App";
import { Dashboard, Navbar } from "Components/index";
import scoresApi from "Helpers/scoresApi";
import "Scss/Scores.scss";

const initialForm = {
  mssv: "",
  hoten: "",
  khoa: "",
  mon: "",
  dqt: 0,
  dgk: 0,
  dck: 0,
  dtb: 0,
};

const FormContext = createContext(initialForm);

const FormReducer = (state, action) => {
  switch (action.type) {
    case "change": {
      return action.data;
    }
    default:
      throw new Error();
  }
};

const Workspace = ({ faculty }) => {
  const [scores, dispatch] = useReducer(FormReducer, initialForm);
  const [data, setData] = useState([]);

  useEffect(() => {
    const GetScore = async () => {
      let response;
      switch (faculty) {
        case "CNTT":
          response = await scoresApi.getCNTT();
          break;
        case "NN":
          response = await scoresApi.getNN();
          break;
        default:
          response = "";
      }
      setData(response.data);
    };
    GetScore();
  }, [faculty, scores]);

  const handleFormData = (data) => {
    dispatch({ type: "change", data: data });
  };

  const datas = data?.map((e) => (
    <div
      className="row row-line text-center p-2"
      data-bs-toggle="modal"
      data-bs-target="#modal-scores"
      onClick={() => handleFormData(e)}
      key={e.mssv}
    >
      <div className="col-2">{e.mssv}</div>
      <div className="col-3">{e.hoten}</div>
      <div className="col-1">{e.khoa}</div>
      <div className="col-1">{e.mon}</div>
      <div className="col-1">{e.dqt}</div>
      <div className="col-1">{e.dgk}</div>
      <div className="col-1">{e.dck}</div>
      <div className="col-1">{e.dtb}</div>
      <div className="col-1">-</div>
    </div>
  ));
  return (
    <FormContext.Provider value={{ scores, dispatch }}>
      <div id="flash-alert" className="alert alert-success text-center">
        <span id="flash-content"></span>
      </div>
      <div className="container d-flex flex-column px-5 ws">
        <div className="pt-5 pb-4 mx-auto">
          <h1>QUẢN LÝ ĐIỂM SINH VIÊN</h1>
        </div>
        <div className="card">
          <div className="row row-line text-center p-2">
            <div className="col-2">MSSV</div>
            <div className="col-3">Họ và tên</div>
            <div className="col-1">Khoa</div>
            <div className="col-1">Môn</div>
            <div className="col-1">DQT</div>
            <div className="col-1">DGK</div>
            <div className="col-1">DCK</div>
            <div className="col-1">DTB</div>
            <div className="col-1">Ghi chú</div>
          </div>
          {datas}
        </div>
      </div>
      <Modal faculty={faculty} />
    </FormContext.Provider>
  );
};

const Modal = ({ faculty }) => {
  const { scores, dispatch } = useContext(FormContext);
  const [form, setForm] = useState(scores);

  useEffect(() => {
    setForm(scores);
  }, [scores]);

  const handleChange = (e) => {
    setForm((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (faculty === "CNTT") {
        await scoresApi.updateCNTT(form);
      } else if (faculty === "NN") {
        await scoresApi.updateNN(form);
      } else {
        await scoresApi.update(form);
      }
      setTimeout(() => {
        const alert = document.querySelector("#flash-alert");
        alert.style.display = "block";
        document.querySelector("#flash-content").innerHTML =
          "Cập nhật thành công";
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
      dispatch({ type: "change", data: form });
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
                  <label htmlFor="mssv">MSSV :</label>
                </div>
                <div className="col-9">
                  <input
                    className="form-control"
                    type="text"
                    value={form.mssv}
                    disabled
                  />
                </div>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="col-3">
                  <label htmlFor="mssv">Name :</label>
                </div>
                <div className="col-9">
                  <input
                    className="form-control"
                    type="text"
                    value={form.hoten}
                    disabled
                  />
                </div>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="col-3">
                  <label htmlFor="mssv">DQT :</label>
                </div>
                <div className="col-9">
                  <input
                    className="form-control"
                    type="text"
                    name="dqt"
                    value={form.dqt}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="col-3">
                  <label htmlFor="mssv">DGK :</label>
                </div>
                <div className="col-9">
                  <input
                    className="form-control"
                    type="text"
                    name="dgk"
                    value={form.dgk}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="col-3">
                  <label htmlFor="mssv">DCK :</label>
                </div>
                <div className="col-9">
                  <input
                    className="form-control"
                    type="text"
                    name="dck"
                    value={form.dck}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-success btn-update"
                data-bs-dismiss="modal"
              >
                Update
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

const Scores = () => {
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
        <Workspace faculty={userData?.khoa} />
      </div>
    </div>
  );
};

export default Scores;
