import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

const Listing = () => {
  SwiperCore.use([Navigation
  ]);
  const params = useParams()
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(()=>{
    const fetchListing = async ()=>{
      try {
        setLoading(true);
        const response = await fetch(`/api/listing/get/${params.listingId}`)
        const data = await response.json()
        if(data.success===false){
          setError(true)
          setLoading(false)
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    fetchListing()
  },[params.listingId])
  return (
    <div>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p> }
      {error && <p className='text-red-800 text-center my-7 text-2xl'>Something went wrong...</p> }
      {listing && !loading && !error &&  (
        <>
        <Swiper navigation>
        {listing.imageUrls.map((url)=>(
          <SwiperSlide key={url}>
            <div className="h-[500px]" style={{background:`url(${url}) center no-repeat `, backgroundSize:"cover"}} >

            </div>

          </SwiperSlide>
        ))}
        </Swiper>
        <h1>{listing.name}</h1>
        </>
      )}
      
      </div>
  )
}

export default Listing