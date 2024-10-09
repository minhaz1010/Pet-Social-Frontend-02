import Post from '@/components/Post/Post'
import FeedLayout from '@/components/Post/FeedLayout'
import FollowersList from '@/components/Post/FollowerList'
import FollowingsList from '@/components/Post/FollowingList'
import CardLoader from '@/components/Shared/CardLoader'
import { postOptions } from '@/options/infiniteQueryOptionsForPost'
import { getQueryClient } from '@/utils/getQueryClient'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React, { Suspense } from 'react'

const CommonPage = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(postOptions);
  return (
    <FeedLayout>
      <Suspense fallback={<div>Loading followers...</div>}>
        <FollowersList />
      </Suspense>
      <Suspense fallback={<CardLoader />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Post />
        </HydrationBoundary>
      </Suspense>
      <Suspense fallback={<div>Loading following...</div>}>
        <FollowingsList />
      </Suspense>
    </FeedLayout>
  )
}

export default CommonPage