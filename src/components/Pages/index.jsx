import {gsap} from "gsap";
import {useLayoutEffect, useRef} from "react";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {usePlay} from "../../contexts/Play.jsx";
import Splitting from "splitting";

gsap.registerPlugin(ScrollTrigger);

import './page.css'
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

import image1 from '../../assets/images/01.Trusted Global Partner.jpg';
import image2 from '../../assets/images/02.Operational Excellence.jpg';
import image3 from '../../assets/images/03.Innovative Solutions.jpg';
import image4 from '../../assets/images/04.Tailored Precision Service.jpg';
import image5 from '../../assets/images/05.Customer Experience.jpg';

Splitting({by: 'chars'});

class Item {
	DOM = {
		el: null,
		caption: null,
		imageWrap: null,
		image: null,
		imageInner: null,
		title: null,
		titleInner: null,
		number: null,
		numberInner: null,
		description: null,
	};

	/**
	 * Constructor.
	 * @param {Element} DOM_el - main element (.item)
	 */
	constructor(DOM_el) {
		this.DOM.el = DOM_el;
		this.DOM.caption = this.DOM.el.querySelector('.parts-item__caption');
		this.DOM.imageWrap = this.DOM.el.querySelector('.parts-item__image-wrap');
		this.DOM.image = this.DOM.el.querySelector('.parts-item__image');
		this.DOM.imageInner = this.DOM.image?.querySelector('.parts-item__image-inner');
		this.DOM.title = this.DOM.el.querySelector('.parts-item__caption-title');
		this.DOM.titleInner = this.DOM.title.querySelector('.oh__inner');
		this.DOM.number = this.DOM.el.querySelector('.parts-item__caption-number');
		this.DOM.numberInner = this.DOM.number.querySelector('.oh__inner');
		this.DOM.description = this.DOM.el.querySelector('.parts-item__caption-description');
	}
}

