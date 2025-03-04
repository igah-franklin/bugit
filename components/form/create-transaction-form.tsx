'use client'

import * as React from "react"
import { CalendarIcon, Check, ChevronsUpDown, PlusIcon } from 'lucide-react'
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useForm } from "react-hook-form"
import TransactionModal from "../modal/transaction-modal"
import CreateCategoryForm from "./create-category-form"
import { useCallback, useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchCategoryAction } from "@/actions/category/fetch-category-action"
import { toast } from "sonner"
import { createTransactionAction } from "@/actions/transactions/create-transaction-action"
import { ICategories } from "@/types/ITransaction"

interface ICategory {
    _id: string;
    categoryName: string;
  }
  
interface AddTransactionFormProps {
  transactionType: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTransactionForm({ transactionType, open, onOpenChange }: AddTransactionFormProps) {
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)


  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoryAction,
    refetchOnWindowFocus: false,
  });

  console.log(isLoading, isFetching)
  const categoryData =  data?.data.data || [];

  const form = useForm({
    defaultValues: {
      amount: 0,
      description: "",
      date: new Date(),
      categoryId: "",
      type: transactionType
    },
  })

  const queryClient = useQueryClient();

      const { mutate } = useMutation({
          mutationFn: createTransactionAction,
          onSuccess: async()=>{
              form.reset({
                amount: 0,
                description: "",
                date: new Date(),
                categoryId: "",
              });
              toast.success(`Transaction created successfully`,{
                  id: 'create-transaction'
              });
              await queryClient.invalidateQueries({
                  queryKey: ['transactions'],
                //   refetchActive: true,
                //   refetchInactive: true,
              });
              await queryClient.invalidateQueries({ queryKey: ['financial-summary'] });
            onOpenChange(false);
          },
          onError: ()=>{
              toast.error('something went wrong creating a transaction',{
                   id: 'create-transaction'
              })
          }
      })

 
      useEffect(() => {
        form.reset({
          ...form.getValues(),
          type: transactionType,
        });
      }, [transactionType, form]);

      const onSubmit = useCallback((values: { amount: number})=>{
        toast.loading('...creating transaction',{
            id: 'create-transaction',
        });
        const formattedValues = {
            ...values,
            amount: Number(values.amount),
          };
        mutate(formattedValues);
    }, [mutate])

  return (
    <>
        <TransactionModal
        title={`Create ${transactionType}`}
        open={open} 
        onOpenChange={onOpenChange}
        transactionType={transactionType}
        >
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                        <Input
                        placeholder="0"
                        type="number"
                        step="0.01"
                        {...field}
                        />
                    </FormControl>
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter description" {...field} />
                    </FormControl>
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant="outline"
                            className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value ? (
                                format(field.value, "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {field.onChange(date)}}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value ? categoryData.find((category: ICategory) => category._id === field.value)?.categoryName : "Select category..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                            <div className="py-2">
                                <Button variant={'ghost'}
                                className={cn('w-full py-1 bg-gray-900')}
                                onClick={() => setIsModalOpen(true)}
                                >
                                    <PlusIcon/>
                                    create new category
                                </Button>
                            </div>
                            <Command>
                                <CommandInput placeholder="Search category..." />
                                <CommandList>
                                    <CommandEmpty>No categories found.</CommandEmpty>
                                    <CommandGroup>
                                    {categoryData.map((category: ICategories) => (
                                        <CommandItem
                                        key={category._id}
                                        value={category._id}
                                        onSelect={() => {
                                            form.setValue("categoryId", category._id)
                                            setCategoryOpen(false)
                                        }}
                                        >
                                        {category.categoryName}
                                        <Check
                                            className={cn(
                                            "ml-auto",
                                            field.value === category._id ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        </CommandItem>
                                    ))}
                                    </CommandGroup>
                                </CommandList>
                                </Command>
                        </PopoverContent>
                    </Popover>
                    </FormItem>
                )}
                />

                <Button type="submit" className="w-full">
                Add { transactionType }
                </Button>
            </form>
            </Form>
        </TransactionModal>
        <CreateCategoryForm
            open={isModalOpen}
            onOpenChange={() => setIsModalOpen(false)}
        />
    </>
  )
}


