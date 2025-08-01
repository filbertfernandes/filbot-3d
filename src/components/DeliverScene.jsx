import { useGLTF } from "@react-three/drei";

const DeliverScene = () => {
  const { scene } = useGLTF("/models/deliver_scene.glb");

  return (
    <primitive object={scene} />
  )
}

export default DeliverScene
