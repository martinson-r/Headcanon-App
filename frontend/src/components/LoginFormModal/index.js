import { noConflict } from 'js-cookie';
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css';
import '../Navigation/Navigation.css';
function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="navigation-button" onClick={() => setShowModal(true)}><span>Log In</span></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
