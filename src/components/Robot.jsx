import { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations, Decal } from '@react-three/drei'
import { phases, useAppStore } from '../stores/useAppStore'
import { DoubleSide, LoopOnce, Clock, TextureLoader } from 'three'
import { useFrame, useThree } from '@react-three/fiber'

export function Robot(props) {
  const group = useRef()
  const headRef = useRef()

  const { nodes, materials, animations } = useGLTF('/models/robot.glb')
  const { actions } = useAnimations(animations, group)

  const phase = useAppStore((state) => state.phase)
  const isPlayAnimation = useAppStore((state) => state.isPlayAnimation)
  const setPlayAnimation = useAppStore((state) => state.setPlayAnimation)
  const filbotColors = useAppStore((state) => state.filbotColors)

  const { size } = useThree()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const isNeedSticker = useAppStore((state) => state.isNeedSticker)
  const stickerTexture = useAppStore((state) => state.stickerTexture)
  const [decalTexture, setDecalTexture] = useState(null)

  useEffect(() => {
    if (!stickerTexture || !isNeedSticker) {
      setDecalTexture(null)
      return
    }

    const loader = new TextureLoader()
    loader.load(stickerTexture, (e) => {
      setDecalTexture(e)
    })
  }, [stickerTexture, isNeedSticker])

  // Eyes blinking parameters
  const eyelidLeftRef = useRef()
  const eyelidRightRef = useRef()
  const blinkInterval = useRef(0)
  const blinkDuration = 0.15 // seconds to close or open
  const blinkHold = 0.08    // how long eyes stay closed
  const blinkTimer = useRef(0)
  const [isBlinking, setIsBlinking] = useState(false)
  const [blinkPhase, setBlinkPhase] = useState('idle') // 'closing', 'hold', 'opening'

  const clock = useRef(new Clock())

  const getBlinkIndex = (ref, name) => {
    return ref.current?.morphTargetDictionary?.[name]
  }

  const isStopBlinking = useAppStore((state) => state.isStopBlinking)
  const eyelidLeftMorph = useAppStore((state) => state.eyelidLeftMorph)
  const eyelidRightMorph = useAppStore((state) => state.eyelidRightMorph)

  useEffect(() => {
    if (eyelidLeftRef.current && eyelidRightRef.current) {
      const blinkIndexLeft = getBlinkIndex(eyelidLeftRef, 'Eyeblink') ?? 0
      const blinkIndexRight = getBlinkIndex(eyelidRightRef, 'Eyeblink') ?? 0
      eyelidLeftRef.current.morphTargetInfluences[blinkIndexLeft] = 0
      eyelidRightRef.current.morphTargetInfluences[blinkIndexRight] = 0
    }
  }, [isStopBlinking])

  useEffect(() => {
    if (eyelidLeftRef.current && eyelidRightRef.current) {
      const blinkIndexLeft = getBlinkIndex(eyelidLeftRef, 'Eyeblink') ?? 0
      const blinkIndexRight = getBlinkIndex(eyelidRightRef, 'Eyeblink') ?? 0
      eyelidLeftRef.current.morphTargetInfluences[blinkIndexLeft] = eyelidLeftMorph
      eyelidRightRef.current.morphTargetInfluences[blinkIndexRight] = eyelidRightMorph
    }
  }, [eyelidLeftMorph, eyelidRightMorph])

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / size.width) * 2 - 1
      const y = -(event.clientY / size.height) * 2 + 1
      setMouse({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [size])

  useFrame(() => {
    if (!headRef.current) return

    /**
     * Head look at cursor
     */
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

    let targetX = 0
    let targetY = 0

    if (phase === phases.HOME) {
      const normalizedX = clamp(mouse.x, -1, 1)
      const normalizedY = clamp(mouse.y, -1, 1)

      const minXRot = -0.1
      const maxXRot = 0.5
      const minYRot = -1
      const maxYRot = 0.5

      targetX = ((-normalizedY + 1) / 2) * (maxXRot - minXRot) + minXRot
      targetY = ((normalizedX + 1) / 2) * (maxYRot - minYRot) + minYRot
    }

    // Smooth lerp
    headRef.current.rotation.x += (targetX - headRef.current.rotation.x) * 0.1
    headRef.current.rotation.y += (targetY - headRef.current.rotation.y) * 0.1

    /**
     * Eyes blinking
     */
    const elapsed = clock.current.getElapsedTime()

    // If not blinking, wait randomly 3-8 seconds
    if (!isBlinking) {
      if (elapsed - blinkInterval.current > 3 + Math.random() * 5) {
        setIsBlinking(true)
        setBlinkPhase('closing')
        blinkTimer.current = elapsed
        blinkInterval.current = elapsed
      }
    }

    const left = eyelidLeftRef.current
    const right = eyelidRightRef.current

    if (!left || !right) return

    const blinkIndexLeft = getBlinkIndex(eyelidLeftRef, 'Eyeblink') ?? 0
    const blinkIndexRight = getBlinkIndex(eyelidRightRef, 'Eyeblink') ?? 0

    // Cancel and reset blink if blinking is stopped
    if (isStopBlinking) {
      setIsBlinking(false)
      setBlinkPhase('idle')
      return
    }

    const t = elapsed - blinkTimer.current

    if (isBlinking) {
      if (blinkPhase === 'closing') {
        const progress = Math.min(t / blinkDuration, 1)
        left.morphTargetInfluences[blinkIndexLeft] = progress
        right.morphTargetInfluences[blinkIndexRight] = progress

        if (progress >= 1) {
          setBlinkPhase('hold')
          blinkTimer.current = elapsed
        }
      } else if (blinkPhase === 'hold') {
        left.morphTargetInfluences[blinkIndexLeft] = 1
        right.morphTargetInfluences[blinkIndexRight] = 1

        if (t >= blinkHold) {
          setBlinkPhase('opening')
          blinkTimer.current = elapsed
        }
      } else if (blinkPhase === 'opening') {
        const progress = Math.min(t / blinkDuration, 1)
        left.morphTargetInfluences[blinkIndexLeft] = 1 - progress
        right.morphTargetInfluences[blinkIndexRight] = 1 - progress

        if (progress >= 1) {
          setIsBlinking(false)
          setBlinkPhase('idle')
        }
      }
    }
  })

  useEffect(() => {
    if (!isPlayAnimation) return

    const action = actions.Animation
    if (action) {
      action.reset()
      action.setLoop(LoopOnce, 1)
      action.fadeIn(0.2)
      action.clampWhenFinished = true
      action.play()
      setPlayAnimation(false)
    }
  }, [actions, isPlayAnimation])

  useEffect(() => {
    const action = actions.Animation
    if (!action) return

    if (phase !== phases.HOME) {
      action.fadeOut(0.75)
    }

    return () => {
      action.fadeOut(0.75)
    }
  }, [phase, actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model" position={[0, 1.681, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>

            <group ref={headRef} rotation={[Math.PI * 0, Math.PI * 0, Math.PI * 0]}>
              {/* Antenna */}
              <group name="BezierCurve_3" position={[-1.255, 1.972, 0.002]} scale={0.27}>
                <mesh
                  name="Antenna"
                  castShadow
                  receiveShadow
                  geometry={nodes.Antenna.geometry}
                >
                  <meshStandardMaterial color={filbotColors.Antenna} />
                </mesh>
                <mesh
                  name="Object_16"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_16.geometry}
                  material={materials.Black}
                />
              </group>

              {/* Head */}
              <group
                name="Cylinder002_2"
                position={[0, 1.963, 0.002]}
                rotation={[0, 0, Math.PI / 2]}>
                <mesh
                  name="Base_01"
                  castShadow
                  receiveShadow
                  geometry={nodes.Base_01.geometry}
                >
                  <meshStandardMaterial color={filbotColors.Base} />
                </mesh>
                <mesh
                  name="Eyes"
                  castShadow
                  receiveShadow
                  geometry={nodes.Eyes.geometry}
                >
                  <meshStandardMaterial color={filbotColors.Eyes} />
                </mesh>
                <mesh
                  name="Object_10"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_10.geometry}
                  material={materials.Green}
                />
                <mesh
                  name="Object_11"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_11.geometry}
                  material={materials.Dark_Green}
                />
                <mesh
                  name="Object_12"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_12.geometry}
                  material={materials.Cooper}
                />
                <mesh
                  name="Object_13"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_13.geometry}
                  material={materials.Silver}
                />
                <mesh
                  name="Object_14"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_14.geometry}
                  material={materials.Yellow}
                />
                <mesh
                  name="Object_6"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_6.geometry}
                  material={materials.Black}
                />
                <mesh
                  ref={eyelidLeftRef}
                  name="Eyelid_Left"
                  castShadow
                  receiveShadow
                  geometry={nodes.Eyelid_Left.geometry}
                  material={materials.Black}
                  morphTargetDictionary={nodes.Eyelid_Left.morphTargetDictionary}
                  morphTargetInfluences={nodes.Eyelid_Left.morphTargetInfluences}
                  position={[0, -0.943, 0.01]}
                  scale={[1, 1.007, 1]}
                />
                <mesh
                  ref={eyelidRightRef}
                  name="Eyelid_Right"
                  castShadow
                  receiveShadow
                  geometry={nodes.Eyelid_Right.geometry}
                  material={materials.Black}
                  morphTargetDictionary={nodes.Eyelid_Right.morphTargetDictionary}
                  morphTargetInfluences={nodes.Eyelid_Right.morphTargetInfluences}
                  position={[0, -0.008, 0.01]}
                  scale={[1, 1.007, 1]}
                />
                <mesh
                  name="Object_9"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_9.geometry}
                  material={materials.Light}
                />
                <mesh
                  name="Object_9002"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_9002.geometry}
                  material={materials.Light}
                  position={[0, 0.939, 0]}
                />
                <mesh
                  name="Side_01"
                  castShadow
                  receiveShadow
                  geometry={nodes.Side_01.geometry}
                >
                  <meshStandardMaterial color={filbotColors.Side} />
                </mesh>
                <mesh
                  name="Skeleton_09"
                  castShadow
                  receiveShadow
                  geometry={nodes.Skeleton_09.geometry}
                >
                  <meshStandardMaterial color={filbotColors.Skeleton} />
                </mesh>
              </group>
            </group>

              <group name="Cube001_23" position={[0, -1.157, -0.027]}>
                <group
                  name="BezierCircle001_19"
                  position={[0.674, -0.017, 0.019]}
                  rotation={[0, 0, Math.PI / 2]}>
                  <mesh
                    name="Object_56"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_56.geometry}
                    material={materials.Rubber}
                  />
                </group>
                <group
                  name="BezierCircle_18"
                  position={[-0.674, -0.017, 0.019]}
                  rotation={[0, 0, Math.PI / 2]}>
                  <mesh
                    name="Object_54"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_54.geometry}
                    material={materials.Rubber}
                  />
                </group>
                <group name="Cube_22" position={[0, 1.157, 0.029]}>
                  <mesh
                    name="Base_02"
                    castShadow
                    receiveShadow
                    geometry={nodes.Base_02.geometry}
                  >
                    <meshStandardMaterial color={filbotColors.Base} />
                    {decalTexture && 
                      <Decal
                        debug={false}
                        position={[0.65, 0.8, 0.8]}
                        rotation={[-Math.PI / 4, 0, 0]}
                        scale={0.4}
                      >
                        <meshBasicMaterial
                          map={decalTexture}
                          transparent
                          polygonOffset
                          polygonOffsetFactor={-1}
                        />
                      </Decal>
                    }
                  </mesh>
                  <group
                    name="Cylinder005_20"
                    position={[-1.285, 0.83, 0]}
                    rotation={[0, 0, Math.PI / 2]}
                    scale={[0.3, 0.148, 0.3]}>
                    <mesh
                      name="Joint_01"
                      castShadow
                      receiveShadow
                      geometry={nodes.Joint_01.geometry}
                    >
                      <meshStandardMaterial color={filbotColors.Joints} />
                    </mesh>
                  </group>
                  <group
                    name="Cylinder015_21"
                    position={[1.283, 0.83, 0]}
                    rotation={[Math.PI, 0, Math.PI / 2]}
                    scale={[-0.3, -0.148, -0.3]}>
                    <mesh
                      name="Joint_02"
                      castShadow
                      receiveShadow
                      geometry={nodes.Joint_02.geometry}
                    >
                      <meshStandardMaterial color={filbotColors.Joints} side={DoubleSide} />
                    </mesh>
                  </group>
                  <mesh
                    name="Object_61"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_61.geometry}
                    material={materials.Red_light}
                  />
                  <mesh
                    name="Object_62"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_62.geometry}
                    material={materials.Light}
                  />
                  <mesh
                    name="Object_63"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_63.geometry}
                    material={materials.Black}
                  />
                  <mesh
                    name="Object_64"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_64.geometry}
                    material={materials.Green}
                  />
                  <mesh
                    name="Object_65"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_65.geometry}
                    material={materials.Dark_Green}
                  />
                  <mesh
                    name="Object_66"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_66.geometry}
                    material={materials.Cooper}
                  />
                  <mesh
                    name="Object_67"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_67.geometry}
                    material={materials.Silver}
                  />
                  <mesh
                    name="Object_68"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_68.geometry}
                    material={materials.Yellow}
                  />
                  <mesh
                    name="Side_02"
                    castShadow
                    receiveShadow
                    geometry={nodes.Side_02.geometry}
                  >
                    <meshStandardMaterial color={filbotColors.Side} />
                  </mesh>
                  <mesh
                    name="Skeleton_01"
                    castShadow
                    receiveShadow
                    geometry={nodes.Skeleton_01.geometry}
                  >
                    <meshStandardMaterial color={filbotColors.Skeleton} />
                  </mesh>
                </group>
                <mesh
                  name="Object_52"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_52.geometry}
                  material={materials.Black}
                />
                <mesh
                  name="Skeleton_08"
                  castShadow
                  receiveShadow
                  geometry={nodes.Skeleton_08.geometry}
                >
                  <meshStandardMaterial color={filbotColors.Skeleton} />
                </mesh>
              </group>
              
              <group
                name="Cylinder006_5"
                position={[-1.285, -0.281, 0.087]}
                rotation={[-0.125, 0, Math.PI / 2]}
                scale={[0.3, 0.148, 0.3]}>
                <group
                  name="Cylinder009_4"
                  position={[-2.03, 0.007, 0]}
                  scale={[0.248, 1.156, 0.248]}>
                  <mesh
                    name="Skeleton_04"
                    castShadow
                    receiveShadow
                    geometry={nodes.Skeleton_04.geometry}
                  >
                    <meshStandardMaterial color={filbotColors.Skeleton} />
                  </mesh>
                </group>
                <mesh
                  name="Joint_03"
                  castShadow
                  receiveShadow
                  geometry={nodes.Joint_03.geometry}
                >
                  <meshStandardMaterial color={filbotColors.Joints} />
                </mesh>
              </group>
              <group
                name="Cylinder008_6"
                position={[-1.283, 0.83, 0.002]}
                rotation={[-0.076, 0, Math.PI / 2]}
                scale={0.204}>
                <mesh
                  name="Skeleton_02"
                  castShadow
                  receiveShadow
                  geometry={nodes.Skeleton_02.geometry}
                >
                  <meshStandardMaterial color={filbotColors.Skeleton} />
                </mesh>
              </group>
              <group
                name="Cylinder010_7"
                position={[-1.288, -0.891, 0.163]}
                rotation={[-0.125, 0, Math.PI / 2]}>
                <mesh
                  name="Skeleton_06"
                  castShadow
                  receiveShadow
                  geometry={nodes.Skeleton_06.geometry}
                >
                  <meshStandardMaterial color={filbotColors.Skeleton} />
                </mesh>
              </group>
              <group
                name="Cylinder011_8"
                position={[-1.288, -0.893, 0.151]}
                rotation={[-0.125, 0, -Math.PI / 2]}
                scale={-1}>
                <mesh
                  name="Skeleton_10"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_27.geometry}
                >
                  <meshStandardMaterial color={filbotColors.Skeleton} />
                </mesh>
              </group>
              <group
                name="Cylinder012_9"
                position={[-0.71, -1.174, 0.601]}
                rotation={[-3.136, 0, Math.PI / 2]}
                scale={[0.401, 0.292, 0.401]}>
                <mesh
                  name="Object_30"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_30.geometry}
                  material={materials.Black}
                />
                <mesh
                  name="Wheel_Front_01"
                  castShadow
                  receiveShadow
                  geometry={nodes.Wheel_Front_01.geometry}
                >
                  <meshStandardMaterial color={filbotColors.Wheels} />
                </mesh>
              </group>
              <group
                name="Cylinder013_10"
                position={[-0.71, -1.174, -0.596]}
                rotation={[-3.136, 0, Math.PI / 2]}
                scale={[0.401, 0.292, 0.401]}>
                <mesh
                  name="Object_33"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_33.geometry}
                  material={materials.Black}
                />
                <mesh
                  name="Wheel_Rear_01"
                  castShadow
                  receiveShadow
                  geometry={nodes.Wheel_Rear_01.geometry}
                >
                  <meshStandardMaterial color={filbotColors.Wheels} />
                </mesh>
              </group>
              <group
                name="Cylinder016_12"
                position={[1.283, -0.285, 0.002]}
                rotation={[3.103, 0, Math.PI / 2]}
                scale={[-0.3, -0.148, -0.3]}>
                <group
                  name="Cylinder018_11"
                  position={[-2.03, 0.007, 0]}
                  scale={[0.248, 1.156, 0.248]}>
                  <mesh
                    name="Skeleton_05"
                    castShadow
                    receiveShadow
                    geometry={nodes.Skeleton_05.geometry}
                  >
                    <meshStandardMaterial color={filbotColors.Skeleton} />
                  </mesh>
                </group>
                <mesh
                  name="Joint_04"
                  castShadow
                  receiveShadow
                  geometry={nodes.Joint_04.geometry}
                >
                  <meshStandardMaterial color={filbotColors.Joints} side={DoubleSide} />
                </mesh>
              </group>
              <group
                name="Cylinder017_13"
                position={[1.281, 0.83, 0.002]}
                rotation={[-Math.PI, 0, Math.PI / 2]}
                scale={-0.204}>
                <mesh
                  name="Skeleton_03"
                  castShadow
                  receiveShadow
                  geometry={nodes.Skeleton_03.geometry}
                >
                  <meshStandardMaterial color={filbotColors.Skeleton} side={DoubleSide} />
                </mesh>
              </group>
              <group
                name="Cylinder019_14"
                position={[1.286, -0.899, 0.026]}
                rotation={[3.103, 0, Math.PI / 2]}
                scale={-1}>
                <mesh
                  name="Skeleton_07"
                  castShadow
                  receiveShadow
                  geometry={nodes.Skeleton_07.geometry}
                >
                  <meshStandardMaterial color={filbotColors.Skeleton} side={DoubleSide} />
                </mesh>
              </group>
              <group
                name="Cylinder020_15"
                position={[1.286, -0.899, 0.014]}
                rotation={[3.103, 0, -Math.PI / 2]}>
                <mesh
                  name="Skeleton_11"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_43.geometry}
                >
                  <meshStandardMaterial color={filbotColors.Skeleton} />
                </mesh>
              </group>
              <group
                name="Cylinder021_16"
                position={[0.71, -1.174, 0.601]}
                rotation={[-3.136, 0, Math.PI / 2]}
                scale={[0.401, 0.292, 0.401]}>
                <mesh
                  name="Object_46"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_46.geometry}
                  material={materials.Black}
                />
                <mesh
                  name="Wheel_Front_02"
                  castShadow
                  receiveShadow
                  geometry={nodes.Wheel_Front_02.geometry}
                >
                  <meshStandardMaterial color={filbotColors.Wheels} />
                </mesh>
              </group>
              <group
                name="Cylinder022_17"
                position={[0.71, -1.174, -0.596]}
                rotation={[-3.136, 0, Math.PI / 2]}
                scale={[0.401, 0.292, 0.401]}>
                <mesh
                  name="Object_49"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_49.geometry}
                  material={materials.Black}
                />
                <mesh
                  name="Wheel_Rear_02"
                  castShadow
                  receiveShadow
                  geometry={nodes.Wheel_Rear_02.geometry}
                >
                  <meshStandardMaterial color={filbotColors.Wheels} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/robot.glb')