import {Text, Image} from "@react-three/drei";
import {useLoader} from '@react-three/fiber'
import {fadeOnBeforeCompileFlat} from "../utils/fadeMaterial";
import * as THREE from "three";
import {usePlay} from "../contexts/Play.jsx";

function Image2({title, subtitle, url}) {
	const {play, end, setPreview} = usePlay();
	const texture = useLoader(THREE.TextureLoader, url)
	return (
		<mesh onClick={() => {
			setPreview({imageUrl: url, title, subtitle})
		}}>
			<planeBufferGeometry attach="geometry" args={[4, 4]}/>
			<meshStandardMaterial
				transparent
				map={texture}
				onBeforeCompile={fadeOnBeforeCompileFlat}
			/>
		</mesh>
	)
}

export const TextSection = ({title, subtitle, imageUrl, ...props}) => {
	return (
		<group {...props}>
			{!!title && (
				<Text
					color="white"
					anchorX={"left"}
					anchorY="bottom"
					fontSize={0.5}
					maxWidth={4}
					lineHeight={1}
					font={"./fonts/DMSerifDisplay-Regular.ttf"}
				>
					{title}
					<meshStandardMaterial
						color={"white"}
						onBeforeCompile={fadeOnBeforeCompileFlat}
					/>
				</Text>
			)}
			<group cameraRailDist={5} position={props.position2}>
				<Image2 color="white"
				        anchorX={"left"}
				        anchorY="top"
				        scale={4}
				        url={imageUrl}
				        transparent
				        opacity={0.9}
				        title={title}
				        subtitle={subtitle}
				/>
			</group>
		</group>
	);
};
