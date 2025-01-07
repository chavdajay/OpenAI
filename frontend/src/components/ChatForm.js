import React, { useState } from 'react';
import { chatWithOpenAI } from '../services/api';

const ChatForm = () => {
   const [prompt, setPrompt] = useState('');
   const [reply, setReply] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await chatWithOpenAI(prompt);
      setReply(response.data.reply);
   };

   return (
      <div className="container mt-5">
         <form onSubmit={handleSubmit}>
            <div className="mb-3">
               <label className="form-label">Prompt</label>
               <textarea
                  className="form-control"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
               />
            </div>
            <button className="btn btn-primary">Send</button>
         </form>
         {reply && (
            <div className="mt-3">
               <h5>Reply:</h5>
               <p>{reply}</p>
            </div>
         )}
      </div>
   );
};

export default ChatForm;
