import React, { useContext, useEffect , useReducer} from 'react'
import { useState } from 'react'
import reply from "./Images/icons/icon-reply.svg"
import edit from "./Images/icons/icon-edit.svg" 
import deleteicon from "./Images/icons/icon-delete.svg" 
import { CurrentUser, deleteContext } from './Container'
import DeletePortal from './DeletePortal' 
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

export default function Reply(props) {

  const [edit , setEdit] = useState(false); 
  const [editedText , seteditedText] = useState('')
  const deleteComment = useContext(deleteContext);
  const [likes , dispatch] = useReducer( reducer , {count : 0} )
  const [replay , setreplay] = useState(false)
  const SendClick = ()=> {

   deleteComment.setComments(prev => {
         
      const replay = prev.map(cmt => {
      if(cmt.id == props.id){
        return {...cmt , replys :[
          ...cmt.replys ,
          {
          id : cmt.replys.length + 1 ,
          name : "elguanouni" , 
          image : juliusomo ,
          date : 'just now' , 
          text : document.getElementById("ReplytTxt").value ,
          }
        ]}
      }
     return cmt
    })
    return replay
  })
  setreplay(false)

  } 

  const ReplayClick = ()=>{
   setreplay(true)
    document.getElementById("ReplytTxt").value =`@${props.reply.name} `
    document.getElementById("ReplytTxt").focus()
  }

  const Edit = ()=> {
     setEdit(true)
     deleteComment.setSelctedCommeny({CommentId : props.id , ReplyId : props.reply.id}); 
  } 

  useEffect(()=> {
     if(edit){
      document.getElementById("EditTxt").innerHTML = editedText;
     }
  } , [edit])

  const Delete = ()=> {
    deleteComment.setSelctedCommeny({CommentId : props.id , ReplyId : props.reply.id});
    deleteComment.setDeleteComment(true)
  } 

  const Update = ()=> {

   deleteComment.setComments(prev => {
      const rep = prev.map(cmt=>{
       if(cmt.id == deleteComment.selectedComment.CommentId){
    
         let res =
             cmt.replys.map(replay => {
              if(replay.id == deleteComment.selectedComment.ReplyId){
                return {
                   ...replay , 
                   text :  editedText
                }
              }
              return replay
          })
         
         return {
            ...cmt , 
            replys : [
               ...res
            ]
         }
       }
       return cmt
      })
      
      return rep

   }) 

   setEdit(false)

  }

  return (
    <>
    
    <div className='ReplyContainer'>
     <div className='w-10/12 min-h-40  bg-white rounded-xl  pb-12 lg:pb-4  lg:px-8 py-4 '>
        <div className='flex gap-4'>
            <div className=''>
               <ul className='flex flex-row lg:flex-col absolute lg:relative  justify-center items-center w-24 lg:w-8 bottom-4 lg:bottom-0 ml-4 lg:ml-0 rounded-xl bg-Light gap-y-2  text-white'>
                   <li className='text-GrayishBlue w-full flex justify-center cursor-pointer' onClick={()=> dispatch({type : actions.INCREMENT})}>+</li>
                   <li className='font-bold text-ModerateBlue'>{likes.count}</li>
                   <li className='text-GrayishBlue w-full flex justify-center cursor-pointer' onClick={()=> dispatch({type : actions.DECREMENT})}>-</li>
               </ul>
            </div>
            <div className=' w-11/12 flex flex-col '>
               <div className='flex justify-between'>
                  <div className='flex items-center justify-around  gap-x-2 lg:gap-x-2 ' >
                     <span className='w-10'><img src={props.reply.image} alt="" /></span>
                     <h1 className='font-bold text-ModerateBlue'>{props.reply.name}</h1>
                     <span className='bg-ModerateBlue text-white w-8 h-4 p-2 rounded-md flex items-center justify-center text-sm' style={{display : props.reply.name === CurrentUser.name ? 'flex': 'none'}} >you</span>
                     <span className='text-GrayishBlue'>1 month ago</span>
                  </div> 
    
                  <div className='flex items-center '>
                     <div className='flex items-center gap-2 cursor-pointer absolute lg:relative bottom-4 lg:bottom-0 right-6 lg:right-0 ' onClick={()=> ReplayClick()} style={{display : props.reply.name === CurrentUser.name ? 'none': 'flex'}} >
                        <img src={reply} alt="" />
                        
                        <span className='font-bold text-ModerateBlue '>Reply</span>
                     </div>
                     <div className=' absolute lg:static bottom-4 right-4 flex items-center gap-2' style={{display : props.reply.name === CurrentUser.name ? 'flex': 'none'}}>

                        <div className='flex items-center gap-2 cursor-pointer' onClick={()=> Delete() }  >
                          <img src={deleteicon} alt="" />
                          <span className='font-bold text-SoftRed '>Delete</span>
                        </div>

                        <div className='flex items-center gap-2 cursor-pointer' onClick={()=> Edit()} >
                          <img src={edit} alt="" />
                          <span className='font-bold text-ModerateBlue cursor-pointer'>Edit</span>
                        </div>
                        
                     </div>
                  </div>
               </div>
               <div className='mt-4 flex flex-col '>
                 <p className='text-GrayishBlue' style={{display : edit ? "none" : "flex"}} >{props.reply.text} </p> 
                 <div style={{display : edit ? "block" : "none"}}>
                   <div>
                      <textarea name="" id="EditTxt" onChange={e=> seteditedText(e.target.value) } cols="30" rows="10" className='w-full h-20 resize-none border-2 rounded-l border-gray rounded-lg p-2'></textarea>
                   </div>
                   <div className='flex justify-end'>
                     <button className='rounded-lg bg-ModerateBlue text-white font-bold w-20 h-10' onClick={()=>Update()} >Update</button>
                   </div>
                 </div>
               </div>
            </div>
        </div>
      </div>

      

      </div>

      <div className='w-full justify-end'  style={{display : replay ? "flex" : "none"}}>
         <div className='w-10/12 flex justify-around items-start h-24 bg-white  rounded-xl p-4 ' >
              <span className='w-12'><img src={juliusomo} alt="" /></span> 
              <textarea name="" id="ReplytTxt" cols="10" rows="10" className='w-8/12 h-full border-gray p-4 resize-none border-2 rounded-lg' placeholder='Add a comment...'></textarea>
              <button className='rounded-lg bg-ModerateBlue text-white font-bold w-20 h-10 ' onClick={()=> SendClick()} >Send</button>
         </div>
      </div>
      
      </>
    )
}
