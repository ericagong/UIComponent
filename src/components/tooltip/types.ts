import type { RefObject } from 'react'

type UseTooltipOptions = {
    openDelay?: number
    closeDelay?: number
    closeOnEsc?: boolean
    closeOnOutside?: boolean
}

type UseTooltipActionsProps = Pick<UseTooltipOptions, 'openDelay' | 'closeDelay'> & {
    initialOpen?: boolean
}

type DismissOptions = {
    closeOnEsc?: boolean
    closeOnOutside?: boolean
}

type UseDismissProps = {
    isOpen: boolean
    close: () => void
    targetRefs: RefObject<HTMLElement | null>[]
    options?: DismissOptions
}

export type { DismissOptions, UseDismissProps, UseTooltipActionsProps, UseTooltipOptions }
