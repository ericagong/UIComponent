import { useState } from 'react'

import data from '../data'
import MultiAccordion from './MultiAccordion'
import SingleAccordion from './SingleAccordion'

const SingleAccordionExample = () => {
    const [items] = useState(data)

    return (
        <>
            <h3>#2-1. 단일 열림 정책 아코디언 (details + summary 기반 구현)</h3>
            <SingleAccordion defaultOpenId={items[0].id}>
                {data.map(item => (
                    <SingleAccordion.Item key={item.id} id={item.id}>
                        <SingleAccordion.Trigger>{item.title}</SingleAccordion.Trigger>
                        <SingleAccordion.Content>{item.content}</SingleAccordion.Content>
                    </SingleAccordion.Item>
                ))}
            </SingleAccordion>
        </>
    )
}

const MultiAccordionExample = () => {
    const [items] = useState(data)

    return (
        <>
            <h3>#2-2. 다중 열림 정책 아코디언 (details + summary 기반 구현)</h3>
            <MultiAccordion defaultOpenIds={[items[0].id]}>
                {data.map(item => (
                    <MultiAccordion.Item key={item.id} id={item.id}>
                        <MultiAccordion.Trigger>{item.title}</MultiAccordion.Trigger>
                        <MultiAccordion.Content>{item.content}</MultiAccordion.Content>
                    </MultiAccordion.Item>
                ))}
            </MultiAccordion>
        </>
    )
}

const Accordions = () => {
    return (
        <>
            <SingleAccordionExample />
            <MultiAccordionExample />
        </>
    )
}

export default Accordions
