import { useState } from 'react'
import RecipeSearch from './components/RecipeSearch'


function App() {

  return (
    <>
        <div className='h-screen w-full'>
            <h1 className='mt-16 font-semibold text-6xl text-center sm:text-9xl'>Recipe Website</h1>
            <RecipeSearch />
        </div>
    </>
  )
}

export default App
