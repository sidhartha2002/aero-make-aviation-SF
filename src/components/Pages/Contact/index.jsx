import {usePlay} from "../../../contexts/Play.jsx";
import './contact.css'

export const Contact = () => {
	const {menu, setMenu} = usePlay();
	return (
		<div id="contactPage" className={`${menu && menu === 'Contact' ? "open" : ""}`} onClick={(e) => {
			if (!['INPUT', 'TEXTAREA', 'BUTTON', 'SPAN'].includes(e.target.tagName)) {
				setMenu(null)
			}
		}
		}>
			<div className="pt-36 d-flex flex-wrap flex-lg-nowrap">
				<div className="fs-2xl mx-auto pl-lg-8 title">Send us a quick message and
					we’ll get back to you as soon as possible
				</div>
			</div>
			<div className="d-flex flex-column flex-lg-row overflow-hidden">

				<div className="w-full pl-lg-8 my-12">
					<div className="container">
						<form data-hs-cf-bound="true"><h1 className="text-center mb-12 d-lg-none">Get in touch</h1>
							<div className="d-flex flex-wrap flex-lg-nowrap"><input
								className="form-control flex-grow-1 mr-lg-4"
								placeholder="First Name" type="text"
							/><input
								className="form-control flex-grow-1 ml-lg-4 mt-8 mt-lg-0" placeholder="Last Name"
								type="text"
							/></div>
							<input className="form-control w-full mt-8" placeholder="Email" type="email"/><input
								className="form-control w-full mt-8" placeholder="Company name" type="text"/><textarea
								className="form-control w-full mt-8" placeholder="Additional message"
								rows="5"></textarea>
							<button className="btn position-relative btn-black mt-8 w-full text-center" type="submit">
								<span>Send request for contact</span></button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
