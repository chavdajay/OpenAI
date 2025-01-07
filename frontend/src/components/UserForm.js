import React, { useState } from 'react';
import { createUser } from '../services/api';

const UserForm = () => {
   const [formData, setFormData] = useState({ name: '', email: '', address: '', location: '' });

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      await createUser(formData);
      alert('User added!');
   };

   return (
      <div className="container mt-5">
         <form onSubmit={handleSubmit}>
            <div className="mb-3">
               <label className="form-label">Name</label>
               <input className="form-control" name="name" onChange={handleChange} />
            </div>
            <div className="mb-3">
               <label className="form-label">Email</label>
               <input className="form-control" name="email" onChange={handleChange} />
            </div>
            <div className="mb-3">
               <label className="form-label">Address</label>
               <input className="form-control" name="address" onChange={handleChange} />
            </div>
            <div className="mb-3">
               <label className="form-label">Location</label>
               <input className="form-control" name="location" onChange={handleChange} />
            </div>
            <button className="btn btn-success">Submit</button>
         </form>
      </div>
   );
};

export default UserForm;
