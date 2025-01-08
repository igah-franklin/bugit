'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useCategories, Category } from '@/hooks/use-categories'
import { CategorySelector } from './category-selector'

const formSchema = z.object({
  amount: z.number().positive(),
  description: z.string().min(1),
  date: z.string(),
  category: z.object({
    id: z.string(),
    name: z.string(),
  }).nullable(),
})

type FormData = z.infer<typeof formSchema>

interface AddIncomeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: FormData) => void
}

export function AddTransactionModal({ isOpen, onClose, onSubmit }: AddIncomeModalProps) {
  const { categories, addCategory } = useCategories()
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      description: '',
      date: new Date().toISOString().split('T')[0],
      category: null,
    },
  })

  const onSubmitForm = (data: FormData) => {
    onSubmit(data)
    reset()
    onClose()
  }

  const handleAddCategory = () => {
    if (newCategoryName) {
      const newCategory = addCategory(newCategoryName)
      setIsAddingCategory(false)
      setNewCategoryName('')
      setValue('category', newCategory)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Income</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="grid gap-4 py-4">
            <div className="">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                className="col-span-3 mt-2"
                {...register('amount', { valueAsNumber: true })}
              />
              {errors.amount && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.amount.message}
                </p>
              )}
            </div>
            <div className="">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                className="col-span-3 mt-2"
                {...register('description')}
              />
              {errors.description && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                className="col-span-3 mt-2"
                {...register('date')}
              />
              {errors.date && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.date.message}
                </p>
              )}
            </div>
            <div className="">
              <Label className="text-right">Category</Label>
              <div className="col-span-3 mt-2">
                {isAddingCategory ? (
                  <div className="flex gap-2">
                    <Input
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="New category name"
                    />
                    <Button type="button" onClick={handleAddCategory}>
                      Add
                    </Button>
                  </div>
                ) : (
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <CategorySelector
                        categories={categories}
                        selectedCategory={field.value}
                        onSelectCategory={(category) => field.onChange(category)}
                        onAddCategory={() => setIsAddingCategory(true)}
                      />
                    )}
                  />
                // <CategorySelector />
                )}
              </div>
              {errors.category && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Income</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

