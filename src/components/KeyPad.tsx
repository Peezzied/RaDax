type KeyPad = {
    value: number
    type: number | 'delete'
}

const keyPad: KeyPad[] = [
    {
        value: 1,
        type: 1
    },
    {
        value: 2,
        type: 2
    },
    {
        value: 3,
        type: 3
    },
    {
        value: 4,
        type: 4
    },
    {
        value: 5,
        type: 5
    },
    {
        value: 6,
        type: 6
    },
    {
        value: 7,
        type: 7
    },
    {
        value: 8,
        type: 8
    },
    {
        value: 9,
        type: 9
    },
    {
        value: 1,
        type: 'delete'
    },
]

export function KeyPad() {
    return (
        <>
            {keyPad.map((i)=>(
                <div>{i.value}</div>
            ))}
            
        </>
    )
}