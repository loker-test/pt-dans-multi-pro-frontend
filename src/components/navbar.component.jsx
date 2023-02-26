import {Container, Navbar, NavbarBrand} from "reactstrap";
import {Navigate} from "react-router-dom";

export default function NavbarComponent({backButton}) {
  return (
    <>
      <Navbar className="" style={{backgroundColor: "#427fbe"}}>
        <NavbarBrand href="/" className="text-white">
          <span className="fw-bolder">GitHub</span> Jobs
        </NavbarBrand>
      </Navbar>
      <Container className="mb-3">
        {backButton && (
          <div>
            <a href={'/'} className="btn fw-bold text-info">Back</a>
          </div>
        )}
      </Container>
    </>
  )
}
