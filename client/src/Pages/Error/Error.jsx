import "Scss/Error.scss";

const Error = () => {
  return (
    <>
      <div className="error-content">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="error-text">
                <h3 className="error">404 Error</h3>
                <div className="im-sheep">
                  <div className="top">
                    <div className="body"></div>
                    <div className="head">
                      <div className="im-eye one"></div>
                      <div className="im-eye two"></div>
                      <div className="im-ear one"></div>
                      <div className="im-ear two"></div>
                    </div>
                  </div>
                  <div className="im-legs">
                    <div className="im-leg"></div>
                    <div className="im-leg"></div>
                    <div className="im-leg"></div>
                    <div className="im-leg"></div>
                  </div>
                </div>
                <p>Page not found</p>
                <a href="/" className="btn btn-primary btn-round">
                  Quay lại trang chủ
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
