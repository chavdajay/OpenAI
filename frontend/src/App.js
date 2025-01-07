import React from 'react';
import ChatForm from './components/ChatForm';
import UserForm from './components/UserForm';

const App = () => (
   <div>
      <h1 className="text-center mt-3">MERN OpenAI App</h1>
      <ChatForm />
      <UserForm />
   </div>
);

export default App;
