import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { useEffect, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Configuration des couleurs par compétence - Palette améliorée
const SKILL_COLORS = {
  python: "#4584b6",
  javascript: "#f7df1e",
  sql: "#00758f",
  react: "#61dafb",
  nodejs: "#6cc24a",
  typescript: "#3178c6",
  default: "#6e9eff"
};

// Configuration du thème de fond pour le portfolio
const BACKGROUND_THEMES = {
  gradient: {
    colors: ["#0e1a30", "#1b2a4e", "#32456c"],
    fogColor: "#1a2747",
    fogNear: 20,
    fogFar: 60
  },
  aurora: {
    colors: ["#142850", "#27496d", "#0c7b93"],
    fogColor: "#142850",
    fogNear: 25,
    fogFar: 65
  },
  cosmic: {
    colors: ["#0f2027", "#203a43", "#2c5364"],
    fogColor: "#0f2027",
    fogNear: 22,
    fogFar: 60
  }
};

const SkillsHuman = ({ 
  animationName = 'idle', 
  currentSkill = null, 
  backgroundTheme = 'gradient',
  ...props 
}) => {
    const group = useRef();
    const backgroundRef = useRef();
    const starfieldRef = useRef();
    const galaxyRef = useRef();
    const auroraRef = useRef();
    const particlesRef = useRef();
    
    // Sélection du thème de fond
    const theme = BACKGROUND_THEMES[backgroundTheme] || BACKGROUND_THEMES.gradient;

    // Déterminer quel modèle 3D charger en fonction de la compétence actuelle
    const modelPath = currentSkill
        ? `/models/${currentSkill.name.toLowerCase()}_programming_language.glb`
        : '/models/python_programming_language.glb'; // Modèle par défaut

    // Charger dynamiquement le modèle 3D selon le skill survolé
    const { nodes, materials, scene } = useGLTF(modelPath);

    // Définir des échelles spécifiques par modèle
    const getModelScale = () => {
        if (currentSkill?.name?.toLowerCase() === 'javascript') {
            return 2.501;
        }
        return 2.501; // Échelle par défaut
    };

    // Obtenir les réglages de position pour que la rotation soit centrée correctement
    const getModelPosition = () => {
        if (currentSkill?.name?.toLowerCase() === 'javascript') {
            return [0, 0, 0];
        }
        return [-0.002, 0, 0];
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
    const { animations: danceAnimation } = useFBX('/models/animations/dance.fbx');

    idleAnimation[0].name = 'idle';
    saluteAnimation[0].name = 'salute';
    clappingAnimation[0].name = 'clapping';
    victoryAnimation[0].name = 'victory';
    danceAnimation[0].name = 'dance';

    const { actions } = useAnimations(
        [idleAnimation[0], saluteAnimation[0], clappingAnimation[0], victoryAnimation[0], danceAnimation[0]],
        group,
    );

    // Appliquer l'animation actuelle
    useEffect(() => {
        if (actions[animationName]) {
            actions[animationName].reset().fadeIn(0.5).play();
            return () => actions[animationName].fadeOut(0.5);
        }
    }, [animationName, actions]);

    // Génération des étoiles pour le fond stellaire - plus brillantes et plus nombreuses
    const starsCount = 800;
    const starfield = useMemo(() => {
        const temp = [];
        for (let i = 0; i < starsCount; i++) {
            // Distribution sphérique améliorée
            const phi = Math.random() * Math.PI * 2;
            const theta = Math.random() * Math.PI;
            const radius = 32 + Math.random() * 25;
            
            const x = radius * Math.sin(theta) * Math.cos(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(theta);
            
            // Variété de tailles pour meilleur effet de profondeur
            const size = Math.random() * 0.18 + 0.05;
            const blinkSpeed = Math.random() * 0.08 + 0.02;
            const blinkOffset = Math.random() * Math.PI * 2;
            
            // Couleurs subtiles pour les étoiles
            const colorIndex = Math.floor(Math.random() * 5);
            const colors = ['#ffffff', '#fffaea', '#eaeeff', '#ffeaea', '#eaffff'];
            const color = colors[colorIndex];
            
            temp.push({ position: [x, y, z], size, blinkSpeed, blinkOffset, color });
        }
        return temp;
    }, []);

    // Génération des aurores pour un effet atmosphérique élégant
    const aurorasCount = 8;
    const auroras = useMemo(() => {
        const temp = [];
        for (let i = 0; i < aurorasCount; i++) {
            const height = 10 + Math.random() * 20;
            const width = 10 + Math.random() * 30;
            const posY = 10 + Math.random() * 20;
            const posX = -25 + Math.random() * 50;
            const posZ = -25 + Math.random() * 50;
            
            const hue = Math.random() * 60 + (i % 2 === 0 ? 180 : 100);
            const color = `hsl(${hue}, 100%, 70%)`;
            
            const opacity = 0.1 + Math.random() * 0.3;
            const waveSpeed = 0.05 + Math.random() * 0.1;
            const waveAmplitude = 0.2 + Math.random() * 1;
            
            temp.push({
                position: [posX, posY, posZ],
                dimensions: [width, height],
                color,
                opacity,
                waveSpeed,
                waveAmplitude,
                rotation: [Math.PI / 2, Math.random() * Math.PI * 2, 0]
            });
        }
        return temp;
    }, []);

    // Génération d'un système de particules flottantes
    const particlesCount = 150;
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < particlesCount; i++) {
            const x = Math.random() * 40 - 20;
            const y = Math.random() * 30 - 10;
            const z = Math.random() * 40 - 20;
            
            const size = Math.random() * 0.15 + 0.05;
            const speed = Math.random() * 0.02 + 0.005;
            const direction = new THREE.Vector3(
                Math.random() * 2 - 1,
                Math.random() * 2 - 1,
                Math.random() * 2 - 1
            ).normalize().multiplyScalar(speed);
            
            // Couleurs variant entre le skill actuel et un bleu clair
            const mixRatio = Math.random();
            const skillColorObj = new THREE.Color(skillColor);
            const accentColor = new THREE.Color("#8ebbff");
            const color = new THREE.Color().lerpColors(skillColorObj, accentColor, mixRatio);
            
            temp.push({ position: [x, y, z], size, direction, color: color.getHexString() });
        }
        return temp;
    }, [skillColor]);

    // Points pour la galaxie de fond avec effet d'animation amélioré
    const galaxyParticlesCount = 5000;
    const galaxyParticles = useMemo(() => {
        const positions = new Float32Array(galaxyParticlesCount * 3);
        const colors = new Float32Array(galaxyParticlesCount * 3);
        const sizes = new Float32Array(galaxyParticlesCount);
        const speeds = new Float32Array(galaxyParticlesCount);
        
        const colorInside = new THREE.Color(skillColor);
        const colorOutside = new THREE.Color(theme.colors[1]);
        
        for (let i = 0; i < galaxyParticlesCount; i++) {
            const i3 = i * 3;
            
            // Position en spirale galaxique plus complexe
            const radius = Math.pow(Math.random(), 0.5) * (22 + Math.random() * 5);
            const spinAngle = radius * (2 + Math.random() * 1);
            const branchAngle = (i % 5) * Math.PI * 2 / 5 + Math.random() * 0.4;
            
            // Dispersion naturelle des particules
            const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.7;
            const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3;
            const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.7;
            
            positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i3 + 1] = randomY;
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ - 20;
            
            // Couleur basée sur la distance du centre avec plus de contraste
            const mixRatio = Math.pow(radius / 27, 1.2);
            const color = new THREE.Color().lerpColors(colorInside, colorOutside, mixRatio);
            
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
            
            // Taille variable des particules avec effet de brillance
            sizes[i] = (Math.random() * 0.5 + 0.1) * (radius < 5 ? 1.5 : 1);
            
            // Vitesse de rotation variable selon la distance
            speeds[i] = 0.02 - (radius / 27) * 0.015;
        }
        
        return { positions, colors, sizes, speeds };
    }, [skillColor, theme]);

    // Mettre à jour les animations et le background
    useFrame((state, delta) => {
        // Rotation du personnage - plus fluide et naturelle
        if (group.current) {
            // Rotation oscillante pour un effet plus vivant
            group.current.rotation.y += delta * 0.4;
            group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }

        // Animation du dome de fond
        if (backgroundRef.current) {
            backgroundRef.current.rotation.y += delta * 0.03;
            backgroundRef.current.rotation.x += delta * 0.01;
        }
        
        // Animation de la galaxie avec effet de vitesse variable
        if (galaxyRef.current && galaxyRef.current.geometry.attributes.position) {
            galaxyRef.current.rotation.y += delta * 0.01;
            
            // Animation des particules individuelles de la galaxie
            const positions = galaxyRef.current.geometry.attributes.position.array;
            const speeds = galaxyParticles.speeds;
            
            for (let i = 0; i < galaxyParticlesCount; i++) {
                const i3 = i * 3;
                const x = positions[i3];
                const z = positions[i3 + 2];
                
                // Calcul de la nouvelle position avec rotation variable
                const angle = speeds[i] * state.clock.elapsedTime;
                const radius = Math.sqrt(x * x + z * z);
                
                if (radius > 0) {
                    const currentAngle = Math.atan2(z, x);
                    positions[i3] = Math.cos(currentAngle + angle) * radius;
                    positions[i3 + 2] = Math.sin(currentAngle + angle) * radius;
                }
            }
            
            galaxyRef.current.geometry.attributes.position.needsUpdate = true;
        }
        
        // Animation des aurores
        if (auroraRef.current) {
            auroraRef.current.children.forEach((aurora, i) => {
                const data = auroras[i];
                aurora.material.opacity = data.opacity + Math.sin(state.clock.elapsedTime * data.waveSpeed) * 0.1;
                aurora.position.y += Math.sin(state.clock.elapsedTime * data.waveSpeed) * data.waveAmplitude * delta;
                aurora.rotation.z += delta * 0.03;
            });
            
            auroraRef.current.rotation.y += delta * 0.01;
        }
        
        // Animation du champ d'étoiles
        if (starfieldRef.current) {
            starfieldRef.current.children.forEach((star, i) => {
                const data = starfield[i];
                // Effet de scintillement amélioré
                const blink = 0.7 + Math.sin(state.clock.elapsedTime * data.blinkSpeed + data.blinkOffset) * 0.3;
                star.scale.set(blink * data.size, blink * data.size, blink * data.size);
                
                // Micro-mouvement pour un effet plus vivant
                star.position.x += Math.sin(state.clock.elapsedTime * 0.1 + i) * 0.001;
                star.position.y += Math.cos(state.clock.elapsedTime * 0.1 + i) * 0.001;
            });
            
            // Légère rotation du champ d'étoiles
            starfieldRef.current.rotation.y += delta * 0.0005;
            starfieldRef.current.rotation.x += delta * 0.0003;
        }
        
        // Animation des particules flottantes
        if (particlesRef.current) {
            particlesRef.current.children.forEach((particle, i) => {
                const data = particles[i];
                
                // Mouvement de la particule
                particle.position.x += data.direction.x;
                particle.position.y += data.direction.y;
                particle.position.z += data.direction.z;
                
                // Faire rebondir les particules aux limites
                const bounds = 25;
                if (Math.abs(particle.position.x) > bounds) {
                    data.direction.x *= -1;
                }
                if (Math.abs(particle.position.y) > bounds) {
                    data.direction.y *= -1;
                }
                if (Math.abs(particle.position.z) > bounds) {
                    data.direction.z *= -1;
                }
                
                // Effet de pulsation subtil
                const pulse = 0.9 + Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.1;
                particle.scale.set(pulse * data.size, pulse * data.size, pulse * data.size);
            });
        }
    });

    return (
        <>
            {/* Environnement immersif avec brouillard coloré */}
            <fog attach="fog" args={[theme.fogColor, theme.fogNear, theme.fogFar]} />

            {/* Lumières pour l'ambiance */}
            <ambientLight intensity={0.3} />
            
            {/* Lumière principale colorée selon le skill */}
            <directionalLight
                position={[5, 5, 5]}
                intensity={0.7}
                color={skillColor}
                castShadow
                shadow-mapSize={[1024, 1024]}
            />
            
            {/* Lumière d'accent pour dynamiser la scène */}
            <pointLight
                position={[-5, 2, -8]}
                intensity={0.6}
                color="#6e84ff"
                distance={30}
                decay={2}
            />
            
            {/* Lumière ponctuelle pour le personnage */}
            <spotLight
                position={[0, 8, 0]}
                intensity={0.7}
                angle={0.6}
                penumbra={0.8}
                color="#ffffff"
                castShadow
            />
            
            {/* Lumière d'ambiance au sol */}
            <pointLight
                position={[0, -1, 0]}
                intensity={0.5}
                color={skillColor}
                distance={7}
                decay={2}
            />

            {/* Fond étoilé amélioré */}
            <group ref={starfieldRef}>
                {starfield.map((star, i) => (
                    <mesh key={i} position={star.position}>
                        <sphereGeometry args={[star.size, 8, 8]} />
                        <meshBasicMaterial 
                            color={star.color} 
                            transparent 
                            opacity={0.9} 
                        />
                    </mesh>
                ))}
            </group>

            {/* Galaxie spirale en arrière-plan avec plus de détails */}
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

            {/* Aurores boréales pour un effet atmosphérique élégant */}
            <group ref={auroraRef}>
                {auroras.map((aurora, i) => (
                    <mesh 
                        key={i} 
                        position={aurora.position}
                        rotation={aurora.rotation}
                    >
                        <planeGeometry args={aurora.dimensions} />
                        <meshBasicMaterial
                            color={aurora.color}
                            transparent
                            opacity={aurora.opacity}
                            blending={THREE.AdditiveBlending}
                            depthWrite={false}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                ))}
            </group>

            {/* Particules flottantes */}
            <group ref={particlesRef}>
                {particles.map((particle, i) => (
                    <mesh key={i} position={particle.position}>
                        <sphereGeometry args={[particle.size, 8, 8]} />
                        <meshBasicMaterial
                            color={`#${particle.color}`}
                            transparent
                            opacity={0.7}
                            blending={THREE.AdditiveBlending}
                            depthWrite={false}
                        />
                    </mesh>
                ))}
            </group>

            {/* Dôme cosmique avec gradient */}
            <mesh ref={backgroundRef} position={[0, 0, 0]}>
                <sphereGeometry args={[45, 64, 64]} />
                <shaderMaterial
                    vertexShader={`
                        varying vec3 vPosition;
                        void main() {
                            vPosition = position;
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        }
                    `}
                    fragmentShader={`
                        uniform vec3 colorA;
                        uniform vec3 colorB;
                        uniform vec3 colorC;
                        varying vec3 vPosition;
                        void main() {
                            float y = normalize(vPosition).y * 0.5 + 0.5;
                            vec3 color = mix(colorA, colorB, y);
                            color = mix(color, colorC, length(normalize(vPosition).xz) * 0.5);
                            gl_FragColor = vec4(color, 1.0);
                        }
                    `}
                    uniforms={{
                        colorA: { value: new THREE.Color(theme.colors[0]) },
                        colorB: { value: new THREE.Color(theme.colors[1]) },
                        colorC: { value: new THREE.Color(theme.colors[2]) }
                    }}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Plate-forme/socle pour le personnage - plus élégant */}
            <mesh position={[0, -2, 0]} rotation={[0, 0, 0]} receiveShadow>
                <cylinderGeometry args={[3, 3.5, 0.3, 32]} />
                <meshStandardMaterial
                    color={skillColor}
                    metalness={0.8}
                    roughness={0.2}
                    emissive={skillColor}
                    emissiveIntensity={0.3}
                />
            </mesh>

            {/* Anneaux lumineux au sol */}
            <group>
                {/* Anneau principal */}
                <mesh position={[0, -1.84, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[2.8, 3.6, 64]} />
                    <meshBasicMaterial
                        color={skillColor}
                        transparent
                        opacity={0.6}
                        side={THREE.DoubleSide}
                    />
                </mesh>
                
                {/* Anneau secondaire */}
                <mesh position={[0, -1.83, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[2.4, 2.6, 64]} />
                    <meshBasicMaterial
                        color="#ffffff"
                        transparent
                        opacity={0.3}
                        side={THREE.DoubleSide}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
                
                {/* Disque lumineux */}
                <mesh position={[0, -1.82, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[3.8, 64]} />
                    <meshBasicMaterial
                        color={skillColor}
                        transparent
                        opacity={0.15}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            </group>

            {/* Effet de lumière volumétrique */}
            <mesh position={[0, 5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <coneGeometry args={[5, 15, 32, 1, true]} />
                <meshBasicMaterial
                    color={skillColor}
                    transparent
                    opacity={0.08}
                    blending={THREE.AdditiveBlending}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                />
            </mesh>

            {/* Particules holographiques autour du modèle */}
            <points position={[0, 0, 0]}>
                <sphereGeometry args={[4, 20, 20]} />
                <pointsMaterial
                    size={0.1}
                    color={skillColor}
                    transparent
                    opacity={0.4}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>

            {/* Groupe contenant le personnage */}
            <group {...props} dispose={null} ref={group}>
                {currentSkill?.name?.toLowerCase() === 'javascript' ? (
                    <primitive
                        object={scene}
                        scale={modelScale}
                        position={modelPosition}
                        rotation={[0, 0, 0]}
                        castShadow
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
    const skills = ['python', 'javascript', 'sql'];
    skills.forEach(skill => {
        useGLTF.preload(`/models/${skill}_programming_language.glb`);
    });
};

preloadSkillModels();

export default SkillsHuman;