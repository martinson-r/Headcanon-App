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
      <span onClick={() => setShowModal(true)}>Log In</span>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
