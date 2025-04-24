import { useAnimations, useFBX, useGLTF, Environment, useTexture, Text, Float, MeshTransmissionMaterial } from '@react-three/drei';
import { useEffect, useRef, useMemo, useState, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { easing } from 'maath';

// Configuration détaillée des compétences avec des paramètres visuels étendus
const SKILLS = {
  python: {
    color: "#4B8BBE",
    secondaryColor: "#FFD43B",
    scale: 2.501,
    position: [-0.002, 0, 0],
    particleColor: "#306998",
    description: "Python",
    glowIntensity: 1.2,
    emissiveIntensity: 0.5,
    particleDensity: 1.2
  },
  javascript: {
    color: "#F0DB4F",
    secondaryColor: "#323330",
    scale: 2.501,
    position: [0, 0, 0],
    particleColor: "#E8D44D",
    description: "JavaScript",
    glowIntensity: 1.5,
    emissiveIntensity: 0.7,
    particleDensity: 1.0
  },
  sql: {
    color: "#0078D4",
    secondaryColor: "#FF8C00",
    scale: 2.501,
    position: [-0.002, 0, 0],
    particleColor: "#00BCF2",
    description: "SQL",
    glowIntensity: 1.0,
    emissiveIntensity: 0.4,
    particleDensity: 0.8
  },
  default: {
    color: "#407294",
    secondaryColor: "#6FC3DF",
    scale: 2.501,
    position: [-0.002, 0, 0],
    particleColor: "#6088b4",
    description: "Programmation",
    glowIntensity: 1.0,
    emissiveIntensity: 0.3,
    particleDensity: 1.0
  }
};

// Animations disponibles avec des métadonnées
const ANIMATIONS = [
  { name: 'idle', path: '/models/animations/idle.fbx', loopType: THREE.LoopRepeat, transitionTime: 0.5 },
  { name: 'salute', path: '/models/animations/salute.fbx', loopType: THREE.LoopOnce, transitionTime: 0.3 },
  { name: 'clapping', path: '/models/animations/clapping.fbx', loopType: THREE.LoopRepeat, transitionTime: 0.2 },
  { name: 'victory', path: '/models/animations/victory.fbx', loopType: THREE.LoopOnce, transitionTime: 0.4 }
];

// Gestionnaire de préchargement centralisé
const AssetPreloader = () => {
  useEffect(() => {
    // Préchargement des modèles
    Object.keys(SKILLS).forEach(skill => {
      if (skill !== 'default') {
        useGLTF.preload(`/models/${skill}_programming_language.glb`);
      }
    });
    useGLTF.preload('/models/python_programming_language.glb');
    
    // Préchargement des textures (HDRIs, particules, etc.)
    [
      '/textures/particle.png',
      '/textures/noise.png',
      '/textures/grid.png'
    ].forEach(texture => {
      new THREE.TextureLoader().load(texture);
    });
    
    return () => {
      // Nettoyage des ressources lors du démontage
      Object.keys(SKILLS).forEach(skill => {
        if (skill !== 'default') {
          useGLTF.clear(`/models/${skill}_programming_language.glb`);
        }
      });
      useGLTF.clear('/models/python_programming_language.glb');
    };
  }, []);
  
  return null;
};

// Composant principal avec gestion d'état avancée
const SkillsHuman = ({ 
  animationName = 'idle', 
  currentSkill = null,
  enableEffects = true,
  cameraControl = true,
  autoRotate = true,
  highlightModel = true,
  showParticles = true,
  showDescription = true,
  ...props 
}) => {
  // Références et états
  const group = useRef();
  const particlesRef = useRef();
  const gridRef = useRef();
  const textRef = useRef();
  const platformRef = useRef();
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [currentAnimationTime, setCurrentAnimationTime] = useState(0);
  const [hoveredPart, setHoveredPart] = useState(null);
  const { camera } = useThree();
  
  // Dériver les configurations actuelles
  const skillKey = currentSkill?.name?.toLowerCase() || 'default';
  const skillConfig = SKILLS[skillKey] || SKILLS.default;
  
  // Chargement du modèle 3D
  const modelPath = currentSkill
    ? `/models/${skillKey}_programming_language.glb`
    : '/models/python_programming_language.glb';
    
  const { nodes, materials, scene, animations: modelAnimations } = useGLTF(modelPath);
  
  // Textures pour les effets visuels
  const [particleTexture, noiseTexture, gridTexture] = useTexture([
    '/textures/particle.png',
    '/textures/noise.png',
    '/textures/grid.png'
  ]);
  
  // Chargement et préparation des animations
  const loadedAnimations = useMemo(() => {
    return ANIMATIONS.map(anim => {
      const { animations } = useFBX(anim.path);
      animations[0].name = anim.name;
      // Configurer les propriétés de l'animation
      animations[0].setLoop(anim.loopType);
      animations[0].fadeIn = anim.transitionTime;
      animations[0].fadeOut = anim.transitionTime;
      return animations[0];
    });
  }, []);
  
  const { actions, mixer } = useAnimations([...loadedAnimations, ...(modelAnimations || [])], group);
  
  // Système avancé de particules avec optimisation
  const particles = useMemo(() => {
    const count = Math.floor(300 * skillConfig.particleDensity);
    const temp = [];
    const radius = 20;
    
    for (let i = 0; i < count; i++) {
      // Distribution sphérique des particules
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = Math.random() * radius;
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi) - 10;
      
      const size = Math.random() * 0.5 + 0.1;
      const speed = Math.random() * 0.2 + 0.05;
      const offset = Math.random() * Math.PI * 2;
      
      temp.push({ x, y, z, size, speed, offset });
    }
    return temp;
  }, [skillConfig.particleDensity]);
  
  // Contrôle de caméra adaptatif
  useEffect(() => {
    if (cameraControl && camera) {
      const originalPosition = camera.position.clone();
      
      // Ajustement de la caméra pour une meilleure vue du modèle actuel
      camera.position.set(0, 1, 5);
      
      return () => {
        // Restaurer la position originale lors du démontage
        camera.position.copy(originalPosition);
      };
    }
  }, [cameraControl, camera, skillKey]);
  
  // Système d'animation avancé
  useEffect(() => {
    if (actions && actions[animationName]) {
      // Arrêter toutes les animations précédentes avec transition
      Object.values(actions).forEach(action => {
        if (action.isRunning()) {
          action.fadeOut(0.3);
        }
      });
      
      // Démarrer la nouvelle animation
      actions[animationName]
        .reset()
        .setEffectiveTimeScale(1)
        .setEffectiveWeight(1)
        .fadeIn(0.3)
        .play();
      
      return () => {
        if (actions[animationName]?.isRunning()) {
          actions[animationName].fadeOut(0.3);
        }
      };
    }
  }, [animationName, actions, skillKey]);
  
  // Notification quand le modèle est chargé
  useEffect(() => {
    if (nodes && materials) {
      // Améliorer les matériaux pour un rendu supérieur
      Object.values(materials).forEach(material => {
        if (material.isMeshStandardMaterial) {
          material.envMapIntensity = 1.5;
          material.roughness = 0.4;
          material.metalness = 0.6;
          
          // Effet d'émissivité pour faire briller le modèle
          if (highlightModel) {
            material.emissive = new THREE.Color(skillConfig.color);
            material.emissiveIntensity = skillConfig.emissiveIntensity;
          }
        }
      });
      
      setIsModelLoaded(true);
    }
  }, [nodes, materials, skillConfig, highlightModel]);
  
  // Animation de la scène avec effets avancés
  useFrame((state, delta) => {
    // Animation du personnage avec rotation personnalisée
    if (group.current && autoRotate) {
      easing.dampE(
        group.current.rotation,
        [0, state.clock.elapsedTime * 0.2, 0],
        0.25,
        delta
      );
    }
    
    // Système de particules dynamique
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05;
      
      // Animer chaque particule individuellement
      particles.forEach((particle, i) => {
        const instance = particlesRef.current.children[0];
        if (instance && instance.instanceMatrix) {
          const time = state.clock.elapsedTime * particle.speed + particle.offset;
          
          // Mouvement circulaire autour de l'origine
          const x = particle.x + Math.sin(time) * 0.2;
          const y = particle.y + Math.cos(time) * 0.2;
          const z = particle.z;
          
          // Mise à jour de la matrice d'instance
          const dummy = new THREE.Object3D();
          dummy.position.set(x, y, z);
          dummy.scale.set(particle.size, particle.size, particle.size);
          dummy.updateMatrix();
          
          instance.setMatrixAt(i, dummy.matrix);
        }
      });
      
      if (particlesRef.current.children[0]) {
        particlesRef.current.children[0].instanceMatrix.needsUpdate = true;
      }
    }
    
    // Animation de la grille
    if (gridRef.current) {
      // Animation de couleur fluide
      const targetColor = new THREE.Color(skillConfig.color);
      gridRef.current.material.color.lerp(targetColor, delta * 2);
      
      // Animation de déplacement organique
      gridRef.current.position.z = -8 + Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
      gridRef.current.rotation.z += delta * 0.1;
    }
    
    // Animation fluide du socle
    if (platformRef.current) {
      platformRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      
      const targetColor = new THREE.Color(skillConfig.color);
      if (platformRef.current.material.color) {
        platformRef.current.material.color.lerp(targetColor, delta * 2);
      }
    }
    
    // Animation du texte flottant
    if (textRef.current) {
      textRef.current.position.y = 3 + Math.sin(state.clock.elapsedTime) * 0.1;
    }
    
    // Mettre à jour le temps d'animation courant pour la progression
    if (mixer) {
      setCurrentAnimationTime(mixer.time);
    }
  });
  
  // Rendu conditionnel pour assurer que tout est chargé
  return (
    <>
      <AssetPreloader />
      
      <Suspense fallback={<LoadingIndicator />}>
        {/* Environnement ambiant */}
        <Environment preset="night" />
        <fog attach="fog" args={['#070b34', 8, 30]} />
        
        {/* Éclairage dynamique */}
        <DynamicLighting config={skillConfig} />
        
        {/* Post-processing conditionnel */}
        {enableEffects && (
          <EffectComposer>
            <Bloom 
              intensity={skillConfig.glowIntensity}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
            />
            <ChromaticAberration offset={[0.002, 0.002]} />
          </EffectComposer>
        )}
        
        {/* Fond dynamique */}
        <InteractiveDome color={skillConfig.color} />
        
        {/* Grille de fond améliorée */}
        <mesh
          ref={gridRef}
          position={[0, -2, -8]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[30, 30, 30, 30]} />
          <meshStandardMaterial 
            color={skillConfig.color}
            wireframe={true}
            transparent
            opacity={0.3}
            emissive={skillConfig.color}
            emissiveIntensity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Socle pour le modèle */}
        <mesh 
          ref={platformRef}
          position={[0, -1.5, 0]}
          receiveShadow
        >
          <cylinderGeometry args={[2, 2.5, 0.2, 32]} />
          <MeshTransmissionMaterial
            color={skillConfig.color}
            thickness={0.2}
            roughness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transmission={0.95}
            ior={1.5}
            chromaticAberration={0.06}
          />
        </mesh>
        
        {/* Système de particules avancé */}
        {showParticles && (
          <group ref={particlesRef}>
            <instancedMesh args={[null, null, particles.length]}>
              <planeGeometry args={[1, 1]} />
              <meshBasicMaterial
                map={particleTexture}
                color={skillConfig.particleColor}
                transparent
                opacity={0.7}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                side={THREE.DoubleSide}
              />
            </instancedMesh>
          </group>
        )}
        
        {/* Texte descriptif flottant */}
        {showDescription && (
          <Float 
            speed={2} 
            rotationIntensity={0.2} 
            floatIntensity={0.5}
            ref={textRef}
          >
            <Text
              position={[0, 3, 0]}
              color={skillConfig.secondaryColor}
              fontSize={0.5}
              maxWidth={200}
              lineHeight={1}
              letterSpacing={0.02}
              textAlign="center"
              font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
              anchorX="center"
              anchorY="middle"
            >
              {skillConfig.description}
              <meshBasicMaterial
                toneMapped={false}
                color={skillConfig.secondaryColor}
                transparent
                opacity={0.8}
              />
            </Text>
          </Float>
        )}
        
        {/* Groupe contenant le personnage avec effets avancés */}
        <group 
          {...props} 
          dispose={null} 
          ref={group}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredPart(e.object.name);
          }}
          onPointerOut={() => setHoveredPart(null)}
        >
          {!isModelLoaded ? (
            <LoadingIndicator />
          ) : (
            <EnhancedModelRenderer 
              nodes={nodes}
              materials={materials}
              scene={scene}
              skillKey={skillKey}
              scale={skillConfig.scale}
              position={skillConfig.position}
              highlight={highlightModel}
              hoveredPart={hoveredPart}
              color={skillConfig.color}
            />
          )}
        </group>
      </Suspense>
    </>
  );
};

