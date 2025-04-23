import { useState, useRef, useEffect } from 'react';
import { veilleTopics } from "../constants/index.js";

const Veille = () => {
    const [activeTopic, setActiveTopic] = useState(veilleTopics[0]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [autoRotate, setAutoRotate] = useState(false);
    const [rotationInterval, setRotationInterval] = useState(null);
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    // Fonction pour obtenir la couleur en fonction de l'index
    const getColor = (index) => {
        const colors = ['#9900CC', '#00CDCD', '#CDCD00', '#CD0069'];
        return colors[index % colors.length];
    };

    // Fonction pour la recherche de sujets
    const [searchTerm, setSearchTerm] = useState('');
    const filteredTopics = veilleTopics.filter(topic =>
        topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (topic.tags && topic.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    );

    // Animation lors du changement de sujet
    useEffect(() => {
        if (activeTopic) {
            setIsAnimating(true);
            setTimeout(() => {
                setIsAnimating(false);
            }, 500);
        }
    }, [activeTopic]);

    // Fonction pour la rotation automatique des sujets
    useEffect(() => {
        if (autoRotate) {
            const interval = setInterval(() => {
                const currentIndex = veilleTopics.findIndex(topic => topic.id === activeTopic.id);
                const nextIndex = (currentIndex + 1) % veilleTopics.length;
                setActiveTopic(veilleTopics[nextIndex]);
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 2000);
            }, 10000); // Rotation toutes les 10 secondes

            setRotationInterval(interval);
            return () => clearInterval(interval);
        } else if (rotationInterval) {
            clearInterval(rotationInterval);
        }
    }, [autoRotate, activeTopic]);

    // Fonction pour le défilement fluide à la section
    const scrollToVeille = () => {
        const element = document.getElementById('veille');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
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
                
                .notification {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    padding: 10px 20px;
                    background-color: rgba(0, 0, 0, 0.8);
                    color: white;
                    border-radius: 8px;
                    z-index: 1000;
                    animation: slideUp 0.3s ease-out, fadeOut 0.3s ease-out 1.7s forwards;
                }
                
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                
                .search-bar {
                    position: relative;
                }
                
                .search-icon {
                    position: absolute;
                    top: 50%;
                    left: 12px;
                    transform: translateY(-50%);
                    color: #9ca3af;
                }
                
                .clear-icon {
                    position: absolute;
                    top: 50%;
                    right: 12px;
                    transform: translateY(-50%);
                    cursor: pointer;
                    color: #9ca3af;
                }
                
                .bookmark-button {
                    transition: all 0.3s ease;
                }
                
                .bookmark-button:hover {
                    transform: scale(1.1);
                }
                
                .bookmark-button:active {
                    transform: scale(0.95);
                }
                
                .progress-bar {
                    height: 4px;
                    background: linear-gradient(90deg, #9900CC, #00CDCD);
                    border-radius: 2px;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    transition: width 0.3s linear;
                }
                
                .image-overlay {
                    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0) 60%);
                }
                
                .content-fade-in {
                    animation: contentFadeIn 0.5s ease-out;
                }
                
                @keyframes contentFadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .topic-card {
                    transition: all 0.3s ease;
                }
                
                .topic-card:hover {
                    transform: translateX(5px);
                }
            `}</style>

            <div className="w-full">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="head-text">Veille Tech</p>
                        <p className="sub-text mb-6">Les Voitures Autonomes</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setAutoRotate(!autoRotate)}
                            className={`px-4 py-2 rounded-full text-sm flex items-center ${autoRotate ? 'auto-rotate-badge bg-purple-800 text-white' : 'bg-black bg-opacity-30 text-gray-300'}`}
                        >
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" stroke="currentColor" strokeWidth="2"/>
                                <path d="M15 12L10 15V9L15 12Z" fill="currentColor"/>
                            </svg>
                            {autoRotate ? 'Auto-rotation active' : 'Auto-rotation'}
                        </button>
                        <button
                            onClick={scrollToVeille}
                            className="p-2 rounded-full bg-black bg-opacity-30 hover:bg-opacity-50 transition-all"
                            title="Remonter en haut de la section"
                        >
                            <svg className="w-5 h-5 text-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4L12 20M12 4L6 10M12 4L18 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 h-full">
                    {/* Panneau d'info principal */}
                    <div className="xl:col-span-2 xl:row-span-2">
                        <div className={`grid-container ${isAnimating ? 'opacity-80' : ''} transition-all duration-300`} ref={containerRef}>
                            {activeTopic ? (
                                <>
                                    <div className="w-full sm:h-[300px] h-fit relative rounded-3xl overflow-hidden">
                                        <img
                                            src={activeTopic.image}
                                            alt={activeTopic.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 image-overlay"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <p className="text-white font-bold text-2xl mb-1">{activeTopic.name}</p>
                                                    <p className="text-sm text-gray-300">
                                                        {activeTopic.source}<span> - {activeTopic.date}</span>
                                                    </p>
                                                </div>
                                                <div className="flex space-x-3">
                                                    <a
                                                        href={activeTopic.sourceLink || "#"}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-80 transition-all bookmark-button"
                                                        title="Voir la source originale"
                                                    >
                                                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        {autoRotate && (
                                            <div className="absolute bottom-0 left-0 right-0">
                                                <div className="progress-bar" style={{ width: `100%` }}></div>
                                            </div>
                                        )}
                                    </div>
                                    <div className={`content-fade-in ${isAnimating ? 'opacity-0' : 'opacity-100'}`} ref={contentRef}>
                                        <p className="grid-subtext mt-6">{activeTopic.description}</p>

                                        <div className="mt-6">
                                            <p className="grid-headtext text-xl mb-4">Points Clés</p>
                                            <ul className="space-y-3">
                                                {activeTopic.keyPoints && activeTopic.keyPoints.map((point, idx) => (
                                                    <li key={idx} className="grid-subtext flex items-start bg-black bg-opacity-20 p-3 rounded-lg">
                                                        <span className="mr-3 text-purple-400 point-active">•</span>
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {activeTopic.tags && activeTopic.tags.map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 rounded-full text-sm dynamic-tag text-white"
                                                    style={{
                                                        backgroundColor: `${getColor(activeTopic.id - 1)}22`,
                                                        color: getColor(activeTopic.id - 1)
                                                    }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Ajout d'une section d'impact et perspectives */}
                                        {activeTopic.impact && (
                                            <div className="mt-6">
                                                <p className="grid-headtext text-xl mb-4">Impact & Perspectives</p>
                                                <p className="grid-subtext">{activeTopic.impact}</p>
                                            </div>
                                        )}
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
                            <div className="flex justify-between items-center mb-4">
                                <p className="grid-headtext">Sujets de Veille</p>
                                <div className="flex items-center">
                                    <span className="text-xs text-gray-400 mr-2">{filteredTopics.length} sujet(s)</span>
                                </div>
                            </div>

                            {/*/!* Barre de recherche *!/*/}
                            {/*<div className="search-bar mb-4">*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        value={searchTerm}*/}
                            {/*        onChange={(e) => setSearchTerm(e.target.value)}*/}
                            {/*        placeholder="Rechercher un sujet..."*/}
                            {/*        className="w-full p-2 pl-10 pr-10 bg-black bg-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"*/}
                            {/*    />*/}
                            {/*    <span className="search-icon">*/}
                            {/*        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                            {/*            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>*/}
                            {/*        </svg>*/}
                            {/*    </span>*/}
                            {/*    {searchTerm && (*/}
                            {/*        <span className="clear-icon" onClick={() => setSearchTerm('')}>*/}
                            {/*            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                            {/*                <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>*/}
                            {/*            </svg>*/}
                            {/*        </span>*/}
                            {/*    )}*/}
                            {/*</div>*/}

                            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                                {filteredTopics.length > 0 ? (
                                    filteredTopics.map((topic) => (
                                        <div
                                            key={topic.id}
                                            onClick={() => setActiveTopic(topic)}
                                            className={`p-4 rounded-xl cursor-pointer transition-all duration-300 topic-card ${
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
                                                    <div className="flex items-center">
                                                        <p className="text-xs text-gray-400">
                                                            {topic.source}<span> - {topic.date}</span>
                                                        </p>
                                                        {topic.isNew && (
                                                            <span className="ml-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                                                                NEW
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center p-4">
                                        <p className="text-gray-400">Aucun sujet ne correspond à votre recherche</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Ressources */}
                    <div className="xl:col-span-1 xl:row-span-1">
                        <div className="grid-container">
                            <div className="w-full sm:h-[126px] h-[120px] overflow-hidden rounded-lg relative">
                                <img
                                    src="/assets/ressources.jpg"
                                    alt="Ressources"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">Documentation</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center">
                                    <p className="grid-headtext">Ressources</p>
                                    <button
                                        className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                                        title="Trier par pertinence"
                                    >
                                        Trier par pertinence
                                    </button>
                                </div>
                                <div className="space-y-3 mt-4">
                                    <div className="flex items-center grid-subtext p-2 hover:bg-black hover:bg-opacity-30 rounded-lg transition-colors">
                                        <span className="mr-2">📊</span>
                                        <a href="/assets/EI_2019_art00001.pdf" target="_blank"
                                           rel="noopener noreferrer"
                                           className="hover:text-purple-400 transition-colors flex-grow">
                                            IEEE – LiDAR Technologies
                                        </a>
                                        <span className="text-xs text-gray-500">PDF</span>
                                    </div>
                                    <div className="flex items-center grid-subtext p-2 hover:bg-black hover:bg-opacity-30 rounded-lg transition-colors">
                                        <span className="mr-2">🔬</span>
                                        <a href="https://blogs.nvidia.com/blog/auto-ecosystem-physical-ai/"
                                           target="_blank" rel="noopener noreferrer"
                                           className="hover:text-purple-400 transition-colors flex-grow">
                                            NVIDIA – Auto Ecosystem AI
                                        </a>
                                        <span className="text-xs text-gray-500">Web</span>
                                    </div>
                                    <div className="flex items-center grid-subtext p-2 hover:bg-black hover:bg-opacity-30 rounded-lg transition-colors">
                                        <span className="mr-2">🇪🇺</span>
                                        <a href="https://unece.org/transport/road-transport/automated-driving-0"
                                           target="_blank" rel="noopener noreferrer"
                                           className="hover:text-purple-400 transition-colors flex-grow">
                                            UNECE – Automated Driving Regulations
                                        </a>
                                        <span className="text-xs text-gray-500">Web</span>
                                    </div>
                                    <div className="flex items-center grid-subtext p-2 hover:bg-black hover:bg-opacity-30 rounded-lg transition-colors">
                                        <span className="mr-2">🛡️</span>
                                        <a href="https://www.enisa.europa.eu/publications/smart-cars"
                                           target="_blank" rel="noopener noreferrer"
                                           className="hover:text-purple-400 transition-colors flex-grow">
                                            ENISA – Smart Cars Cybersecurity
                                        </a>
                                        <span className="text-xs text-gray-500">Web</span>
                                    </div>
                                    <div className="flex items-center grid-subtext p-2 hover:bg-black hover:bg-opacity-30 rounded-lg transition-colors">
                                        <span className="mr-2">🔐</span>
                                        <a href="/assets/_Camera_ready_final____IEEE_OJ_CommSoc__V2X_security_survey.pdf"
                                           target="_blank" rel="noopener noreferrer"
                                           className="hover:text-purple-400 transition-colors flex-grow">
                                            IEEE – V2X Security Survey
                                        </a>
                                        <span className="text-xs text-gray-500">PDF</span>
                                    </div>
                                    <div className="flex items-center grid-subtext p-2 hover:bg-black hover:bg-opacity-30 rounded-lg transition-colors">
                                        <span className="mr-2">🔒</span>
                                        <a href="https://auto-talks.com/technology/truly-secure-v2x/"
                                           target="_blank" rel="noopener noreferrer"
                                           className="hover:text-purple-400 transition-colors flex-grow">
                                            Auto-Talks – Secure V2X
                                        </a>
                                        <span className="text-xs text-gray-500">Web</span>
                                    </div>
                                    <div className="flex items-center grid-subtext p-2 hover:bg-black hover:bg-opacity-30 rounded-lg transition-colors">
                                        <span className="mr-2">📑</span>
                                        <a href="http://dl.acm.org/doi/fullHtml/10.1145/3590777.3591406"
                                           target="_blank" rel="noopener noreferrer"
                                           className="hover:text-purple-400 transition-colors flex-grow">
                                            ACM – V2X Research
                                        </a>
                                        <span className="text-xs text-gray-500">Web</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Méthodologie de veille */}
                    <div className="xl:col-span-1 xl:row-span-1">
                        <div className="grid-container">
                            <div className="w-full sm:h-[126px] h-[120px] overflow-hidden rounded-lg relative">
                                <img
                                    src="/assets/metho.png"
                                    alt="Méthodologie"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">Approche</span>
                                </div>
                            </div>
                            <div>
                                <p className="grid-headtext">Méthodologie</p>
                                <p className="grid-subtext mb-4">
                                    Cette veille technologique est réalisée à travers le suivi de
                                    publications scientifiques, conférences spécialisées, brevets déposés et communiqués
                                    officiels des acteurs majeurs du secteur.Nous appliquons une approche structurée en 4 étapes :
                                </p>

                                <div className="mt-4 space-y-3">
                                    <div className="flex items-center bg-black bg-opacity-20 p-2 rounded-lg">
                                        <div className="w-8 h-8 rounded-full bg-black bg-opacity-50 flex items-center justify-center mr-3 flex-shrink-0">
                                            <span className="text-white font-semibold">1</span>
                                        </div>
                                        <p className="text-sm text-gray-300">Identification des sources fiables et pertinentes</p>
                                    </div>
                                    <div className="flex items-center bg-black bg-opacity-20 p-2 rounded-lg">
                                        <div className="w-8 h-8 rounded-full bg-black bg-opacity-50 flex items-center justify-center mr-3 flex-shrink-0">
                                            <span className="text-white font-semibold">2</span>
                                        </div>
                                        <p className="text-sm text-gray-300">Collecte et analyse des informations</p>
                                    </div>
                                    <div className="flex items-center bg-black bg-opacity-20 p-2 rounded-lg">
                                        <div className="w-8 h-8 rounded-full bg-black bg-opacity-50 flex items-center justify-center mr-3 flex-shrink-0">
                                            <span className="text-white font-semibold">3</span>
                                        </div>
                                        <p className="text-sm text-gray-300">Synthèse et mise en perspective</p>
                                    </div>
                                    <div className="flex items-center bg-black bg-opacity-20 p-2 rounded-lg">
                                        <div className="w-8 h-8 rounded-full bg-black bg-opacity-50 flex items-center justify-center mr-3 flex-shrink-0">
                                            <span className="text-white font-semibold">4</span>
                                        </div>
                                        <p className="text-sm text-gray-300">Diffusion et mise à jour régulière</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Nouveau bloc: Timeline d'évolution */}
                    <div className="xl:col-span-2 xl:row-span-1">
                        <div className="grid-container">
                            <div className="flex justify-between items-center mb-4">
                                <p className="grid-headtext">Chronologie des Avancées</p>
                            </div>

                            <div className="relative">
                                {/* Ligne de temps */}
                                <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-700"></div>

                                <div className="space-y-6 relative">
                                    {/* Événement 1 */}
                                    <div className="flex">
                                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center z-10 flex-shrink-0">
                                            <span className="text-white text-xs font-bold">2025</span>
                                        </div>
                                        <div className="ml-6 p-3 bg-black bg-opacity-30 rounded-lg flex-grow">
                                            <p className="text-white font-semibold">Déploiement des infrastructures V2X à grande échelle</p>
                                            <p className="text-sm text-gray-400 mt-1">
                                                Implémentation des premiers corridors routiers intelligents en Europe avec communication V2I complète.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Événement 2 */}
                                    <div className="flex">
                                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center z-10 flex-shrink-0">
                                            <span className="text-white text-xs font-bold">2024</span>
                                        </div>
                                        <div className="ml-6 p-3 bg-black bg-opacity-30 rounded-lg flex-grow">
                                            <p className="text-white font-semibold">Standardisation des protocoles de sécurité V2X</p>
                                            <p className="text-sm text-gray-400 mt-1">
                                                Adoption des standards IEEE 1609.2X pour la sécurisation des communications véhiculaires.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Événement 3 */}
                                    <div className="flex">
                                        <div className="w-8 h-8 rounded-full bg-purple-600  flex items-center justify-center z-10 flex-shrink-0">
                                            <span className="text-white text-xs font-bold">2023</span>
                                        </div>
                                        <div className="ml-6 p-3 bg-black bg-opacity-30 rounded-lg flex-grow">
                                            <p className="text-white font-semibold">Évolution des capteurs LiDAR</p>
                                            <p className="text-sm text-gray-400 mt-1">
                                                Introduction des capteurs LiDAR à état solide miniaturisés et à coût réduit pour le marché de masse.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notification */}
                {showNotification && (
                    <div className="notification">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-purple-400 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 8L15 12H18C18 15.3137 15.3137 18 12 18C10.6989 18 9.49646 17.5594 8.55604 16.8277M16.2339 5.4916C15.0924 4.55865 13.6075 4 12 4C8.68629 4 6 6.68629 6 10H3L7 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Rotation automatique : nouveau sujet affiché</span>
                        </div>
                    </div>
                )}

                {/* Nouveau: Modal pour afficher les détails complets d'un sujet */}
                {activeTopic && activeTopic.showDetailModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                        <div className="bg-gray-900 p-6 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-white">{activeTopic.name}</h3>
                                <button
                                    onClick={() => {
                                        const updatedTopic = {...activeTopic, showDetailModal: false};
                                        setActiveTopic(updatedTopic);
                                    }}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-6">
                                <img
                                    src={activeTopic.image}
                                    alt={activeTopic.name}
                                    className="w-full h-60 object-cover rounded-lg"
                                />

                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-2">Description</h4>
                                    <p className="text-gray-300">{activeTopic.description}</p>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-2">Points Clés</h4>
                                    <ul className="space-y-2">
                                        {activeTopic.keyPoints && activeTopic.keyPoints.map((point, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <span className="mr-2 text-purple-400">•</span>
                                                <span className="text-gray-300">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {activeTopic.impact && (
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-2">Impact & Perspectives</h4>
                                        <p className="text-gray-300">{activeTopic.impact}</p>
                                    </div>
                                )}

                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-2">Informations</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-400">Source:</p>
                                            <p className="text-white">{activeTopic.source}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Date:</p>
                                            <p className="text-white">{activeTopic.date}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Catégorie:</p>
                                            <p className="text-white">{activeTopic.category || 'Technologie'}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Fiabilité:</p>
                                            <div className="flex items-center">
                                                <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-green-500"
                                                        style={{ width: `${activeTopic.reliability || 85}%` }}
                                                    ></div>
                                                </div>
                                                <span className="ml-2 text-white">{activeTopic.reliability || 85}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-4 border-t border-gray-700">


                                    <a
                                        href={activeTopic.sourceLink || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
                                    >
                                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        Voir la source
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Nouveau bloc: Infobulles thématiques */}
                <div className="fixed bottom-6 right-6 z-40">
                    <button
                        onClick={() => {
                            // Implémentation pour afficher/masquer le panneau d'infobulles
                        }}
                        className="bg-purple-600 hover:bg-purple-700 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-105"
                        title="Afficher les tendances"
                    >
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 8V16M12 11V16M8 14V16M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Veille;