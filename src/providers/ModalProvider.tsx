"use client"

import Modal from '@/components/Modal';
import React, { useEffect, useState } from 'react'

const ModalProvider = () => {
  const [isModalMounted, setIsModalMounted] = useState(false);

  useEffect(() => {
    setIsModalMounted(true)
  }, []);

  if (!isModalMounted) {
    return null;
  }
  return (
    <Modal title='Modal Test'
      description='Testing Modal'
      isOpen
      onChange={() => { }}
      
      >
        Test Children
      </Modal>
  )
}

export default ModalProvider;
