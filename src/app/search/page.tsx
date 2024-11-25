'use client'

import CarResults from '@/components/car-results';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useState({
    year: '',
    configuration: '',
    mileage: '',
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically fetch results based on searchParams
    console.log('Searching with params:', searchParams)
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold">Find a Car by Parameters</h1>
      <form onSubmit={handleSearch} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            type="number"
            placeholder="Enter year"
            value={searchParams.year}
            onChange={(e) => setSearchParams({ ...searchParams, year: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="configuration">Configuration</Label>
          <Select onValueChange={(value) => setSearchParams({ ...searchParams, configuration: value })}>
            <SelectTrigger id="configuration">
              <SelectValue placeholder="Select configuration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedan">Sedan</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="hatchback">Hatchback</SelectItem>
              <SelectItem value="coupe">Coupe</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="mileage">Mileage</Label>
          <Input
            id="mileage"
            type="number"
            placeholder="Enter mileage"
            value={searchParams.mileage}
            onChange={(e) => setSearchParams({ ...searchParams, mileage: e.target.value })}
          />
        </div>
        <Button type="submit">Search</Button>
      </form>
      <CarResults count={3} />
    </div>
  )
}

