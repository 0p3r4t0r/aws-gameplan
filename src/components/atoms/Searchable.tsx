import React, { useCallback, useState } from 'react'

export type SearchableComponents = { id: string; findable: React.JSX.Element }[]

type SearchableProps = {
    components: SearchableComponents
}

export const Searchable = ({ components }: SearchableProps) => {
    const [searchString, setSearchString] = useState('')

    const normalize = useCallback((s: string) => {
        const lowerCase = s.toLowerCase()
        const noSpaces = lowerCase.replace(/\s/g, '')
        return noSpaces
    }, [])

    return (
        <div
            style={{
                height: 250,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <input
                style={{ margin: '10px 0', width: '100%' }}
                type="text"
                placeholder="🔎 Search"
                onChange={(e) => setSearchString(e.target.value)}
            />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    overflowY: 'scroll',
                    gap: 2,
                }}
            >
                {components
                    .filter((c) => normalize(c.id).includes(searchString))
                    .map(({ id, findable }) => (
                        <div key={id}>{findable}</div>
                    ))}
            </div>
        </div>
    )
}
