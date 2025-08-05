import { ButtonDirection } from './useButtonEnabled'

const useScrollToEdge = (
    listRef: React.RefObject<HTMLUListElement>,
    itemsRef: React.RefObject<(HTMLLIElement | null)[]>
) => {
    const getVisibleItemsOnEdge = () => {
        const $list = listRef.current
        const $items = itemsRef.current
        if (!$list || !$items) return {}

        const { left: listLeft, right: listRight } = $list.getBoundingClientRect()

        const isVisible = ($item: HTMLLIElement | null) => {
            if (!$item) return false
            const { left, right } = $item.getBoundingClientRect()
            // (1안) 애매하게 보이는 경우까지 모두 포함시키는 정책
            return left <= listRight && right >= listLeft
            // (2안) 전체가 보이는 경우만 인정하는 정책
            // return listLeft <= left && listRight >= right;
        }

        const leftIndex = Math.max($items.findIndex(isVisible), 0)
        const rightIndex = Math.min($items.findLastIndex(isVisible), $items.length - 1)

        return {
            $leftItem: $items[leftIndex],
            $rightItem: $items[rightIndex],
        }
    }

    const scrollItemIntoView = (target: HTMLElement | null, direction: 'prev' | 'next') => {
        target?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: direction === 'prev' ? 'end' : 'start',
        })
    }

    const scrollToEdge = (direction: ButtonDirection) => {
        const { $leftItem, $rightItem } = getVisibleItemsOnEdge()
        const $target = (direction === 'prev' ? $leftItem : $rightItem) ?? null

        scrollItemIntoView($target, direction)
    }

    return scrollToEdge
}

export default useScrollToEdge
