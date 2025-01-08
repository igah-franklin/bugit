
import { useState } from 'react'

export type Category = {
  id: string
  name: string
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Salary' },
    { id: '2', name: 'Freelance' },
    { id: '3', name: 'Investments' },
  ])

  const addCategory = (name: string) => {
    const newCategory = { id: Date.now().toString(), name }
    setCategories([...categories, newCategory])
    return newCategory
  }

  return {  categories: categories || [], addCategory }
}

