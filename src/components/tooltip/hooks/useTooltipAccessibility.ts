import { useId, useMemo } from 'react'

const TOOLTIP_A11Y_PREFIX = 'tooltip'
const useTooltipAccessibility = (isOpen: boolean) => {
    const uid = useId()

    const a11yIds = useMemo(
        () => ({
            triggerId: `${TOOLTIP_A11Y_PREFIX}-trigger-${uid}`,
            contentId: `${TOOLTIP_A11Y_PREFIX}-content-${uid}`,
        }),
        [uid]
    )

    const getTriggerA11yProps = useMemo(() => {
        return {
            id: a11yIds.triggerId,
            'aria-describedby': isOpen ? a11yIds.contentId : undefined,
        }
    }, [a11yIds, isOpen])

    const getContentA11yProps = useMemo(() => {
        return {
            id: a11yIds.contentId,
            role: 'tooltip',
            hidden: !isOpen,
        }
    }, [a11yIds, isOpen])

    return { a11yIds, getTriggerA11yProps, getContentA11yProps }
}

export default useTooltipAccessibility
