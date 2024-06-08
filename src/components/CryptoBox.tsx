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
import { cryptoFetch, cryptoGet } from '../utils/market-price/index.js'

const CryptoContent = React.memo(({ name, ticker, price, skeleton }: { name?: string; ticker?: string; price?: string; skeleton?: boolean; }) => {
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
                                {ticker ? (
                                    <IonImg
                                        class="w-11 h-auto"
                                        src={`https://pdax-prod-mobile-ap-southeast-1.s3.ap-southeast-1.amazonaws.com/images/cryptos/${ticker.toLowerCase()}.png`}
                                    ></IonImg>
                                ) :
                                    (
                                        <IonSkeletonText animated={true} className="w-[44px] h-[44px] rounded-full"></IonSkeletonText>
                                    )
                                }
                            </IonCol>
                            <IonCol size="auto" class="space-y-1">

                                <IonRow>
                                    <IonCol size="12" class="font-medium">{name} ({ticker})</IonCol>
                                </IonRow>
                                {price &&
                                    <IonRow>
                                        <IonCol size="12" class="font-mono text-xs">₱{price}</IonCol>
                                    </IonRow>
                                }

                            </IonCol>
                        </IonRow>
                    </IonGrid>
                )}
        </>
    )
})

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
    const [loading, setLoading] = React.useState<boolean>();
    const [coins, setCoins] = React.useState<Coin[]>([]);
    const fetchedDataRef = React.useRef<Coin[] | null>(null);
    const selectedRef = React.useRef<string | null>(null);
    const [price, setPrice] = React.useState<string | null>(null);
    const times = Array.from({ length: 20 });
    const asyncRun = React.useCallback(async () => {
        if (!fetchedDataRef.current) {
            const tokens = await cryptoFetch();
            fetchedDataRef.current = tokens;
            setCoins(tokens);
        } else {
            setCoins(fetchedDataRef.current);
        }
        setLoading(false);
    }, [])

    const priceHandler = async (get: string) => {
        let pricedAt: string | 'N/A' = 'N/A';
        try {
            const price = await cryptoGet(get);
            pricedAt = price.bid.toString()
            console.log('cryptoGet Price handler', price);
        } catch (error) {
            console.error('Error fetching price:', error);
        }
        return pricedAt;
    }
    React.useEffect(() => {
        if (value) {
            (async () => {
                setPrice(null)
                const newPrice = await priceHandler(value);
                setPrice(newPrice);
            })();
        }
    }, [value]);
    React.useEffect(() => {
        setLoading(true);
        if (isOpen) {
            asyncRun()
        }
    }, [isOpen, asyncRun]);
    React.useEffect(() => {
        console.log('mapper', coins)
    }, [coins])
    return (
        <Popover open={isOpen} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger asChild>
                <Button
                    size="lg"
                    className="w-full bg-white border-[8px] justify-between p-3 h-auto text-start"
                    role="combobox"
                    variant="ghost"
                    aria-expanded={isOpen}
                >
                    {value
                        ? (() => {
                            const selected = coins.find((i) => i.tradedCurrency.name === value);
                            return selected ? (
                                <CryptoContent
                                    name={selected.tradedCurrency.name}
                                    ticker={selected.tradedCurrency.ticker}
                                    price={price ? price : 'N/A'}
                                    skeleton={price ? false : true}
                                />
                            ) : null
                        })()
                        :
                        <CryptoContent skeleton />
                    }

                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[100vw] p-2 pt-0">
                <Command>
                    <CommandInput disabled={loading ? true : false} placeholder="Search Coin..." />
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
                                                <CryptoContent name={i.tradedCurrency.name} ticker={i.tradedCurrency.ticker} />
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
