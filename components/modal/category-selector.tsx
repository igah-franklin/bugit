
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

