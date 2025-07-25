import { FC } from 'react';
import { Link } from 'react-router';

const About: FC = () => {
  return (
    <div className="m-20 p-6 border-2 border-gray-300 rounded-lg flrex flex-col text-center">
      <Link
        to="/"
        className="mb-4 flex items-center justify-end gap-2 hover:underline"
      >
        <img className="size-6" src="/src/assets/house.svg" alt="home icon" />
        Go back to home page
      </Link>
      <h2 className="text-2xl font-bold mb-4">About the Author</h2>
      <p className="text-gray-700">
        This app was created by Vera Maslava,
        <br /> a passionate developer who loves working with React and GraphQL.
        <br />
        If you have any questions or feedback, feel free to reach out!
        <br /> <br />
      </p>
      <ul className="flex justify-center space-x-4 mb-4 gap-[20px]">
        <li>
          <Link to="https://github.com/Vaverka123">
            <img
              className="size-16"
              src="/src/assets/github.svg"
              alt="github logo"
            />
          </Link>
        </li>
        <li>
          <Link to="https://www.linkedin.com/in/vera-maslava-589765124/">
            <img
              className="size-16"
              src="/src/assets/linkedin.svg"
              alt="link to author`s LinkedIn profile"
            />
          </Link>
        </li>
      </ul>
      <p className="text-gray-700">
        Vera is currently a student at RSSchool,
        <br /> where she is honing her skills in web development.
        <br /> This project is part of the RSSchool React 2025Q3 course,
        <br />
        where students learn to build real-world applications using modern
        technologies.
        <br />
        The course emphasizes practical experience and collaboration, preparing
        students for a successful career in web development.
        <br />
      </p>
      <Link
        to="https://rs.school/courses/reactjs"
        className="text-blue-500 hover:underline mt-4"
      >
        learn more about RSSchool React Course
      </Link>
    </div>
  );
};

export default About;
