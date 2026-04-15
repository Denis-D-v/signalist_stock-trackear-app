// Keep Next.js client directive as a statement (eslint-friendly).
'use client';

import * as React from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Check, ChevronsUpDown } from "lucide-react"
import countryList from "react-select-country-list"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type CountryOption = { value: string; label: string }

const allCountries: CountryOption[] = countryList().getData()

function getFlagEmoji(iso2?: string) {
  if (!iso2) return ""
  const code = iso2.toUpperCase()
  if (code.length !== 2) return ""

  const A = "A".charCodeAt(0)
  const first = code.charCodeAt(0) - A + 0x1f1e6
  const second = code.charCodeAt(1) - A + 0x1f1e6
  return String.fromCodePoint(first, second)
}

const CountrySelectField = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<SignUpFormData>()

  const error = errors.country

  const [open, setOpen] = React.useState(false)

  return (
    <div className="space-y-2">
      <Label htmlFor="country" className="form-label">
        Country
      </Label>

      <Controller
        name="country"
        control={control}
        rules={{ required: "Please select your country" }}
        render={({ field }) => {
          const selectedCountry = allCountries.find((c) => c.value === field.value)

          return (
            <>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="country"
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                      "country-select-trigger",
                      error ? "border-red-500" : "border-gray-600"
                    )}
                    onBlur={field.onBlur}
                  >
                    <span className="flex items-center gap-2">
                      {field.value ? (
                        <span className="text-base" aria-hidden="true">
                          {getFlagEmoji(field.value)}
                        </span>
                      ) : null}
                      <span className="truncate">
                        {selectedCountry?.label ?? "Select your country"}
                      </span>
                    </span>
                    <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      className="country-select-input"
                      placeholder="Search countries..."
                    />
                    <CommandEmpty>
                      <div className="country-select-empty">No country found.</div>
                    </CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {allCountries.map((country) => {
                          const selected = field.value === country.value
                          return (
                            <CommandItem
                              key={country.value}
                              value={country.label}
                              className="country-select-item"
                              onSelect={() => {
                                field.onChange(country.value)
                                field.onBlur()
                                setOpen(false)
                              }}
                            >
                              <span className="mr-2" aria-hidden="true">
                                {getFlagEmoji(country.value)}
                              </span>
                              <span className="flex-1">{country.label}</span>
                              {selected ? <Check className="ml-2 h-4 w-4" /> : null}
                            </CommandItem>
                          )
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {error ? <p className="text-sm text-red-500">{error.message}</p> : null}
            </>
          )
        }}
      />
    </div>
  )
}

export default CountrySelectField
