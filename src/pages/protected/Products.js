import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Products from '../../features/products'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Manage Products"}))
      }, [dispatch])


    return(
        <Products />
    )
}

export default InternalPage