import React from "react";
import image from "../Assets/image.png";
const About = () => {
  return (
    <>
      <section class="text-gray-600 body-font">
        <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            What makes our application different
          </h1>
          <img
            class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="hero"
            src={image}
          />
          <div class="text-center lg:w-2/3 w-full">
            <h2 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-600">
              A web application to make manage your money transactions easier
            </h2>
            <p class="text-left lg:mb-8 leading-relaxed">
              In recent times, the pandemic situation has brought major changes
              in the way we spend our money. This application is designed to
              help you manage your money transactions.
            </p>
            <h2 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-600">
              Our Online DashBoard
            </h2>
            <p class="text-left lg:mb-8 leading-relaxed">
              The DashBoard proposed is a web application capable of running on
              any desktop or laptop browser to facilitate the management of your
              money transactions.
            </p>
            <h2 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-600">
              Our Budget Recommendation system{" "}
            </h2>
            <p class="text-left lg:mb-8 leading-relaxed">
              We have developed a system that will help you to make your
              budgeting easier and more efficient. We Process your past/
              previous transactions and recommend you the best way to manage
              your money.
            </p>
            <h2 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-600">
              Our Report Generation system{" "}
            </h2>
            <p class="text-left lg:mb-8 leading-relaxed">
              The User can generate a report of his/her transactions over a
              specific period of time.
              
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
