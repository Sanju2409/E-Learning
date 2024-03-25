// import './App.css';
// import './footer.css';
// const Footer = () => {
//     return (
//         <nav className="newnav">
//             <footer>
//                 {/* <div className="footermain"> */}

//                 <div className="footer-col">
//                     <h4>products</h4>
//                     <ul style={{ margin: 0, padding: 0 }}>
//                         <li style={{ marginBottom: '10px' }}>
//                             <a
//                                 href="#"
//                                 style={{
//                                     display: 'block',
//                                     textDecoration: 'none',
//                                     color: '#bdb6b6',
//                                 }}
//                             >
//                                 teams
//                             </a>
//                         </li>
//                         <li style={{ marginBottom: '10px' }}>
//                             <a
//                                 href="#"
//                                 style={{
//                                     display: 'block',
//                                     textDecoration: 'none',
//                                     color: '#bdb6b6',
//                                 }}
//                             >
//                                 advertising
//                             </a>
//                         </li>
//                         <li style={{ marginBottom: '10px' }}>
//                             <a
//                                 href="#"
//                                 style={{
//                                     display: 'block',
//                                     textDecoration: 'none',
//                                     color: '#bdb6b6',
//                                 }}
//                             >
//                                 talent
//                             </a>
//                         </li>
//                     </ul>
//                 </div>
//                 <div className="footer-col">
//                     <h4>network</h4>
//                     <ul>
//                         <li>
//                             <a href="#">technology</a>
//                         </li>
//                         <li>
//                             <a href="#">science</a>
//                         </li>
//                         <li>
//                             <a href="#">business</a>
//                         </li>
//                         <li>
//                             <a href="#">professional</a>
//                         </li>
//                         <li>
//                             <a href="#">API</a>
//                         </li>
//                     </ul>
//                 </div>
//                 <div className="footer-col">
//                     <h4>company</h4>
//                     <ul>
//                         <li>
//                             <a href="#">about</a>
//                         </li>
//                         <li>
//                             <a href="#">legal</a>
//                         </li>
//                         <li>
//                             <a href="#">contact us</a>
//                         </li>
//                     </ul>
//                 </div>
//                 <div className="footer-col">
//                     <h4>follow us</h4>
//                     <div className="links">
//                         <a href="#">
//                             <i className="fab fa-linkedin-in"></i>
//                         </a>
//                         <a href="#">
//                             <i className="fab fa-facebook-f"></i>
//                         </a>
//                         <a href="#">
//                             <i className="fab fa-twitter"></i>
//                         </a>
//                         <a href="#">
//                             <i className="fab fa-instagram"></i>
//                         </a>
//                     </div>
//                 </div>
//                 {/* </div> */}
//             </footer>
//         </nav>
//     );
// };

// export default Footer;


import './App.css';

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import "./Footer.css";

const footerQuickLinks = [
  {
    display: "Home",
    url: "#",
  },
  {
    display: "About US",
    url: "#",
  },

  {
    display: "Courses",
    url: "#",
  },

  {
    display: "Blog",
    url: "#",
  },
];

const footerInfoLinks = [
  {
    display: "Privacy Policy",
    url: "#",
  },
  {
    display: "Membership",
    url: "#",
  },

  {
    display: "Purchases Guide",
    url: "#",
  },

  {
    display: "Terms of Service",
    url: "#",
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3" md="6" className="mb-4">
            <h2 className=" d-flex align-items-center gap-1">
              <i class="ri-pantone-line"></i> Learners.
            </h2>

            <div className="follows">
              <p className="mb-0">Follow us on social media</p>
              <span>
                {" "}
                <a href="facebook.com">
                  <i class="ri-facebook-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href="facebook.com">
                  <i class="ri-instagram-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href="facebook.com">
                  <i class="ri-linkedin-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href="facebook.com">
                  <i class="ri-twitter-line"></i>
                </a>
              </span>
            </div>
          </Col>

          <Col lg="3" md="6" className="mb-4">
            <h6 className="fw-bold">Explore</h6>
            <ListGroup className="link__list">
              {footerQuickLinks.map((item, index) => (
                <ListGroupItem key={index} className="border-0 ps-0 link__item">
                  {" "}
                  <a href={item.url}>{item.display}</a>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3" md="6" className="mb-4">
            <h6 className="fw-bold">Information</h6>
            <ListGroup className="link__list">
              {footerInfoLinks.map((item, index) => (
                <ListGroupItem key={index} className="border-0 ps-0 link__item">
                  {" "}
                  <a href={item.url}>{item.display}</a>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3" md="6">
            <h6 className="fw-bold">Get in Touch</h6>

            <p>Address: Sylhet, Bangladesh</p>
            <p> Phone: +88 0123456789 </p>
            <p>Email: example@gmail.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;