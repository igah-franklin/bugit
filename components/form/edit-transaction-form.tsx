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


// Simulated categories - replace with your actual data fetching
const initialCategories = [
  { value: "salary", label: "Salary" },
  { value: "freelance", label: "Freelance" },
  { value: "investments", label: "Investments" },
]

interface EditTransactionFormProps {
  transactionData: any;
  transactionType: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditTransactionForm({ transactionType, transactionData, open, onOpenChange }: EditTransactionFormProps) {
  const [categories, setCategories] = React.useState(initialCategories)
  const [categoryOpen, setCategoryOpen] = React.useState(false)
  const [newCategory, setNewCategory] = React.useState("")
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const form = useForm({
    defaultValues: {
      amount: transactionData.amount,
      description: transactionData.description,
      date: transactionData.date,
      category: transactionData.category,
    },
  })

  const onSubmit = async (data: any) => {
    console.log(data, 'data===>')
    // Handle form submission
    onOpenChange(false)
  }

  const handleEditCategory = () => {
    if (newCategory.trim()) {
      const value = newCategory.toLowerCase().replace(/\s+/g, '-')
      setCategories([...categories, { value, label: newCategory }])
      form.setValue('category', value)
      setNewCategory("")
      setCategoryOpen(false)
    }
  }

  return (
    <>
        <TransactionModal
            title={`Update ${transactionType}`}
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
                            onSelect={field.onChange}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="category"
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
                            {field.value
                                ? categories.find(
                                    (category) => category.value === field.value
                                )?.label
                                : "Select category..."}
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
                                    {categories.map((category) => (
                                        <CommandItem
                                        key={category.value}
                                        value={category.value}
                                        onSelect={() => {
                                            form.setValue("category", category.value)
                                            setCategoryOpen(false)
                                        }}
                                        >
                                        {category.label}
                                        <Check
                                            className={cn(
                                            "ml-auto",
                                            field.value === category.value ? "opacity-100" : "opacity-0"
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

