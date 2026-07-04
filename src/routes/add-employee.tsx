
import { AddEmployeeForm } from '#/components/AddEmployeeForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/add-employee')({
  component: AddEmployeeForm,
})
