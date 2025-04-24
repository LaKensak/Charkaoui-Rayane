import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { useEffect, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Configuration des couleurs par compétence
const SKILL_COLORS = {
  python: "#4B8BBE",
  javascript: "#F0DB4F",
  sql: "#0078D4",
  react: "#61DAFB",
  nodejs: "#68A063",
  default: "#6495ED"  // Bleu plus vif par défaut
};

const SkillsHuman = ({ animationName = 'idle', currentSkill = null, ...props }) => {
    const group = useRef();
    const backgroundRef = useRef();
    const starfieldRef = useRef();
    const galaxyRef = useRef();
    const nebulaRef = useRef();

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

    // Obtenir une couleur basée sur la compétence
    const getSkillColor = (skillName) => {
        if (!skillName) return SKILL_COLORS.default;
        return SKILL_COLORS[skillName.toLowerCase()] || SKILL_COLORS.default;
    };
    
    const skillColor = getSkillColor(currentSkill?.name);

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

    // Génération des étoiles pour le fond stellaire
    const starsCount = 600;
    const starfield = useMemo(() => {
        const temp = [];
        for (let i = 0; i < starsCount; i++) {
            // Distribution sphérique pour envelopper la scène
            const phi = Math.random() * Math.PI * 2;
            const theta = Math.random() * Math.PI;
            const radius = 30 + Math.random() * 20;
            
            const x = radius * Math.sin(theta) * Math.cos(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(theta);
            
            const size = Math.random() * 0.15 + 0.05;
            const blinkSpeed = Math.random() * 0.05 + 0.01;
            const blinkOffset = Math.random() * Math.PI * 2;
            
            // Variation de couleurs pour les étoiles
            const colorRand = Math.random();
            let color;
            if (colorRand > 0.8) color = "#FFFAE0"; // Jaune pâle
            else if (colorRand > 0.6) color = "#E6FBFF"; // Bleu pâle
            else color = "#FFFFFF"; // Blanc
            
            temp.push({ position: [x, y, z], size, blinkSpeed, blinkOffset, color });
        }
        return temp;
    }, []);

    // Génération des nébuleuses pour le fond
    const nebulasCount = 12;
    const nebulas = useMemo(() => {
        const temp = [];
        for (let i = 0; i < nebulasCount; i++) {
            const phi = Math.random() * Math.PI * 2;
            const theta = Math.random() * Math.PI;
            const radius = 25 + Math.random() * 10;
            
            const x = radius * Math.sin(theta) * Math.cos(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.sin(theta) * Math.sin(phi);
            
            const scale = Math.random() * 10 + 5;
            const rotation = [
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2
            ];
            
            // Variation de couleurs pour les nébuleuses
            const colorRand = Math.random();
            let color;
            if (colorRand > 0.7) color = skillColor; // Couleur du skill
            else if (colorRand > 0.4) color = "#4A6D9D"; // Bleu profond
            else color = "#8E5AB5"; // Violet
            
            temp.push({ position: [x, y, z], scale, rotation, color });
        }
        return temp;
    }, [skillColor]);

    // Points pour la galaxie de fond
    const galaxyParticlesCount = 3500;
    const galaxyParticles = useMemo(() => {
        const positions = new Float32Array(galaxyParticlesCount * 3);
        const colors = new Float32Array(galaxyParticlesCount * 3);
        const sizes = new Float32Array(galaxyParticlesCount);
        
        const colorInside = new THREE.Color(skillColor);
        const colorMiddle = new THREE.Color("#6B8DB9");
        const colorOutside = new THREE.Color("#1A2435");
        
        for (let i = 0; i < galaxyParticlesCount; i++) {
            const i3 = i * 3;
            
            // Position en spirale galaxique
            const radius = Math.random() * 20 + 5;
            const spinAngle = radius * 2.5;
            const branchAngle = (i % 3) * Math.PI * 2 / 3;
            
            const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5;
            const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5;
            const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5;
            
            positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i3 + 1] = randomY;
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ - 20;
            
            // Couleur basée sur la distance du centre
            let color;
            const mixRatio = radius / 25;
            
            if (mixRatio < 0.4) {
                // Mélange entre colorInside et colorMiddle
                const localMix = mixRatio / 0.4;
                color = new THREE.Color().lerpColors(colorInside, colorMiddle, localMix);
            } else {
                // Mélange entre colorMiddle et colorOutside
                const localMix = (mixRatio - 0.4) / 0.6;
                color = new THREE.Color().lerpColors(colorMiddle, colorOutside, localMix);
            }
            
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
            
            // Taille variable des étoiles
            sizes[i] = Math.random() * 0.5 + 0.1;
        }
        
        return { positions, colors, sizes };
    }, [skillColor]);

    // Mettre à jour les animations et le background
    useFrame((state, delta) => {
        // Rotation du personnage
        if (group.current) {
            group.current.rotation.y += delta * 0.5;
            // Légère oscillation verticale pour donner de la vie
            group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }

        // Animation du dome de fond
        if (backgroundRef.current) {
            backgroundRef.current.rotation.y += delta * 0.05;
        }
        
        // Animation de la galaxie
        if (galaxyRef.current) {
            galaxyRef.current.rotation.y += delta * 0.02;
        }
        
        // Animation des nébuleuses
        if (nebulaRef.current) {
            nebulaRef.current.rotation.z += delta * 0.01;
            nebulaRef.current.children.forEach((nebula, i) => {
                // Rotation individuelle des nébuleuses
                nebula.rotation.x += delta * 0.01;
                nebula.rotation.z += delta * 0.01 * (i % 2 === 0 ? 1 : -1);
            });
        }
        
        // Animation du champ d'étoiles
        if (starfieldRef.current) {
            starfieldRef.current.children.forEach((star, i) => {
                const data = starfield[i];
                // Effet de scintillement
                const blink = 0.7 + Math.sin(state.clock.elapsedTime * data.blinkSpeed + data.blinkOffset) * 0.3;
                star.scale.set(blink * data.size, blink * data.size, blink * data.size);
            });
            
            // Légère rotation du champ d'étoiles
            starfieldRef.current.rotation.y += delta * 0.001;
            starfieldRef.current.rotation.x += delta * 0.0005;
        }
    });

    return (
        <>
            {/* Environnement cosmique - bleu profond au lieu de noir */}
            <fog attach="fog" args={['#0A1931', 20, 50]} />

            {/* Lumières pour l'ambiance */}
            <ambientLight intensity={0.3} />
            <directionalLight
                position={[5, 5, 5]}
                intensity={0.8}
                color={skillColor}
            />
            <pointLight
                position={[-5, 2, -8]}
                intensity={0.6}
                color="#6e84ff"
                distance={25}
                decay={2}
            />
            <spotLight
                position={[0, 8, 0]}
                intensity={0.7}
                angle={0.6}
                penumbra={0.8}
                color="#ffffff"
            />
            
            {/* Lumière d'accentuation au sol */}
            <pointLight
                position={[0, -1.5, 0]}
                intensity={0.8}
                color={skillColor}
                distance={8}
                decay={2}
            />

            {/* Fond étoilé avec couleurs variées */}
            <group ref={starfieldRef}>
                {starfield.map((star, i) => (
                    <mesh key={i} position={star.position}>
                        <sphereGeometry args={[star.size, 4, 4]} />
                        <meshBasicMaterial 
                            color={star.color}
                            transparent 
                            opacity={0.9} 
                        />
                    </mesh>
                ))}
            </group>

            {/* Galaxie spirale en arrière-plan avec dégradé de couleurs */}
            <points ref={galaxyRef}>
                <bufferGeometry>
                    <bufferAttribute 
                        attach="attributes-position" 
                        count={galaxyParticlesCount} 
                        array={galaxyParticles.positions} 
                        itemSize={3} 
                    />
                    <bufferAttribute 
                        attach="attributes-color" 
                        count={galaxyParticlesCount} 
                        array={galaxyParticles.colors} 
                        itemSize={3} 
                    />
                    <bufferAttribute 
                        attach="attributes-size" 
                        count={galaxyParticlesCount} 
                        array={galaxyParticles.sizes} 
                        itemSize={1} 
                    />
                </bufferGeometry>
                <pointsMaterial 
                    size={0.15} 
                    sizeAttenuation={true} 
                    vertexColors={true} 
                    transparent={true} 
                    opacity={0.8}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>

            {/* Nébuleuses colorées */}
            <group ref={nebulaRef}>
                {nebulas.map((nebula, i) => (
                    <mesh 
                        key={i} 
                        position={nebula.position}
                        rotation={nebula.rotation}
                    >
                        <planeGeometry args={[nebula.scale, nebula.scale]} />
                        <meshBasicMaterial
                            color={nebula.color}
                            transparent
                            opacity={0.15}
                            blending={THREE.AdditiveBlending}
                            depthWrite={false}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                ))}
            </group>

            {/* Dôme cosmique avec dégradé */}
            <mesh ref={backgroundRef} position={[0, 0, 0]}>
                <sphereGeometry args={[40, 64, 64]} />
                <meshBasicMaterial
                    color="#0A1931"  // Bleu nuit profond
                    side={THREE.BackSide}
                    transparent
                    opacity={1}
                />
            </mesh>
            
            {/* Dôme intérieur pour effet de profondeur */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[38, 32, 32]} />
                <meshBasicMaterial
                    color="#152747"  // Bleu un peu plus clair
                    side={THREE.BackSide}
                    transparent
                    opacity={0.5}
                />
            </mesh>

            {/* Plate-forme/socle pour le personnage */}
            <mesh position={[0, -2, 0]} rotation={[0, 0, 0]} receiveShadow>
                <cylinderGeometry args={[3, 3.5, 0.3, 32]} />
                <meshStandardMaterial
                    color={skillColor}
                    metalness={0.7}
                    roughness={0.3}
                    emissive={skillColor}
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Cercle lumineux au sol - principal */}
            <mesh position={[0, -1.84, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[2.8, 3.6, 32]} />
                <meshBasicMaterial
                    color={skillColor}
                    transparent
                    opacity={0.6}
                    side={THREE.DoubleSide}
                />
            </mesh>
            
            {/* Cercle lumineux au sol - accent */}
            <mesh position={[0, -1.83, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[2.5, 2.7, 32]} />
                <meshBasicMaterial
                    color="#FFFFFF"
                    transparent
                    opacity={0.3}
                    side={THREE.DoubleSide}
                />
            </mesh>
            
            {/* Cercle lumineux diffus */}
            <mesh position={[0, -1.82, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[8, 8]} />
                <meshBasicMaterial
                    color={skillColor}
                    transparent
                    opacity={0.1}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Rayon lumineux depuis le haut */}
            <mesh position={[0, 10, 0]} rotation={[Math.PI, 0, 0]}>
                <coneGeometry args={[4, 15, 16, 1, true]} />
                <meshBasicMaterial
                    color={skillColor}
                    transparent
                    opacity={0.03}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
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
                                castShadow
                            />
                        )}
                        {nodes.Object_6 && materials['.001'] && (
                            <mesh
                                geometry={nodes.Object_6.geometry}
                                material={materials['.001']}
                                position={modelPosition}
                                rotation={[-Math.PI / 2, 0, -Math.PI]}
                                scale={modelScale}
                                castShadow
                            />
                        )}
                        {(!nodes.Object_4 || !nodes.Object_6) && (
                            <primitive
                                object={scene}
                                scale={modelScale}
                                position={modelPosition}
                                castShadow
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
    const skills = ['python', 'javascript', 'sql', 'react', 'nodejs'];
    skills.forEach(skill => {
        useGLTF.preload(`/models/${skill}_programming_language.glb`);
    });
};

preloadSkillModels();

export default SkillsHuman;