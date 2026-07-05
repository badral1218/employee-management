"use client";

import { useForm } from "@tanstack/react-form";
import * as React from "react";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { DatePicker } from "./add-employee-form-fields/DatePicker";
import { addEmployee } from "#/serverActions/employeeActions";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("It must be valid email.").min(1, "It is required"),
  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters.")
    .max(12, "First name must be at most 12 characters."),
  lastName: z
    .string()
    .min(3, "Last name must be at least 3 characters.")
    .max(12, "Last name must be at most 12 characters."),
  age: z.int(),
  birthday: z.string().min(1, "Birthday field is required"),
  position: z.string().min(1, "Position field is required"),
});

export const AddEmployeeForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      age: 0,
      birthday: "",
      position: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await addEmployee({ data: { ...value, profileImage: null } });

        toast("Successfully added employee", {
          position: "bottom-right",
          classNames: {
            content: "flex flex-col gap-2",
          },
          style: {
            "--border-radius": "calc(var(--radius)  + 4px)",
          } as React.CSSProperties,
        });
      } catch (error) {
        toast("something went wrong", {
          description: (
            <p className="text-red-500">{(error as Error).message}</p>
          ),
          position: "bottom-right",
          classNames: {
            content: "flex flex-col gap-2",
          },
          style: {
            "--border-radius": "calc(var(--radius)  + 4px)",
            color: "red",
            border: "1px solid red",
          } as React.CSSProperties,
        });
      } finally {
        form.reset();
      }
    },
  });


  return (
    <Card className="w-full mx-auto max-w-150 mt-14">
      <CardHeader>
        <CardTitle>Add Employee</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="add-employee-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="gap-3">
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field className="gap-1" data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="example@gmail.com"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <div className="flex gap-4">
              <form.Field
                name="firstName"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field className="gap-1" data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>First name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Bat..."
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="lastName"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field className="gap-1" data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Last name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Bayraa..."
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </div>

            <div className="flex gap-4">
              <form.Field
                name="age"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field className="gap-1" data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Age</FieldLabel>
                      <Input
                        type="number"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(+e.target.value)}
                        aria-invalid={isInvalid}
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="birthday"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field className="gap-1" data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Birthday</FieldLabel>
                      <DatePicker
                        date={field.state.value}
                        setDate={field.setValue}
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </div>
            <form.Field
              name="position"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field className="gap-1" data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Job Position</FieldLabel>
                    <Input
                      type="text"
                      placeholder="JE Engineer"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <form.Subscribe
            selector={(state) => ({
              valid: state.isFormValid,
              isSubmitting: state.isSubmitting,
            })}
          >
            {({ valid, isSubmitting }) => (
              <Button
                className="flex items-center gap-2"
                disabled={!valid || isSubmitting}
                type="submit"
                form="add-employee-form"
              >
                <span>Submit</span>
                {form.state.isSubmitting && (
                  <Loader2 size={20} className="animate-spin" />
                )}
              </Button>
            )}
          </form.Subscribe>
        </Field>
      </CardFooter>
    </Card>
  );
};
