import { useAnimations, useFBX, useGLTF } from '@react-three/drei'
import { useEffect, useRef } from "react";
import { useFrame } from '@react-three/fiber';

const Developper = ({ animationName = 'idle', ...props}) => {
    const group = useRef();
    const skyboxRef = useRef();
    const { nodes, materials } = useGLTF('/models/66eca456f6688f4c9ec3bdf1.glb');

    // Load the desert skybox model
    const { nodes: skyboxNodes, materials: skyboxMaterials } = useGLTF('/models/stylized_desert_skybox.glb');

    // Character animations
    const { animations: idleAnimation } = useFBX('/models/animations/idle.fbx');
    const { animations: saluteAnimation } = useFBX('/models/animations/salute.fbx');
    const { animations: clappingAnimation } = useFBX('/models/animations/clapping.fbx');
    const { animations: victoryAnimation } = useFBX('/models/animations/victory.fbx');

    idleAnimation[0].name = 'idle';
    saluteAnimation[0].name = 'salute';
    clappingAnimation[0].name = 'clapping';
    victoryAnimation[0].name = 'victory';

    const { actions } = useAnimations(
        [idleAnimation[0], saluteAnimation[0], clappingAnimation[0], victoryAnimation[0]],
        group,
    );

    // Skybox rotation animation
    useFrame((state, delta) => {
        if (skyboxRef.current) {
            // Slow rotation for dynamic effect
            skyboxRef.current.rotation.y += delta * 0.05;
        }
    });

    useEffect(() => {
        actions[animationName].reset().fadeIn(0.5).play();
        return () => actions[animationName].fadeOut(0.5);
    }, [animationName, actions]);

    return (
        <>
            {/* Ambient light for the entire scene */}
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

            {/* Desert Skybox - sphere with the desert texture */}
            <mesh ref={skyboxRef} scale={57.5}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    map={skyboxMaterials['Desert_skybox_material'].map}
                    side={2} // THREE.DoubleSide
                    metalness={0}
                    roughness={1}
                />
            </mesh>

            {/* 3D Character */}
            <group {...props} dispose={null} ref={group} castShadow>
                <primitive object={nodes.Hips}/>
                <skinnedMesh
                    name="EyeLeft"
                    geometry={nodes.EyeLeft.geometry}
                    material={materials.Wolf3D_Eye}
                    skeleton={nodes.EyeLeft.skeleton}
                    morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
                    morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
                    castShadow
                />
                <skinnedMesh
                    name="EyeRight"
                    geometry={nodes.EyeRight.geometry}
                    material={materials.Wolf3D_Eye}
                    skeleton={nodes.EyeRight.skeleton}
                    morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
                    morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
                    castShadow
                />
                <skinnedMesh
                    name="Wolf3D_Head"
                    geometry={nodes.Wolf3D_Head.geometry}
                    material={materials.Wolf3D_Skin}
                    skeleton={nodes.Wolf3D_Head.skeleton}
                    morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
                    morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
                    castShadow
                />
                <skinnedMesh
                    name="Wolf3D_Teeth"
                    geometry={nodes.Wolf3D_Teeth.geometry}
                    material={materials.Wolf3D_Teeth}
                    skeleton={nodes.Wolf3D_Teeth.skeleton}
                    morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
                    morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
                    castShadow
                />
                <skinnedMesh
                    geometry={nodes.Wolf3D_Hair.geometry}
                    material={materials.Wolf3D_Hair}
                    skeleton={nodes.Wolf3D_Hair.skeleton}
                    castShadow
                />
                <skinnedMesh
                    geometry={nodes.Wolf3D_Glasses.geometry}
                    material={materials.Wolf3D_Glasses}
                    skeleton={nodes.Wolf3D_Glasses.skeleton}
                    castShadow
                />
                <skinnedMesh
                    geometry={nodes.Wolf3D_Body.geometry}
                    material={materials.Wolf3D_Body}
                    skeleton={nodes.Wolf3D_Body.skeleton}
                    castShadow
                />
                <skinnedMesh
                    geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
                    material={materials.Wolf3D_Outfit_Bottom}
                    skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
                    castShadow
                />
                <skinnedMesh
                    geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
                    material={materials.Wolf3D_Outfit_Footwear}
                    skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
                    castShadow
                />
                <skinnedMesh
                    geometry={nodes.Wolf3D_Outfit_Top.geometry}
                    material={materials.Wolf3D_Outfit_Top}
                    skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
                    castShadow
                />
            </group>
        </>
    );
};

// Preload models for better performance
useGLTF.preload('/models/66eca456f6688f4c9ec3bdf1.glb');
useGLTF.preload('/models/stylized_desert_skybox.glb');

export default Developper;