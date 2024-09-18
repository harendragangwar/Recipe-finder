import React, { useState } from 'react'
import Recipe from './Recipe';

function RecipeSearch() {
    const apiKey = "752ec6ea08b24a93ad38439d28a05aa9";
    const apiUrl = "https://api.spoonacular.com/recipes/complexSearch/";
    const [recipe, setRecipe] = useState("");
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    // Handling Submit Functionality
    async function handleSubmit(event){
        event.preventDefault();
        const fetchUrl = `${apiUrl}?apiKey=${apiKey}&query=${recipe}`;
        try {
            const res = await fetch(fetchUrl);
            if (!res.ok) throw new Error('Network response was not ok');
            const response = await res.json();
            const ids = response.results.map(r => r.id);
            setData(ids.slice(0, 2)); // Keep only the first two ids
        } catch (err) {
            setError(err.message);
        }
    }

    // Handling Change Functionality
    function handleChange(event){
        setRecipe(event.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='my-16 max-w-5xl mx-auto'>
                <input 
                    onChange={handleChange} 
                    value={recipe} 
                    placeholder='Search Recipe' 
                    className='bg-transparent text-3xl w-full text-center p-3 border-b-4 border-black focus:outline-none sm:text-6xl' 
                    id="name" 
                    type="text" 
                />
            </form>
            <div>
                {error && <p className='text-red-500'>{error}</p>}
                {data.length > 0 && data.map((id, index) => (
                    <Recipe key={id} id={id} data={id} />
                ))}
            </div>
        </div>
    );
}

export default RecipeSearch;
