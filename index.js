export const navLinks = [
    {
        id: 1,
        name: 'Accueil',
        href: '#home',
    },
    {
        id: 2,
        name: 'Profil',
        href: '#about',
    },
    {
        id: 3,
        name: 'Compétence',
        href: '#skills',
    },
    {
        id: 4,
        name: 'Expériences',
        href: '#work',
    },
    {
        id: 5,
        name: 'Contact',
        href: '#contact',
    },
];

export const clientReviews = [
    {
        id: 1,
        name: 'Emily Johnson',
        position: 'Marketing Director at GreenLeaf',
        img: 'assets/review1.png',
        review:
            'Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.',
    },
    {
        id: 2,
        name: 'Mark Rogers',
        position: 'Founder of TechGear Shop',
        img: 'assets/review2.png',
        review:
            'Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional! Fantastic work.',
    },
    {
        id: 3,
        name: 'John Dohsas',
        position: 'Project Manager at UrbanTech ',
        img: 'assets/review3.png',
        review:
            'I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.',
    },
    {
        id: 4,
        name: 'Ether Smith',
        position: 'CEO of BrightStar Enterprises',
        img: 'assets/review4.png',
        review:
            'Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend backend dev are top-notch.',
    },
];

export const myProjects = [
    {
        title: 'Coach Relation - Plateforme de Conseil Conjugal',
        desc: 'Coach Relation est un espace numérique dédié au développement personnel et conjugal. Notre plateforme offre des outils pratiques et des conseils personnalisés pour aider les couples à construire une relation plus forte et équilibrée.',
        subdesc: 'La plateforme combine coaching professionnel et technologie moderne avec une interface intuitive permettant aux couples de suivre leur progression, accéder à des ressources ciblées et participer à des exercices interactifs pour renforcer leur lien.',
        href: 'https://www.youtube.com/watch?v=zfAb95tJvZQ',
        texture: '/textures/project/project1.mp4',
        logo: '/assets/project-logo1.png',
        logoStyle: {
            backgroundColor: '#2A1816',
            border: '0.2px solid #36201D',
            boxShadow: '0px 0px 60px 0px #AA3C304D',
        },
        spotlight: '/assets/spotlight1.png',
        tags: [
            {
                id: 1,
                name: 'React.js',
                path: '/assets/react.svg',
            },
            {
                id: 2,
                name: 'TailwindCSS',
                path: 'assets/tailwindcss.png',
            },
            {
                id: 3,
                name: 'TypeScript',
                path: '/assets/typescript.png',
            },
            {
                id: 4,
                name: 'Framer Motion',
                path: '/assets/framer.png',
            },
        ],
    },
    {
        title: 'F1 - Légendes et Grand Prix',
        desc: 'Ce site est dédié aux passionnés de Formule 1, offrant une exploration complète des meilleurs pilotes, des circuits légendaires et des rivalités emblématiques qui ont marqué l’histoire de ce sport.',
        subdesc:
            'Découvrez des informations détaillées sur des pilotes comme Ayrton Senna, Lewis Hamilton et Michael Schumacher, explorez les circuits mythiques tels que Spa-Francorchamps et Monaco, et revivez les rivalités marquantes de la F1. Une véritable immersion dans l’univers captivant du sport automobile.',
        href: 'https://www.youtube.com/watch?v=y5vE8y_f_OM',
        texture: '/textures/project/project2.mp4',
        logo: '/assets/project-logo2.png',
        logoStyle: {
            backgroundColor: '#13202F',
            border: '0.2px solid #17293E',
            boxShadow: '0px 0px 60px 0px #2F6DB54D',
        },
        spotlight: '/assets/spotlight2.png',
        tags: [
            {
                id: 1,
                name: 'React.js',
                path: '/assets/react.svg',
            },
            {
                id: 2,
                name: 'TailwindCSS',
                path: 'assets/tailwindcss.png',
            },
            {
                id: 3,
                name: 'TypeScript',
                path: '/assets/typescript.png',
            },
            {
                id: 4,
                name: 'Framer Motion',
                path: '/assets/framer.png',
            },
        ],
    },
    {
        title: 'CarePulse - Système de Gestion de Santé',
        desc: 'Une plateforme de santé innovante conçue pour simplifier les processus médicaux essentiels. Elle facilite l’inscription des patients, la planification des rendez-vous et la gestion des dossiers médicaux, offrant une expérience fluide pour les prestataires de soins et les patients.',
        subdesc:
            'Avec un accent sur l’efficacité, CarePulse intègre des formulaires complexes et des notifications SMS, utilisant Next.js, Appwrite, Twillio et Sentry pour améliorer les flux de travail opérationnels.',
        href: 'https://www.youtube.com/watch?v=lEflo_sc82g',
        texture: '/textures/project/project3.mp4',
        logo: '/assets/project-logo3.png',
        logoStyle: {
            backgroundColor: '#60f5a1',
            background:
                'linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)',
            border: '0.2px solid rgba(208, 213, 221, 1)',
            boxShadow: '0px 0px 60px 0px rgba(35, 131, 96, 0.3)',
        },
        spotlight: '/assets/spotlight3.png',
        tags: [
            {
                id: 1,
                name: 'React.js',
                path: '/assets/react.svg',
            },
            {
                id: 2,
                name: 'TailwindCSS',
                path: 'assets/tailwindcss.png',
            },
            {
                id: 3,
                name: 'TypeScript',
                path: '/assets/typescript.png',
            },
            {
                id: 4,
                name: 'Framer Motion',
                path: '/assets/framer.png',
            },
        ],
    },
    {
        title: 'Horizon - Plateforme Bancaire en Ligne',
        desc: 'Horizon est une plateforme bancaire en ligne complète qui offre aux utilisateurs un tableau de bord centralisé pour la gestion financière. Elle permet de connecter plusieurs comptes bancaires, de suivre les transactions en temps réel et de transférer de l’argent de manière fluide entre utilisateurs.',
        subdesc:
            'Développé avec Next.js 14, Appwrite, Dwolla et Plaid, Horizon assure une expérience bancaire fluide et sécurisée, adaptée aux besoins des consommateurs modernes.',
        href: 'https://www.youtube.com/watch?v=PuOVqP_cjkE',
        texture: '/textures/project/project4.mp4',
        logo: '/assets/project-logo4.png',
        logoStyle: {
            backgroundColor: '#0E1F38',
            border: '0.2px solid #0E2D58',
            boxShadow: '0px 0px 60px 0px #2F67B64D',
        },
        spotlight: '/assets/spotlight4.png',
        tags: [
            {
                id: 1,
                name: 'React.js',
                path: '/assets/react.svg',
            },
            {
                id: 2,
                name: 'TailwindCSS',
                path: 'assets/tailwindcss.png',
            },
            {
                id: 3,
                name: 'TypeScript',
                path: '/assets/typescript.png',
            },
            {
                id: 4,
                name: 'Framer Motion',
                path: '/assets/framer.png',
            },
        ],
    },
    {
        title: 'Imaginify - Application de Manipulation de Photos IA',
        desc: 'Imaginify est une application SaaS révolutionnaire qui permet aux utilisateurs de créer des manipulations photo impressionnantes grâce à la technologie IA. Avec des fonctionnalités telles que l’édition d’images assistée par IA, un système de paiement et un modèle basé sur des crédits.',
        subdesc:
            'Construite avec Next.js 14, Cloudinary AI, Clerk et Stripe, Imaginify combine une technologie de pointe avec une approche centrée sur l’utilisateur. Elle peut se transformer en une source de revenus secondaire ou même en une véritable entreprise.',
        href: 'https://www.youtube.com/watch?v=Ahwoks_dawU',
        texture: '/textures/project/project5.mp4',
        logo: '/assets/project-logo5.png',
        logoStyle: {
            backgroundColor: '#1C1A43',
            border: '0.2px solid #252262',
            boxShadow: '0px 0px 60px 0px #635BFF4D',
        },
        spotlight: '/assets/spotlight5.png',
        tags: [
            {
                id: 1,
                name: 'React.js',
                path: '/assets/react.svg',
            },
            {
                id: 2,
                name: 'TailwindCSS',
                path: 'assets/tailwindcss.png',
            },
            {
                id: 3,
                name: 'TypeScript',
                path: '/assets/typescript.png',
            },
            {
                id: 4,
                name: 'Framer Motion',
                path: '/assets/framer.png',
            },
        ],
    },
];


