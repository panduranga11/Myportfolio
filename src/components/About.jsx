import React from 'react';
import Heading from './common/Heading';
import './About.scss';
import { FaBriefcase, FaUserGraduate, FaCertificate } from 'react-icons/fa';

const About = () => {
    return (
        <section id="about" className="container">
           

            <div className="position-relative">
                <div className="verticle-line position-absolute"></div>
                <div data-aos="fade-left" data-aos-duration="1000" className="mt-4 ml-5 content-wrapper">
                    
                    {/* Work Experience */}
                    <h2 className='mb-4'> <FaBriefcase /> Work Experience </h2>
                    
                    <h4 className='text-green'> MERN Stack Intern </h4>
                    <h6> <a className='text-blue' href='#'> Ethnus </a> - May 2025 – July 2025</h6>
                    <ul>
                        <li> Completed an industrial internship focused on the MERN stack (MongoDB, Express.js, React, Node.js). </li>
                        <li> Built full-stack web applications with frontend–backend integration. </li>
                        <li> Developed RESTful APIs using Node.js and Express. </li>
                        <li> Created responsive user interfaces using React. </li>
                        <li> Worked with database operations and CRUD functionality. </li>
                    </ul>
                    <a href="https://drive.google.com/file/d/1nZAUptbgQnYC8D7vCu6zS8SrrW9TW6iW/view?usp=drive_link" className="btn btn-sm btn-outline-dark mt-2 mb-4">View Industrial Certificate</a>

                    {/* Certifications - Keeping in same vertical line or separate? Original plan was separate but code shows it in same wrapper. User said "as normal as Education". Education is separate. I'll split Certifications to its own block if I want "as normal as Education" for ALL. But user specifically said "remove this thing" pointing to Bio.
                    I will keep Certifications here for now but start with Work Experience. */}

                    <h2 className='mb-4 mt-5'> <FaCertificate /> Certifications / Training </h2>
                    
                    <h4 className='text-green'> AWS Academy Graduate — Cloud Foundations </h4>
                    <h6> <a className='text-blue' href='#'> AWS Academy </a> - Aug 2025 – Oct 2025 </h6>
                    <ul>
                        <li> Learned core AWS cloud concepts and services. </li>
                        <li> Worked with EC2, S3, IAM, and basic cloud architecture. </li>
                        <li> Gained understanding of cloud deployment and security fundamentals. </li>
                    </ul>
                    <a href="https://drive.google.com/file/d/1CiIaJDOzqQSrIcT2Vemyl4JIq5AuG2XU/view?usp=drive_link" className="btn btn-sm btn-outline-dark mt-2 mb-4">View AWS Certificate</a>

                </div>
            </div>
            <br/>

            <div className="position-relative mt-5">
                <div className="verticle-line position-absolute"></div>

                <div data-aos="fade-left" data-aos-duration="1000" className="mt-4 ml-5 content-wrapper">
                    <h2 className='mb-4'><FaUserGraduate /> Education </h2>
                    
                     <h4 className='text-green'> B.Tech in Computer Science and Engineering - 2023-2027 </h4>
                    <h6><a className='text-blue' href='https://vitap.ac.in/'> VIT-AP University </a></h6>
                    <p> CGPA: 9.24 / 10 </p>

                    <h4 className='text-green'> Intermediate (MPC) </h4>
                    <h6><a className='text-blue' href='#'>Chaitanya IIT/JEE Academy</a>  </h6>
                    <p>Percentage: 99%</p>
                    
                    <h4 className='text-green'> Class X </h4>
                    <h6><a className='text-blue' href='#'>Sri Vidhya High School</a>  </h6>
                    <p>GPA: 10 / 10</p>
                </div>
            </div>
        </section>
    );
};

export default About;
