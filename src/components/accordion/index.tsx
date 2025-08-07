import { useState } from 'react'

import Accordion from './Accordion'
import data from './data'

const SingleOpenAccordion = () => {
    const [items] = useState(data)

    return (
        <>
            <h3>#1-1. 단일 열림 정책 아코디언</h3>
            <Accordion defaultOpenId={items[0].id}>
                {items.map(item => (
                    <Accordion.Item key={item.id} id={item.id}>
                        <Accordion.Trigger>{item.title}</Accordion.Trigger>
                        <Accordion.Content>{item.content}</Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion>
        </>
    )
}

const MultipleOpenAccordion = () => {
    const [items] = useState(data)

    return (
        <>
            <h3>#1-2. 다중 열림 정책 아코디언</h3>
            <Accordion defaultOpenId={items[0].id} multiple>
                {items.map(item => (
                    <Accordion.Item key={item.id} id={item.id}>
                        <Accordion.Trigger>{item.title}</Accordion.Trigger>
                        <Accordion.Content>{item.content}</Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion>
        </>
    )
}

// REFACTOR 외부 상태 제어 기능 추가: Controlled Accordion 추가
const Examples = () => {
    return (
        <>
            <SingleOpenAccordion />
            <MultipleOpenAccordion />
            {/* <ControlledAccordion /> */}
        </>
    )
}

export default Examples
