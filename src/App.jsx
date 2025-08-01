import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience.jsx'
import Home from './components/ui/Home.jsx'
import Customize from './components/ui/Customize.jsx'

export default function App() {
  return (
    <>
      <Canvas
        dpr={[1, 2]}
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [-5.49, 3.6, 7.03],
        }}
      >
        <color attach="background" args={["#1f1f1f"]} />
        <fog attach="fog" args={["#1f1f1f", 10, 40]} />
        <Experience />
      </Canvas>

      {/* UI Panel */}
      <Home />
      <Customize />
    </>
  )
}
