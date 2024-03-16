import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { TokenExpired } from "../../config/tokenDecoded";

const Header = () => {
  const token = TokenExpired();
  const Logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      <header className="bg-white shadow-[0_3px_8px_rgba(0,0,0,0.1)] fixed w-full top-0 z-[999] px-[40px]">
        <nav className="py-4 flex justify-between items-center">
          <a
            href=""
            className="nav-logo text-xl font-bold text-gray-500 cursor-pointer"
          >
            E-A-T
          </a>
          <div className="flex gap-4">
            <div className="">
              {token ? (
                <Button
                  outline
                  gradientDuoTone="greenToBlue"
                  className="uppercase"
                  onClick={Logout}
                >
                  Logout
                </Button>
              ) : (
                <a to="/auth">
                  <Button
                    outline
                    gradientDuoTone="greenToBlue"
                    className="uppercase"
                  >
                    Login
                  </Button>
                </a>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