export const calculateSizes = (isSmall, isMobile, isTablet) => {
    return {
        deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
        deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
        cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
        reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
        ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
        targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
    };
};

export const workExperiences = [
    {
        id: 1,
        name: 'Valeo',
        pos: 'Opérateur Qualité',
        duration: '2020 - 2022',
        title: "Démontage et vérification des embrayages pour garantir leur bon fonctionnement",
        icon: '/assets/valeo.svg',
        animation: 'clapping',
    },
    {
        id: 2,
        name: 'Saverglass',
        pos: 'Agent de Production',
        duration: '07-2023 / 08-2023',
        title: "Inspection et supervision du verre et des bouteilles. Gestion de l'approvisionnement en bouteilles depuis les machines et surveillance de leur bon fonctionnement. Conditionnement des bouteilles en vue de leur expédition au client",
        icon: 'https://www.saverglass.com/themes/custom/saverglass/img/branding.svg?width=100&height=100',
        animation: 'victory',
    },
    {
        id: 3,
        name: 'LVINFORMATIQUE',
        pos: 'Stage',
        duration: '01-2019 / 02-2019',
        title: "En tant que stagiaire, j'ai eu l'opportunité de travailler sur divers projets de sites web et d'applications mobiles.",
        icon: 'https://www.lv-informatique.com/media/1126/logo-lvi-rs-png.png?width=100&height=100',
        animation: 'salute',
    },
    {
        id: 4,
        name: 'Modern Solidarity',
        pos: 'Stage',
        duration: '27-05-2024 / 21-06-2024',
        title: "j'ai conçu et réalisé une bibliothèque de gestion, offrant une interface conviviale pour l’ajout, la recherche et la modification de titres. Ce projet m'a permis de renforcer mes compétences en programmation orientée objet et en gestion des données, tout en mettant en pratique des principes de conception logicielle.",
        icon: '/assets/modern.png',
        animation: 'clapping',
    },
];


export const workSkills = [
    {
        id: 1,
        name: 'Python',
        pos: '',
        duration: '',
        title: "Débutant en Python, je possède une solide base en algorithmique et je suis actuellement en train de renforcer mes compétences en développement en explorant les concepts fondamentaux du langage et les bonnes pratiques de programmation.",
        icon: '/assets/python.png',
        animation: 'victory',
    },
    {
        id: 2,
        name: 'JavaScript',
        pos: '',
        duration: '',
        title: "Débutant en JavaScript, j'ai acquis une solide maîtrise des bases et commencé à développer des sites web. Je me forme également à la programmation orientée objet, notamment avec les classes et les objets, et j'ai récemment commencé à explorer le framework React pour créer des interfaces utilisateur dynamiques.",
        icon: '/assets/JS.png',
        animation: 'clapping',
    },
    {
        id: 3,
        name: 'SQL',
        pos: '',
        duration: '',
        title: "Débutant en SQL, je maîtrise les notions de base, notamment les jointures (INNER, LEFT, RIGHT, OUTER). J'ai également commencé à explorer les fonctions et les triggers pour gérer et manipuler les données de manière plus efficace.",
        icon: '/assets/sql.png',
        animation: 'salute',
    },
]