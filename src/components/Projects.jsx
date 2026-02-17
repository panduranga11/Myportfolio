import React from 'react';
import Heading from './common/Heading';
import './Projects.scss';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
    const projects = [
        {
            title: "Smart Complaint Portal (JanSamadhan)",
            description: "Web-based complaint management system connecting citizens with authorities. Secure authentication, issue tracking, and admin dashboards.",
            image: "/projects/project_blood_web.png", // specific image if user provides, else placeholder or reuse existing
            // Reusing existing images for now as placeholder or if relevant
            live: "#",
            github: "#",
            technologies: ["MERN", "MySQL"]
        },
        {
            title: "Credit Card Fraud Detection System",
            description: "CNN model to detect fraudulent transactions with 98.7% accuracy. Applied preprocessing, scaling, and class balancing.",
            image: "/projects/project_inotes.png", 
            live: "#",
            github: "#",
            technologies: ["Python", "TensorFlow", "Keras"]
        },
        {
            title: "Calculator Web App",
            description: "Basic calculator using HTML, CSS, and JavaScript.",
            image: "/projects/project_azoom.png",
            live: "https://panduranga11.github.io/calculator_basic/",
            github: "#",
            technologies: ["HTML", "CSS", "JavaScript"]
        },
        {
            title: "To-Do List App",
            description: "Task management app using JavaScript.",
            image: "/projects/project_version_tracker.png",
            live: "https://panduranga11.github.io/todolist_js/",
            github: "#",
            technologies: ["JavaScript"]
        },
         {
            title: "Myntra Clone",
            description: "Frontend clone of the Myntra e-commerce interface.",
            image: "/projects/project_neoreach.png",
            live: "#",
            github: "#",
            technologies: ["HTML", "CSS", "React"]
        }
    ];

    return (
        <section id="projects">
            <Heading title="My Projects" subtitle="Have a look at" />
            <div className="project-container container-fluid">
                {projects.map((project, index) => (
                    <div className="card px-0" key={index} data-aos="fade-up" data-aos-duration={(index * 200) + 1000}>
                        <img src={project.image} className="card-img-top" alt={project.title} style={{height: '200px', objectFit: 'cover'}} 
                             onError={(e) => {e.target.src='https://via.placeholder.com/400x200?text=Project+Image'}} 
                        />
                        <div className="card-body shadow">
                            <h5 className="card-title font-weight-bold">{project.title}</h5>
                            <p className="card-text">{project.description}</p>
                            <div className="mb-3">
                                {project.technologies.map((tech, i) => (
                                    <span key={i} className="badge rounded-pill px-3 py-2 mx-2 border border-dark">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="d-flex justify-content-center">
                                <a href={project.github} target="_blank" rel="noreferrer" className="btn me-2 d-flex align-items-center gap-2">
                                    <FaGithub /> GitHub
                                </a>
                                <a href={project.live} target="_blank" rel="noreferrer" className="btn d-flex align-items-center gap-2">
                                    <FaExternalLinkAlt /> Live Demo
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
