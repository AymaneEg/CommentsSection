import React, { useEffect } from 'react'
import amy from "./Images/Avatars/image-amyrobson.png"
import max from "./Images/Avatars/image-maxblagun.png"
import juliusomo from "./Images/Avatars/image-juliusomo.png"
import reply from "./Images/icons/icon-reply.svg"
import Comment from './Comment'
import Reply from './Reply'
import { useState  } from 'react' 
import DeletePortal from './DeletePortal'



export let CurrentUser = {
  name : 'elguanouni'
}

let initialComments = [
  {
    id : 1, 
    name : "amyrobson" , 
    image : amy ,
    date : '' , 
    text : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, porro? Quis vel explicabo enim eum repellendus mollitia esse ipsa, dolorem reiciendis, ' ,
    replys : [
      {
        id : 1 ,
        name : "amyrobson" , 
        image : amy ,
        date : 'just now' , 
        text : `that's really cool` ,
      } 
     ]
  }
]
 
export const deleteContext = React.createContext();


export default function Container() {

 
  const [comments , setComments ] =  useState(initialComments);
  const [deleteComment , setDeleteComment] = useState(false);
  const [selectedComment , setSelctedCommeny] = useState({})

  const Send = ()=> {
    let textArea = document.getElementById("writeCommentTxt")
      setComments ([...comments , {
        id : comments.length + 1 , 
        name : "elguanouni" , 
        image : juliusomo ,
        text : textArea.value ,
        replys : []
      }])

      textArea.value = ""
      
  }

  useEffect(()=> {
    //console.log(comments)
  } , [comments])

  return (
    <deleteContext.Provider value={{deleteComment , setDeleteComment , comments , setComments , selectedComment , setSelctedCommeny  }}>

       <div className='w-full h-screen bg-Light p-8'>
          <div className='w-full lg:w-6/12 h-full  mx-auto relative'>
           
           <div className='flex flex-col gap-4 snap-x  overflow-auto ' style={{height : '70vh'}}>
             {
              
             comments.map(comment => {
                return (
                 <Comment key={comment.id} initialComments={comment}  setComments={setComments} comments={comments} />
                )
             })}
           </div>
   
           {/* Add comment area */}
   
   
          </div>

           <div className='w-full flex justify-around items-start h-32 bg-white mb-4 fixed lg:w-6/12 bottom-0 rounded-xl p-4' style={{left : '50%' , transform : 'translateX(-50%)'}}>
              <span className='w-12'><img src={juliusomo} alt="" /></span> 
              <textarea name="" id="writeCommentTxt" cols="10" rows="10" className='w-8/12 h-full border-gray p-4 resize-none border-2 rounded-lg' placeholder='Add a comment...'></textarea>
              <button className='rounded-lg bg-ModerateBlue text-white font-bold w-20 h-10 ' onClick={()=> Send()}>Send</button>
           </div>
       </div>

    <DeletePortal deleteComment={deleteComment}  setDeleteComment={setDeleteComment}/>

    </deleteContext.Provider>
    
 )
}
