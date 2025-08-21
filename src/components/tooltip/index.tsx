import { useState } from 'react'

import data from './data'
import Tooltip from './Tooltip'

const BasicTooltip = ({ content }: { content: string }) => {
    return (
        <Tooltip>
            <Tooltip.Trigger>
                <button>툴팁 열기</button>
            </Tooltip.Trigger>
            <Tooltip.Content>
                <div>{content}</div>
            </Tooltip.Content>
        </Tooltip>
    )
}

const Tooltips = () => {
    const [items] = useState(data)

    return (
        <>
            <h2>툴팁</h2>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        <span>{item.title}</span>
                        <BasicTooltip content={item.description} />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Tooltips
