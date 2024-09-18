import React, { useState, useEffect } from 'react';

function Recipe({ data }) {
    const apiKey = "752ec6ea08b24a93ad38439d28a05aa9";
    const id = data;
    const URL = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
    const [isFavorite, setIsFavorite] = useState(false);
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [error, setError] = useState(null);

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
    };

    useEffect(() => {
        async function fetchRecipe() {
            try {
                const response = await fetch(URL);
                if (!response.ok) throw new Error('Failed to fetch recipe information');
                const data = await response.json();
                setRecipeDetails(data);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchRecipe();
    }, [URL]);

    return (
        <div className='p-3'>
            {error && <p className='text-red-500'>{error}</p>}
            {recipeDetails ? (
                <div className='border border-gray-700 rounded-lg p-5 md:p-10 flex flex-col lg:flex-row bg-slate-800 text-stone-300'>
                    <div className='lg:w-1/2'>
                        <h2 className='mb-4 text-2xl md:text-4xl lg:text-5xl font-semibold'>{recipeDetails.title}</h2>
                        <img
                            className='rounded-lg object-cover w-full lg:w-3/4 h-auto mx-auto lg:mx-0'
                            src={recipeDetails.image}
                            alt={recipeDetails.title}
                        />
                    </div>

                    <div className='lg:w-1/2 mt-4 lg:mt-0 lg:ml-10'>
                        <div className='flex flex-col gap-4'>
                            <p className='text-lg md:text-xl'>Ready in {recipeDetails.readyInMinutes} minutes</p>
                            <p className='text-lg md:text-xl'>Servings: {recipeDetails.servings}</p>
                            <div
                                className='text-sm md:text-base'
                                dangerouslySetInnerHTML={{ __html: recipeDetails.summary }}
                            />
                        </div>
                        <button
                            onClick={handleFavoriteClick}
                            className={`mt-5 px-4 py-2 text-lg font-semibold rounded ${
                                isFavorite ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'
                            }`}
                        >
                            {isFavorite ? 'Unfavorite' : 'Favorite'}
                        </button>
                    </div>
                </div>
            ) : (
                <p className='text-center text-lg font-semibold'>Loading...</p>
            )}
        </div>
    );
}

export default Recipe
