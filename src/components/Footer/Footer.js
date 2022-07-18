import "./Footer.css";
import React from "react";
import { textAlign } from "@mui/system";
export default function Footer() {
  return (
    <>
      <footer class="footer" id="resources">
        <div class="container">
          {/* <!-- Website Logo --> */}
          <div class="logo">
            <h4 className="contact">Contact Us:</h4>
            <a href="mailto:alhan.kaypour@gmail.com" style={{ color: "gray" }}>
              alhan.kaypour@gmail.com
            </a>
          </div>
          {/* <!-- Quick Links --> */}
          <div class="quick-links">
            <div class="links-group">
              <span>Features</span>
              <div>
                <a href="#">Link Shortening</a>
                <a href="#">Branded Links</a>
                <a href="#">Analytics</a>
              </div>
            </div>
            <div class="links-group">
              <span>Resources</span>
              <div>
                <a href="#">Blog</a>
                <a href="#">Developers</a>
                <a href="#">Support</a>
              </div>
            </div>
            <div class="links-group">
              <span>Company</span>
              <div>
                <a href="#">About</a>
                <a href="#">Our Team</a>
                <a href="#">Careers</a>
              </div>
            </div>
          </div>
          {/* <!-- Social Media --> */}
          <div class="social-media">
            <a href="#">
              <img
                src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-facebook.svg"
                alt="Facebook Logo"
              ></img>{" "}
            </a>
            <a href="#">
              <img
                src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-twitter.svg"
                alt="Twitter Logo"
              ></img>
            </a>
            <a href="#">
              <img
                src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-pinterest.svg"
                alt="Pinterest Logo"
              ></img>{" "}
            </a>
            <a href="#">
              <img
                src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-instagram.svg"
                alt="Instagram Logo"
              ></img>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
