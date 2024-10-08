import Story from '@/components/Post/Story';
import CardLoader from '@/components/Shared/CardLoader';
import { postOptionsForStoryOrTip } from '@/options/infiniteQueryOptionsForPost';
import { getQueryClient } from '@/utils/getQueryClient'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'

const StoryPage = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(postOptionsForStoryOrTip("STORY"));
  return (
    <Suspense fallback={<CardLoader />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className='container mx-auto w-1/2'>
          <Story />
        </div>
      </HydrationBoundary>
    </Suspense>
  )
}

export default StoryPage