import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Search = () => {
    const [sidebardata, setSidebardata] = useState({
        searchTerm:'',
        type:"all",
        offer:false,
        parking:false,
        furnished:false,
        sort_order:'created_at',
        order:'desc'
    })
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([])
    const navigate = useNavigate();
    console.log(listings);
    const handleChange=(e)=>{
        if(e.target.if==='all'|| e.target.id==='rent' ||e.target.id==='sale'){
            setSidebardata({...sidebardata,type:e.target.id})
        }
        if(e.target.id==='searchTerm'){
            setSidebardata({...sidebardata,searchTerm:e.target.value})
        }
        if(e.target.id==='offer'||e.target.id==='furnished'||e.target.id==='parking'){
            setSidebardata({...sidebardata,[e.target.id]:e.target.checked||e.target.checked==='true'?true:false})
        }
        if(e.target.id==="sort_order"){
            const sort =e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebardata({...sidebardata,sort,order})
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm',sidebardata.searchTerm);
        urlParams.set('type',sidebardata.type);
        urlParams.set('parking',sidebardata.parking);
        urlParams.set('furnished',sidebardata.furnished);
        urlParams.set('offer',sidebardata.offer);
        urlParams.set('sort',sidebardata.sort);
        urlParams.set('order',sidebardata.order);

        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if(
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ){
            setSidebardata({
                searchTerm:searchTermFromUrl || '',
                type:typeFromUrl || 'all',
                parking:parkingFromUrl==='true'?true : false,
                furnished:furnishedFromUrl ==='true'?true : false,
                offer:offerFromUrl ==='true'?true : false,
                sort:sortFromUrl || 'created_at',
                order:orderFromUrl || 'desc'
            });
        }

        const fetchListings =async ()=>{
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = res.json();
            setListings(data);
            setLoading(false);
        }
        fetchListings();
        
    
    }, [location.search])
    
  return (
    <div className='flex flex-col md:flex-row'>
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className="flex items-center gap-2 ">
                    <label className="whitespace-nowrap font-semibold text-lg">Search Term:</label>
                    <input type="text" name="searchTerm" id='searchTerm' value={sidebardata.searchTerm} onChange={handleChange} placeholder='Search...' className=" border rounded-lg w-full  p-3" />
                </div>
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <label className="font-semibold">Type:</label>
                    <div className="flex gap-2 ">
                        <input type="checkbox" name="" id="all" className='w-5'
                        checked={sidebardata.type==='all'} onChange={handleChange}
                        />
                        <span>Rent & Sale</span>
                    </div>
                    <div className="flex gap-2 ">
                        <input type="checkbox" name="" id="rent" className='w-5'
                        checked={sidebardata.type==='rent'} onChange={handleChange}
                        />
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2 ">
                        <input type="checkbox" name="" id="sale" className='w-5'
                        checked={sidebardata.type==='sale'} onChange={handleChange}
                        />
                        <span>Sale</span>
                    </div>
                    <div className="flex gap-2 ">
                        <input type="checkbox" name="" id="offer" className='w-5'
                        checked={sidebardata.offer} onChange={handleChange}
                        />
                        <span>Offer</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <label className="font-semibold">Amenities:</label>
                    <div className="flex gap-2 ">
                        <input type="checkbox" name="" id="parking" className='w-5'
                        checked={sidebardata.parking} onChange={handleChange}
                        />
                        <span>Parking</span>
                    </div>
                    <div className="flex gap-2 ">
                        <input type="checkbox" name="" id="furnished" className='w-5' 
                        checked={sidebardata.furnished} onChange={handleChange}
                        />
                        <span>Furnished</span>
                    </div>
                </div>
                <div className=" flex items-center gap-2">
                    <label className='font-semibold' >Sort:</label>
                    <select id="sort_order" className="border rounded-lg p-3 w-full"
                    defaultValue={'created_at_desc'} onChange={handleChange}
                    >
                        <option value="regularPrice_desc">Price high to low</option>
                        <option value="regularPrice_asc">Price low to high</option>
                        <option value="createdAt_desc">Latest</option>
                        <option value="createdAt_asc">Oldest</option>
                    </select>
                </div>
                <button className='bg-blue-900 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
            </form>
        </div>
            <div className="">
                <h1 className='text-3xl font-semibold border-b p-3 text-blue-900 mt-5'>Listing Results:</h1>
            </div>
    </div>
  )
}

export default Search