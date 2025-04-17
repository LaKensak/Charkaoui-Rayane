import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

const SkillsHuman = ({ animationName = 'idle', currentSkill = null, ...props }) => {
    const group = useRef();

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

    // État pour la rotation
    const [rotationSpeed] = useState(0.01); // Vitesse de rotation

    // Met à jour la rotation à chaque frame
    useFrame(() => {
        if (group.current) {
            group.current.rotation.y += rotationSpeed; // Rotation autour de l'axe Y
        }
    });

    // Gestion des erreurs de chargement des modèles
    if (!nodes || !materials) {
        return null;
    }

    // Si c'est le modèle JavaScript, utiliser une approche spécifique pour la rotation
    if (currentSkill?.name?.toLowerCase() === 'javascript') {
        return (
            <group {...props} dispose={null} ref={group}>
                <primitive
                    object={scene}
                    scale={modelScale}
                    position={modelPosition}
                    rotation={[0, 0, 0]}
                />
            </group>
        );
    }

    // Rendu adaptatif pour les autres modèles
    return (
        <group {...props} dispose={null} ref={group}>
            {/* Rendu du modèle actuel */}
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

            {/* Si la structure du modèle est différente, on peut utiliser le fallback ci-dessous */}
            {(!nodes.Object_4 || !nodes.Object_6) && (
                <primitive
                    object={scene}
                    scale={modelScale}
                    position={modelPosition}
                />
            )}
        </group>
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