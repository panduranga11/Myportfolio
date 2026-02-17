import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import { Link } from 'react-scroll';
import me from '../assets/me.jpg';
import './Hero.scss';

const Hero = () => {
    const redirectTo = (url) => {
        window.open(url, '_blank');
    };

    return (
        <section id="summary" className="section section_1 py-5 w-100 row p-0 m-0">
            <div data-aos="fade-right" data-aos-duration="1000" className="section__text text-center px-3 py-5 col-lg-6 col-sm-12 d-flex justify-content-center align-items-center flex-column">
                <p>Hey! I'm</p>
                <h1>
                    {"Bollepalli Panduranga".split('').map((char, index) => (
                        <span key={index} className="hover-letter">
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </h1>
                
                <TypeAnimation
                    sequence={[
                        'Full Stack Developer (Java & MERN)',
                        2000,
                        'Competitive Programmer',
                        2000
                    ]}
                    wrapper="span"
                    speed={50}
                    className="type-text"
                    repeat={Infinity}
                />

                <p className="intro-para mt-2">

I am a developer with a strong focus on problem solving through competitive programming using Java. I have solved over 500+ problems on various coding platforms. I work with the MERN stack and am currently learning Spring Boot for backend development.

                </p>
                <p className='intro-para'>

I am currently seeking internship opportunities where I can apply my skills in full-stack 
                </p>
                
                <div className="btn-container mt-3">
                    <button
                        className="btn btn-color-2 btn-black"
                        onClick={() => window.open('https://drive.google.com/file/d/1Xdcj2RryP2_a01bzo5Gg-ZfEyc6H6qKk/view?usp=drive_link', '_blank')} // Placeholder for resume
                    >
                        View Resume
                    </button>
                    <Link to="contact" smooth={true} duration={500} className="btn btn-color-1 d-flex align-items-center justify-content-center text-decoration-none">
                        Contact Info
                    </Link>
                </div>
                
                <div id="socials-container">
                    <FaLinkedin className="icon linkedin" onClick={() => redirectTo('https://linkedin.com/in/panduranga1108')} />
                    <FaGithub className="icon github" onClick={() => redirectTo('https://github.com/panduranga11')} />
                    <SiLeetcode className="icon leetcode" onClick={() => redirectTo('https://leetcode.com/u/pandurangabollepalli/')} />
                    <SiGeeksforgeeks className="icon geeksforgeeks" onClick={() => redirectTo('https://www.geeksforgeeks.org/profile/pandurangabogeo')} />
                </div>
            </div>
            
            <div className="pic_container col-lg-6 col-sm-12 d-flex justify-content-center align-items-center">
                <div className='pic_container_inner'>
                    <div className='green-bg'></div>
                    <img data-aos="fade-left" data-aos-duration="1000" src={me} alt="profile pic" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
