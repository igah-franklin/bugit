'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Dialog, DialogTitle } from '@radix-ui/react-dialog';
import { DialogContent, DialogHeader } from '../ui/dialog';
import { ICategories } from '@/types/ITransaction';
import CustomModal from '../modal/custom-modal';

interface ICategoryProps {
    category: ICategories
}

interface EditCategoryFormProps {
    category: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }

export default function EditCategoryForm({ category, open, onOpenChange}:EditCategoryFormProps ) {

    const form = useForm({
        defaultValues: {
          category: category.categoryName,
        },
        mode: "onBlur",
      })

      const onSubmit = async (data: any) => {
        console.log(data)
        onOpenChange(false)
      }
  return (
    <>
        <CustomModal
            title='Edit category'
            open={open} 
            onOpenChange={onOpenChange}
        >
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
                        Edit Category
                    </Button>
                </form>
            </Form>
    </CustomModal>
    </>
  )
}
