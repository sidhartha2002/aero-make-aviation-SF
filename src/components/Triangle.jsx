import * as THREE from 'three'
import React, {Suspense, useMemo, useRef} from 'react'
import {useFrame} from '@react-three/fiber'
import {ContactShadows} from '@react-three/drei'
import {a, useTransition} from '@react-spring/three'

function Geometry({r, position, ...props}) {
	const ref = useRef()
	useFrame((state) => {
		ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.004 * r
		ref.current.position.y = position[1] + Math[r > 0.5 ? 'cos' : 'sin'](state.clock.getElapsedTime() * r) * r
	})
	return (
		<group position={position} ref={ref}>
			<a.mesh {...props} color={"hotpink'"}/>
		</group>
	)
}

function Geometries() {
	const heartShape = new THREE.Shape();

	heartShape.moveTo(80 / 80, 20 / 80)
	heartShape.lineTo(40 / 80, 80 / 80)
	heartShape.lineTo(120 / 80, 80 / 80)
	heartShape.lineTo(80 / 80, 20 / 80)

	const extrudeSettings = {
		depth: 0.01,
		bevelEnabled: true,
		bevelSegments: 2,
		steps: 1,
		bevelSize: 0,
		bevelThickness: 0.01
	};
	const {items, material} = {
		items: [
			{
				position: [1, 0.5, -8],
				r: 0.5,
				geometry: new THREE.ExtrudeGeometry(heartShape, extrudeSettings),
				material: new THREE.MeshStandardMaterial({color: "#80cbf6"})
			},
			{
				position: [-1, -0.7, -6],
				r: 0.5,
				geometry: new THREE.ExtrudeGeometry(heartShape, extrudeSettings),
				material: new THREE.MeshStandardMaterial({color: "#beeaff"})
			},
			{
				position: [0.5, -0.5, -4],
				r: 0.5,
				geometry: new THREE.ExtrudeGeometry(heartShape, extrudeSettings),
				material: new THREE.MeshStandardMaterial({color: "#135d96"})
			},
		]
	}
	const transition = useTransition(items, {
		from: {scale: [0, 0, 0], rotation: [0, 0, 0]},
		enter: ({r}) => ({scale: [1, 1, 1], rotation: [r * 3, r * 3, r * 3]}),
		leave: {scale: [0.1, 0.1, 0.1], rotation: [0, 0, 0]},
		config: {mass: 5, tension: 1000, friction: 100},
		trail: 100
	})

	return transition((props, {position: [x, y, z], r, geometry, material}) => (
		<Geometry position={[x * 3, y * 3, z]} material={material} geometry={geometry} r={r} {...props} />
	))
}

export default function Triangle() {
	const triangle = useMemo(
		() => (
			<Suspense fallback={null}>
				<Geometries/>
				<ContactShadows position={[0, -7, 0]} opacity={0.75} scale={20} blur={1} far={9}/>
			</Suspense>
		),
		[]
	);

	return (
		<>
			{triangle}
		</>
	)
}
