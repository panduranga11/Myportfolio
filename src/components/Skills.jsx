import React from 'react';
import Heading from './common/Heading';
import './Skills.scss';

const Skills = () => {


    // Filter skills that might not have icons yet, or just use generic/placeholder if missing in original repo
    // The original repo had specific icons. I'll stick to what was there unless I'm sure about new ones.
    // The user asked to "change tech stack to react js keeping remaining all same". 
    // But they also provided their own skills list. I should probably focus on porting the structure first.
    // I'll keep the original list + try to add user's if corresponding icons exist.
    // I'll stick to original list for now to ensure no broken images, and user customization constitutes a separate step.
    
    // Actually, I should check if java/mysql icons exist in the copied folder. 
    // If not, it will look broken.
    // I'll just use the original list for this step to ensure functionality.

    const skillCategories = [
        {
            title: "Frontend",
            description: "Technologies used to build the user interface and client-side experience.",
            skills: [
                { name: 'HTML', imgSrc: '/icons/html.png' },
                { name: 'CSS', imgSrc: '/icons/css.png' },
                { name: 'JavaScript', imgSrc: '/icons/js.png' },
                { name: 'React', imgSrc: '/icons/react.png' },
                { name: 'Bootstrap', imgSrc: '/icons/bootstrap.png' },
                { name: 'Tailwind', imgSrc: '/icons/tailwind.png' },
                { name: 'Vite', imgSrc: '/icons/vite.png' },
            ]
        },
        {
            title: "Backend",
            description: "Technologies used for server-side logic, APIs, and application processing.",
            skills: [
                { name: 'Node.js', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
                { name: 'Express', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
                { name: 'Java', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
                { name: 'Flask', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
            ]
        },
        {
            title: "Databases",
            description: "Tools used to store and manage data.",
            skills: [
                { name: 'MySQL', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
                { name: 'MongoDB', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
            ]
        },
        {
            title: "Programming Languages",
            description: "Core languages you use for problem solving and development.",
            skills: [
                { name: 'Java', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
                { name: 'Python', imgSrc: '/icons/python.png' },
                { name: 'C', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
                { name: 'C++', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
            ]
        },
        {
            title: "Tools & IDEs",
            description: "Development tools and environments used to streamline workflow.",
            skills: [
                { name: 'VS Code', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
                { name: 'Postman', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
                { name: 'Git', imgSrc: '/icons/git.png' },
                { name: 'GitHub', imgSrc: '/icons/github.png' },
            ]
        }
    ];

    return (
        <section id="practicle_skills">
            <Heading title="Practical Skills" subtitle="Explore My" />
            <div className="container">
                {skillCategories.map((category, catIndex) => (
                    <div key={catIndex} className="mb-5">
                        <h3 className="text-center mb-2 category-title" style={{ fontWeight: '700' }}>{category.title}</h3>
                        <p className="text-center mb-4 text-muted">{category.description}</p>
                        <div className="d-flex justify-content-center flex-wrap" style={{ gap: '1rem' }}>
                            {category.skills.map((skill, index) => (
                                <article
                                    className="position-relative skill-card"
                                    key={index}
                                    data-aos="zoom-in"
                                    data-aos-duration="500"
                                >
                                    <h3>
                                        <img
                                            src={skill.imgSrc}
                                            className="skill-image mr-3"
                                            alt={skill.name}
                                            onError={(e) => {e.target.style.display='none'}}
                                        />
                                        {skill.name}
                                    </h3>
                                </article>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
