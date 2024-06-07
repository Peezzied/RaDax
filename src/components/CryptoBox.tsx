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
    CommandLoading,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { IonCol, IonGrid, IonImg, IonRow, IonSkeletonText } from "@ionic/react";
import { cryptoFetch } from '../utils/market-price/index.js'


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

export function CryptoContent({ name, ticker, price, skeleton }: { name: string; ticker: string; price: string; skeleton: boolean; }) {
    return (
        <>
            {skeleton ?
                (
                    <IonGrid class="ion-no-padding">
                        <IonRow class="ion-align-items-center ion-justify-content-start gap-3">
                            <IonCol size="auto">
                                <IonSkeletonText animated={true} className="w-[44px] h-[44px] rounded-full"></IonSkeletonText>
                            </IonCol>
                            <IonCol size="auto" class="space-y-1">

                                <IonRow>
                                    <IonSkeletonText animated={true} className="w-24 "></IonSkeletonText>
                                </IonRow>
                                <IonRow>
                                    <IonSkeletonText animated={true} className="w-20 "></IonSkeletonText>
                                </IonRow>

                            </IonCol>
                        </IonRow>
                    </IonGrid>
                )
                : (
                    <IonGrid class="ion-no-padding">
                        <IonRow class="ion-align-items-center ion-justify-content-start gap-3">
                            <IonCol size="auto">
                                <IonImg
                                    class="w-11 h-auto"
                                    src={`https://pdax-prod-mobile-ap-southeast-1.s3.ap-southeast-1.amazonaws.com/images/cryptos/${ticker.toLowerCase()}.png`}
                                ></IonImg>
                            </IonCol>
                            <IonCol size="auto" class="space-y-1">

                                <IonRow>
                                    <IonCol size="12" class="font-medium">{name} ({ticker})</IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size="12" class="font-mono text-xs">₱{price}</IonCol>
                                </IonRow>

                            </IonCol>
                        </IonRow>
                    </IonGrid>
                )}
        </>
    )
}

interface Coin {
    ask: number,
    askQuotedAt: string,
    bid: number,
    bidQuotedAt: string,
    currencyPair: string;
    tradedCurrency: {
        name: string;
        ticker: string;
    },
    updatedAt: number;
}

export function ComboboxDemo() {
    const [isOpen, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [coins, setCoins] = React.useState<Coin[]>([]);
    const times = Array.from({ length: 20 });
    React.useEffect(() => {
        const asyncRun = async () => {
            const tokens = await cryptoFetch()
            setCoins(tokens)
            setLoading(false)
            console.log('mapper', coins)
        }
        if (isOpen) {
            asyncRun()
        }
    }, [isOpen]);

    return (
        <Popover open={isOpen} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    size="lg"
                    className="w-full bg-white border-[8px] justify-between p-3 h-auto text-start"
                    role="combobox"
                    variant="ghost"
                    aria-expanded={open}
                >
                    {value
                        ? (() => {
                            const selected = coins.find((i) => i.tradedCurrency.name === value);
                            return selected ? (
                                <CryptoContent
                                    name={selected.tradedCurrency.name}
                                    ticker={selected.tradedCurrency.ticker}
                                    price="N/A"
                                />
                            ) : null
                        })()
                        :
                        <CryptoContent name="N/A" ticker="N/A" price="N/A" skeleton={true} />
                    }

                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[100vw] p-2 pt-0">
                <Command>
                    <CommandInput placeholder="Search Coin..." />
                    <CommandList>
                        {loading ? 
                            <CommandGroup>
                                {times.map((_, index) => (
                                    <CommandItem key={index}><CryptoContent skeleton={true} /></CommandItem>
                                ))}
                            </CommandGroup> :
                            <>
                                <CommandEmpty>Asset not found.</CommandEmpty>
                                <CommandGroup>
                                    {coins.map((i) => {
                                        return (
                                            <CommandItem
                                                key={i.currencyPair}
                                                value={i.tradedCurrency.name}
                                                keywords={[i.tradedCurrency.ticker]}
                                                onSelect={(currentValue) => {
                                                    setValue(currentValue === value ? "" : currentValue);
                                                    setOpen(false);
                                                }}
                                            >
                                                {/* {framework.label} */}
                                                <CryptoContent name={i.tradedCurrency.name} ticker={i.tradedCurrency.ticker} price="N/A" />
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        value === i.tradedCurrency.name ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        )
                                    })}
                                </CommandGroup>
                            </>
                        }
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
