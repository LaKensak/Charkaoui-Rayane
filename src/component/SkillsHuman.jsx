import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { useEffect, useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Configuration des compétences et de leurs couleurs associées
const SKILL_CONFIGS = {
  python: { color: "#4B8BBE", scale: 2.501, position: [-0.002, 0, 0] },
  javascript: { color: "#F0DB4F", scale: 2.501, position: [0, 0, 0] },
  sql: { color: "#0078D4", scale: 2.501, position: [-0.002, 0, 0] },
  default: { color: "#407294", scale: 2.501, position: [-0.002, 0, 0] }
};

// Préchargement des modèles pour éviter les latences
const SKILL_MODELS = ['python', 'javascript', 'sql'];
SKILL_MODELS.forEach(skill => {
  useGLTF.preload(`/models/${skill}_programming_language.glb`);
});

// Préchargement des animations
const ANIMATIONS = [
  { name: 'idle', path: '/models/animations/idle.fbx' },
  { name: 'salute', path: '/models/animations/salute.fbx' },
  { name: 'clapping', path: '/models/animations/clapping.fbx' },
  { name: 'victory', path: '/models/animations/victory.fbx' }
];

const SkillsHuman = ({ 
  animationName = 'idle', 
  currentSkill = null, 
  particleCount = 300,
  gridSize = 15,
  gridDivisions = 20,
  ...props 
}) => {
  const group = useRef();
  const particlesRef = useRef();
  const gridRef = useRef();
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  
  // Déterminer la configuration actuelle basée sur la compétence
  const skillKey = currentSkill?.name?.toLowerCase() || 'default';
  const skillConfig = SKILL_CONFIGS[skillKey] || SKILL_CONFIGS.default;
  const skillColor = new THREE.Color(skillConfig.color);
  
  // Charger dynamiquement le modèle 3D selon le skill survolé
  const modelPath = currentSkill
    ? `/models/${skillKey}_programming_language.glb`
    : '/models/python_programming_language.glb';
    
  const { nodes, materials, scene } = useGLTF(modelPath);
  
  // Charger les animations
  const animations = useMemo(() => {
    return ANIMATIONS.map(anim => {
      const { animations } = useFBX(anim.path);
      animations[0].name = anim.name;
      return animations[0];
    });
  }, []);
  
  const { actions } = useAnimations(animations, group);
  
  // Appliquer l'animation actuelle avec gestion d'erreur
  useEffect(() => {
    if (actions && actions[animationName]) {
      actions[animationName].reset().fadeIn(0.5).play();
      return () => actions[animationName]?.fadeOut(0.5);
    }
  }, [animationName, actions]);
  
  // Notifier quand le modèle est chargé
  useEffect(() => {
    if (nodes && materials) {
      setIsModelLoaded(true);
    }
  }, [nodes, materials]);
  
  // Création des particules pour l'arrière-plan avec mémoisation
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 40 - 10;
      const size = Math.random() * 0.5 + 0.1;
      temp.push({ x, y, z, size });
    }
    return temp;
  }, [particleCount]);
  
  // Animation de la scène avec contrôle de performance
  useFrame((state, delta) => {
    // Animation contrôlée par delta pour assurer une vitesse constante
    if (group.current) {
      group.current.rotation.y += delta * 0.5;
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05;
      particlesRef.current.rotation.x += delta * 0.025;
    }
    
    if (gridRef.current) {
      // Animation de la couleur de la grille avec lerp
      gridRef.current.material.color.lerp(skillColor, delta * 2.5);
      // Animation de position basée sur le temps
      gridRef.current.position.z = -8 + Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  // Rendu conditionnel pour assurer que tout est chargé
  if (!isModelLoaded) {
    return <LoadingIndicator />;
  }
  
  return (
    <>
      {/* Effet d'ambiance */}
      <fog attach="fog" args={['#070b34', 8, 30]} />
      
      {/* Système d'éclairage */}
      <Lighting skillColor={skillConfig.color} />
      
      {/* Grille de fond */}
      <gridHelper
        ref={gridRef}
        args={[gridSize, gridDivisions, skillColor, skillColor]}
        position={[0, -2, -8]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      
      {/* Système de particules */}
      <ParticleSystem 
        ref={particlesRef} 
        particles={particles} 
        color={skillConfig.color} 
      />
      
      {/* Dôme en arrière-plan */}
      <BackgroundDome />
      
      {/* Groupe contenant le personnage */}
      <group {...props} dispose={null} ref={group}>
        <ModelRenderer 
          nodes={nodes}
          materials={materials}
          scene={scene}
          skillKey={skillKey}
          scale={skillConfig.scale}
          position={skillConfig.position}
        />
      </group>
    </>
  );
};

// Composant d'indicateur de chargement
const LoadingIndicator = () => (
  <mesh position={[0, 0, 0]}>
    <sphereGeometry args={[1, 16, 16]} />
    <meshBasicMaterial color="#6088b4" wireframe />
  </mesh>
);

// Système d'éclairage modulaire
const Lighting = ({ skillColor }) => (
  <>
    <ambientLight intensity={0.4} />
    <directionalLight
      position={[5, 5, 5]}
      intensity={0.6}
      color={skillColor}
    />
    <pointLight
      position={[-5, 2, -8]}
      intensity={0.5}
      color="#6e84ff"
    />
  </>
);

// Système de particules optimisé
const ParticleSystem = ({ particles, color, ...props }) => (
  <group {...props}>
    <instancedMesh args={[null, null, particles.length]}>
      <sphereGeometry args={[0.3, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
      {particles.map((particle, i) => (
        <object3D
          key={i}
          position={[particle.x, particle.y, particle.z]}
          scale={[particle.size, particle.size, particle.size]}
          onUpdate={self => {
            self.updateMatrix();
            self.parent.setMatrixAt(i, self.matrix);
            self.parent.instanceMatrix.needsUpdate = true;
          }}
        />
      ))}
    </instancedMesh>
  </group>
);

// Dôme d'arrière-plan
const BackgroundDome = () => (
  <mesh position={[0, 0, -15]}>
    <sphereGeometry args={[20, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
    <meshBasicMaterial
      color="#070b34"
      side={THREE.BackSide}
      opacity={0.8}
      transparent
    />
  </mesh>
);

// Rendu du modèle avec gestion des différents formats
const ModelRenderer = ({ nodes, materials, scene, skillKey, scale, position }) => {
  if (skillKey === 'javascript') {
    return (
      <primitive
        object={scene}
        scale={scale}
        position={position}
        rotation={[0, 0, 0]}
      />
    );
  }
  
  if (nodes.Object_4 && materials.material && nodes.Object_6 && materials['.001']) {
    return (
      <>
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials.material}
          position={position}
          rotation={[Math.PI / 2, 0, 0]}
          scale={scale}
        />
        <mesh
          geometry={nodes.Object_6.geometry}
          material={materials['.001']}
          position={position}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={scale}
        />
      </>
    );
  }
  
  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
    />
  );
};

export default SkillsHuman;