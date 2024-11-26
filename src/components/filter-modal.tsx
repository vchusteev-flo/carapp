'use client'

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

interface FilterModalProps {
	isOpen: boolean
	onClose: () => void
	onSearch: (filters: any) => void
}

export function FilterModal({ isOpen, onClose, onSearch }: FilterModalProps) {
	const [submited, setSubmited] = useState(false);

	const [filters, setFilters] = useState({
		title: '',
		condition: 'new',
		brand: '',
		model: '',
		features: [] as string[],
		location: '',
		price: '',
	})

	const handleSubmit = (e: React.FormEvent) => {
		setSubmited(true)
		e.preventDefault()
		onSearch(filters)
		onClose()
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='bg-charcoal text-white sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle className='flex items-center justify-between'>
						<span>Filters</span>
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className='grid gap-4'>
					<div className='grid gap-2'>
						<Label htmlFor='title'>Title</Label>
						<Input
							id='title'
							placeholder='Enter title'
							className='bg-white text-black'
							value={filters.title}
							onChange={e => setFilters({ ...filters, title: e.target.value })}
						/>
					</div>

					<div className='grid gap-2'>
						<Label>Condition</Label>
						<RadioGroup
							value={filters.condition}
							onValueChange={value =>
								setFilters({ ...filters, condition: value })
							}
							className='text-white
              flex gap-4
              
              '
						>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem
									value='new'
									id='new'
									className='[&_[data-state=checked]]:text-orange-500
              [data-state=checked]:border-orange-500
              [data-state=checked]:bg-orange-500 bg-white text-white '
								/>
								<Label className='' htmlFor='new'>New</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem
									value='used'
									id='used'
									className='[&_[data-state=checked]]:text-orange-500
              [data-state=checked]:border-orange-500 bg-white text-white'
								/>
								<Label htmlFor='used'>Used</Label>
							</div>
						</RadioGroup>
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div className='grid gap-2'>
							<Label htmlFor='brand'>Brand</Label>
							<Select
								onValueChange={value =>
									setFilters({ ...filters, brand: value })
								}
							>
								<SelectTrigger id='brand' className='bg-white text-black'>
									<SelectValue placeholder='Select Brand' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='audi'>Audi</SelectItem>
									<SelectItem value='bmw'>BMW</SelectItem>
									<SelectItem value='mercedes'>Mercedes</SelectItem>
									<SelectItem value='tesla'>Tesla</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='model'>Model</Label>
							<Select
								onValueChange={value =>
									setFilters({ ...filters, model: value })
								}
							>
								<SelectTrigger className='bg-white text-black' id='model'>
									<SelectValue placeholder='Select Model' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='model3'>Model 3</SelectItem>
									<SelectItem value='modely'>Model Y</SelectItem>
									<SelectItem value='models'>Model S</SelectItem>
									<SelectItem value='modelx'>Model X</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className='grid gap-2'>
						<Label>Features</Label>
						<div className='grid grid-cols-2 gap-4'>
							{[
								'Alarm',
								'Bluetooth',
								'Cruise Control',
								'Front Parking Sensor',
							].map(feature => (
								<div key={feature} className='flex items-center space-x-2'>
									<Checkbox
										id={feature}
										checked={filters.features.includes(feature)}
										className='border-gray-200 data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-white'
										onCheckedChange={checked => {
											if (checked) {
												setFilters({
													...filters,
													features: [...filters.features, feature],
												})
											} else {
												setFilters({
													...filters,
													features: filters.features.filter(f => f !== feature),
												})
											}
										}}
									/>
									<Label htmlFor={feature}>{feature}</Label>
								</div>
							))}
						</div>
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div className='grid gap-2'>
							<Label htmlFor='location'>Location</Label>
							<Input
								id='location'
								className='bg-white text-black'
								placeholder='Search Location'
								value={filters.location}
								onChange={e =>
									setFilters({ ...filters, location: e.target.value })
								}
							/>
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='price'>Price</Label>
							<Input
								id='price'
								className='bg-white text-black'
								type='number'
								placeholder='Enter Price'
								value={filters.price}
								onChange={e =>
									setFilters({ ...filters, price: e.target.value })
								}
							/>
						</div>
					</div>

					<Button
						type='submit'
						className='w-full bg-orange-500 hover:bg-orange-600'
					>
							Search
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
