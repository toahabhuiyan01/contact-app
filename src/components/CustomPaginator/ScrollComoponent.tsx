import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { CircularProgress, TableContainer } from '@mui/material'

type PaginationState<T> = { items: T[], hasMore: boolean, loading: boolean, error?: Error }
type ScrollProps<T> = {
    fetchMoreItems: () => Promise<void>
    state: PaginationState<T>
    render: (item: T, index: number) => JSX.Element
}

export default function <T>({ fetchMoreItems, state: { items, hasMore, loading }, render }: ScrollProps<T>) {
	const tableEl = useRef<HTMLHeadingElement>(null)
	const [distanceBottom, setDistanceBottom] = useState(300)

	const scrollListener = useCallback(() => {
		console.log('onSrcoll')
		if(tableEl?.current) {
			const bottom = tableEl.current?.scrollHeight - tableEl.current?.clientHeight

			console.log('bottom: ', bottom, 'disBot: ', distanceBottom, 'scroll: ', tableEl.current?.scrollHeight, 'client: ', tableEl.current?.clientHeight)

			if(!distanceBottom) {
				setDistanceBottom(Math.round((bottom / 100) * 20))
			}

			if(tableEl.current?.scrollTop > bottom - distanceBottom && hasMore && !loading) {
				fetchMoreItems()
			}
		}
	}, [hasMore, fetchMoreItems, loading, distanceBottom])

	useLayoutEffect(() => {
		const tableRef = tableEl?.current
		tableRef?.addEventListener('scroll', scrollListener)
		return () => {
			tableRef?.removeEventListener('scroll', scrollListener)
		}
	}, [scrollListener])


	return (
		<>
			<TableContainer
				ref={tableEl}
				sx={{ height: '100vh' }}
			>
				{items.map(render)}
				{loading && <CircularProgress />}
			</TableContainer>
		</>
	)
}