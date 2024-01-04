import { useProgress } from "@react-three/drei";
import { usePlay } from "../contexts/Play";
import logo from "../assets/images/logo.svg";

export const Overlay = () => {
  const { progress } = useProgress();
  const { play, end, setPlay, hasScroll } = usePlay();
  return (
    <div
      className={`overlay ${play ? "overlay--disable" : ""}
    ${hasScroll ? "overlay--scrolled" : ""}`}
    >
      {progress === 100 && (
        <div className={`intro ${play ? "intro--disappear" : ""}`}>
          <h1 className="logo">
            <img alt="logo" src={logo} />
          </h1>
          <div id="smooth-container">
            <div id="smooth-content">
              <main>
                <section className="logo hero show-after-load position-relative">
                  <div className="container position-relative">
                    <div className="row min-vh-100 align-items-center">
                      <div className="col-12">
                        <div
                          id="row-content"
                          className="row h-full align-items-center justify-content-center justify-content-lg-start pt-4 pb-16 pt-md-28 pb-md-10 pb-md-24"
                        >
                          <div className="col-12 col-lg-6 col-xl-5 offset-xl-1 order-2 order-lg-1 text-center text-lg-left mt-4 text-white">
                            <h1 className="px-6 px-sm-0 pr-lg-12">
                              Unleashing Precise Aftermarket Solutions
                            </h1>
                            <div className="mt-5 mt-md-4 mt-lg-12">
                              <a
                                className="hover:arrow-translate-x d-inline-flex align-items-center font-weight-medium text-white font-weight-bold d-inline-flex align-items-center"
                                href="#"
                                onClick={() => {
                                  setPlay(true);
                                }}
                              >
                                <span>Explore</span>
                                <svg
                                  className="arrow-right transition ml-3 mt-1 h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4 12H20"
                                    stroke="currentColor"
                                  ></path>
                                  <path
                                    d="M14.5 6L20.5 12L14.5 18"
                                    stroke="currentColor"
                                  ></path>
                                </svg>
                              </a>
                            </div>
                          </div>
                          <div className="col-11 col-sm-6 col-md-9 col-lg-6 col-xl-5 order-1 order-lg-2 mb-md-4 mb-lg-0">
                            <div>
                              <div className="w-full h-full transition position-relative">
                                <img alt="logo" src={logo} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </div>
          <p className="intro__scroll">Scroll to explore</p>
        </div>
      )}
      <div className={`outro ${end ? "outro--appear" : ""}`}>
        <p className="outro__text">Have a Safe Flight!</p>
      </div>
    </div>
  );
};
