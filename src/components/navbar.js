import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoDark from "../assect/images/logo-dark.png";
import logoLight from "../assect/images/logo-light.png";
import { useSelector } from "react-redux";
import ProfileOption from "./profleOption";
import { FiSearch, FiUser, BsMessenger } from "../assect/icons/vander";

export default function Navbar({ navClass, logolight, menuClass }) {
  const [scroll, setScroll] = useState(false);
  const [isMenu, setisMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const { notificationsDB } = useSelector((state) => state.notification);
  const location = useLocation(); // Hook to detect URL changes

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    activateMenu();
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
    const closeDropdown = () => {
      setModal(false);
    };
    document.addEventListener("mousedown", closeDropdown);
    // window.scrollTo(0, 0);
  }, [location]);

  var mybutton = document.getElementById("back-to-top");
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (mybutton != null) {
      if (
        document.body.scrollTop > 500 ||
        document.documentElement.scrollTop > 500
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
  }

  // Toggle menu
  const toggleMenu = () => {
    setisMenu(!isMenu);
    if (document.getElementById("navigation")) {
      const anchorArray = Array.from(
        document.getElementById("navigation").getElementsByTagName("a")
      );
      anchorArray.forEach((element) => {
        element.addEventListener("click", (elem) => {
          const target = elem.target.getAttribute("href");
          if (target !== "") {
            if (elem.target.nextElementSibling) {
              var submenu = elem.target.nextElementSibling.nextElementSibling;
              submenu.classList.toggle("open");
            }
          }
        });
      });
    }
  };
  function getClosest(elem, selector) {
    // Element.matches() polyfill
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(
              s
            ),
            i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1;
        };
    }

    // Get the closest matching element
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches(selector)) return elem;
    }
    return null;
  }
  function activateMenu() {
    // Get all menu items
    const menuItems = document.getElementsByClassName("sub-menu-item");

    if (menuItems) {
      // Remove "active" class from all menu items and their parents
      Array.from(menuItems).forEach((item) => {
        item.classList.remove("active");
        const immediateParent = getClosest(item, "li");
        if (immediateParent) {
          immediateParent.classList.remove("active");
        }

        const childParent = getClosest(item, ".child-menu-item");
        if (childParent) {
          childParent.classList.remove("active");
        }

        const parentMenu = getClosest(item, ".parent-menu-item");
        if (parentMenu) {
          parentMenu.classList.remove("active");
        }

        const parentParent = getClosest(item, ".parent-parent-menu-item");
        if (parentParent) {
          parentParent.classList.remove("active");
        }
      });

      // Find the matching menu item for the current URL
      let matchingMenuItem = null;
      for (let idx = 0; idx < menuItems.length; idx++) {
        if (menuItems[idx].href === window.location.href) {
          matchingMenuItem = menuItems[idx];
          break;
        }
      }

      // Apply "active" class to the matched menu item and its parents
      if (matchingMenuItem) {
        matchingMenuItem.classList.add("active");

        const immediateParent = getClosest(matchingMenuItem, "li");
        if (immediateParent) {
          immediateParent.classList.add("active");
        }

        const childParent = getClosest(immediateParent, ".child-menu-item");
        if (childParent) {
          childParent.classList.add("active");
        }

        const parentMenu = getClosest(
          childParent || immediateParent,
          ".parent-menu-item"
        );
        if (parentMenu) {
          parentMenu.classList.add("active");

          const parentMenuItem = parentMenu.querySelector(".menu-item");
          if (parentMenuItem) {
            parentMenuItem.classList.add("active");
          }

          const parentParent = getClosest(
            parentMenu,
            ".parent-parent-menu-item"
          );
          if (parentParent) {
            parentParent.classList.add("active");
          }
        } else {
          const parentParent = getClosest(
            matchingMenuItem,
            ".parent-parent-menu-item"
          );
          if (parentParent) {
            parentParent.classList.add("active");
          }
        }
      }
    }
  }

  return (
    <>
      <header id="topnav" className={`nav-sticky  ${navClass}`}>
        <div className="container">
          {logolight === true ? (
            <Link className="logo" to="/">
              <span className="logo-light-mode">
                <img src={logoDark} className="l-dark" alt="" />
                <img src={logoLight} className="l-light" alt="" />
              </span>
              <img src={logoLight} className="logo-dark-mode" alt="" />
            </Link>
          ) : (
            <Link className="logo" to="/">
              <img src={logoDark} className="logo-light-mode" alt="" />
              <img src={logoLight} className="logo-dark-mode" alt="" />
            </Link>
          )}

          <div className="menu-extras">
            <div className="menu-item">
              <Link
                className={`navbar-toggle ${isMenu ? "open" : ""}`}
                id="isToggle"
                onClick={() => toggleMenu()}
              >
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </Link>
            </div>
          </div>

          <ul className="buy-button list-inline mb-0">
            {currentUser && (
              <li className="list-inline-item ps-1 mb-0">
                <Link to="/message" className="text-decoration-none">
                  <span className="relative">
                    <BsMessenger
                      className="z-10 text-primary"
                      style={{ fontSize: "2rem" }}
                    />
                    {notificationsDB.length === 0 ? (
                      <span className="absolute top-0 start-100 translate-middle badge rounded-pill bg-success text-white small">
                        New
                      </span>
                    ) : (
                      <span className="absolute top-0 start-100 translate-middle badge rounded-pill bg-danger text-white small">
                        {notificationsDB.length}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            )}
            <li className="list-inline-item ps-1 mb-0">
              {currentUser ? (
                <ProfileOption user={currentUser} />
              ) : (
                <li className="mr-6">
                  <Link
                    to="/login"
                    className="btn btn-sm btn-icon btn-pills btn-primary"
                  >
                    <FiUser className="icons" />
                  </Link>
                </li>
              )}
            </li>
          </ul>

          <div id="navigation" style={{ display: isMenu ? "block" : "none" }}>
            <ul className={menuClass}>
              <li>
                <Link to="/rent" className="sub-menu-item">
                  Rent
                </Link>
              </li>

              <li>
                <Link to="/sale" className="sub-menu-item">
                  Sale
                </Link>
              </li>

              <li>
                <Link to="/commercial" className="sub-menu-item">
                  Commercial
                </Link>
              </li>

              <li>
                <Link to="/residential" className="sub-menu-item">
                  Residential
                </Link>
              </li>
              <li>
                <Link to="/contactus" className="sub-menu-item">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}
