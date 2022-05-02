import { useState, useRef, useLayoutEffect, useCallback } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import CircularProgress from '@material-ui/core/CircularProgress'

import {lol} from "./../../utils/interfaces"

const generateItems = (amount: number) => {
  const arr = Array.from(Array(amount))
  return arr.map((number: number, i: number) => ({
    id: i,
    name: `Name ${i + 1}`,
    type: `Item Type ${i + 1}`,
  }))
}

const AllContacts = () => {
  const tableEl = useRef<HTMLHeadingElement>(null);
  const [rows, setRows] = useState(generateItems(50))
  const [loading, setLoading] = useState(false)
  const [distanceBottom, setDistanceBottom] = useState(0)
  // hasMore should come from the place where you do the data fetching
  // for example, it could be a prop passed from the parent component
  // or come from some store
  const [hasMore] = useState(true)

  const loadMore = useCallback(() => {
    const loadItems = async () => {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                setRows(generateItems(rows.length + 50));
                setLoading(false);
            }, 5000)
        })
    }
    setLoading(true);
    loadItems();
  }, [rows])

  const scrollListener = useCallback(() => {
    if(tableEl?.current) {
        let bottom = tableEl.current?.scrollHeight - tableEl.current?.clientHeight

        // if you want to change distanceBottom every time new data is loaded
        // don't use the if statement
        if (!distanceBottom) {
        // calculate distanceBottom that works for you
            setDistanceBottom(Math.round((bottom / 100) * 20))
        }

        if (tableEl.current?.scrollTop > bottom - distanceBottom && hasMore && !loading) {
        loadMore()
        }
    }
  }, [hasMore, loadMore, loading, distanceBottom])

  useLayoutEffect(() => {
    const tableRef = tableEl?.current
    tableRef?.addEventListener('scroll', scrollListener)
    return () => {
      tableRef?.removeEventListener('scroll', scrollListener)
    }
  }, [scrollListener])

  return (
    <TableContainer style={{ maxWidth: '600px', margin: 'auto', maxHeight: '300px' }} ref={tableEl}>
      {loading && <CircularProgress style={{ position: 'absolute', top: '100px' }} />}
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ id, name, type }: lol) => (
            <>
                <TableRow>
                    <TableCell>{name}</TableCell>
                    <TableCell>{type}</TableCell>
                </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AllContacts;