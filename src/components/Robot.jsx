import { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useAppStore } from '../stores/useAppStore'
import { DoubleSide } from 'three'

export function Robot(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/robot.glb')
  const { actions } = useAnimations(animations, group)

  const filbotColors = useAppStore((state) => state.filbotColors)

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model" position={[0, 1.681, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
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
                      material={materials.Orange}
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
                      material={materials.Orange}
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
                    material={materials.Grey}
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
                  material={materials.Grey}
                >
                  <meshStandardMaterial color={filbotColors.Skeleton} />
                </mesh>
              </group>
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
                  name="Object_9"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_9.geometry}
                  material={materials.Light}
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