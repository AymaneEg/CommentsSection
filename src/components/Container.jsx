import React from 'react'
import amy from "./Images/Avatars/image-amyrobson.png"
import reply from "./Images/icons/icon-reply.svg"
import Comment from './Comment'
export default function Container() {
  return (
    <div className='w-full h-screen bg-Light p-8'>
       <div className='w-6/12 h-full  mx-auto relative'>
        
        <div className='w-full flex flex-col justify-start'>
          <Comment name={"amyrobson"} image={amy}/>
        </div>

        {/* Add comment area */}
        <div className='w-full h-32 bg-white absolute bottom-0 rounded-xl'>

        </div>

       </div>
    </div>
 )
}
