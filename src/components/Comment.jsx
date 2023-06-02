import React, { useEffect, useReducer, useState } from 'react' 
import amy from "./Images/Avatars/image-amyrobson.png"
import reply from "./Images/icons/icon-reply.svg"
import Reply from './Reply'
import juliusomo from "./Images/Avatars/image-juliusomo.png"


const actions =  {
   INCREMENT : "INCREMENT" ,
   DECREMENT : "DECREMENT" 
}

function reducer(state , action){

   switch(action.type){
     case actions.INCREMENT : 
      return {count : state.count +1}; 
     case actions.DECREMENT : 
     return  state.count -1 <= 0 ? {count :  0} : {count : state.count -1} ; 
  }  
} 


export default function Comment(props) {
   
   let textArea = document.getElementById("ReplyCommentTxt");
   const [likes , dispatch] = useReducer( reducer , {count : 0} )
   const [Response , setResponse] = useState(false);
      
   const ReplayClick = ()=>{
      setResponse(true)
      textArea.value =`@${props.initialComments.name} `;
   } 

   const SendClick = ()=> {

      props.setComments(prev => {
         
          const replay = prev.map(cmt => {
          if(cmt.id == props.initialComments.id){
            return {...cmt , replys :[
              ...cmt.replys ,
              {
              id : cmt.replys.length + 1 ,
              name : "elguanouni" , 
              image : juliusomo ,
              date : 'just now' , 
              text : textArea.value ,
              }
            ]}
          }
         return cmt
        })
        return replay
      })
       
      setResponse(false)
   }
  
   useEffect(()=> {
     if(Response){
        textArea.focus()
     }
   } , [Response])
  return (
    <div className='flex flex-col gap-4'> 


    <div className='w-full min-h-40 bg-white rounded-xl pb-12 lg:pb-4 px-8 py-4 relative'>
    <div className='flex gap-4'>
        <div className=''>
           <ul className='absolute lg:relative bottom-4 left-12 lg:left-0 lg:top-0 w-24  flex flex-row lg:flex-col justify-center items-center  lg:w-8 rounded-xl bg-Light gap-y-2 text-white'>
               <li className='text-GrayishBlue  w-full flex justify-center cursor-pointer' onClick={()=> dispatch({type : actions.INCREMENT})}>+</li>
               <li className='font-bold text-ModerateBlue'>{likes.count}</li>
               <li className='text-GrayishBlue w-full flex justify-center cursor-pointer' onClick={()=> dispatch({type : actions.DECREMENT})}>-</li>
           </ul>
        </div>
        <div className=' w-11/12 flex flex-col '>
           <div className='flex justify-between'>
              <div className='flex items-center justify-around gap-x-4' >
                 <span className='w-10'><img src={props.initialComments.image} alt="" /></span>
                 <h1 className='font-bold text-ModerateBlue'>{props.initialComments.name}</h1>
                 <span className='text-GrayishBlue'>1 month ago</span>
              </div> 

              <div className='flex items-center gap-2 cursor-pointer absolute lg:static bottom-4 right-6 '>
                  <img src={reply} alt="" />
                 <span className='font-bold text-ModerateBlue' onClick={()=> ReplayClick() }>Reply</span>
              </div>
           </div>
           <div className='mt-4'>
             <p className='text-GrayishBlue'>{props.initialComments.text}</p>
           </div>
        </div>
    </div>
  </div>
   
   <div className='w-full relative flex justify-around items-start h-48 lg:h-24 bg-white  rounded-xl p-4' style={{display : Response ? "flex" : "none"}}>
           <span className='w-12 absolute bottom-2 left-4 lg:relative'><img src={juliusomo} alt="" /></span> 
           <textarea name="" id="ReplyCommentTxt" cols="10" rows="10" className=' w-full lg:w-8/12 h-28 lg:h-full border-gray p-4 resize-none border-2 rounded-lg' placeholder='Add a comment...'></textarea>
           <button className='rounded-lg absolute bottom-2 right-4 lg:relative  bg-ModerateBlue text-white font-bold w-20 h-10 ' onClick={()=> SendClick()} >Send</button>
   </div>

             {props.initialComments.replys.map(reply => {
                    return <Reply key={reply.id}  reply={reply} id={props.initialComments.id} /> 
             })}
      
           
        

    </div>
  )
}


