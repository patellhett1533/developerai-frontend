"use client"
import { post_api } from '@/helper/api'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

const page = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get('token')
    const verifyEmail = async () => {
        const {data, message} = await post_api('/auth/verify-email', {
            token
        })
        toast.success(message)
        router.push('/dashboard')
    }
    React.useEffect(() => {
        if (token) {
            verifyEmail()
        }
    }, [token])
  return (
    <div>page</div>
  )
}

export default page