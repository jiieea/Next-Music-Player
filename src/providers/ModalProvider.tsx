"use client"

import AuthModal from '@/components/AuthModal';
import UploadModal from '@/components/UploadModal';
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
    <>
      <AuthModal />
      <UploadModal />
    </>
  )
}

export default ModalProvider;
