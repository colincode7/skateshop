"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import type { z } from "zod"

import { addStoreSchema } from "@/lib/validations/store"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"
import { addStoreAction } from "@/app/_actions/store"

interface AddStoreFormProps {
  userId: string
}

type Inputs = z.infer<typeof addStoreSchema>

export function AddStoreForm({ userId }: AddStoreFormProps) {
  const router = useRouter()

  const [isPending, startTransition] = React.useTransition()

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(addStoreSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        await addStoreAction({ ...data, userId })

        form.reset()
        toast.success("Store added successfully.")
        router.push("/account/stores")
      } catch (error) {
        error instanceof Error && toast.error(error.message)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="mx-auto grid w-full max-w-xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Type store name here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type store description here."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Add Store
          <span className="sr-only">Add Store</span>
        </Button>
      </form>
    </Form>
  )
}
