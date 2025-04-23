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
        name: 'Expérience',
        href: '#work',
    },
    {
        id: 4,
        name: 'Compétence',
        href: '#skills',
    },

    {
        id: 5,
        name: 'Veille',
        href: '#veille',
    },
    {
        id: 6,
        name: 'Contact',
        href: '#contact',
    },
];

export const veilleTopics = [
    {
        name: "Technologies LiDAR",
        source: "IEEE",
        date: " - Avril 2025",
        description: "Les capteurs LiDAR (Light Detection and Ranging) révolutionnent la perception des véhicules autonomes en offrant une vision 3D précise de l'environnement. Les dernières avancées permettent une détection plus lointaine et une meilleure résolution dans diverses conditions météorologiques, tout en réduisant considérablement les coûts de production.",
        shortDesc: "Évolutions récentes des capteurs de perception 3D",
        sourceLink: "/assets/EI_2019_art00001.pdf",
        icon: "/assets/radar.svg",
        image: "/assets/LIDAR.png",
        keyPoints: [
            "Réduction des coûts de production de 60% depuis 2023",
            "Portée accrue jusqu'à 300 mètres avec haute précision",
            "Nouveaux modèles solid-state sans pièces mobiles",
            "Meilleure performance dans des conditions difficiles (pluie, brouillard)"
        ],
        tags: ["Hardware", "Perception", "Innovation"]
    },
    {
        name: "Intelligence Artificielle Embarquée",
        source: "NVIDIA",
        date: " - Mars 2025",
        description: "L'IA embarquée dans les véhicules autonomes connaît une transformation majeure avec l'arrivée de nouveaux algorithmes de prise de décision en temps réel. Ces systèmes permettent désormais de naviguer dans des environnements urbains complexes et d'anticiper le comportement des autres usagers de la route avec une précision inédite.",
        shortDesc: "Algorithmes avancés pour la prise de décision en milieu urbain",
        sourceLink: "https://blogs.nvidia.com/blog/auto-ecosystem-physical-ai/",
        icon: "/assets/brain-circuit.svg",
        image: "/assets/ground-station-satellite-1-e1731011187351-1536x568.webp",
        keyPoints: [
            "Réduction du temps de latence décisionnelle de 150ms à 15ms",
            "Modèles prédictifs du comportement piéton avec 97% de précision",
            "Apprentissage fédéré entre véhicules pour partager l'expérience",
            "Détection améliorée des intentions des autres conducteurs"
        ],
        tags: ["IA", "Deep Learning", "Sécurité"]
    },
    {
        name: "Réglementation Européenne",
        source: "UNECE",
        date: " - Février 2025",
        description: "Le cadre réglementaire européen pour les véhicules autonomes évolue rapidement. Les nouvelles directives adoptées en 2025 définissent des protocoles standardisés pour l'homologation des véhicules de niveau 4, ouvrant la voie à un déploiement commercial sur certains axes routiers européens dès 2026.",
        shortDesc: "Cadre légal pour l'homologation des véhicules niveau 4",
        sourceLink: "https://unece.org/transport/road-transport/automated-driving-0",
        icon: "/assets/scale.svg",
        image: "/assets/EU.jpeg",
        keyPoints: [
            "Création du European Autonomous Vehicle Certificate",
            "Ouverture de 12 000 km de routes compatibles niveau 4",
            "Standards de cybersécurité obligatoires dès la conception",
            "Harmonisation des responsabilités légales entre constructeurs et utilisateurs"
        ],
        tags: ["Législation", "Standards", "Europe"]
    },
    {
        name: "Sécurité Informatique",
        source: "IEEE",
        date: " - Janvier 2025",
        description: "La sécurité informatique demeure un défi majeur pour l'industrie des véhicules autonomes. De récentes découvertes ont mis en lumière des vulnérabilités dans les systèmes de communication V2X (Vehicle-to-Everything), motivant le développement de nouvelles approches de cryptographie quantique et de détection d'intrusion en temps réel.",
        shortDesc: "Vulnérabilités découvertes dans les systèmes V2X",
        sourceLink: "/assets/_Camera_ready_final____IEEE_OJ_CommSoc__V2X_security_survey.pdf",
        icon: "/assets/shield-check.svg",
        image: "/assets/wmremove-transformed.jpg",
        keyPoints: [
            "Risques identifiés dans le protocole DSRC (Dedicated Short Range Communications)",
            "Développement de solutions de cryptographie post-quantique",
            "Mise en place d'un CERT dédié aux véhicules autonomes",
            "Nouvelle norme internationale ISO 21434 pour la cybersécurité automobile"
        ],
        tags: ["Cybersécurité", "V2X", "Cryptographie"]
    }
];

export const myProjects = [
    {
        title: 'Coach Relation - Plateforme de Conseil Conjugal',
        desc: 'Coach Relation est un espace numérique dédié au développement personnel et conjugal. Notre plateforme offre des outils pratiques et des conseils personnalisés pour aider les couples à construire une relation plus forte et équilibrée.',
        subdesc: 'La plateforme combine coaching professionnel et technologie moderne avec une interface intuitive permettant aux couples de suivre leur progression, accéder à des ressources ciblées et participer à des exercices interactifs pour renforcer leur lien.',
        href: 'https://github.com/LaKensak/DjangoNextApp',
        hrefSite: 'https://djangoproject1-frontend.onrender.com/',
        texture: '/textures/project/project1.mp4',
        logo: '/assets/proj.png',
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
                name: 'Django',
                path: '/assets/icons8-django-24.png',
            },
        ],
    },
    {
        title: 'F1 - Légendes et Grand Prix',
        desc: 'Ce site est dédié aux passionnés de Formule 1, offrant une exploration complète des meilleurs pilotes, des circuits légendaires et des rivalités emblématiques qui ont marqué l’histoire de ce sport.',
        subdesc:
            'Découvrez des informations détaillées sur des pilotes comme Ayrton Senna, Lewis Hamilton et Michael Schumacher, explorez les circuits mythiques tels que Spa-Francorchamps et Monaco, et revivez les rivalités marquantes de la F1. Une véritable immersion dans l’univers captivant du sport automobile.',
        href: 'https://github.com/LaKensak/F1-New',
        hrefSite: 'https://rcharkaoui.alwaysdata.net/',
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
                name: 'Js',
                path: '/assets/icons8-javascript-48.png',
            },
            {
                id: 2,
                name: 'TailwindCSS',
                path: 'assets/tailwindcss.png',
            },
            {
                id: 3,
                name: 'PHP',
                path: '/assets/icons8-php-24.png',
            },
            {
                id: 4,
                name: 'MySQL',
                path: '/assets/icons8-mysql-logo-48.png',
            },
        ],
    },
    {
        title: 'SIO Shop - Gestion automobile',
        desc: 'Application de gestion développée en C# pour permettre aux employés de suivre les clients, les ventes de véhicules et les produits proposés.',
        subdesc:
            'SIO Shop est une solution interne intuitive conçue pour simplifier le suivi des clients, l’administration des ventes de voitures et la gestion des produits en stock. Développée en C#, cette application répond aux besoins d’une concession automobile moderne.',
        href: 'https://github.com/LaKensak/SIO-SHOP',
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
                path: '/assets/icons8-c-sharp-logo-96.png',
            },
            {
                id: 2,
                name: 'MySQL',
                path: 'assets/icons8-mysql-logo-48.png',
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
