import { Component } from 'react';

interface FallbackProps {
  text: string;
}

class Fallback extends Component<FallbackProps> {
  render() {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-white bg-gray-800 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
        <p className="text-lg">{this.props.text}</p>
      </div>
    );
  }
}

export default Fallback;
