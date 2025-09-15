import AccordionMultiRoot from './AccordionMultiRoot'
import AccordionSingleRoot from './AccordionSingleRoot'

type AccordionRootProps<T> =
    | ({ multiple?: false } & React.ComponentProps<typeof AccordionSingleRoot<T>>)
    | ({ multiple: true } & React.ComponentProps<typeof AccordionMultiRoot<T>>)

const AccordionRoot = <T,>(props: AccordionRootProps<T>) => {
    if (props.multiple) {
        const { multiple, ...rest } = props as { multiple: true } & React.ComponentProps<
            typeof AccordionMultiRoot<T>
        >
        return <AccordionMultiRoot {...rest} />
    }

    const { multiple, ...rest } = props as { multiple?: false } & React.ComponentProps<
        typeof AccordionSingleRoot<T>
    >
    return <AccordionSingleRoot {...rest} />
}

export default AccordionRoot
