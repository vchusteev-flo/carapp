'use client'

import CarResults from '@/components/car-results';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function BudgetContent() {
  const searchParams = useSearchParams()
  const price = searchParams.get('price')

  return (
    <CarResults count={6} maxPrice={Number(price)} />
  )
}

export default function BudgetPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-charcoal via-charcoal-600 to-charcoal">
      <div className="p-4 pb-20">
        <Suspense fallback={<div>Loading...</div>}>
          <BudgetContent />
        </Suspense>
      </div>
    </div>
  )
}
