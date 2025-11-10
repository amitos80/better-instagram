import { createFileRoute } from '@tanstack/react-router'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchInstagramApi } from '~/utils/api'
import { useAuth } from '~/utils/AuthContext'
import { PostCard } from '~/components/PostCard'
import { IMedia } from '~/utils/types'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { accessToken } = useAuth()
  const { ref, inView } = useInView()

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts', accessToken],
    queryFn: ({ pageParam = '' }) =>
      fetchInstagramApi<{ data: IMedia[]; paging: { next?: string } }>(
        `/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&limit=10&after=${pageParam}`,
        accessToken!,
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.paging && lastPage.paging.next) {
        const url = new URL(lastPage.paging.next)
        return url.searchParams.get('after')
      }
      return undefined
    },
    enabled: !!accessToken,
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  if (status === 'pending') {
    return <p className="p-2">Loading...</p>
  }

  if (status === 'error') {
    return <p className="p-2">Error: {error.message}</p>
  }

  return (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.pages.map((page) =>
          page.data.map((post) => <PostCard key={post.id} post={post} />),
        )}
      </div>
      <div ref={ref} className="h-10" />
      {isFetchingNextPage && <p className="p-2 text-center">Loading more...</p>}
      {!hasNextPage && <p className="p-2 text-center">No more posts.</p>}
    </div>
  )
}
