import {Suspense, useState} from 'react'
import {Canvas} from "@react-three/fiber";
import {workSkills} from "../constants/index.js";
import {OrbitControls} from "@react-three/drei";
import CanvasLoader from "../component/CanvasLoader.jsx";
import SkillsHuman from "../component/SkillsHuman.jsx";

const Skills = () => {
    const [animationName, setAnimationName] = useState('idle');
    const [currentSkill, setCurrentSkill] = useState(null);

    return (
        <section className="c-space my-20" id="skills">
            <div className="w-full text-white-600">
                <p className="head-text">Mes Compétences</p>

                <div className="work-container">
                    <div className="work-canvas">
                        <Canvas>
                            <ambientLight intensity={1.2}/>
                            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1}/>
                            <directionalLight position={[10, 10, 10]} intensity={1}/>
                            <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2}/>

                            <Suspense fallback={<CanvasLoader/>}>
                                {/* Passage de la compétence actuelle comme prop */}
                                <SkillsHuman
                                    position-y={0}
                                    rotation-y={9.5}
                                    scale={0.5}
                                    animationName={animationName}
                                    currentSkill={currentSkill}
                                />
                            </Suspense>
                        </Canvas>
                    </div>

                    <div className="work-content">
                        <div className="sm:py-10 py-5 sm:px-5 px-2.5">
                            {workSkills.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setAnimationName(item.animation.toLowerCase());
                                        setCurrentSkill(item);
                                    }}
                                    onPointerOver={() => {
                                        setAnimationName(item.animation.toLowerCase());
                                        setCurrentSkill(item);
                                    }}
                                    onPointerOut={() => {
                                        setAnimationName('idle');
                                        setCurrentSkill(null);
                                    }}
                                    className="work-content_container group">
                                    <div className="flex flex-col h-full justify-start items-center py-2">
                                        <div className="work-content_logo">
                                            <img className="w-full h-full" src={item.icon} alt={item.name}/>
                                        </div>

                                        <div className="work-content_bar"/>
                                    </div>

                                    <div className="sm:p-5 px-2.5 py-5">
                                        <p className="font-bold text-white-800">{item.name}</p>
                                        <p className="text-sm mb-5">
                                            {item.pos}<span>{item.duration}</span>
                                        </p>
                                        <p className="group-hover:text-white transition-all ease-in-out duration-500">{item.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Skills