export const Pages = () => {
	const pageRef = useRef();
	const servicesPageRef = useRef();
	const qualityPageRef = useRef();
	const partsPageRef = useRef();
	const aboutPageRef = useRef();
	const {menu, setMenu, play} = usePlay();

	useLayoutEffect(() => {
		let ctx = gsap.context(() => {
			const items = [];
			[...document.querySelectorAll('.parts-content .parts-item')].forEach(item => {
				items.push(new Item(item));
			});

			if (menu) {
				if (menu === 'Contact') return;
				if (!play) {
					document.querySelector('.intro').style.visibility = 'hidden'
				}
				const panels1 = gsap.utils.toArray("#slider1-container .panel");
				const panels2 = gsap.utils.toArray("#slider2-container .panel");

				let panels;
				let trigger;
				let p = {
					deltaX: 0
				}

				servicesPageRef.current.style.display = 'none';
				qualityPageRef.current.style.display = 'none';
				partsPageRef.current.style.display = 'none';
				aboutPageRef.current.style.display = 'none';

				if (menu === 'Services') {
					trigger = "#slider1-container"
					panels = panels1
				} else if (menu === 'Quality') {
					trigger = "#slider2-container"
					panels = panels2
				}

				if (menu === 'Parts' || menu === 'About') {
					for (const item of items) {
						if (item.DOM.imageInner) {
							gsap.set(item.DOM.imageInner, {transformOrigin: '50% 0%'});
						}

						const timeline = gsap.timeline({
							scrollTrigger: {
								trigger: item.DOM.el,
								start: 'top bottom',
								end: 'bottom top',
								scrub: true
							}
						}).addLabel('start', 0);

						if (item.DOM.imageInner) {
							timeline.to(item.DOM.imageInner, {
								ease: 'none',
								scaleY: 2.4,
								scaleX: 1.2,
								opacity: 0
							}, 'start')
						}


						if (item.DOM.el !== item.DOM.el.parentNode.firstElementChild) {
							timeline.to([item.DOM.title, item.DOM.number], {
								ease: 'none',
								yPercent: -150,
							}, 'start')
							timeline.to([item.DOM.titleInner, item.DOM.numberInner], {
								scrollTrigger: {
									trigger: item.DOM.el,
									start: 'top bottom',
									end: 'top 20%',
									scrub: true,
								},
								ease: 'expo.in',
								yPercent: -100
							}, 'start')
						}


					}

					const fx25Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect25]')];
					const fx28Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect28]')];

					fx25Titles.forEach(title => {

						gsap.fromTo(title.querySelectorAll('.char'), {
								'will-change': 'transform',
								transformOrigin: '50% 100%',
								scaleY: 0
							},
							{
								ease: 'power3.in',
								opacity: 1,
								scaleY: 1,
								stagger: 0.05,
								scrollTrigger: {
									trigger: title,
									start: 'center center',
									end: '+=500%',
									scrub: true,
									pin: title.parentNode,
								}
							});

					});
					fx28Titles.forEach(title => {

						const words = [...title.querySelectorAll('.word')];

						for (const word of words) {

							const chars = word.querySelectorAll('.char');
							const charsTotal = chars.length;

							gsap.fromTo(chars, {
									'will-change': 'transform, filter',
									transformOrigin: '50% 100%',
									scale: position => {
										const factor = position < Math.ceil(charsTotal / 2) ? position : Math.ceil(charsTotal / 2) - Math.abs(Math.floor(charsTotal / 2) - position) - 1;
										return gsap.utils.mapRange(0, Math.ceil(charsTotal / 2), 0.5, 2.1, factor);
									},
									y: position => {
										const factor = position < Math.ceil(charsTotal / 2) ? position : Math.ceil(charsTotal / 2) - Math.abs(Math.floor(charsTotal / 2) - position) - 1;
										return gsap.utils.mapRange(0, Math.ceil(charsTotal / 2), 0, 60, factor);
									},
									rotation: position => {
										const factor = position < Math.ceil(charsTotal / 2) ? position : Math.ceil(charsTotal / 2) - Math.abs(Math.floor(charsTotal / 2) - position) - 1;
										return position < charsTotal / 2 ? gsap.utils.mapRange(0, Math.ceil(charsTotal / 2), -4, 0, factor) : gsap.utils.mapRange(0, Math.ceil(charsTotal / 2), 0, 4, factor);
									},
									filter: 'blur(12px) opacity(0)',
								},
								{
									ease: 'power2.inOut',
									y: 0,
									rotation: 0,
									scale: 1,
									filter: 'blur(0px) opacity(1)',
									scrollTrigger: {
										trigger: word,
										start: 'top bottom+=40%',
										end: 'top top+=15%',
										scrub: true,
									},
									stagger: {
										amount: 0.15,
										from: 'center'
									}
								});

						}

					});
				}

				if (menu === 'Services' || menu === 'Quality') {
					partsPageRef.current.style.display = 'none';
					aboutPageRef.current.style.display = 'none';
					const headingItems = [];
					[...document.querySelectorAll('.heading__anim .mask-split-line')].forEach(item => {
						headingItems.push(item);
					});

					const heading1CharItems = [];
					[...document.querySelectorAll('.heading__noanim.first .mask-split-line .char')].forEach(item => {
						heading1CharItems.push(item);
					});

					let animation = gsap.timeline({})
					animation.from(heading1CharItems, {
						opacity: 0,
						y: 100,
						stagger: {
							from: "start",
							each: 0.05
						},
						onComplete: () => {
							gsap.to(p, {
								deltaX: 100,
								duration: 2,
								onUpdate: () => {
									headingItems.forEach(item => {
										item.style.clipPath = `polygon(0% 0%, ${p.deltaX}% 0%, ${p.deltaX}% 100%, 0% 100%)`;
									});
								}
							})
						}
					})

					gsap.to(panels, {
						xPercent: -100 * (panels.length - 1),
						ease: "none", // <-- IMPORTANT!
						scrollTrigger: {
							start: "top top",
							trigger: trigger,
							pin: true,
							scrub: 1,
							inertia: false,
							delay: 0,
							duration: 0.1,
							snap: 1 / (panels.length - 1),
							//snap: directionalSnap(1 / (sections.length - 1)),
							end: () => "+=" + document.querySelector(trigger).offsetWidth
						}
					});
				}

			} else {
				if (!play && document.querySelector('.intro')) {
					document.querySelector('.intro').style.visibility = 'visible'
				}
			}

		}, pageRef);
		return () => ctx.revert();
	}, [menu, play]);

	return (
		<div ref={pageRef} onClick={() => setMenu(null)}>
			<div id="aboutPage" ref={aboutPageRef} className={`panels ${menu && menu === 'About' ? "show" : ""}`}>
				<div className="heading">
					<h2 className="heading__main">About</h2>
					<span className="heading__sub"></span>
				</div>
				<div className="parts-content">
					<figure className="parts-item">
						<figcaption className="parts-item__caption">
					      <span className="parts-item__caption-number oh">
					        <span className="oh__inner"/>
					      </span>
							<h2 className="parts-item__caption-title oh">
								<span className="oh__inner"></span>
							</h2>
							<p className="parts-item__caption-description">
								Aeromake Aviation, a stalwart in the aviation industry with decades of experience, has
								established itself as a distinguished provider of comprehensive aircraft materials
								support services. With a relentless commitment to excellence, Aeromake Aviation has
								navigated the dynamic and demanding aviation landscape, emerging as a trusted partner
								for a global clientele.
							</p>
						</figcaption>
					</figure>
					<figure className="parts-item">
						<figcaption className="parts-item__caption">
      <span className="parts-item__caption-number oh">
        <span className="oh__inner"/>
      </span>
							<h2 className="parts-item__caption-title oh">
        <span className="oh__inner">
          A Broad and Esteemed Client Base
        </span>
							</h2>
							<p className="parts-item__caption-description">
								At the heart of Aeromake Aviation's success lies its esteemed customer base, consisting
								of the industry's most prominent players. Leading commercial airlines, cargo carriers,
								regional operators, and MROs have all turned to Aeromake Aviation for their aviation
								material needs. This diverse clientele reflects the company's unwavering dedication to
								quality and its ability to cater to the unique requirements of a wide array of aviation
								enterprises.
							</p>
						</figcaption>
					</figure>
					<figure className="parts-item">
						<figcaption className="parts-item__caption">
      <span className="parts-item__caption-number oh">
        <span className="oh__inner"/>
      </span>
							<h2 className="parts-item__caption-title oh">
								<span className="oh__inner">Operational Excellence through Experience</span>
							</h2>
							<p className="parts-item__caption-description">
								Aeromake Aviation's journey to excellence is underpinned by its rich and extensive
								experience in the aviation sector. This experience has allowed the company to develop
								and fine-tune its suite of services, resulting in unmatched support for aircraft
								inventory and top-tier component services. Their comprehensive offerings are designed to
								ensure that the wheels of aviation keep turning smoothly.


							</p>
						</figcaption>
					</figure>
					<figure className="parts-item">
						<figcaption className="parts-item__caption">
      <span className="parts-item__caption-number oh">
        <span className="oh__inner"/>
      </span>
							<h2 className="parts-item__caption-title oh">
								<span className="oh__inner">Innovation as a Driving Force</span>
							</h2>
							<div className="parts-item__caption-description">
								Aeromake Aviation's dedication to innovation sets it apart in a competitive industry.
								The company continually pioneers groundbreaking solutions, harnessing its expertise to
								address the multifaceted challenges faced by its clients. These innovative approaches
								empower clients to achieve unprecedented levels of operational efficiency and
								excellence, driving them toward greater success.
							</div>
						</figcaption>
					</figure>
					<figure className="parts-item">
						<figcaption className="parts-item__caption">
      <span className="parts-item__caption-number oh">
        <span className="oh__inner"/>
      </span>
							<h2 className="parts-item__caption-title oh">
								<span className="oh__inner">Tailored Solutions for Unique Needs</span>
							</h2>
							<div className="parts-item__caption-description">
								Aeromake Aviation recognizes the pivotal role of reliable and efficient spares support
								in aviation operations. To this end, the company offers tailored solutions that are
								meticulously crafted to meet the specific needs of each client. Their team of seasoned
								professionals possesses in-depth knowledge and expertise, enabling them to optimize
								operational efficiency, minimize downtime, and maximize cost-effectiveness.
							</div>
						</figcaption>
					</figure>
					<figure className="parts-item">
						<figcaption className="parts-item__caption">
      <span className="parts-item__caption-number oh">
        <span className="oh__inner"/>
      </span>
							<h2 className="parts-item__caption-title oh">
								<span className="oh__inner">Exceptional Customer Service as a Hallmark</span>
							</h2>
							<div className="parts-item__caption-description">
								Aeromake Aviation's commitment to client satisfaction is engrained in every facet of its
								operations. The company's streamlined communication channels and dedicated customer
								service team ensure that client queries and requests are handled promptly and with
								utmost care. Aeromake Aviation excels in direct contact, prompt support, instant
								communication, low lead times, and competitive pricing, all contributing to a seamless
								and gratifying customer experience.
							</div>
						</figcaption>
					</figure>
					<figure className="parts-item">
						<figcaption className="parts-item__caption">
							<span className="parts-item__caption-number oh">
								<span className="oh__inner"/>
							</span>
							<h2 className="parts-item__caption-title oh">
								<span className="oh__inner"></span>
							</h2>
							<div className="parts-item__caption-description">
								Aeromake Aviation, a stalwart in the aviation industry with decades of experience, has
								established itself as a distinguished provider of comprehensive aircraft materials
								support services. With a relentless commitment to excellence, Aeromake Aviation has
								navigated the dynamic and demanding aviation landscape, emerging as a trusted partner
								for a global clientele.
							</div>
						</figcaption>
					</figure>
				</div>
			</div>
			<div id="partsPage" ref={partsPageRef} className={`panels ${menu && menu === 'Parts' ? "show" : ""}`}>
				<div className="heading">
					<h2 className="heading__main">Parts</h2>
					<span className="heading__sub"></span>
				</div>
				<div className="parts-content">
					<figure className="parts-item">
						<figcaption className="parts-item__caption">
							<span className="parts-item__caption-number oh">
								<span className="oh__inner"/>
							</span>
							<h2 className="parts-item__caption-title oh">
								<span className="oh__inner">
									Elevating Aviation Excellence: <br/> Your Trusted Partner for
									Aircraft Materials
								</span>
							</h2>
							<p className="parts-item__caption-description">
								Our unwavering commitment is to deliver excellence in aircraft materials
								supply, setting the standard for quality and performance in the aviation
								industry.
							</p>
						</figcaption>
						<div className="parts-item__image-wrap">
							<div className="parts-item__image">
								<div
									className="parts-item__image-inner"
									style={{
										backgroundImage: `url("${image1}")`
									}}
								/>
							</div>
						</div>
					</figure>
					<figure className="parts-item">
						<figcaption className="parts-item__caption">
      <span className="parts-item__caption-number oh">
        <span className="oh__inner"/>
      </span>
							<h2 className="parts-item__caption-title oh">
        <span className="oh__inner">
          Your Time, <br/>
          Our Priority
        </span>
							</h2>
							<p className="parts-item__caption-description">
								We recognize that in the world of aviation, time is of the essence. When
								you're in search of crucial aircraft materials, you can't afford delays
								or fruitless searches. That's why, at our state-of-the-art UAE
								warehouse, we maintain an extensive and ever-expanding inventory. Our
								mission is to empower your journey by offering efficient solutions that
								get you in the air with minimal downtime.
							</p>
						</figcaption>
						<div className="parts-item__image-wrap">
							<div className="parts-item__image">
								<div
									className="parts-item__image-inner"
									style={{
										backgroundImage: `url("${image2}")`
									}}
								/>
							</div>
						</div>
					</figure>
					<figure className="parts-item">
						<figcaption className="parts-item__caption">
      <span className="parts-item__caption-number oh">
        <span className="oh__inner"/>
      </span>
							<h2 className="parts-item__caption-title oh">
								<span className="oh__inner">Crafting Quality, Delivering Value</span>
							</h2>
							<p className="parts-item__caption-description">
								Aeromake Aviation stands out by consistently providing the highest
								quality products at the most competitive prices. Our pride lies in the
								exceptional customer service we offer and our lightning-fast order
								fulfillment. We are committed to ensuring a seamless experience for
								every client. Your voyage begins with us, where we turn your aspirations
								into aviation reality. Trust Aeromake Aviation for excellence in
								aircraft materials, repair, and upgrades. Let's take flight together and
								elevate your aviation experience to new heights!
							</p>
						</figcaption>
						<div className="parts-item__image-wrap">
							<div className="parts-item__image">
								<div
									className="parts-item__image-inner"
									style={{
										backgroundImage: `url("${image3}")`
									}}
								/>
							</div>
						</div>
					</figure>
					<figure className="parts-item">
						<figcaption className="parts-item__caption">
      <span className="parts-item__caption-number oh">
        <span className="oh__inner"/>
      </span>
							<h2 className="parts-item__caption-title oh">
								<span className="oh__inner">Rotables</span>
							</h2>
							<div className="parts-item__caption-description">
								<ul>
									<li>IDGs</li>
									<li>Pneumatic Valves</li>
									<li>Wheels &amp; Brakes</li>
								</ul>
								Our inventory comprises a vast selection of ready to-use key rotables,
								encompassing Airframe, Engine, and components for various aircraft
								platforms
							</div>
						</figcaption>
						<div className="parts-item__image-wrap">
							<div className="parts-item__image">
								<div
									className="parts-item__image-inner"
									style={{
										backgroundImage: `url("${image4}")`
									}}
								/>
							</div>
						</div>
					</figure>
					<figure className="parts-item">
						<figcaption className="parts-item__caption">
      <span className="parts-item__caption-number oh">
        <span className="oh__inner"/>
      </span>
							<h2 className="parts-item__caption-title oh">
								<span className="oh__inner">Tools &amp; Equipment</span>
							</h2>
							<div className="parts-item__caption-description">
								<ul>
									<li>General &amp; Special Hand Tools</li>
									<li>Aircraft Structure Tools</li>
									<li>Ground Support Equipment</li>
									<li>Engine Stands</li>
								</ul>
							</div>
						</figcaption>
						<div className="parts-item__image-wrap">
							<div className="parts-item__image">
								<div
									className="parts-item__image-inner"
									style={{
										backgroundImage: `url("${image5}")`
									}}
								/>
							</div>
						</div>
					</figure>
					<figure className="parts-item">
						<figcaption className="parts-item__caption">
      <span className="parts-item__caption-number oh">
        <span className="oh__inner"/>
      </span>
							<h2 className="parts-item__caption-title oh">
								<span className="oh__inner">Consumables &amp; Expendables</span>
							</h2>
							<div className="parts-item__caption-description">
								<ul>
									<li>Lubricants and oils</li>
									<li>Adhesives and sealants</li>
									<li>Nuts and bolts</li>
									<li>Cleaning compounds and chemicals</li>
								</ul>
							</div>
						</figcaption>
						<div className="parts-item__image-wrap">
							<div className="parts-item__image">
								<div
									className="parts-item__image-inner"
									style={{
										backgroundImage: `url("${image1}")`
									}}
								/>
							</div>
						</div>
					</figure>
				</div>

			</div>
			<div id="servicesPage" ref={servicesPageRef} className={`panels ${menu && menu === 'Services' ? "show" : ""}`}>
				<div id="slider1-container" className="panels-container" style={{width: "700%"}}>
					<div className="panel TextSection_text-section">
						<h2
							className="heading__noanim first Heading_heading masked-line"
							style={{width: "40%", marginLeft: '-50%'}}
							data-splitting=""
						>
							<div
								className="split-element split-lines mask-split-line text-outline"
								style={{display: "block", textAlign: "left", position: "relative"}}
							>
                              <span style={{display: "block", fontSize: 20}}>
                                Ensuring the optimal functionality of your aircraft parts is our unwavering commitment. We take pride in the meticulous approach we employ to repair your components to precise specifications, always meeting your specific requirements for turnaround times. Our dedicated team goes above and beyond, carefully selecting a qualified repair facility from our extensive network of vendors. This meticulous vetting process is integral to our promise of delivering high-quality service.
                              </span>
							</div>
						</h2>
						<h2
							className="heading__anim Heading_heading masked-line"
							style={{width: "40%", marginLeft: '-50%'}}
							data-splitting=""
						>
							<div
								className="split-element split-lines mask-split-line text-solid"
								style={{
									display: "block",
									textAlign: "left",
									position: "relative",
									visibility: "visible",
									clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
								}}
							>
                                <span style={{display: "block", fontSize: 20}}>
            Ensuring the optimal functionality of your aircraft parts is our unwavering commitment. We take pride in the meticulous approach we employ to repair your components to precise specifications, always meeting your specific requirements for turnaround times. Our dedicated team goes above and beyond, carefully selecting a qualified repair facility from our extensive network of vendors. This meticulous vetting process is integral to our promise of delivering high-quality service.
          </span>
							</div>
						</h2>
					</div>
					<div className="panel TextSection_text-section">
						<h2
							className="heading__noanim Heading_heading masked-line"
							style={{width: "25%", marginLeft: '-50%'}}
							data-splitting=""
						>

							<div
								className="split-element split-lines mask-split-line text-solid"
								style={{
									fontSize: 20,
									display: "block",
									lineHeight: "normal",
									textAlign: "left",
									position: "relative"
								}}
							>
								In our pursuit of excellence, we don't just stop at selecting the right facility; we
								also conduct a thorough review and assessment of all quotes. This diligence ensures that
								we not only meet but exceed your expectations with meticulous follow-through on every
								aspect of the repair process. We understand the importance of prompt delivery, and our
								commitment to efficiency is evident in every step we take.
							</div>
						</h2>
					</div>
					<div className="panel TextSection_text-section">
						<h2
							className="heading__noanim Heading_heading masked-line"
							style={{width: "25%", marginLeft: '-50%'}}
							data-splitting=""
						>

							<div
								className="split-element split-lines mask-split-line text-solid"
								style={{
									fontSize: 20,
									display: "block",
									lineHeight: "normal",
									textAlign: "left",
									position: "relative"
								}}
							>
								Our service extends comprehensively across all ATA chapters, covering Airframe, Engines,
								Auxiliary Power, Landing Gear, Avionics, Structural, and Safety Equipment. We place a
								strong emphasis on service excellence, offering swift turnaround times, competitive
								pricing solutions, and aiming for unparalleled levels of customer satisfaction. Your
								peace of mind is our priority, and we strive to deliver on our promises with consistency
								and reliability.
							</div>
						</h2>
					</div>
					<div className="panel TextSection_text-section">
						<h2
							className="heading__noanim Heading_heading masked-line"
							style={{width: "25%", marginLeft: '-50%'}}
							data-splitting=""
						>

							<div
								className="split-element split-lines mask-split-line text-solid"
								style={{
									fontSize: 20,
									display: "block",
									lineHeight: "normal",
									textAlign: "left",
									position: "relative"
								}}
							>
								By choosing us as your sole point of contact, you gain the advantage of a consolidated
								vendor management process. This strategic decision alleviates concerns on your end,
								allowing you to focus on other priorities with confidence. We aim to streamline the
								repair and maintenance process for you, providing not just a service but a partnership
								built on trust, efficiency, and customer satisfaction.
							</div>
						</h2>
					</div>

				</div>
			</div>
			<div id="qualityPage" ref={qualityPageRef} className={`panels ${menu && menu === 'Quality' ? "show" : ""}`}>
				<div id="slider2-container" className="panels-container" style={{width: "700%"}}>
					<div className="panel TextSection_text-section">
						<h2
							className="heading__noanim Heading_heading masked-line"

							data-splitting=""
						>
							<div
								className="split-element split-lines mask-split-line text-solid"
								style={{
									fontSize: 40,
									display: "block",
									lineHeight: "normal",
									textAlign: "left",
									position: "relative"
								}}
							>
								Vision
							</div>
							<div
								className="split-element split-lines mask-split-line text-solid"
								style={{
									fontSize: 20,
									display: "block",
									lineHeight: "normal",
									textAlign: "left",
									position: "relative"
								}}
							>
								Empowering airline operators to unlock the full potential of their aircraft fleet
								through exceptional precision aftermarket solutions
							</div>
						</h2>
					</div>
					<div className="panel TextSection_text-section">
						<h2
							className="heading__noanim Heading_heading masked-line"
							style={{}}
							data-splitting=""
						>
							<div
								className="split-element split-lines mask-split-line text-solid"
								style={{
									fontSize: 40,
									display: "block",
									lineHeight: "normal",
									textAlign: "left",
									position: "relative"
								}}
							>
								Mission
							</div>
							<div
								className="split-element split-lines mask-split-line text-solid"
								style={{
									fontSize: 20,
									display: "block",
									lineHeight: "normal",
									textAlign: "left",
									position: "relative"
								}}
							>
								Our mission is to revolutionize the aviation aftermarket support industry. We strive to
								be the premier provider of a comprehensive range of high-quality aircraft consumables,
								expendables, rotables, tools, and equipment.
							</div>
						</h2>
					</div>
					<div className="panel TextSection_text-section">
						<h2
							className="heading__noanim Heading_heading masked-line"
							style={{width: "50%"}}
							data-splitting=""
						>

							<div
								className="split-element split-lines mask-split-line text-solid"
								style={{
									fontSize: 20,
									display: "block",
									lineHeight: "normal",
									textAlign: "left",
									position: "relative"
								}}
							>
								We are committed to supplying the aviation industry with reliable and efficient
								solutions that meet their operational needs and exceed their expectations.
							</div>
						</h2>
					</div>
					<div className="panel TextSection_text-section">
						<h2
							className="heading__noanim Heading_heading masked-line"
							style={{}}
							data-splitting=""
						>

							<div
								className="split-element split-lines mask-split-line text-solid"
								style={{
									fontSize: 20,
									display: "block",
									lineHeight: "normal",
									textAlign: "left",
									position: "relative"
								}}
							>
								Through our unwavering dedication to excellence, we aim to ensure the smooth and safe
								operation of aircraft by delivering superior products and exceptional service.


							</div>
						</h2>
					</div>
					<div className="panel TextSection_text-section">
						<h2
							className="heading__noanim Heading_heading masked-line"
							style={{}}
							data-splitting=""
						>

							<div
								className="split-element split-lines mask-split-line text-solid"
								style={{
									fontSize: 20,
									display: "block",
									lineHeight: "normal",
									textAlign: "left",
									position: "relative"
								}}
							>
								With a focus on customer satisfaction, innovation, and industry expertise, we strive to
								be the trusted partner for all aviation supply requirements.
							</div>
						</h2>
					</div>
					<div className="panel TextSection_text-section">
						<h2
							className="heading__noanim Heading_heading masked-line"
							style={{}}
							data-splitting=""
						>

							<div
								className="split-element split-lines mask-split-line text-solid"
								style={{
									fontSize: 20,
									display: "block",
									lineHeight: "normal",
									textAlign: "left",
									position: "relative"
								}}
							>
								Through relentless innovation, we develop ground breaking solutions that address the
								unique challenges faced by customers, enabling them to achieve unprecedented levels of
								operational excellence.
							</div>
						</h2>
					</div>
				</div>
			</div>
		</div>
	);
};
