import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const { name, email, message } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/user', formData);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={onChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Email"
        required
      />
      <textarea
        name="message"
        value={message}
        onChange={onChange}
        placeholder="Message"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
