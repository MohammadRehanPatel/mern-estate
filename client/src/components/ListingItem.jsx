import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'

const ListingItem = ({listing}) => {
    console.log(listing);
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
    <Link to={`/listing/${listing._id}`}>
        <img className='h-[520px] sm:h-[220px] w-full object-cover hover:scale-105 transition-all duration-300' src={listing.imageUrls[0] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqZDIhaDquGUI5gSoIEkpNuaOFAZoNfiTJpg&usqp=CAU"} alt="listing cover" />
        <div className="p-3 flex flex-col gap-2 w-full">
            <p className='truncate text-lg font-semibold text-blue-900'>{listing.name}</p>
            <div className="flex items-center gap-1">
                <MdLocationOn className='h-4 w-4 text-blue-950'/>
                <p className='text-blue-900 truncate font-semibold  text-sm w-full'>{listing.address}</p>
            </div>
            <p className='text-sm text-blue-950 line-clamp-2'>{listing.description}</p>
            <p className='text-blue-900 mt-2 font-semibold'>
            $
            {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent'&& ' / month'}
            
            </p>
            <div className="flex gap-3 text-blue-950 ">
            <div className="flex font-bold text-xs ">
                {listing.bedrooms >1 ? `${listing.bedrooms} Beds`:`${listing.bedrooms} Bed`}  
              </div>
            <div className="flex font-bold text-xs ">
                {listing.bedrooms >1 ? `${listing.bathrooms} Baths`:`${listing.bathrooms} Bath`}  
              </div>
            </div>
        </div>
    </Link>
    </div>
  )
}

export default ListingItem