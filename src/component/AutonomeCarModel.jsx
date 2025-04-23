import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const AutonomeCarModel = ({ animationName, currentTopic, ...props }) => {
  const carRef = useRef();
  const { scene, animations } = useGLTF("/models/autonomous_car.glb");
  const { actions, mixer } = useAnimations(animations, carRef);
  const { camera } = useThree();

  // Clone le matériel pour éviter les mutations partagées
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.side = THREE.DoubleSide;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  // Gestion des animations
  useEffect(() => {
    Object.values(actions).forEach((action) => action.stop());

    if (animationName && actions[animationName]) {
      const action = actions[animationName];
      action.reset().play();
    } else {
      // Animation par défaut "idle"
      if (actions.idle) {
        actions.idle.reset().play();
      }
    }

    return () => {
      if (mixer) {
        mixer.stopAllAction();
      }
    };
  }, [animationName, actions, mixer]);

  // Effet de mise en évidence quand un sujet est sélectionné
  useEffect(() => {
    if (currentTopic) {
      // Effet de mise en évidence (par exemple, changement de couleur)
      scene.traverse((child) => {
        if (child.isMesh && child.material.emissive) {
          // Sauvegarder la couleur d'origine si pas déjà fait
          if (!child.userData.originalEmissive) {
            child.userData.originalEmissive = child.material.emissive.clone();
          }

          // Appliquer une couleur d'accent basée sur le sujet
          switch(currentTopic.name) {
            case "Technologies LiDAR":
              child.material.emissive.set(0x00ffff); // Cyan
              break;
            case "Intelligence Artificielle Embarquée":
              child.material.emissive.set(0xff00ff); // Magenta
              break;
            case "Réglementation Européenne":
              child.material.emissive.set(0xffff00); // Jaune
              break;
            case "Sécurité Informatique":
              child.material.emissive.set(0xff0000); // Rouge
              break;
            default:
              child.material.emissive.set(0x0088ff); // Bleu par défaut
          }
        }
      });
    } else {
      // Rétablir les couleurs d'origine
      scene.traverse((child) => {
        if (child.isMesh && child.userData.originalEmissive) {
          child.material.emissive.copy(child.userData.originalEmissive);
        }
      });
    }
  }, [currentTopic, scene]);

  // Animation continue
  useFrame((state, delta) => {
    if (carRef.current) {
      // Mise à jour de l'animation
      if (mixer) {
        mixer.update(delta);
      }

      // Animation subtile pour l'état "idle"
      if (!currentTopic) {
        carRef.current.rotation.y += delta * 0.2;
      }
    }
  });

  // Positionnement de la caméra basé sur le sujet sélectionné
  useEffect(() => {
    if (currentTopic) {
      // Position de caméra spécifique pour chaque sujet
      switch(currentTopic.name) {
        case "Technologies LiDAR":
          camera.position.set(2, 1, 2); // Vue détaillée des capteurs
          break;
        case "Intelligence Artificielle Embarquée":
          camera.position.set(0, 1.5, 3); // Vue du cockpit
          break;
        case "Réglementation Européenne":
          camera.position.set(-2, 1, 2); // Vue latérale
          break;
        case "Sécurité Informatique":
          camera.position.set(0, 2, 4); // Vue d'ensemble
          break;
        default:
          camera.position.set(3, 2, 3);
      }
    } else {
      // Position par défaut
      camera.position.set(3, 2, 3);
    }
  }, [currentTopic, camera]);

  return <primitive ref={carRef} object={scene} {...props} />;
};

export default AutonomeCarModel;

// Préchargement du modèle pour de meilleures performances
useGLTF.preload("/models/autonomous_car.glb");