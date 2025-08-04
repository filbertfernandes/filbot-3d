import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { Environment, MeshReflectorMaterial, OrbitControls, Stage } from '@react-three/drei'
import { Robot } from './Robot'
import gsap from 'gsap'
import { phases, useAppStore } from '../stores/useAppStore'
import { cameraPosition, controlsTarget, mobileCameraPosition, mobileControlsTarget } from '../data/camera'
import DeliverScene from './DeliverScene'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMediaQuery } from 'react-responsive'

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const isMobile = useMediaQuery({ maxWidth: 768 })

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
        x: isMobile ? mobileControlsTarget[phase][0] : controlsTarget[phase][0],
        y: isMobile ? mobileControlsTarget[phase][1] : controlsTarget[phase][1],
        z: isMobile ? mobileControlsTarget[phase][2] : controlsTarget[phase][2],
        duration: 1,
      }
    )
    .to(camera.position, 
        {
          x: isMobile ? mobileCameraPosition[phase][0] : cameraPosition[phase][0],
          y: isMobile ? mobileCameraPosition[phase][1] : cameraPosition[phase][1],
          z: isMobile ? mobileCameraPosition[phase][2] : cameraPosition[phase][2],
          duration: 1,
        },
        "-=1"
    )
  }, [phase])

  useEffect(() => {
    if (phase !== phases.HOME) return

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#section2",
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      })
      .to(controlsRef.current.target, {
        x: isMobile ? mobileControlsTarget.HOME_SECTION_2[0] : controlsTarget.HOME_SECTION_2[0],
        y: isMobile ? mobileControlsTarget.HOME_SECTION_2[1] : controlsTarget.HOME_SECTION_2[1],
        z: isMobile ? mobileControlsTarget.HOME_SECTION_2[2] : controlsTarget.HOME_SECTION_2[2],
        ease: "power2.inOut",
      });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#section2",
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      })
      .to(camera.position, {
        x: isMobile ? mobileCameraPosition.HOME_SECTION_2[0] : cameraPosition.HOME_SECTION_2[0],
        y: isMobile ? mobileCameraPosition.HOME_SECTION_2[1] : cameraPosition.HOME_SECTION_2[1],
        z: isMobile ? mobileCameraPosition.HOME_SECTION_2[2] : cameraPosition.HOME_SECTION_2[2],
        ease: "power2.inOut",
      });
  })

  return (
    <>
      <OrbitControls 
        ref={controlsRef}
        enablePan={true} 
        enableRotate={phase !== phases.HOME}
        enableZoom={phase !== phases.HOME}
        maxPolarAngle={Math.PI / 2}
        maxDistance={isMobile ? 45 : 25}
      />

      <Environment preset="city" />

      <Robot />
      <DeliverScene />

      <mesh rotation={[-Math.PI / 2, 0, 0]} >
        <planeGeometry args={[200, 200]} />
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
