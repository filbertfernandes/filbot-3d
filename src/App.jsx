import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience.jsx'
import Home from './components/ui/Home.jsx'
import Customize from './components/ui/Customize.jsx'
import { useEffect } from 'react'
import { phases, useAppStore } from './stores/useAppStore.jsx'
import Credits from './components/ui/Credits.jsx'

export default function App() {
  const phase = useAppStore((state) => state.phase)

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  useEffect(() => {
      document.body.style.overflow = phase === phases.HOME ? '' : 'hidden';
  }, [phase]);

  return (
    <>
      <div className="fixed inset-0 z-0">
        <Canvas
          dpr={[1, 2]}
          camera={{
            fov: 45,
            near: 0.1,
            far: 150,
            position: [-5.49, 3.6, 7.03],
          }}
        >
          <color attach="background" args={["#1f1f1f"]} />
          <Experience />
        </Canvas>
      </div>

      <Home />
      <Customize />
      <Credits />
    </>
  )
}
