import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import RequestedUsers from '../../features/requested-users'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Requested Users"}))
      }, [dispatch])


    return(
        <RequestedUsers />
    )
}

export default InternalPage