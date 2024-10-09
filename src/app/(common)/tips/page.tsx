import Tip from '@/components/Post/Tip';
import CardLoader from '@/components/Shared/CardLoader';
import { postOptionsForStoryOrTip } from '@/options/infiniteQueryOptionsForPost';
import { getQueryClient } from '@/utils/getQueryClient'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'

const StoryPage = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(postOptionsForStoryOrTip("TIP"));
  return (
    <Suspense fallback={<CardLoader />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className='container mx-auto w-1/2'>
          <Tip />
        </div>
      </HydrationBoundary>
    </Suspense>
  )
}

export default StoryPage