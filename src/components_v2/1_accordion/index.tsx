import { useState } from 'react'

import Accordion from './Accordion'
import data from './data'

const UncontrolledSingleAccordion = () => {
    const [items] = useState(data)

    return (
        <>
            <h3>#1-1. 단일 열림 정책 아코디언 (Uncontrolled)</h3>
            <Accordion defaultValue={items[0].id}>
                {items.map(item => (
                    <Accordion.Item key={item.id} value={item.id}>
                        <Accordion.Trigger>{item.title}</Accordion.Trigger>
                        <Accordion.Content>{item.content}</Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion>
        </>
    )
}

const ControlledSingleAccordion = () => {
    const [items] = useState(data)
    const [openId, setOpenId] = useState<string | null>(null)

    return (
        <>
            <h3>#1-2. 단일 열림 정책 아코디언 (Controlled)</h3>
            <div>{`열린 Item ID(string | null): ${openId}`}</div>
            <Accordion value={openId} onValueChange={setOpenId}>
                {items.map(item => (
                    <Accordion.Item key={item.id} value={item.id}>
                        <Accordion.Trigger>{item.title}</Accordion.Trigger>
                        <Accordion.Content>{item.content}</Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion>
        </>
    )
}

const Examples = () => {
    return (
        <>
            <UncontrolledSingleAccordion />
            {/* <ControlledSingleAccordion /> */}
        </>
    )
}

export default Examples
