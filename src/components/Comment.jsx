import React from 'react' 
import amy from "./Images/Avatars/image-amyrobson.png"
import reply from "./Images/icons/icon-reply.svg"

export default function Comment(props) {
  return (
    <div className='w-full h-40 bg-white absolute rounded-xl  px-8 py-4'>
    <div className='flex gap-4'>
        <div className=''>
           <ul className='flex flex-col justify-center items-center  w-8 rounded-xl bg-Light gap-y-2 text-white'>
               <li className='text-GrayishBlue'>+</li>
               <li className='font-bold text-ModerateBlue'>12</li>
               <li className='text-GrayishBlue'>-</li>
           </ul>
        </div>
        <div className=' w-11/12 flex flex-col '>
           <div className='flex justify-between'>
              <div className='flex items-center justify-around gap-x-4' >
                 <span className='w-10'><img src={props.image} alt="" /></span>
                 <h1 className='font-bold text-ModerateBlue'>{props.name}</h1>
                 <span className='text-GrayishBlue'>1 month ago</span>
              </div> 

              <div className='flex items-center gap-2'>
                  <img src={reply} alt="" />
                 <span className='font-bold text-ModerateBlue'>Reply</span>
              </div>
           </div>
           <div className='mt-4'>
             <p className='text-GrayishBlue'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, porro? Quis vel explicabo enim eum repellendus mollitia esse ipsa, dolorem reiciendis, </p>
           </div>
        </div>
    </div>
  </div>
  )
}
