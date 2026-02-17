import React from 'react';
import './Heading.scss';

const Heading = ({ title, subtitle }) => {
  return (
    <section id="heading-comp" class="container">
      <p id="skills" class="text-center mt-5">{subtitle}</p>
      <h1 class="title text-center mb-5">{title}</h1>
    </section>
  );
};

export default Heading;
