import React, { useState } from 'react'

export function useTransactionModal() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedType, setSelectedType] = useState<string>('')

    const handleOpenModal = (type: string)=>{
        setSelectedType(type);
        setIsModalOpen(true);
      }
  return { isModalOpen, setIsModalOpen, handleOpenModal, selectedType }
}
