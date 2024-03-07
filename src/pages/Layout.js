import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img
              src="/logo.png"
              style={{ width: "100px" }}
              className="img-fluid"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex-wrap">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/">
                  જય સ્વામિનારાયણ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/JayDevi">
                  जय देवी जय देवी
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/rambhajan">
                  શ્રી રામચંદ્ર કૃપાલુ ભજમન
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Sthalsthal">
                  સ્થળ સ્થળ મહીં
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Vishvambhari">
                  વિશ્વંભરી સ્તુતિ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Gayatrichalisa">
                  मां गायत्री चालीसा
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Dattbavni">
                  દત્ત બાવની
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Barjyotirling">
                  દ્વાદશજ્યોતિર્લિઙ્ગસ્મરણમ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Chhand">
                  માતાજીના છંદ - અમીચંદ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container py-3 fs-4" style={{ background: "#f3d6d7" }}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