// Composant d'indicateur de chargement amélioré
const LoadingIndicator = () => (
  <group>
    <mesh position={[0, 0, 0]}>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshBasicMaterial color="#6088b4" wireframe />
    </mesh>
    <Text position={[0, -2, 0]} color="white" fontSize={0.3}>
      Chargement...
    </Text>
  </group>
);

// Système d'éclairage dynamique adapté au skill actuel
const DynamicLighting = ({ config }) => (
  <>
    <ambientLight intensity={0.4} />
    <directionalLight
      position={[5, 5, 5]}
      intensity={0.6}
      color={config.color}
      castShadow
      shadow-mapSize={[2048, 2048]}
    />
    <pointLight
      position={[-5, 2, -8]}
      intensity={0.5}
      color={config.secondaryColor}
      distance={20}
      decay={2}
    />
    <spotLight
      position={[0, 5, 0]}
      angle={0.3}
      penumbra={0.2}
      intensity={0.5}
      color="white"
      castShadow
    />
  </>
);

// Dôme interactif avec effets de profondeur
const InteractiveDome = ({ color }) => (
  <mesh position={[0, 0, -15]}>
    <sphereGeometry args={[20, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2]} />
    <meshBasicMaterial
      color="#070b34"
      side={THREE.BackSide}
      opacity={0.8}
      transparent
      vertexColors
      onBeforeCompile={(shader) => {
        shader.uniforms.time = { value: 0 };
        shader.uniforms.color = { value: new THREE.Color(color) };
        
        shader.vertexShader = `
          uniform float time;
          varying vec3 vPosition;
          ${shader.vertexShader}
        `.replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
          vPosition = position;
          float noiseIntensity = sin(position.x * 0.05 + time * 0.3) * 
                                sin(position.y * 0.05 + time * 0.2) * 
                                sin(position.z * 0.05 + time * 0.1);
          transformed += normal * noiseIntensity * 0.2;
          `
        );
        
        shader.fragmentShader = `
          uniform vec3 color;
          varying vec3 vPosition;
          ${shader.fragmentShader}
        `.replace(
          '#include <dithering_fragment>',
          `#include <dithering_fragment>
          float intensity = 0.5 - distance(vUv, vec2(0.5));
          intensity = pow(intensity, 4.0);
          gl_FragColor.rgb += color * intensity * 0.2;
          `
        );
      }}
    />
  </mesh>
);

// Rendu amélioré du modèle avec effets de survol
const EnhancedModelRenderer = ({ 
  nodes, 
  materials, 
  scene, 
  skillKey, 
  scale, 
  position,
  highlight,
  hoveredPart,
  color
}) => {
  // Cloner la scène pour éviter de modifier l'original
  const modelScene = useMemo(() => {
    if (scene) {
      const clone = scene.clone(true);
      // Ajouter des ombres à tous les enfants
      clone.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          // Effet de survol
          if (highlight && child.name === hoveredPart) {
            child.material = child.material.clone();
            child.material.emissive = new THREE.Color(color);
            child.material.emissiveIntensity = 1.0;
          }
        }
      });
      return clone;
    }
    return null;
  }, [scene, highlight, hoveredPart, color]);
  
  // Stratégie de rendu selon le type de modèle
  if (skillKey === 'javascript') {
    return (
      <primitive
        object={modelScene || scene}
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
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.Object_6.geometry}
          material={materials['.001']}
          position={position}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={scale}
          castShadow
          receiveShadow
        />
      </>
    );
  }
  
  return (
    <primitive
      object={modelScene || scene}
      scale={scale}
      position={position}
    />
  );
};

export default SkillsHuman;