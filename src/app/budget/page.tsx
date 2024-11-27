'use client'

import CarResults from '@/components/car-results';

export default function BudgetPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-charcoal via-charcoal-600 to-charcoal">
      <div className="p-4 pb-20">
        <CarResults count={6} />
      </div>
    </div>
  )
}
