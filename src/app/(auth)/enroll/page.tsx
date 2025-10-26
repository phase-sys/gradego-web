'use client'

import { useEffect, useState } from 'react'
import Form from 'next/form'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import AuthWrapper from '@/components/scaffolding/AuthWrapper'
import { useActionState } from 'react'
import { enrollStudent, EnrollActionState } from '../actions'
import {
  step1Schema,
  step2Schema,
  step3Schema,
  enrollActionSchema,
} from '@/sections/auth/enroll/step-schemas'
import Step1StudentInfo from '@/sections/auth/enroll/Step1StudentInfo'
import Step2GuardianInfo from '@/sections/auth/enroll/Step2GuardianInfo'
import Step3AccountSetup from '@/sections/auth/enroll/Step3AccountSetup'
import Step4Confirmation from '@/sections/auth/enroll/Step4Confirmation'
import Link from 'next/link'
import { z, ZodObject, ZodRawShape } from 'zod'
import { showError, showSuccess } from '@/lib/toast'
import { useNextRouterNavigate } from '@/lib/navigation'

export type EnrollFormValues = z.infer<typeof enrollActionSchema>

export default function EnrollPage() {
  const { refresh } = useNextRouterNavigate()
  const [step, setStep] = useState(1)
  const [formValues, setFormValues] = useState<EnrollFormValues>({
    firstName: '',
    middleName: '',
    lastName: '',
    extension: '',
    sex: '',
    gender: '',
    birthday: '',
    lrn: '',
    interestingFact: '',
    guardianFirstName: '',
    guardianMiddleName: '',
    guardianLastName: '',
    guardianExtension: '',
    guardianRelationship: '',
    guardianNumber: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<
    Partial<Record<keyof EnrollFormValues, string>>
  >({})
  const [state, formAction] = useActionState<EnrollActionState, FormData>(
    enrollStudent,
    { status: 'idle', message: 'Currently Idle' }
  )

  const steps: {
    component: React.ComponentType<{
      formValues: EnrollFormValues
      setFormValues: React.Dispatch<React.SetStateAction<EnrollFormValues>>
      errors: Partial<Record<keyof EnrollFormValues, string>>
    }>
    schema: ZodObject<ZodRawShape> | null
    title: string
  }[] = [
    {
      component: Step1StudentInfo,
      schema: step1Schema,
      title: 'Student Information',
    },
    {
      component: Step2GuardianInfo,
      schema: step2Schema,
      title: 'Guardian Details',
    },
    {
      component: Step3AccountSetup,
      schema: step3Schema,
      title: 'Account Setup',
    },
    { component: Step4Confirmation, schema: null, title: 'Confirmation' },
  ]

  const totalSteps = steps.length
  const progress = totalSteps > 1 ? ((step - 1) / (totalSteps - 1)) * 100 : 100

  const StepComponent = steps[step - 1]?.component

  useEffect(() => {
    if (state.status === 'success') {
      showSuccess(state.message)
      refresh()
    } else if (state.status === 'failed' || state.status === 'invalid_data') {
      showError(state.message)
    }
  }, [state, refresh])

  const formDataToObject = <S extends ZodRawShape>(
    formData: FormData,
    schema: ZodObject<S>
  ): Record<keyof S, string> => {
    const raw = Object.fromEntries(formData.entries())
    const result = {} as Record<keyof S, string>
    for (const key of Object.keys(schema.shape) as (keyof S)[]) {
      result[key] = (raw[key as string] as string) ?? ''
    }
    return result
  }

  const validateCurrentStep = (formData: FormData) => {
    const schema = steps[step - 1].schema
    if (!schema) return true

    const values = formDataToObject(formData, schema)
    const result = schema.safeParse(values)

    if (!result.success) {
      setErrors(
        Object.fromEntries(
          result.error.issues.map((e) => [
            e.path[0] as keyof EnrollFormValues,
            e.message,
          ])
        )
      )
      return false
    }

    setErrors({})
    setFormValues((prev) => ({ ...prev, ...values }))
    return true
  }

  const handleNext = (formData: FormData) => {
    if (validateCurrentStep(formData)) setStep((s) => s + 1)
  }

  const handleSubmitFinal = (formData: FormData) => {
    const finalData = new FormData()
    Object.entries({
      ...formValues,
      ...Object.fromEntries(formData.entries()),
    }).forEach(([k, v]) => finalData.append(k, v as string))
    formAction(finalData)
  }

  return (
    <AuthWrapper>
      <div className="flex justify-center py-8 px-4">
        <Card className="w-full max-w-3xl bg-white shadow-lg rounded-2xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-500 whitespace-nowrap">
                Step {step} of {totalSteps}
              </span>
              <Progress
                value={progress}
                className="h-3 rounded-full bg-gray-200 flex-1"
              />
            </div>
          </CardHeader>

          <CardContent>
            <Form
              action={(formData: FormData) => {
                if (step === totalSteps) handleSubmitFinal(formData)
                else handleNext(formData)
              }}
              className="space-y-8"
            >
              {StepComponent && (
                <StepComponent
                  formValues={formValues}
                  setFormValues={setFormValues}
                  errors={errors}
                />
              )}

              <div
                className={`flex justify-between items-center pt-6 border-t border-gray-200 ${
                  step === totalSteps ? 'gap-x-6' : ''
                }`}
              >
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => setStep((s) => s - 1)}
                  >
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-6">
                  <span className="text-sm text-gray-500 truncate max-w-xs sm:max-w-sm">
                    Already have an account?{' '}
                    <Link
                      href="/login"
                      className="text-blue-600 hover:underline"
                    >
                      Login
                    </Link>
                  </span>

                  <Button
                    type="submit"
                    className="cursor-pointer bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg"
                  >
                    {step < totalSteps ? 'Next' : 'Submit Enrollment'}
                  </Button>
                </div>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AuthWrapper>
  )
}
