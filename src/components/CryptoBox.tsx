"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { IonCol, IonGrid, IonImg, IonRow } from "@ionic/react";

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
];

export function CryptoContent({...props}) {
    return (
        <IonGrid class="ion-no-padding" {...props}>
            <IonRow class="ion-align-items-center ion-justify-content-start gap-3">
                <IonCol size="auto">
                    <IonImg
                        class="w-11 h-auto"
                        src="https://pdax-prod-mobile-ap-southeast-1.s3.ap-southeast-1.amazonaws.com/images/cryptos/btc.png"
                    ></IonImg>
                </IonCol>
                <IonCol size="auto" class="space-y-1">

                    <IonRow>
                        <IonCol size="12" class="font-medium">Bitcoin (BTC)</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12" class="font-mono text-xs">₱4,179,043.83</IonCol>
                    </IonRow>

                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

export function ComboboxDemo() {
    const [isOpen, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    return (
        <Popover open={isOpen} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                {/* <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : "Select framework..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button> */}
                <Button
                    size="lg"
                    className="w-full bg-white border-[8px] justify-between p-3 h-auto text-start"
                    role="combobox"
                    variant="ghost"
                    aria-expanded={open}
                >
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        :
                        <CryptoContent />
                    }
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[100vw] p-2">
                <Command>
                    <CommandInput placeholder="Search Coin..." />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    {/* {framework.label} */}
                                    <CryptoContent/>
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
