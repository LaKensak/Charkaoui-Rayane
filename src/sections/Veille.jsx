import { useState, useRef } from 'react';
import { veilleTopics } from "../constants/index.js";

const Veille = () => {
    // Initialiser activeTopic avec le premier élément du tableau veilleTopics
    const [activeTopic, setActiveTopic] = useState(veilleTopics[0]);
    const containerRef = useRef(null);

    // Fonction pour obtenir la couleur en fonction de l'index
    const getColor = (index) => {
        const colors = ['#9900CC', '#00CDCD', '#CDCD00', '#CD0069'];
        return colors[index % colors.length];
    };

    return (
        <section className="c-space my-20" id="veille">
            <style jsx global>{`
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }

                @keyframes slideIn {
                    0% { transform: translateY(10px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }

                @keyframes fadeIn {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }

                .topic-icon:hover {
                    animation: pulse 1s infinite;
                }

                .point-active {
                    animation: pulse 2s infinite;
                }

                .hover-scale:hover {
                    transform: scale(1.05);
                    transition: transform 0.3s ease;
                }

                .dynamic-tag {
                    transition: all 0.3s ease;
                }

                .dynamic-tag:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                }

                .active-topic {
                    position: relative;
                    overflow: hidden;
                }

                .active-topic::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, rgba(255,255,255,0.1), transparent);
                    transform: translateX(-100%);
                    animation: shine 8s infinite;
                }

                @keyframes shine {
                    0% { transform: translateX(-100%); }
                    20% { transform: translateX(100%); }
                    100% { transform: translateX(100%); }
                }

                .fade-content {
                    transition: opacity 0.3s ease, transform 0.3s ease;
                }

                .content-container {
                    position: relative;
                }

                .auto-rotate-badge {
                    position: relative;
                    overflow: hidden;
                }

                .auto-rotate-badge::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    animation: shine-badge 1.5s infinite;
                }

                @keyframes shine-badge {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }
            `}</style>
            <div className="w-full">
                <p className="head-text">Veille Tech</p>
                <p className="sub-text mb-10">Les Voitures Autonomes</p>

                <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 h-full">
                    {/* Panneau d'info principal */}
                    <div className="xl:col-span-2 xl:row-span-2">
                        <div className="grid-container" ref={containerRef}>
                            {activeTopic ? (
                                <>
                                    <div className="w-full sm:h-[300px] h-fit relative rounded-3xl overflow-hidden">
                                        <img
                                            src={activeTopic.image}
                                            alt={activeTopic.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div
                                            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                            <p className="text-white font-bold text-xl">{activeTopic.name}</p>
                                            <p className="text-sm text-gray-300">
                                                {activeTopic.source}<span> - {activeTopic.date}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="grid-subtext mt-6">{activeTopic.description}</p>

                                        <div className="mt-6">
                                            <p className="grid-headtext text-xl mb-4">Points Clés</p>
                                            <ul className="space-y-2">
                                                {activeTopic.keyPoints && activeTopic.keyPoints.map((point, idx) => (
                                                    <li key={idx} className="grid-subtext flex items-start">
                                                        <span className="mr-2 text-purple-400">•</span>
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {activeTopic.tags && activeTopic.tags.map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 rounded-full text-sm dynamic-tag"
                                                    style={{
                                                        backgroundColor: `${getColor(activeTopic.id - 1)}22`,
                                                        color: getColor(activeTopic.id - 1)
                                                    }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <img
                                        src="/assets/veille-banner.png"
                                        alt="Veille technologique banner"
                                        className="w-full sm:h-[266px] h-fit object-contain"
                                    />
                                    <div>
                                        <p className="grid-headtext">
                                            Évolution des Technologies
                                        </p>
                                        <p className="grid-subtext">
                                            Sélectionnez un sujet pour découvrir les dernières innovations et
                                            tendances dans le domaine des voitures autonomes. Cette veille
                                            technologique couvre les aspects hardware, logiciels, réglementations et
                                            sécurité des véhicules connectés.
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Sujets de veille */}
                    <div className="xl:col-span-1 xl:row-span-3">
                        <div className="grid-container">
                            <p className="grid-headtext mb-4">Sujets de Veille</p>

                            <div className="space-y-4">
                                {veilleTopics.map((topic) => (
                                    <div
                                        key={topic.id}
                                        onClick={() => setActiveTopic(topic)}
                                        className={`p-4 rounded-xl cursor-pointer transition-all duration-300 hover-scale ${
                                            activeTopic && activeTopic.id === topic.id
                                                ? 'bg-black bg-opacity-50 border-l-4 active-topic'
                                                : 'bg-black bg-opacity-30 hover:bg-opacity-40'
                                        }`}
                                        style={activeTopic && activeTopic.id === topic.id ? {borderLeftColor: getColor(topic.id - 1)} : {}}
                                    >
                                        <div className="flex items-center">
                                            <div
                                                className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 topic-icon"
                                                style={{backgroundColor: `${getColor(topic.id - 1)}33`}}
                                            >
                                                <img src={topic.icon} alt={topic.name} className="w-6 h-6"/>
                                            </div>

                                            <div>
                                                <p className="font-bold text-white">{topic.name}</p>
                                                <p className="text-xs text-gray-400">
                                                    {topic.source}<span> - {topic.date}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Ressources */}
                    <div className="xl:col-span-1 xl:row-span-1">
                        <div className="grid-container">
                            <div className="w-full sm:h-[126px] h-[120px] overflow-hidden rounded-lg">
                                <img
                                    src="/assets/ressources.jpg"
                                    alt="Ressources"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="grid-headtext">Ressources</p>
                                <div className="space-y-3 mt-4">
                                    <div className="flex items-center grid-subtext">
                                        <span className="mr-2">📊</span>
                                        <a href="/assets/EI_2019_art00001.pdf" target="_blank"
                                           rel="noopener noreferrer"
                                           className="hover:text-purple-400 transition-colors">
                                            IEEE – LiDAR Technologies
                                        </a>
                                    </div>
                                    <div className="flex items-center grid-subtext">
                                        <span className="mr-2">🔬</span>
                                        <a href="https://blogs.nvidia.com/blog/auto-ecosystem-physical-ai/"
                                           target="_blank" rel="noopener noreferrer"
                                           className="hover:text-purple-400 transition-colors">
                                            MIT Tech Review – AI & Autonomous Vehicles
                                        </a>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center grid-subtext">
                                            <span className="mr-2">🇪🇺</span>
                                            <a href="https://unece.org/transport/road-transport/automated-driving-0"
                                               target="_blank" rel="noopener noreferrer"
                                               className="hover:text-purple-400 transition-colors">
                                                Commission Européenne
                                            </a>
                                        </div>
                                        <div className="flex items-center grid-subtext">
                                            <span className="mr-2">🛡️</span>
                                            <a href="https://www.enisa.europa.eu/publications/smart-cars"
                                               target="_blank" rel="noopener noreferrer"
                                               className="hover:text-purple-400 transition-colors">
                                                ENISA
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center grid-subtext">
                                        <span className="mr-2">🔐</span>
                                        <a href="/assets/_Camera_ready_final____IEEE_OJ_CommSoc__V2X_security_survey.pdf"
                                           target="_blank" rel="noopener noreferrer"
                                           className="hover:text-purple-400 transition-colors">
                                            Black Hat – V2X & Sécurité Auto
                                        </a>
                                    </div>
                                    <div className="flex items-center grid-subtext">
                                        <span className="mr-2">🔒</span>
                                        <a href="https://auto-talks.com/technology/truly-secure-v2x/"
                                           target="_blank" rel="noopener noreferrer"
                                           className="hover:text-purple-400 transition-colors">
                                            Auto-Talks – Truly Secure V2X
                                        </a>
                                    </div>
                                    <div className="flex items-center grid-subtext">
                                        <span className="mr-2">📑</span>
                                        <a href="http://dl.acm.org/doi/fullHtml/10.1145/3590777.3591406"
                                           target="_blank" rel="noopener noreferrer"
                                           className="hover:text-purple-400 transition-colors">
                                            ACM – Article sur V2X
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Méthodologie de veille */}
                    <div className="xl:col-span-1 xl:row-span-1">
                        <div className="grid-container">
                            <div className="w-full sm:h-[126px] h-[120px] overflow-hidden rounded-lg">
                                <img
                                    src="/assets/metho.png"
                                    alt="Méthodologie"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="grid-headtext">Méthodologie</p>
                                <p className="grid-subtext">
                                    Cette veille technologique est réalisée à travers le suivi de
                                    publications scientifiques, conférences spécialisées, brevets déposés et communiqués
                                    officiels des acteurs majeurs du secteur.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Veille;