import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar, Dashboard } from "Components";
import { UserContext } from "App";
import studentsApi from "Helpers/studentsApi";
import "Scss/Print.scss";
import scoresApi from "Helpers/scoresApi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
  const params = useParams("action");
  const [data, dispatch] = useReducer(FormReducer, initialForm);
  const [students, setStudents] = useState([]);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const getStudent = async () => {
      let students, scores;
      switch (faculty) {
        case "CNTT":
          students = await studentsApi.getCNTT();
          scores = await scoresApi.getCNTT();
          break;
        case "NN":
          students = await studentsApi.getNN();
          scores = await scoresApi.getNN();
          break;
        default:
          students = "";
          scores = "";
      }
      setStudents(students.data);
      setScores(scores.data);
    };
    getStudent();
  }, [faculty]);

  const handleFormData = (data) => {
    dispatch({ type: "change", data: data });
  };

  const handlePrint = () => {
    html2canvas(document.querySelector("#data-print")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4", false);
      pdf.addImage(imgData, "PNG", 50, 50, 500, 0, undefined, false);
      pdf.save("report.pdf");
    });
  };

  let title, table, datas, total, modal;

  switch (params.action) {
    case "list-student":
      title = "DANH SÁCH SINH VIÊN";
      table = (
        <div className="row row-line text-center p-2">
          <div className="col-2">MSSV</div>
          <div className="col-4">Họ và tên</div>
          <div className="col-3">Khoa</div>
          <div className="col-3">Ghi chú</div>
        </div>
      );
      datas = students?.map((e) => (
        <div className="row row-line text-center p-2" key={e.mssv}>
          <div className="col-2">{e.mssv}</div>
          <div className="col-4">{e.hoten}</div>
          <div className="col-3">{e.khoa}</div>
          <div className="col-3">-</div>
        </div>
      ));
      total = `Tổng cộng: ${students?.length}`;
      modal = false;
      break;
    case "course-score":
      title = "BẢNG ĐIỂM MÔN HỌC";
      table = (
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
      );
      datas = scores?.map((e) => (
        <div className="row row-line text-center p-2" key={e.mssv}>
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
      total = `Tổng cộng: ${scores?.length}`;
      modal = false;
      break;
    case "report-card":
      title = "PHIẾU ĐIỂM";
      table = (
        <div className="row row-line text-center p-2">
          <div className="col-2">MSSV</div>
          <div className="col-4">Họ và tên</div>
          <div className="col-2">Khoa</div>
          <div className="col-2">Môn</div>
          <div className="col-2">Ghi chú</div>
        </div>
      );
      datas = scores?.map((e) => (
        <div
          className="row row-line text-center p-2"
          key={e.mssv}
          data-bs-toggle="modal"
          data-bs-target="#modal-scores"
          onClick={() => handleFormData(e)}
        >
          <div className="col-2">{e.mssv}</div>
          <div className="col-4">{e.hoten}</div>
          <div className="col-2">{e.khoa}</div>
          <div className="col-2">{e.mon}</div>
          <div className="col-2">-</div>
        </div>
      ));
      total = `Tổng cộng: ${scores?.length}`;
      modal = true;
      break;
    case "final-score":
      title = "BẢNG ĐIỂM TỔNG KẾT";
      table = (
        <div className="row row-line text-center p-2">
          <div className="col-2">MSSV</div>
          <div className="col-4">Họ và tên</div>
          <div className="col-4">Khoa</div>
          <div className="col-2">Ghi chú</div>
        </div>
      );
      datas = scores?.map((e) => (
        <div
          className="row row-line text-center p-2"
          key={e.mssv}
          data-bs-toggle="modal"
          data-bs-target="#modal-scores"
          onClick={() => handleFormData(e)}
        >
          <div className="col-2">{e.mssv}</div>
          <div className="col-4">{e.hoten}</div>
          <div className="col-4">{e.khoa}</div>
          <div className="col-2">-</div>
        </div>
      ));
      total = `Tổng cộng: ${scores?.length}`;
      modal = true;
      break;
    default:
      datas = "";
  }
  return (
    <FormContext.Provider value={{ data }}>
      <div className="container px-5">
        <div className="d-flex flex-column" id="data-print">
          <div className="pt-5 pb-4">
            <h1 className="text-center">{title}</h1>
          </div>
          <div className="row align-self-between mb-2">
            <div className="col-6">Khoa: {faculty}</div>
            <div className="col-6 text-end">{total}</div>
          </div>
          <div className="card">
            {table}
            {datas}
          </div>
        </div>
        {!modal && (
          <div className="d-flex justify-content-end w-100">
            <button className="btn m-3 btn-print" onClick={() => handlePrint()}>
              In
            </button>
          </div>
        )}
      </div>
      <Modal faculty={faculty} title={title} />
    </FormContext.Provider>
  );
};

const Modal = ({ title }) => {
  const { data } = useContext(FormContext);

  let datas = (
    <div className="d-flex flex-column w-100" id="report-card-print">
      <h3 className="align-self-center py-2">{title}</h3>
      <div>Mã sinh viên : {data.mssv}</div>
      <div>
        Họ và tên : <strong className="text-uppercase">{data.hoten}</strong>
      </div>
      <div>Khoa : {data.khoa}</div>
      <div className="report-card-table">
        <div className="row row-line text-center p-2 mt-3">
          <div className="col-2">Môn</div>
          <div className="col-2">DQT</div>
          <div className="col-2">DGK</div>
          <div className="col-2">DCK</div>
          <div className="col-2">DTB</div>
          <div className="col-2">Note</div>
        </div>
        <div className="row row-line text-center p-2">
          <div className="col-2">{data.mon}</div>
          <div className="col-2">{data.dqt}</div>
          <div className="col-2">{data.dgk}</div>
          <div className="col-2">{data.dck}</div>
          <div className="col-2">{data.dtb}</div>
          <div className="col-2">-</div>
        </div>
      </div>
    </div>
  );

  const handlePrint = () => {
    html2canvas(document.querySelector("#report-card-print")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4", false);
      pdf.addImage(imgData, "PNG", 50, 50, 500, 0, undefined, false);
      pdf.save("report.pdf");
    });
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
              In {title.toLowerCase()}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex align-items-center mb-2">{datas}</div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-print-report-card"
              onClick={() => handlePrint()}
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Print = () => {
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
      <div className="col-10 d-flex flex-column ws">
        <Navbar user={userData} dispatch={dispatch} />
        <Workspace faculty={userData?.khoa} />
      </div>
    </div>
  );
};

export default Print;
