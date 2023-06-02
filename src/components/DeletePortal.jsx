import React from 'react'
import { ReactDOM } from 'react-dom'
import { useContext } from 'react';
import { deleteContext } from './Container';

export default function DeletePortal(props) {

  const deleteComment = useContext(deleteContext);
 
  const DeleteComment = ()=> {
   
   deleteComment.setComments(prev => {
      const rep = prev.map(cmt=>{
       if(cmt.id == deleteComment.selectedComment.CommentId){
    
         let res =
             cmt.replys.map(replay => {
              if(replay.id == deleteComment.selectedComment.ReplyId){
               const index =  cmt.replys.findIndex( obj=>{
                  return obj.id == deleteComment.selectedComment.ReplyId ;
               })
               cmt.replys.splice(index ,1)
               deleteComment.setDeleteComment(false)
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

  }

  return (
    <div className='w-full h-screen absolute top-0 left-0 flex items-center justify-center bg-LightBlack' style={{display : props.deleteComment ? "flex" : 'none' }}>
        <div className='w-8/12 lg:w-3/12 md:w-6/12 h-52  bg-white rounded-lg flex flex-col gap-4 p-4'>
           <h1 className='font-bold text-xl'>Delete comment</h1>
           <p className='text-GrayishBlue'>are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        <div className='flex justify-between items-center'>
            <button className='rounded-lg bg-GrayishBlue text-white font-bold w-5/12 h-10' onClick={()=> deleteComment.setDeleteComment(false)}  >NO, CANCEL</button>
            <button className='rounded-lg bg-SoftRed text-white font-bold w-5/12 h-10' onClick={()=> DeleteComment()} >YES, DELETE</button>
        </div>
        </div>
    </div>
  ) 
}
