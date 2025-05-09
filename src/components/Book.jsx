import React, { useState, useRef } from 'react';
import HTMLFlipBook from "react-pageflip";

function Book() {
  const pokemonData = [
    {
      id: "006",
      name: "Charizard",
      types: ["Fire", "Flying"],
      description: "Flies in search of strong opponents. Breathes extremely hot fire that melts anything, but never uses it on weaker foes."
    },
    {
      id: "025",
      name: "Pikachu",
      types: ["Electric"],
      description: "When Pikachu meet, they touch tails to exchange electricity as a greeting."
    },
    {
      id: "125",
      name: "Electabuzz",
      types: ["Electric"],
      description: "Often kept at power plants to regulate electricity. Competes with others to attract lightning during storms."
    },
    {
      id: "185",
      name: "Sudowoodo",
      types: ["Rock"],
      description: "Despite looking like a tree, its body is more like rock. Hates water and hides when it rains."
    },
    {
      id: "448",
      name: "Lucario",
      types: ["Fighting", "Steel"],
      description: "Can read thoughts and movements by sensing others' aura. No foe can hide from Lucario."
    },
    {
      id: "658",
      name: "Greninja",
      types: ["Water", "Dark"],
      description: "Creates throwing stars from compressed water that can slice through metal when thrown at high speed."
    },
    {
      id: "491",
      name: "Darkrai",
      types: ["Dark"],
      description: "A legendary Pokémon that appears on moonless nights, putting people to sleep and giving them nightmares."
    }
  ];

  const bookRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = pokemonData.length + 1; // +1 for cover

  const nextPage = () => {
    bookRef.current.pageFlip().flipNext();
  };

  const prevPage = () => {
    bookRef.current.pageFlip().flipPrev();
  };

  const goToPage = (e) => {
    const pageNumber = parseInt(e.target.value);
    bookRef.current.pageFlip().flip(pageNumber);
  };

  const onFlip = (e) => {
    setCurrentPage(e.data);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <HTMLFlipBook
        width={370}
        height={500}
        maxShadowOpacity={0.5}
        drawShadow={true}
        showCover={true}
        size="fixed"
        ref={bookRef}
        onFlip={onFlip}
      >
        <div className="page" style={{ background: 'transparent' }}>
          <div className="page-content cover">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
              alt="Pokémon Logo"
              className="pokemon-logo"
            />
          </div>
        </div>

        {pokemonData.map((pokemon) => (
          <div className="page" key={pokemon.id}>
            <div className="page-content">
              <div className="pokemon-container">
                <img
                  src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${pokemon.id}.png`}
                  alt={pokemon.name}
                />
                <div className="pokemon-info">
                  <h2 className="pokemon-name">{pokemon.name}</h2>
                  <p className="pokemon-number">#{pokemon.id}</p>
                  <div>
                    {pokemon.types.map((type) => (
                      <span key={type} className={`pokemon-type type-${type.toLowerCase()}`}>
                        {type}
                      </span>
                    ))}
                  </div>
                  <p className="pokemon-description">{pokemon.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </HTMLFlipBook>

      {/* Navigation */}
      <div className="mt-8 flex flex-col items-center space-y-3 w-full max-w-md">
        <div className="flex justify-between items-center w-full px-4">
          <button
            onClick={prevPage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            ◀ Previous
          </button>

          <button
            onClick={nextPage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Next ▶
          </button>
        </div>

        <input
          type="range"
          min={0}
          max={totalPages - 1}
          value={currentPage}
          onChange={goToPage}
          className="w-full accent-blue-600"
        />

        <p className="text-sm text-gray-700">
          Page <span className="font-semibold">{currentPage + 1}</span> of {totalPages}
        </p>
      </div>
    </div>
  );
}

export default Book;
