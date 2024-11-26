'use client'

import { Filter, HomeIcon, Search, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FilterModal } from './filter-modal';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function NavWrapper({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()
  const isAuthPage = pathname.includes('/auth/')

	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  if (isAuthPage) {
    return <>{children}</>
  }

  const handleSearch = (filters: any) => {
    console.log('Searching with filters:', filters)
    // Implement your search logic here
  }

	return (
		<>
			<header className='sticky top-0 z-50 bg-charcoal p-4 shadow-sm'>
				<div className='flex items-center gap-4'>
					<div className='relative flex-1'>
						<Input
							className='w-full rounded-full bg-gray-100 pl-10 pr-4'
							placeholder='By price $'
							type='number'
							step={1000}
						/>
						<Search className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400' />
					</div>
					<h1 className='text-xl font-bold text-white'>ChoiceGear</h1>
					<Button
						variant='ghost'
						size='icon'
						className='ml-2 bg-white'
						onClick={() => setIsFilterModalOpen(true)}
					>
						<Filter className='h-5 w-5' />
					</Button>
				</div>
			</header>

			<main>{children}</main>

			{/* Bottom Navigation */}
			<nav className='fixed bottom-0 left-0 right-0 bg-charcoal shadow-t'>
				<div className='flex items-center justify-around p-4'>
					<Link href='/' className='flex flex-col items-center text-gray-200'>
						<HomeIcon className='h-6 w-6' />
						<span className='mt-1 text-xs'>Home</span>
					</Link>
					{/* <Link href="/favorites" className="flex flex-col items-center text-gray-400">
		<Heart className="h-6 w-6" />
		<span className="mt-1 text-xs">Favorites</span>
		</Link> */}
					<Link
						href='/auth/login'
						className='flex flex-col items-center text-gray-400'
					>
						<User className='h-6 w-6' />
						<span className='mt-1 text-xs'>Profile</span>
					</Link>
				</div>
			</nav>
			{/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onSearch={handleSearch}
      />
		</>
	)
}
