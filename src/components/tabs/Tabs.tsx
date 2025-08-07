import TabsContent from './TabsContent'
import TabsList from './TabsList'
import TabsRoot from './TabsRoot'
import TabsTrigger from './TabsTrigger'

const Tabs = Object.assign(TabsRoot, {
    List: TabsList,
    Trigger: TabsTrigger,
    Content: TabsContent,
})

export default Tabs
