'use client'
import { use } from 'react'

import { isParentRoute, ROUTE_PATH, routePaths, routes } from '@/routes'

const ItemPage = ({ params }: { params: Promise<{ item: string[] }> }) => {
    const { item } = use(params)
    const path = ['', ...item].join('/') as ROUTE_PATH
    const route = routes[path]
    if (!routePaths.includes(path) || isParentRoute(route) || !route.children) return null

    const Component = route.children
    return <Component />
}

export default ItemPage
