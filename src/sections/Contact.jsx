import React, {useRef, useState} from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const formRef = useRef();

    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    })

    const GererChangement = ({target: {name, value}}) => {
        setForm({...form, [name]: value})
    }

    const GererEnvoie = async (e) => {
        e.preventDefault();

        setLoading(true)


        try {
            await emailjs.send(
                'service_qr2wf2j',
                'template_305k00k',
                {
                    form_name: form.name,
                    to_name: 'Rayane',
                    from_email: form.email,
                    to_email: '',
                    message: form.message
                },
                'Pwvn5EWB9ZCiJOGWP')

            setLoading(false);
            alert('Votre message a bien été envoyer')

            setForm({
                name: '',
                email: '',
                message: ''
            })
        } catch (error) {
            setLoading(false);

            console.log(error);

            alert('Quelque chose ne vas pas');

        }


    }

    return (
        <section className="c-space my-20" id="contact">
            <h3 className="head-text">  Contactez-moi</h3>
            <div className="relative min-h-screen flex items-center justify-center flex-col">
                <img src="/assets/terminal.png" alt="terminal background" className="absolute inset-0 min-h-screen"/>
                <div className="contact-container">
                    <h3 className="head-text">
                        Parlons
                    </h3>
                    <div className="text-lg text-white-600 mt-3">
                        Que vous souhaitiez créer un site web, optimiser votre plateforme actuelle ou réaliser un projet
                        sur mesure, je suis à votre disposition pour vous accompagner.

                        <form ref={formRef} onSubmit={GererEnvoie} className="mt-12 flex flex-col space-y-7">
                            <label className="space-y-3">
                                <span className="field-label">Nom et Prénom</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={GererChangement}
                                    required
                                    className="field-input"
                                    placeholder="Jean Dupont"
                                />

                            </label>
                            <label className="space-y-3">
                                <span className="field-label">Mail</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={GererChangement}
                                    required
                                    className="field-input"
                                    placeholder="jean-dupont@gmail.com"
                                />

                            </label>
                            <label className="space-y-3">
                                <span className="field-label">Message :</span>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={GererChangement}
                                    required
                                    rows={5}
                                    className="field-input"
                                    placeholder="Bonjour, Je suis intéressé(e) par ..."
                                />

                                <button className="field-btn" type="submit" disabled={loading}>
                                    {loading ? 'Envoi ...' : 'Enoyer un Message'}
                                    <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow"/>
                                </button>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Contact
