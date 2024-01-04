import {usePlay} from "../contexts/Play.jsx";

export const Preview = () => {
	const { preview, setPreview} = usePlay();

	return (
		<div id="previewContent" className={preview ? 'content-open' : ''}>
			<div className="content">
				<div>
					<img src={preview?.imageUrl} width={"70%"}/>
				</div>
				<div className="content__item content__item--current">
						<span className="content__number"><button className="content__close" onClick={() => { setPreview(false)}}>
						<svg className="icon icon--longarrow" viewBox="0 0 54 24">
							<path d="M.42 11.158L12.38.256c.333-.27.696-.322 1.09-.155.395.166.593.467.593.903v6.977h38.87c.29 0 .53.093.716.28.187.187.28.426.28.716v5.98c0 .29-.093.53-.28.716a.971.971 0 0 1-.716.28h-38.87v6.977c0 .416-.199.717-.592.903-.395.167-.759.104-1.09-.186L.42 12.62a1.018 1.018 0 0 1 0-1.462z"></path>
						</svg>
					</button></span>
					<h3 className="content__title">{preview?.title}</h3>

					<div className="content__text">{preview?.subtitle}</div>
				</div>

			</div>
		</div>
	);
};
