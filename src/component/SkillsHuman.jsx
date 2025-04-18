import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { useEffect, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SkillsHuman = ({ animationName = 'idle', currentSkill = null, ...props }) => {
    const group = useRef();
    const particlesRef = useRef();
    const gridRef = useRef();

    // Déterminer quel modèle 3D charger en fonction de la compétence actuelle
    const modelPath = currentSkill
        ? `/models/${currentSkill.name.toLowerCase()}_programming_language.glb`
        : '/models/python_programming_language.glb'; // Modèle par défaut quand aucun skill n'est survolé

    // Charger dynamiquement le modèle 3D selon le skill survolé
    const { nodes, materials, scene } = useGLTF(modelPath);

    // Définir des échelles spécifiques par modèle
    const getModelScale = () => {
        if (currentSkill?.name?.toLowerCase() === 'javascript') {
            return 2.501; // Échelle ajustée pour JavaScript
        }
        return 2.501; // Échelle par défaut pour Python et autres
    };

    // Obtenir les réglages de position pour que la rotation soit centrée correctement
    const getModelPosition = () => {
        if (currentSkill?.name?.toLowerCase() === 'javascript') {
            return [0, 0, 0]; // Centrer le modèle JavaScript à l'origine
        }
        return [-0.002, 0, 0]; // Position par défaut pour les autres modèles
    };

    const modelScale = getModelScale();
    const modelPosition = getModelPosition();

    // Charger les animations
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

    // Appliquer l'animation actuelle
    useEffect(() => {
        if (actions[animationName]) {
            actions[animationName].reset().fadeIn(0.5).play();
            return () => actions[animationName].fadeOut(0.5);
        }
    }, [animationName, actions]);

    // Création des particules pour l'arrière-plan
    const particlesCount = 300;
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < particlesCount; i++) {
            const x = (Math.random() - 0.5) * 40;
            const y = (Math.random() - 0.5) * 40;
            const z = (Math.random() - 0.5) * 40 - 10; // Déplacer un peu vers l'arrière
            const size = Math.random() * 0.5 + 0.1;
            temp.push({ x, y, z, size });
        }
        return temp;
    }, []);

    // Création de la grille pour le fond
    const gridSize = 15;
    const gridDivisions = 20;
    const gridColor = currentSkill
        ? new THREE.Color(getSkillColor(currentSkill.name))
        : new THREE.Color("#407294");

    // Obtenir une couleur basée sur la compétence
    function getSkillColor(skillName) {
        const skillColors = {
            "python": "#4B8BBE",
            "javascript": "#F0DB4F",
            "sql": "#0078D4",
            "default": "#407294"
        };

        return skillColors[skillName.toLowerCase()] || skillColors.default;
    }

    // Mettre à jour les animations et les couleurs
    useFrame((state, delta) => {
        // Rotation du personnage
        if (group.current) {
            group.current.rotation.y += 0.01;
        }

        // Animation des particules
        if (particlesRef.current) {
            particlesRef.current.rotation.y += 0.001;
            particlesRef.current.rotation.x += 0.0005;
        }

        // Animation de la grille
        if (gridRef.current) {
            gridRef.current.material.color.lerp(gridColor, 0.05);
            gridRef.current.position.z = -8 + Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
        }
    });

    // Gestion des erreurs de chargement des modèles
    if (!nodes || !materials) {
        return null;
    }

    return (
        <>
            {/* Effet de brouillard */}
                <fog attach="fog" args={['#070b34', 8, 30]} />

                {/* Lumières pour l'ambiance */}
                <ambientLight intensity={0.4} />
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={0.6}
                    color={currentSkill ? getSkillColor(currentSkill.name) : "#ffffff"}
                />
                <pointLight
                    position={[-5, 2, -8]}
                    intensity={0.5}
                    color="#6e84ff"
                />

                {/* Grille de fond */}
                <gridHelper
                    ref={gridRef}
                    args={[gridSize, gridDivisions, gridColor, gridColor]}
                    position={[0, -2, -8]}
                    rotation={[Math.PI / 2, 0, 0]}
                />

                {/* Particules pour l'effet 3D */}
                <group ref={particlesRef}>
                    {particles.map((particle, i) => (
                        <mesh key={i} position={[particle.x, particle.y, particle.z]}>
                            <sphereGeometry args={[particle.size, 8, 8]} />
                            <meshBasicMaterial
                                color={currentSkill
                                    ? getSkillColor(currentSkill.name)
                                    : "#6088b4"
                                }
                                transparent
                                opacity={0.6}
                            />
                        </mesh>
                    ))}
                </group>

                {/* Dome en arrière-plan */}
                <mesh position={[0, 0, -15]} rotation={[0, 0, 0]}>
                    <sphereGeometry args={[20, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshBasicMaterial
                        color="#070b34"
                        side={THREE.BackSide}
                        opacity={0.8}
                        transparent
                    />
                </mesh>

                {/* Groupe contenant le personnage */}
                <group {...props} dispose={null} ref={group}>
                    {currentSkill?.name?.toLowerCase() === 'javascript' ? (
                        <primitive
                            object={scene}
                            scale={modelScale}
                            position={modelPosition}
                            rotation={[0, 0, 0]}
                        />
                    ) : (
                        <>
                            {nodes.Object_4 && materials.material && (
                                <mesh
                                    geometry={nodes.Object_4.geometry}
                                    material={materials.material}
                                    position={modelPosition}
                                    rotation={[Math.PI / 2, 0, 0]}
                                    scale={modelScale}
                                />
                            )}
                            {nodes.Object_6 && materials['.001'] && (
                                <mesh
                                    geometry={nodes.Object_6.geometry}
                                    material={materials['.001']}
                                    position={modelPosition}
                                    rotation={[-Math.PI / 2, 0, -Math.PI]}
                                    scale={modelScale}
                                />
                            )}
                            {(!nodes.Object_4 || !nodes.Object_6) && (
                                <primitive
                                    object={scene}
                                    scale={modelScale}
                                    position={modelPosition}
                                />
                            )}
                        </>
                    )}
                </group>
        </>
    );
}

// Préchargement des modèles pour éviter les latences
useGLTF.preload('/models/python_programming_language.glb');

// Préchargement des modèles de chaque skill
const preloadSkillModels = () => {
    const skills = ['python', 'javascript', 'sql']; // Ajustez selon vos compétences
    skills.forEach(skill => {
        useGLTF.preload(`/models/${skill}_programming_language.glb`);
    });
};

preloadSkillModels();

export default SkillsHuman;