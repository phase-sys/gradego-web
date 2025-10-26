'use client'

import Field from '@/components/Field'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { EnrollFormValues } from '@/app/(auth)/enroll/page'
import EnrollmentStep from '@/components/EnrollmentStep'

export default function Step1StudentInfo({
  formValues,
  setFormValues,
  errors,
}: {
  formValues: EnrollFormValues
  setFormValues: React.Dispatch<React.SetStateAction<EnrollFormValues>>
  errors: Partial<Record<keyof EnrollFormValues, string>>
}) {
  const handleChange = <K extends keyof EnrollFormValues>(
    key: K,
    value: string
  ) => {
    setFormValues((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <EnrollmentStep
      title="Student Information"
      description="Provide details of the student."
    >
      <Field
        label={
          <>
            First Name<span className="text-red-500 ml-1">*</span>
          </>
        }
        name="firstName"
        placeholder="Juan"
        value={formValues.firstName || ''}
        onChange={(e) => handleChange('firstName', e.target.value)}
        error={errors.firstName}
      />

      <Field
        label="Middle Name"
        name="middleName"
        placeholder="Dela"
        value={formValues.middleName || ''}
        onChange={(e) => handleChange('middleName', e.target.value)}
        error={errors.middleName}
      />

      <Field
        label={
          <>
            Last Name<span className="text-red-500 ml-1">*</span>
          </>
        }
        name="lastName"
        placeholder="Cruz"
        value={formValues.lastName || ''}
        onChange={(e) => handleChange('lastName', e.target.value)}
        error={errors.lastName}
      />

      <Field
        label="Extension"
        name="extension"
        placeholder="Jr., Sr., III"
        value={formValues.extension || ''}
        onChange={(e) => handleChange('extension', e.target.value)}
        error={errors.extension}
      />

      <Field
        label={
          <>
            Birthday<span className="text-red-500 ml-1">*</span>
          </>
        }
        name="birthday"
        type="date"
        value={formValues.birthday || ''}
        onChange={(e) => handleChange('birthday', e.target.value)}
        error={errors.birthday}
      />

      <Field
        label={
          <>
            LRN<span className="text-red-500 ml-1">*</span>
          </>
        }
        name="lrn"
        placeholder="e.g. 123456789012"
        value={formValues.lrn || ''}
        onChange={(e) => handleChange('lrn', e.target.value)}
        error={errors.lrn}
      />

      <Field
        label="Interesting Fact"
        name="interestingFact"
        placeholder="e.g. I love robotics"
        value={formValues.interestingFact || ''}
        onChange={(e) => handleChange('interestingFact', e.target.value)}
        error={errors.interestingFact}
      />

      {/* Sex */}
      <div className="flex flex-col gap-2">
        <Label>
          Sex<span className="text-red-500 ml-1">*</span>
        </Label>
        <RadioGroup
          value={formValues.sex || ''}
          onValueChange={(value) => handleChange('sex', value)}
          className="flex gap-6"
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem
              value="male"
              id="sex-male"
              className="shrink-0 h-4 w-4 border border-gray-300 rounded-full checked:bg-blue-600 checked:border-blue-600"
            />
            <span className="text-sm">Male</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem
              value="female"
              id="sex-female"
              className="shrink-0 h-4 w-4 border border-gray-300 rounded-full checked:bg-blue-600 checked:border-blue-600"
            />
            <span className="text-sm">Female</span>
          </label>
        </RadioGroup>
        <input type="hidden" name="sex" value={formValues.sex || ''} />
        {errors.sex && <p className="text-red-500 text-sm">{errors.sex}</p>}
      </div>

      {/* Gender */}
      <Field
        label="Gender"
        name="gender"
        placeholder="Specify if different from sex"
        value={formValues.gender || ''}
        onChange={(e) => handleChange('gender', e.target.value)}
        error={errors.gender}
      />
    </EnrollmentStep>
  )
}
