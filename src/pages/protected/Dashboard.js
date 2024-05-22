import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Dashboard from '../../features/dashboard/index'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : ""}))
      }, [dispatch])


    return(
        // status 101    configure store page
        // status 303    pending page
        // status 505    Dashboard
        // status 707    Brand Detail form page with remarks

        <Dashboard />
    )
}

export default InternalPage