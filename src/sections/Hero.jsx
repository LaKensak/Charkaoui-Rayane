import HackerRoom from "../component/HackerRoom.jsx";
import CanvasLoader from "../component/CanvasLoader.jsx";
import {Suspense} from 'react';
import {Canvas} from '@react-three/fiber';
import {useMediaQuery} from 'react-responsive';
import {PerspectiveCamera} from '@react-three/drei';
/*import Cube from '../component/Cube.jsx';*/
/*import Rings from '../component/Rings.jsx';*/
/*import ReactLogo from '../component/ReactLogo.jsx';*/
import Button from '../component/Button.jsx';
/*import Target from '../component/Target.jsx';*/
import HeroCamera from '../component/HeroCamera.jsx';
import {calculateSizes} from '../constants/index.js';


const Hero = () => {
    const isSmall = useMediaQuery({maxWidth: 440});
    const isMobile = useMediaQuery({maxWidth: 768});
    const isTablet = useMediaQuery({minWidth: 768, maxWidth: 1024});

    const sizes = calculateSizes(isSmall, isMobile, isTablet);



    return (
        <section className="min-h-screen w-full flex flex-col relative" id="home">
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
                <p className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans">
                    Bonjour, Je suis Rayane <span className="waving-hand">👋</span>
                </p>
                <p className="hero_tag text-gray_gradient">Bienvenue sur mon portfolio</p>
            </div>

            <div className="w-full h-full absolute inset-0">
                {/*<Leva/>*/}
                <Canvas className="w-full h-full">

                    <Suspense fallback={<CanvasLoader/>}>

                        <PerspectiveCamera makeDefault position={[0, 0, 20]}/>

                        <HeroCamera>
                        <HackerRoom scale={sizes.deskScale + 15} position={sizes.deskPosition} rotation={[0,-Math.PI / 7 ,0]}/>0.1, -3.5, 5.7   6.1, 3.5, 3.1
                        </HeroCamera>

                        <group>
                            {/*<Target position={[sizes.targetPosition]}/>*/}
                            {/*<ReactLogo position={sizes.reactLogoPosition}/>*/}
                            {/*<Rings position={sizes.ringPosition}/>*/}
                            {/*<Cube position={sizes.cubePosition}/>*/}
                        </group>

                        <ambientLight intensity={1}/>
                        <directionalLight position={[10, 10, 10]} intensity={0.5}/>
                    </Suspense>
                </Canvas>
            </div>

            <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
                <a href="#about" className="w-fit">
                    <Button name="Travaillons ensemble !!" isBeam containerClass="sm:w-fit w-full sm:min-w-96"/>
                </a>
            </div>
        </section>
    );
};

export default Hero;