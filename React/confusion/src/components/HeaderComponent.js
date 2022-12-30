import { Navbar, NavbarBrand, Jumbotron } from "reactstrap";

const Header = () => {
  return (
    <>
      <Navbar dark>
        <div className="container">
          <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
        </div>
      </Navbar>
      <Jumbotron>
        <div className="container">
          <div className="row row-header">
            <div className="col-12 col-sm-6">
              <h1>Ristorante Con Fusion</h1>
              <p>
                We take inspiration from the world's best cuisines, and create a
                unique fusion experience. Our lipsmacking creation will tickle
                your culinary senses !!
              </p>
            </div>
          </div>
        </div>
      </Jumbotron>
    </>
  );
};

export default Header;
