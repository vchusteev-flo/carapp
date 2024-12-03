'use client'

import { HomeIcon, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import router from 'next/router';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FilterModal } from './filter-modal';

export function NavWrapper({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()
	const router = useRouter()
	const [searchValue, setSearchValue] = useState('')
 
 	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 		setSearchValue(e.target.value)
 	}

	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const handleSearch = (event?: React.FormEvent<HTMLFormElement>) => {
		if (event) {
			event.preventDefault();
		}
		if (router) {
			router.push(`/budget?price=${searchValue}`);
		} else {
			console.error('Router is not mounted properly.');
		}
  }
	console.log(pathname)
	console.log(pathname.includes('/auth'))

	return (
		<>
			{/* <header className='sticky top-0 z-50 bg-charcoal p-4 shadow-sm'>
				<div className='flex items-center gap-4'>
					<div className='relative flex-1'>
						<form onSubmit={handleSearch}>
							<Input
								className='w-full rounded-full bg-gray-100 pl-10 pr-4'
								placeholder='Enter price'
								type='number'
								step={1000}
								value={searchValue}
								onChange={handleInputChange}
							/>
							<Search className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400' />
						</form>
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
			</header> */}

			<main>{children}</main>

			{/* Bottom Navigation */}
			<nav className='fixed bottom-0 left-0 right-0 bg-charcoal shadow-t'>
				<div className='flex items-center justify-around p-4'>
					<Link href='/' className='flex flex-col items-center text-gray-200'>
						<HomeIcon className={`h-6 w-6`} color={`${pathname === '/' ? '#f97316' : 'white'}`} />
						<span className='mt-1 text-xs'>Home</span>
					</Link>
					{/* <Link href="/favorites" className="flex flex-col items-center text-gray-400">
		<Heart className="h-6 w-6" />
		<span className="mt-1 text-xs">Favorites</span>
		</Link> */}
					<Link
						href='/auth/login' 
						className={`flex flex-col items-center text-gray-200`} 
					>
						<ShoppingCart className='h-6 w-6' color={`${pathname.includes('/auth/login') ? '#f97316' : 'white'}`}  />
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