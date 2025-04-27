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
        desc: 'Une plateforme numérique dédiée au développement personnel et conjugal, offrant aux couples des outils pratiques et des conseils personnalisés pour renforcer leur relation.',
        subdesc: 'Ce projet a été développé avec une architecture moderne combinant React.js et TypeScript pour le frontend, et Django pour le backend. L\'interface utilisateur, conçue avec TailwindCSS, offre une expérience fluide et responsive permettant aux couples de suivre leur progression, d\'accéder à des ressources adaptées et de participer à des exercices interactifs. Le backend Django gère l\'authentification sécurisée, le stockage des données utilisateur et fournit une API REST pour la communication avec le frontend.',
        apprentissage: 'Ce projet m\'a permis de découvrir l\'intégration d\'un frontend React avec un backend Django, et de comprendre comment structurer une application full-stack moderne. J\'ai particulièrement appris à implémenter une authentification sécurisée et à concevoir des API REST efficaces, compétences essentielles pour un développeur web aujourd\'hui.',
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
    desc: 'Un portail d\'information complet pour les passionnés de Formule 1, permettant d\'explorer l\'histoire des pilotes légendaires, des circuits emblématiques et des rivalités marquantes de ce sport.',
    subdesc: 'Développé en utilisant JavaScript pour la partie frontend avec une interface dynamique améliorée par TailwindCSS, ce site présente une architecture backend robuste basée sur PHP et une base de données MySQL. Le système comprend une gestion de contenu personnalisée permettant d\'ajouter facilement des articles sur les champions comme Ayrton Senna et Michael Schumacher, des fiches détaillées sur les circuits emblématiques comme Monaco et Spa-Francorchamps, ainsi qu\'une section dédiée aux événements historiques de la F1. L\'interface responsive s\'adapte à tous les appareils pour offrir une expérience utilisateur optimale.',
    apprentissage: 'En développant ce portail F1, j\'ai mis en place un panel d\'administration complet permettant d\'ajouter, modifier et supprimer des Grands Prix et des pilotes. Cette expérience m\'a permis d\'approfondir mes connaissances en PHP et en gestion de bases de données MySQL, tout en apprenant à créer des interfaces sécurisées pour la gestion de contenu dynamique.',
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
            path: 'assets/icons8-mysql-logo-48.png',
        },
    ],
},
   {
        title: 'SIO Shop - Gestion automobile',
        desc: 'Un logiciel de gestion interne conçu pour les concessions automobiles, permettant de centraliser le suivi des clients, la gestion des ventes de véhicules et l\'inventaire des produits.',
        subdesc: 'Ce projet académique a été développé en C# dans le cadre de ma formation, utilisant le framework .NET avec Windows Forms pour l\'interface utilisateur. La base de données MySQL stocke l\'ensemble des informations clients, véhicules et transactions. Le système comprend également une application console tierce innovante qui permet de convertir du texte brut en requêtes SQL, simplifiant considérablement le travail des employés peu familiers avec le langage SQL. Cette fonctionnalité permet aux employé(e)s d\'entrer des descriptions en langage naturel qui sont automatiquement transformées en requêtes exploitables par le système. L\'application principale gère le cycle commercial complet : création de fiches clients, enregistrement des véhicules, suivi des ventes, le tout suivant une architecture en couches qui respecte les principes de la programmation orientée objet.',
        apprentissage: 'Ce projet m\'a initié à la programmation desktop avec C# et .NET, environnement très demandé en entreprise. J\'ai découvert les principes de la programmation orientée objet appliqués à un cas concret, et j\'ai particulièrement apprécié développer la fonctionnalité de conversion texte-SQL qui m\'a fait comprendre l\'importance de créer des outils accessibles pour les utilisateurs non-techniques.',
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
                name: 'C#',
                path: '/assets/icons8-c-sharp-logo-96.png',
            },
            {
                id: 2,
                name: 'MySQL',
                path: 'assets/icons8-mysql-logo-48.png',
            },
        ],
    },
    {
    title: 'France Mobilier - Application Web PHP (MVC)',
    desc: 'Une application web e-commerce permettant aux clients de consulter et filtrer un catalogue complet de meubles et accessoires de décoration par catégories.',
    subdesc: 'Réalisé dans le cadre de mes études, ce projet pédagogique m\'a permis d\'appliquer le pattern MVC (Modèle-Vue-Contrôleur) en PHP natif. L\'application web e-commerce comprend un frontend en HTML5/CSS3/JavaScript offrant une interface conviviale pour parcourir et filtrer le catalogue de mobilier. La base de données MySQL gère les produits. Ce projet m\'a permis de mettre en pratique les concepts de développement web appris en cours tout en travaillant sur un cas concret d\'application e-commerce.',
    apprentissage: 'En réalisant ce projet, j\'ai compris l\'importance des design patterns comme le MVC dans la structuration d\'applications web complexes. J\'ai mis en œuvre les principes de la programmation orientée objet en PHP en utilisant des setters et getters pour encapsuler les données. Cette expérience m\'a permis de passer de la théorie à la pratique en concevant une architecture maintenable et évolutive, compétence fondamentale pour tout développeur.',
    href: 'https://github.com/LaKensak/MVC_FranceMobilier',
    texture: '/textures/project/project4.mp4',
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
            name: 'PHP',
            path: '/assets/icons8-php-24.png',
        },
        {
            id: 2,
            name: 'MySQL',
            path: 'assets/icons8-mysql-logo-48.png',
        },
        {
            id: 3,
            name: 'MVC',
            path: '/assets/icons8-structure-96.webp',
        }
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
        duration: '06/2024 - 07/2024',
        title: "Démontage et vérification des embrayages pour garantir leur bon fonctionnement",
        icon: '/assets/valeo.svg',
        animation: 'clapping',
    },
    {
        id: 2,
        name: 'Saverglass',
        pos: 'Agent de Production',
        duration: '06/2023 - 08/2023',
        title: "Inspection et supervision du verre et des bouteilles. Gestion de l'approvisionnement en bouteilles depuis les machines et surveillance de leur bon fonctionnement. Conditionnement des bouteilles en vue de leur expédition au client",
        icon: 'https://www.saverglass.com/themes/custom/saverglass/img/branding.svg?width=100&height=100',
        animation: 'victory',
    },
    {
    id: 3,
    name: 'SCongual',
    pos: 'Stage',
    duration: '13/11/2024 - 22/12/2024',
    title: "En tant que stagiaire, j'ai développé une plateforme de conseil conjugal 'Coach Relation' où les utilisateurs peuvent prendre des rendez-vous avec des tarifs personnalisés, intégrant le système de paiement Stripe. Réalisée avec React.js/TypeScript pour le frontend et Django pour le backend, l'application offre aux couples des outils pratiques pour améliorer leur communication et leur relation.",
    icon: '/assets/proj-removebg-preview.png',
    animation: 'salute',
},
    {
        id: 4,
        name: 'Modern Solidarity',
        pos: 'Stage',
        duration: '27/05/2024 - 21/06/2024',
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
