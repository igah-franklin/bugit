'use client';

import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import CustomModal from '../modal/custom-modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { editCategoryAction } from '@/actions/category/edit-category-action';
import { Loader2 } from 'lucide-react';

interface EditCategoryFormProps {
  category: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditCategoryForm({ category, open, onOpenChange }: EditCategoryFormProps) {
  const form = useForm({
    defaultValues: {
      categoryName: category.categoryName,
    },
    mode: 'onBlur',
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: { categoryName: string }) =>
      editCategoryAction(category._id, { categoryName: values.categoryName }),
    onSuccess: async (data: any) => {
      toast.success(`Category edited to ${data?.data?.data.categoryName} successfully 🎉`, {
        id: 'edit-category',
      });
      await queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
      onOpenChange(false);
    },
    onError: () => {
      toast.error('Something went wrong editing the category', {
        id: 'edit-category',
      });
    },
  });

  // Update the form's default values when the category changes
//   useEffect(() => {
//     if (category) {
//       form.reset({
//         categoryName: category.categoryName || '',
//       });
//     }
//   }, [category, form]);

  const onSubmit = useCallback(
    (values: { categoryName: string }) => {
      toast.loading('Editing category...', {
        id: 'edit-category',
      });
      mutate(values);
    },
    [mutate]
  );

  return (
    <>
      <CustomModal title="Edit category" open={open} onOpenChange={onOpenChange}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="categoryName"
              rules={{ required: 'Category name is required' }}
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
              type="submit"
              disabled={isPending}
              className="w-full"
            >
              {!isPending && 'Save'}
              {isPending && <Loader2 className="animate-spin" />}
            </Button>
          </form>
        </Form>
      </CustomModal>
    </>
  );
}
