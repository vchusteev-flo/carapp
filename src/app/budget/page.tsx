'use client'

import CarResults from '@/components/car-results';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function BudgetPage() {
  const [budget, setBudget] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically fetch results based on the budget
    console.log('Searching with budget:', budget)
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold">Suggest Cars by Budget</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="budget">Budget (€)</Label>
          <Input
            id="budget"
            type="number"
            placeholder="Enter your budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>
        <Button type="submit">Get Suggestions</Button>
      </form>
      <CarResults count={9} />
    </div>
  )
}

