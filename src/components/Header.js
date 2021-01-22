import React from "react";
import "./Header.css";
import Button from "./Button";

import { Link, useHistory } from "react-router-dom";

import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";

function Header() {
  const history = useHistory();

  const [{ user }, dispatch] = useStateValue();

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
      history.push("/");
    } else {
      history.push("/login");
    }
  };

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
          <span>Hello {!user ? "Guest" : user.email}</span>
          <Link>
            <Button
              text={user ? "Sign Out" : "Sign In"}
              callback={handleAuthenticaton}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
