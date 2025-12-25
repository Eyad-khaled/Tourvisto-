"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "../app/lib/utils"
import { Button } from "../src/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../src/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../src/components/ui/popover"

type ComboItem = {
    text: string
    value: string
}

type ComboBoxProps = {
    id?: string
    dataSource: ComboItem[]
    placeholder?: string
    value?: string
    change?: (e: { value: string }) => void
}

export function Combobox({
    id,
    dataSource,
    placeholder,
    value,
    change,
}: ComboBoxProps) {
    const [open, setOpen] = React.useState(false)

    const selectedLabel =
        dataSource.find((item) => item.value === value)?.text

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between "
                >
                    <span
                        className={cn(
                            "truncate",
                            !value ? "text-muted-foreground" : "text-foreground"
                        )}
                    >
                        {selectedLabel || placeholder || `Select ${id}`}
                    </span>
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0">
                <Command filter={(value, search) =>
                    value.toLowerCase().startsWith(search.toLowerCase()) ? 1 : 0
                }>
                    <CommandInput placeholder={`Search ${id}...`} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {dataSource.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={() => {
                                        change?.({ value: item.value })
                                        setOpen(false)
                                    }}
                                >
                                    {item.text}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === item.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
