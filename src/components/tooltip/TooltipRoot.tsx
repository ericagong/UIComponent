import type { ReactNode } from 'react'
import { useMemo } from 'react'

import TooltipContext from './context/TooltipContext'
import useTooltip from './hooks/useTooltip'
import type { UseTooltipOptions } from './types'

const TooltipRoot = ({
    options,
    children,
}: {
    options?: UseTooltipOptions
    children: ReactNode
}) => {
    const tooltip = useTooltip(options)

    const value = useMemo(() => ({ tooltip }), [tooltip])

    return <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>
}

export default TooltipRoot
