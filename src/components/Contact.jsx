import React from 'react';
import { Link } from 'react-scroll';
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaMedium, FaDev, FaDiscord, FaYoutube } from 'react-icons/fa';
import './Contact.scss';

const Contact = () => {
    return (
        <div id="contact-wrapper">
            <footer className="mt-5 text-lg-start" id="contact">
                <hr className="my-4"/>
                <section className="container">
                    <div className="row">
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Contact Details</h6>
                            <p>
                                <a href="https://linkedin.com/in/panduranga1108" target="_blank" rel="noreferrer" className="d-flex align-items-center gap-2">
                                    <FaLinkedin /> LinkedIn
                                </a>
                            </p>
                            <p>
                                <a href="https://github.com/panduranga11" target="_blank" rel="noreferrer" className="d-flex align-items-center gap-2">
                                    <FaGithub /> GitHub
                                </a>
                            </p>
                            <p>
                                <a href="mailto:pandurangabollepalli@gmail.com" className="d-flex align-items-center gap-2">
                                    <FaEnvelope /> pandurangabollepalli@gmail.com
                                </a>
                            </p>
                            <p className="d-flex align-items-center gap-2">
                                <FaMapMarkerAlt /> Andhra Pradesh, India
                            </p>
                             <p>
                                +91 90148 06564
                            </p>
                        </div>

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Services</h6>
                            <p>Web Application Development</p>
                            <p>MERN Stack Development</p>
                            <p>Problem Solving</p>
                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Links</h6>
                             <p className="scroll-to"><Link to="summary" smooth={true} duration={500}>Summary</Link></p>
                             <p className="scroll-to"><Link to="about" smooth={true} duration={500}>About</Link></p>
                             <p className="scroll-to"><Link to="practicle_skills" smooth={true} duration={500}>Skills</Link></p>
                             <p className="scroll-to"><Link to="projects" smooth={true} duration={500}>Projects</Link></p>
                        </div>

                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>
                            <div className="d-flex gap-2">
                                <a className="btn btn-floating m-1 social-icon" href="https://linkedin.com/in/panduranga1108" role="button" target="_blank" rel="noreferrer">
                                    <FaLinkedin />
                                </a>
                                <a className="btn btn-floating m-1 social-icon" href="https://github.com/panduranga11" role="button" target="_blank" rel="noreferrer">
                                    <FaGithub />
                                </a>
                                {/* Added placeholders or removed irrelevant ones from original */}
                            </div>
                        </div>
                    </div>
                </section>
                <hr/>
                <div className="text-center p-3">
                    © {new Date().getFullYear()} Made with React.js & Vite
                </div>
            </footer>
        </div>
    );
};

export default Contact;
