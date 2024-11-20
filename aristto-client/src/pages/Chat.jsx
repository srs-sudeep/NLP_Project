import React from 'react';
import { useLocation } from 'react-router-dom';
const Chat = () => {
    const { state } = useLocation();
    const { title, citations } = state || {};
  return (
    <div className="flex">
      <div className="w-1/2 p-6">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <div className="flex space-x-4 mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">ABSTRACT</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">LIMITATION</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">RESULT</button>
        </div>
        <div className="flex space-x-4">
          <button className="bg-gray-200 px-4 py-2 rounded">REFERENCES</button>
          <button className="bg-gray-200 px-4 py-2 rounded">SIMILAR PAPERS</button>
        </div>
      </div>
      <div className="w-1/2 bg-gray-100 p-6">
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <p className="text-gray-600">Que exercitation ullamco laboris nisi ut aliquip commodo</p>
        </div>
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <p className="text-gray-600">Que exercitation ullamco laboris nisi ut aliquip commodo</p>
        </div>
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <p className="text-gray-600">Que exercitation ullamco laboris nisi ut aliquip</p>
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <p className="text-gray-600">Que exercitation ullamco laboris nisi ut aliquip commodo</p>
        </div>
      </div>
    </div>
  );
};

export default Chat;