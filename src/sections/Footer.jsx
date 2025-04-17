import React from 'react';

const Footer = () => {
    // Fonction pour rediriger vers des liens externes
    const redirectToExternalLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <section className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">

            <div className="flex gap-3">
                <div
                    className="social-icon cursor-pointer"
                    onClick={() => redirectToExternalLink('https://github.com/LaKensak')}
                >
                    <img src="/assets/github.svg" alt="github" className="w-1/2 h-1/2"/>
                </div>
                <div
                    className="social-icon cursor-pointer"
                    onClick={() => redirectToExternalLink('https://www.linkedin.com/in/rayane-charkaoui-786a25235')}
                >
                    <img src="/assets/174857.png" alt="linkedin" className="w-1/2 h-1/2"/>
                </div>
            </div>
            <p className="text-white-500">© 2025 Rayane Charkaoui. Tous droits réservés </p>
        </section>
    );
};

export default Footer;