import Globe from "react-globe.gl";
import Button from "../component/Button.jsx";
import {useState} from "react";

const About = () => {
    const [estCopier, setEstCopier] = useState(false);

    const GestionCopie = () => {
        navigator.clipboard.writeText('rayane.charkaoui@saint-remi.net');

        setEstCopier(true);

        setTimeout(() => {
            setEstCopier(false);
        }, 2000);
    }

    const ouvrirTableau = () => {
        window.open('/assets/91Tableau de synthèse.xlsx', '_blank');
    }

    return (
        <section className="c-space my-20" id="about">
            <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <img src="/assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain"/>
                        <div>
                            <p className="grid-headtext">
                                Salut, je suis Rayane
                            </p>
                            <p className="grid-subtext">
                                Étudiant en BTS SIO spécialité SLAM, je me forme au développement d'applications web et
                                mobiles. Je suis passionné par la programmation et les nouvelles technologies.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <img src="/assets/grid2.png" alt="grid-2" className="w-full sm:w-[276] h-fit object-contain"/>
                        <div>
                            <p className="grid-headtext">Tech Stack</p>
                            <p className="grid-subtext">Je développe principalement avec React pour
                                le frontend. Pour le backend, j'utilise PHP/Node.js et Django. Je
                                maîtrise également SQL pour les bases de données.</p>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 xl:row-span-4">
                    <div className="grid-container">
                        <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
                            <Globe
                                height={326}
                                width={326}
                                backgroundColor="rgba(0, 0, 0, 0)"
                                backgroundImageOpacity={0.5}
                                showAtmosphere
                                showGraticules
                                globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
                                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                                labelsData={[{
                                    lat: 49.894171, lng: 2.295695,
                                    text: "J'habite ici !!",
                                    color: 'white',
                                    size: 20,
                                }]}
                            />
                        </div>
                        <div>
                            <p className="grid-subtext">
                                J'habite en France, mais je peux également travailler en remote
                            </p>
                            <Button name="Contacter Moi" isBeam containerClass="w-full mt-20"/>
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-2 xl:row-span-3">
                    <div className="grid-container">
                        <img src="/assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain"/>
                        <div>
                            <p className="grid-headtext">
                                Pourquoi j'aime coder ?
                            </p>
                            <p className="grid-subtext">
                                J'aime résoudre des problèmes complexes et créer des solutions innovantes. Le
                                développement logiciel me permet d'exprimer ma créativité tout en construisant des
                                applications utiles. Chaque projet est un nouveau défi qui me pousse à apprendre et à
                                m'améliorer constamment.
                            </p>

                        </div>
                        <div onClick={ouvrirTableau}>
                            <Button name="Grilles de compétences E4" isBeam containerClass="w-full"/>
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-1 xl:row-span-2">
                    <div className="grid-container">
                        <img src="/assets/grid4.png" alt="grid-4"
                             className="w-full md:h-[126px] sm:h-[276] h-fit object-cover sm:object-top"/>
                        <div className="space-y-2">
                            <p className="grid-subtext text-center">
                                Contacter moi
                            </p>
                            <div className="copy-container" onClick={GestionCopie}>
                                <img src={estCopier ? '/assets/tick.svg' : '/assets/copy.svg'} alt="copie"/>
                                <p className="lg:text-xl md:text-xl font-small text-gray_gradient text-white">
                                    rayane.charkaoui2@gmail.com
                                </p>
                            </div>
                            <div className="mt-4">
                                <a href="/assets/CV_CHARKAOUI.pdf" download="CV_Rayane_Charkaoui.pdf" className="block">
                                    <Button name="Télécharger CV" isBeam containerClass="w-full"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
