"use client"

import AuthModal from '@/components/AuthModal';
import ProfileModal from '@/components/ProfileModal';
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
      {/* todo : Profile Modal */}
      <ProfileModal />
    </>
  )
}

export default ModalProvider;
