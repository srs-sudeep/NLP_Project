import React, { useState } from 'react';
import { ChevronRight, File, Folder, Search } from 'lucide-react';

const SavePaper = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('Papers');

  const libraryItems = [
    {
      id: 1,
      type: 'file',
      name: 'Literature Review Name',
      content: {
        title: 'The input searched phrase',
        type: 'literature-review',
        themes: ['Theme Name #1', 'Theme Name #2', 'Theme Name #3']
      }
    },
    {
      id: 2,
      type: 'folder',
      name: 'A longer Playlist Name Placeholder',
      items: [
        { id: 21, name: 'The bipolar mode FET: a new power device', journal: 'Non-electronics journal', year: 2012, citations: 224 },
        { id: 22, name: 'The bipolar mode FET: a new power device', journal: 'Non-electronics journal', year: 2012, citations: 224 },
        { id: 23, name: 'The bipolar mode FET: a new power device', journal: 'Non-electronics journal', year: 2012, citations: 224 }
      ]
    },
    { id: 3, type: 'file', name: 'Playlist Name' },
    { id: 4, type: 'folder', name: 'A longer Playlist Name Placeholder' },
    { id: 5, type: 'file', name: 'Saved Literature Review' },
    { id: 6, type: 'file', name: 'Saved Literature Review' },
    { id: 7, type: 'file', name: 'Saved Literature Review' }
  ];

  const renderContent = () => {
    if (!selectedItem) return null;

    if (selectedItem.type === 'file' && selectedItem.content?.type === 'literature-review') {
      return (
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">{selectedItem.content.title}</h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Introduction</h3>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedItem.content.themes.map((theme, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {theme}
              </span>
            ))}
          </div>
        </div>
      );
    }

    if (selectedItem.type === 'folder') {
      return (
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">{selectedItem.name}</h2>
          <div className="space-y-4">
            {selectedItem.items?.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.journal}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">{item.citations}</span>
                  <span className="text-sm text-gray-500">{item.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold">Library</h1>
            <div className="flex items-center gap-4">
              <div className="flex">
                <button
                  className={`px-4 py-2 ${activeTab === 'Papers' ? 'bg-gray-100' : ''}`}
                  onClick={() => setActiveTab('Papers')}
                >
                  Papers
                </button>
                <button
                  className={`px-4 py-2 ${activeTab === 'Literature Review' ? 'bg-gray-100' : ''}`}
                  onClick={() => setActiveTab('Literature Review')}
                >
                  Literature Review
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="The input searched phrase"
                  className="pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 space-y-2">
                {libraryItems.map((item) => (
                  <button
                    key={item.id}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 ${
                      selectedItem?.id === item.id ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => setSelectedItem(item)}
                  >
                    {item.type === 'folder' ? (
                      <Folder className="h-4 w-4 text-gray-400" />
                    ) : (
                      <File className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="text-sm truncate">{item.name}</span>
                    {item.type === 'folder' && <ChevronRight className="h-4 w-4 text-gray-400 ml-auto" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow min-h-[600px]">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SavePaper;