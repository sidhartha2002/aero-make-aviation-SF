import {usePlay} from "../contexts/Play.jsx";
import logo from '../assets/images/logo.svg'

export const Header = () => {
	const {setMenu} = usePlay();

	return (
		<header className="position-relative">
			<nav className="navbar w-full position-relative theme-light">
				<div
					className="desktop-menu position-fixed top-0 left-0 right-0 bg-white border-bottom pointer-events-nonee">
					<div className="navbar-fixed">
						<div className="mt-18">
							<div className="row">
								<div className="col-10 offset-2">
									<div className="pt-10 pl-6 pb-2 child-menu-wrapper"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="navbar-fixed position-fixed w-full">
					<div className="row justify-content-between align-items-center">
						<div className="col-2">
							<a className=" d-block w-30" href="/">
								<img src={logo}/>
							</a>
						</div>
						<div className="col-8">
							<ul className="d-none d-lg-table items transition-sm list-unstyled mb-0 py-2">
								<li className="d-inline-block leading-none px-6 px-2xl-8 fs-lg">
									<a className="nav-link-item" href="#" onClick={() => setMenu('About')}>About</a>
								</li>
								<li className="d-inline-block leading-none px-6 px-2xl-8 fs-lg">
									<a className="nav-link-item" href="#" onClick={() => setMenu('Parts')}>Parts</a>
								</li>
								<li className="d-inline-block leading-none px-6 px-2xl-8 fs-lg">
									<a className="nav-link-item" href="#"
									   onClick={() => setMenu('Services')}>Services</a></li>
								<li className="d-inline-block leading-none px-6 px-2xl-8 fs-lg">
									<a className="nav-link-item" href="#" onClick={() => setMenu('Quality')}>Quality</a>
								</li>
							</ul>
						</div>
						<div className="col-2 d-flex justify-content-end">
							<div className="d-inline d-lg-none">
								<div className="toggle float-right py-3 py-md-4 pl-4 cursor-pointer pointer-events-all">
									<div className="top transition" data-cursor="rgb(255, 255, 255)"></div>
									<div className="bottom transition" data-cursor="rgb(255, 255, 255)"></div>
								</div>
							</div>
							<span className="">
                            <a className="d-none d-lg-block fs-lg nav-link-item"
                               href="#" onClick={() => setMenu('Contact')}>Contact Us</a>
                        </span>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};
