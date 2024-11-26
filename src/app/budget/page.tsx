'use client'

import CarResults from '@/components/car-results';
import { useState } from 'react';

export default function BudgetPage() {
  const [budget, setBudget] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching with budget:', budget)
  }

  function setIsFilterModalOpen(arg0: boolean): void {
    throw new Error('Function not implemented.');
  }

  return (
    
    <div className="min-h-screen bg-gradient-to-b from-charcoal via-charcoal-600 to-charcoal">
      <div className="p-4 pb-20">
        {/* <form onSubmit={handleSubmit} className="grid gap-4 bg-charcoal p-6 rounded-lg shadow-sm">
          <div className="grid gap-2">
            <Label htmlFor="budget" className="text-white">Budget (€)</Label>
            <Input
              id="budget"
              type="number"
              placeholder="Enter your budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full rounded-full bg-gray-100 pl-4 pr-4"
            />
          </div>
          <Button 
            type="submit"
            className="bg-white text-charcoal hover:bg-gray-100"
          >
            Get Suggestions
          </Button>
        </form> */}
          <CarResults count={6} />
      </div>
    
    </div>
  )
}
