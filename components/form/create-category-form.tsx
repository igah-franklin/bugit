'use client'

import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import CustomModal from '../modal/custom-modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createCategoryAction } from '@/actions/category/create-category-action';
import { Loader2 } from 'lucide-react';



interface AddCategoryFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }

export default function CreateCategoryForm({ open, onOpenChange}:AddCategoryFormProps ) {

    const form = useForm({
        defaultValues: {
          categoryName: "",
        },
        mode: "onBlur",
      })

      const queryClient = useQueryClient();

      const { mutate, isPending } = useMutation({
          mutationFn: createCategoryAction,
          onSuccess: async(data: any)=>{
              form.reset({
                categoryName: '',
              });
              toast.success(`Category ${data?.data?.data.categoryName} created successfully 🎉`,{
                  id: 'create-category'
              });
              await queryClient.invalidateQueries({
                  queryKey: ['categories']
              });
            onOpenChange(false);
          },
          onError: ()=>{
              toast.error('something went wrong creating a category',{
                   id: 'create-category'
              })
          }
      })

    const onSubmit = useCallback((values: any)=>{
        toast.loading('...creating category',{
            id: 'create-category',
        });
        mutate(values);
    }, [mutate])
  return (
    <>
        <CustomModal
            title='Create category'
            open={open} 
            onOpenChange={onOpenChange}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="categoryName"
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
                    <Button
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={isPending}
                    className='w-full'
                    >
                        {!isPending && 'save'}
                        {isPending && <Loader2 className='animate-spin'/>}
                    </Button>
                </form>
            </Form>
        </CustomModal>
    </>
  )
}
