'use client'

import React, { ReactNode } from 'react'
import { Dialog, DialogTitle } from '@radix-ui/react-dialog';
import { DialogContent, DialogHeader } from '../ui/dialog';


interface CustomModalProps {
    title: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
}

export default function CustomModal({ title, open, onOpenChange, children }:CustomModalProps ) {
  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{ title }</DialogTitle>
            </DialogHeader>
            { children }
        </DialogContent>
    </Dialog>
    </>
  )
}
