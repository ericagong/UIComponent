import { useState } from 'react'

import data from '../data'
import Accordion from './Accordion'

const Example = () => {
    const [items] = useState(data)

    return (
        <>
            <h3>#1. 단일 열림 아코디언 (hidden = "until-found" 기반 ctrl + F UX 제공)</h3>
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

export default Example
