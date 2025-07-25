import { FC } from 'react';
import { Link } from 'react-router';

const About: FC = () => {
  return (
    <div className="m-8 p-6 border-2 border-gray-300 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">About the Author</h2>
      <p className="text-gray-700">
        This app was created by Vera Maslava, a passionate developer who loves
        working with React and GraphQL. If you have any questions or feedback,
        feel free to reach out!
      </p>
      <Link to="https://rs.school/courses/reactjs">RSSchool React 2025Q3</Link>
    </div>
  );
};

export default About;
