import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Float, MeshDistortMaterial as Distort } from '@react-three/drei'

function AnimatedShape() {
    const meshRef = useRef()

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        meshRef.current.rotation.x = Math.sin(time / 2) / 4
        meshRef.current.rotation.y = time / 2
    })

    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
                color="#3b82f6"
                wireframe={false}
                emissive="#1e3a8a"
                emissiveIntensity={0.5}
                flatShading
            />
        </mesh>
    )
}

const ThreeDLogo = () => {
    return (
        <div className="w-12 h-12">
            <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    <AnimatedShape />
                </Float>
            </Canvas>
        </div>
    )
}

export default ThreeDLogo
