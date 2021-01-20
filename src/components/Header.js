import React from "react";
import "./Header.css";
import Button from "./Button";

import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <div className="header_logo">
          <img
            src="https://media1.thehungryjpeg.com/thumbs2/ori_3809182_ovmcut3mx7mngypwitwglmb2q62k2lcfrz2848s5_monogram-xb-logo-design.jpg"
            alt="LOGO"
          />
        </div>
      </div>
      <div className="header__center">
        <div className="header__title">
          <h1>XEROX BILLING</h1>
        </div>
      </div>
      <div className="header__right">
        <div className="header__signIn">
          <Link to="/login">
            <Button text="SIGN IN" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
