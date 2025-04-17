import {useGLTF} from '@react-three/drei'

const HackerRoom = (props) => {
    const { nodes, materials } = useGLTF('/models/monitor2.glb')

    return (
        <group {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={0.016}>
                <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.monitor002_low_monitor_0.geometry}
                        material={materials.monitor}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.monitor_low_monitor_0.geometry}
                        material={materials.monitor}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.monitor003_low_monitor_0.geometry}
                        material={materials.monitor}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.monitor004_low_monitor_0.geometry}
                        material={materials.monitor}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.monitor005_low_monitor_0.geometry}
                        material={materials.monitor}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.monitor006_low_monitor_0.geometry}
                        material={materials.monitor}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />

                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.monitor007_low_monitor_0.geometry}
                        material={materials.monitor}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.monitor001_low_monitor_0.geometry}
                        material={materials.monitor}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.ground_low_ground_0.geometry}
                        material={materials.ground}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                </group>
            </group>
        </group>
    )
}

useGLTF.preload('/models/monitor2.glb')

export default HackerRoom;
