import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { Environment, MeshReflectorMaterial, OrbitControls, Stage } from '@react-three/drei'
import { Robot } from './Robot'
import gsap from 'gsap'
import { phases, useAppStore } from '../stores/useAppStore'
import { cameraPosition, controlsTarget } from '../data/camera'

export default function Experience() {
  const controlsRef = useRef()
  const { camera } = useThree()

  const phase = useAppStore((state) => state.phase)

  // useFrame(() => {
  //   if (controlsRef.current) {
  //     console.log('Camera position:', camera.position)
  //     console.log('Orbit target:', controlsRef.current.target)
  //   }
  // })

  useEffect(() => {
    const tl = gsap.timeline({ ease: "power3.inOut" });
    
    tl.to(controlsRef.current.target, 
      {
        x: controlsTarget.x[phase],
        y: controlsTarget.y[phase],
        z: controlsTarget.z[phase],
        duration: 1,
      }
    )
    .to(camera.position, 
        {
          x: cameraPosition.x[phase],
          y: cameraPosition.y[phase],
          z: cameraPosition.z[phase],
          duration: 1,
        },
        "-=1"
    )
  }, [phase])

  return (
    <>
      <OrbitControls 
        ref={controlsRef}
        target={[3.1271897394894195, 1.9258244781726472, 1.846361435585223]}
        enablePan={true} 
        enableRotate={phase !== phases.HOME}
        enableZoom={phase !== phases.HOME}
        maxPolarAngle={Math.PI / 2}
        maxDistance={15}
      />

      <Environment preset="city" />

      <Robot />

      <mesh rotation={[-Math.PI / 2, 0, 0]} >
        <planeGeometry args={[170, 170]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          mixBlur={0.5}
          mixStrength={15}
          mixContrast={1}
          resolution={1024}
          mirror={0.5}
          depthScale={1.0}
          minDepthThreshold={0.3}
          maxDepthThreshold={1.2}
          depthToBlurRatioBias={0.1}
          distortion={0.1}
          color="#222222"
          reflectorOffset={0.05}
        />
      </mesh>
    </>
  )
}
