// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { Check, ChevronsUpDown } from "lucide-react"
// import { useForm } from "react-hook-form"
// import { z } from "zod"

// import { cn } from "@/lib/utils"
// // import { toast } from "@/components/hooks/use-toast"
// import { Button } from "@/components/ui/button"
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { toast } from "@/hooks/use-toast"

// const languages = [
//   { label: "English", value: "en" },
//   { label: "French", value: "fr" },
//   { label: "German", value: "de" },
//   { label: "Spanish", value: "es" },
//   { label: "Portuguese", value: "pt" },
//   { label: "Russian", value: "ru" },
//   { label: "Japanese", value: "ja" },
//   { label: "Korean", value: "ko" },
//   { label: "Chinese", value: "zh" },
// ] as const

// const FormSchema = z.object({
//   language: z.string({
//     required_error: "Please select a language.",
//   }),
// })

// export function CategorySelector() {
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//   })

//   function onSubmit(data: z.infer<typeof FormSchema>) {
//     toast({
//       title: "You submitted the following values:",
//       description: (
//         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//           <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//         </pre>
//       ),
//     })
//   }

//   return (
//     <div className="w-full">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
//           <FormField
//             control={form.control}
//             name="language"
//             render={({ field }) => (
//               <FormItem className="flex flex-col">
//                 <FormLabel>Language</FormLabel>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <FormControl>
//                       <Button
//                         variant="outline"
//                         role="combobox"
//                         className={cn(
//                           "w-full justify-between",
//                           !field.value && "text-muted-foreground"
//                         )}
//                       >
//                         {field.value
//                           ? languages.find(
//                               (language) => language.value === field.value
//                             )?.label
//                           : "Select language"}
//                         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                       </Button>
//                     </FormControl>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-full p-0">
//                     <Command>
//                       <CommandInput placeholder="Search language..." />
//                       <CommandList>
//                         <CommandEmpty>No language found.</CommandEmpty>
//                         <CommandGroup>
//                           {languages.map((language) => (
//                             <CommandItem
//                               value={language.label}
//                               key={language.value}
//                               onSelect={() => {
//                                 form.setValue("language", language.value)
//                               }}
//                             >
//                               {language.label}
//                               <Check
//                                 className={cn(
//                                   "ml-auto",
//                                   language.value === field.value
//                                     ? "opacity-100"
//                                     : "opacity-0"
//                                 )}
//                               />
//                             </CommandItem>
//                           ))}
//                         </CommandGroup>
//                       </CommandList>
//                     </Command>
//                   </PopoverContent>
//                 </Popover>
//                 <FormDescription>
//                   This is the language that will be used in the dashboard.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button type="submit">Submit</Button>
//         </form>
//       </Form>
//     </div>
//   )
// }

import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Category } from '@/hooks/use-categories'

interface CategorySelectorProps {
  categories: Category[]
  selectedCategory: Category | null
  onSelectCategory: (category: Category) => void
  onAddCategory: () => void
}

export function CategorySelector({
  categories,
  selectedCategory,
  onSelectCategory,
  onAddCategory,
}: CategorySelectorProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedCategory ? selectedCategory.name : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandEmpty>
            No category found.
            <Button
              variant="outline"
              onClick={onAddCategory}
              className="mt-2 w-full"
            >
              Add new category
            </Button>
          </CommandEmpty>
          <CommandGroup>
            {Array.isArray(categories) && categories.map((category) => (
              <CommandItem
                key={category.id}
                onSelect={() => {
                  onSelectCategory(category)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedCategory?.id === category.id
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {category.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

