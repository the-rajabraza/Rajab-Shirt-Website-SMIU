"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

interface FilterOption {
  value: string
  label: string
}

interface ShopFiltersProps {
  selectedCategory: string
  selectedSize: string
  selectedPriceRange: string
  onCategoryChange: (category: string) => void
  onSizeChange: (size: string) => void
  onPriceRangeChange: (priceRange: string) => void
}

export default function ShopFilters({
  selectedCategory,
  selectedSize,
  selectedPriceRange,
  onCategoryChange,
  onSizeChange,
  onPriceRangeChange,
}: ShopFiltersProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const categories: FilterOption[] = [
    { value: "all", label: "All Categories" },
    { value: "featured", label: "Featured Designs" },
    { value: "new-arrivals", label: "New Arrivals" },
    { value: "best-sellers", label: "Best Sellers" },
  ]

  const sizes: FilterOption[] = [
    { value: "all", label: "All Sizes" },
    { value: "S", label: "Small (S)" },
    { value: "M", label: "Medium (M)" },
    { value: "L", label: "Large (L)" },
    { value: "XL", label: "Extra Large (XL)" },
    { value: "XXL", label: "2XL" },
  ]

  const priceRanges: FilterOption[] = [
    { value: "all", label: "All Prices" },
    { value: "under-2000", label: "Under Rs. 2,000" },
    { value: "2000-2500", label: "Rs. 2,000 - 2,500" },
    { value: "above-2500", label: "Above Rs. 2,500" },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown && dropdownRefs.current[openDropdown]) {
        const dropdownElement = dropdownRefs.current[openDropdown]
        if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
          setOpenDropdown(null)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openDropdown])

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName)
  }

  const handleOptionSelect = (filterType: string, value: string) => {
    switch (filterType) {
      case "category":
        onCategoryChange(value)
        break
      case "size":
        onSizeChange(value)
        break
      case "price":
        onPriceRangeChange(value)
        break
    }
    setOpenDropdown(null)
  }

  const getSelectedLabel = (filterType: string, selectedValue: string, options: FilterOption[]) => {
    const option = options.find((opt) => opt.value === selectedValue)
    return option ? option.label : options[0].label
  }

  const FilterDropdown = ({
    name,
    label,
    options,
    selectedValue,
    filterType,
  }: {
    name: string
    label: string
    options: FilterOption[]
    selectedValue: string
    filterType: string
  }) => (
    <div className="relative" ref={(el) => (dropdownRefs.current[name] = el)}>
      <button
        onClick={() => toggleDropdown(name)}
        className="flex items-center justify-between px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 transition-colors min-w-[140px]"
      >
        <span>{getSelectedLabel(filterType, selectedValue, options)}</span>
        <ChevronDown
          className={`h-4 w-4 ml-2 transition-transform duration-200 ${
            openDropdown === name ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {openDropdown === name && (
        <div className="absolute top-full left-0 mt-2 w-full min-w-[200px] bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-2">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionSelect(filterType, option.value)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                selectedValue === option.value ? "bg-blue-50 text-primary font-medium" : "text-gray-700"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <FilterDropdown
        name="category"
        label="Categories"
        options={categories}
        selectedValue={selectedCategory}
        filterType="category"
      />
      <FilterDropdown name="size" label="Size" options={sizes} selectedValue={selectedSize} filterType="size" />
      <FilterDropdown
        name="price"
        label="Price"
        options={priceRanges}
        selectedValue={selectedPriceRange}
        filterType="price"
      />
    </div>
  )
}
