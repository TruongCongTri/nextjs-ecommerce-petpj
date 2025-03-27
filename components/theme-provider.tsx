"use client"

import * as React from "react"
//  dynamically import the theme provider from next-theme 
// and remove the suppressHydrationWarning from your <html> tag

const NextThemesProvider = dynamic(
	() => import('next-themes').then((e) => e.ThemeProvider),
	{
		ssr: false,
	}
)

import { type ThemeProviderProps } from 'next-themes'
import dynamic from 'next/dynamic'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
