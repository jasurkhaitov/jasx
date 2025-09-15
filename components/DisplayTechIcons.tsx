import React from 'react'
import { getTechLogos } from '@/lib/utils'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const DisplayTechIcons = async ({ techStack }: { techStack: string[] }) => {
	const techIcons = await getTechLogos(techStack)

	return (
		<div className='flex flex-row'>
			<TooltipProvider>
				{techIcons.slice(0, 3).map(({ tech, url }, index) => (
					<Tooltip key={tech}>
						<TooltipTrigger asChild>
							<Avatar className={`h-8 w-8 ${index >= 1 ? '-ml-2' : ''}`}>
								<AvatarImage src={url} alt={tech} />
								<AvatarFallback>{tech[0]}</AvatarFallback>
							</Avatar>
						</TooltipTrigger>
						<TooltipContent>{tech}</TooltipContent>
					</Tooltip>
				))}
			</TooltipProvider>
		</div>
	)
}

export default DisplayTechIcons
