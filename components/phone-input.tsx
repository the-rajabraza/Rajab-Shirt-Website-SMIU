"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
  required?: boolean
  name?: string
}

export default function PhoneInput({ value, onChange, className = "", placeholder, required, name }: PhoneInputProps) {
  const [displayValue, setDisplayValue] = useState("")

  // Format phone number for display
  const formatPhoneNumber = (input: string) => {
    // Remove all non-digits
    const digits = input.replace(/\D/g, "")

    // If starts with 92, remove it (we'll add +92 prefix)
    const cleanDigits = digits.startsWith("92") ? digits.slice(2) : digits

    // Limit to 10 digits (Pakistani mobile numbers)
    const limitedDigits = cleanDigits.slice(0, 10)

    // Format: +92 3XX XXX XXXX
    let formatted = "+92"
    if (limitedDigits.length > 0) {
      formatted += " " + limitedDigits.slice(0, 3)
    }
    if (limitedDigits.length > 3) {
      formatted += " " + limitedDigits.slice(3, 6)
    }
    if (limitedDigits.length > 6) {
      formatted += " " + limitedDigits.slice(6, 10)
    }

    return formatted
  }

  // Get raw value (digits only with country code)
  const getRawValue = (input: string) => {
    const digits = input.replace(/\D/g, "")
    const cleanDigits = digits.startsWith("92") ? digits.slice(2) : digits
    const limitedDigits = cleanDigits.slice(0, 10)
    return limitedDigits.length > 0 ? `+92${limitedDigits}` : ""
  }

  // Initialize display value when component mounts or value prop changes
  useEffect(() => {
    if (value) {
      setDisplayValue(formatPhoneNumber(value))
    } else {
      setDisplayValue("+92")
    }
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    // Don't allow deletion of +92 prefix
    if (inputValue.length < 3 || !inputValue.startsWith("+92")) {
      setDisplayValue("+92")
      onChange("")
      return
    }

    // Format the input
    const formatted = formatPhoneNumber(inputValue)
    setDisplayValue(formatted)

    // Get raw value for form submission
    const rawValue = getRawValue(inputValue)
    onChange(rawValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent deletion of +92 prefix
    if ((e.key === "Backspace" || e.key === "Delete") && displayValue.length <= 4) {
      e.preventDefault()
      setDisplayValue("+92")
      onChange("")
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // If empty, set cursor after +92
    if (displayValue === "+92") {
      setTimeout(() => {
        e.target.setSelectionRange(3, 3)
      }, 0)
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    // Don't allow cursor before +92
    if (target.selectionStart !== null && target.selectionStart < 3) {
      setTimeout(() => {
        target.setSelectionRange(3, 3)
      }, 0)
    }
  }

  return (
    <input
      type="tel"
      name={name}
      value={displayValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onClick={handleClick}
      placeholder={placeholder || "+92 3XX XXX XXXX"}
      className={`${className}`}
      required={required}
      maxLength={16} // +92 3XX XXX XXXX = 16 characters
    />
  )
}
