import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import '../styles/Modal.css';

const Modal = ({ isOpen, onConfirm, onCancel, username }) => {
  const handleClick = () => {
      setTimeout(() => {
          window.location.href = `/user/${username}`;
      }, 1000);
  }

  return (
      <div className="Modal-overlay">
          <div className="Modal-content">
              <p>Account linked</p>
              <div className="Modal-buttons">
                  <button onClick={handleClick}>Continue</button>
              </div>
          </div>
      </div>
  );
};


export default Modal;
