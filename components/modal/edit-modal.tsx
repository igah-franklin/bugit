'use client'

import React, { ReactNode } from 'react'
import { Dialog, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { DialogContent, DialogHeader } from '../ui/dialog';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';


interface CustomModalProps {
    title: string;
    transactionType: string,
    open: boolean;
    onOpenChange: (open: boolean) => void;
    triggerBtnText: ReactNode;
    children: ReactNode;
}

export default function EditModal({ open, onOpenChange, title, triggerBtnText, transactionType, children }:CustomModalProps ) {
  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
            {/* <Button variant="outline">{ triggerBtnText }</Button> */}
            { triggerBtnText }
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className={cn('text-2xl font-bold text-start', 
        transactionType==='expense' ? 'text-red-500' : 'text-emerald-500' )}>{ title }</DialogTitle>
            </DialogHeader>
            { children }
        </DialogContent>
    </Dialog>
    </>
  )
}
