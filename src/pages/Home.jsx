import React, { useContext, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Image,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import Logo from "../assets/logos/logo";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import day from "../assets/icons/day.png";
import night from "../assets/icons/night.png";

const Home = () => {
  const { comparableProducts, theme, setTheme } = useContext(ProductsContext);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    navigate("/productdetails");
    // eslint-disable-next-line
  }, []);

  const links = [
    {
      name: "Home",
      link: "#home",
    },
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
  ];

  const handleNavigation = () => {
    if (comparableProducts?.length >= 2) {
      navigate("/compareproducts");
    } else {
      alert("Please add two or more products for comparison");
    }
  };

  return (
    <div className={theme === "light" ? "" : "dark"}>
      {/* Navbar */}
      <Navbar
        className={theme === "light" ? "primary" : "dark"}
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand href="#home">
            <Logo />
          </Navbar.Brand>
          <Nav className="me-auto">
            {links?.map((item, index) => (
              <Nav.Link
                key={index}
                className={`${
                  theme === "light" ? "text-dark" : "active"
                } text-medium`}
                href={item?.link}
              >
                {item?.name}
              </Nav.Link>
            ))}
          </Nav>
          <Button
            variant="outline-light"
            className="ms-auto"
            onClick={() => {
              setTheme(theme !== "dark" ? "dark" : "light");
            }}
          >
            <Image src={theme === "dark" ? night : day} />
          </Button>
        </Container>
      </Navbar>
      {/* Sidebar */}
      <Container fluid>
        <Row>
          <Col
            xs={3}
            id="sidebar-wrapper"
            className={theme === "light" ? "primary" : "dark"}
          >
            <Nav className="flex-column mb-4 mt-2">
              <Nav.Link
                className={`${
                  theme === "light" ? "text-dark" : "text-white"
                } text-medium ${
                  location?.pathname === "/productdetails"
                    ? "underline-text"
                    : ""
                }`}
                as={Link}
                to="/productdetails"
              >
                Product Details
              </Nav.Link>
              <hr className="divider" />
              <Nav.Link
                className={`${
                  theme === "light" ? "text-dark" : "text-white"
                } text-medium ${
                  location?.pathname === "/compareproducts"
                    ? "underline-text"
                    : ""
                }`}
                onClick={handleNavigation}
              >
                Compare Products Page
              </Nav.Link>
            </Nav>
          </Col>
          <Col xs={9} id="page-content-wrapper">
            <div className="content">
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
