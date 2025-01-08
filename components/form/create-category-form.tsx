'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Dialog, DialogTitle } from '@radix-ui/react-dialog';
import { DialogContent, DialogHeader } from '../ui/dialog';



interface AddCategoryFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }

export default function CreateCategoryForm({ open, onOpenChange}:AddCategoryFormProps ) {

    const form = useForm({
        defaultValues: {
          category: "",
        },
        mode: "onBlur",
      })

      const onSubmit = async (data: any) => {
        console.log(data)
        onOpenChange(false)
      }
  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Category</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="category"
                        rules={{ required: "Category is required" }}
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter category"
                                        type="text"
                                        {...field}
                                    />
                                </FormControl>
                                {fieldState.error && (
                                    <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                                )}
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-1/2">
                        Add Income
                    </Button>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
    </>
  )
}
