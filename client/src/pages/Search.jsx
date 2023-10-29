import React from 'react'

const Search = () => {
  return (
    <div className='flex flex-col md:flex-row'>
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <form className='flex flex-col gap-8'>
                <div className="flex items-center gap-2 ">
                    <label className="whitespace-nowrap font-semibold text-lg">Search Term:</label>
                    <input type="text" name="searchTerm" id='searchTerm' placeholder='Search...' className=" border rounded-lg w-full  p-3" />
                </div>
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <label className="font-semibold">Type:</label>
                    <div className="flex gap-2 ">
                        <input type="checkbox" name="" id="all" className='w-5' />
                        <span>Rent & Sale</span>
                    </div>
                    <div className="flex gap-2 ">
                        <input type="checkbox" name="" id="rent" className='w-5' />
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2 ">
                        <input type="checkbox" name="" id="sale" className='w-5' />
                        <span>Sale</span>
                    </div>
                    <div className="flex gap-2 ">
                        <input type="checkbox" name="" id="offer" className='w-5' />
                        <span>Offer</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <label className="font-semibold">Amenities:</label>
                    <div className="flex gap-2 ">
                        <input type="checkbox" name="" id="parking" className='w-5' />
                        <span>Parking</span>
                    </div>
                    <div className="flex gap-2 ">
                        <input type="checkbox" name="" id="furnished" className='w-5' />
                        <span>Furnished</span>
                    </div>
                </div>
                <div className=" flex items-center gap-2">
                    <label className='font-semibold' >Sort:</label>
                    <select id="sort_order" className="border rounded-lg p-3 w-full">
                        <option value="">Price high to low</option>
                        <option value="">Price low to high</option>
                        <option value="">Latest</option>
                        <option value="">Oldest</option>
                    </select>
                </div>
                <button className='bg-blue-900 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
            </form>
        </div>
            <div className="">
                <h1 className='text-3xl font-semibold border-b p-3 text-blue-800 mt-5'>Listing Results:</h1>
            </div>
    </div>
  )
}

export default Search