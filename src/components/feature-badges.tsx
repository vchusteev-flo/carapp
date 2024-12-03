'use client'

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface FeatureBadgesProps {
  features: string[]
  initialCount?: number
}

export function FeatureBadges({ features, initialCount = 3 }: FeatureBadgesProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const displayedFeatures = isExpanded ? features : features.slice(0, initialCount)

  return (
    <div className={`flex gap-2 ${isExpanded ? `flex-wrap` : ``}`}>
      {displayedFeatures.map(feature => (
        <Badge key={feature} variant="secondary">
          {feature}
        </Badge>
      ))}
      
      {features.length > initialCount && (
        <Button 
          variant="link" 
          className="text-orange-500 p-0"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show Less' : 'See All'}
        </Button>
      )}
    </div>
  )
}
