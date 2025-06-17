import { Component } from 'react';

class LoadingBar extends Component {
  render() {
    return (
      <div className="flex flex-col items-center w-full mt-8 space-y-4">
        <div className="text-xl font-semibold text-gray-100 tracking-widest uppercase">
          Loading...
        </div>
        <div className="w-full max-w-md h-2 bg-gray-700 rounded overflow-hidden shadow-inner">
          <div className="h-full w-1/3 bg-white animate-sweep"></div>
        </div>
      </div>
    );
  }
}

export default LoadingBar;
