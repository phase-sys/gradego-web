'use client'

import { EnrollFormValues } from '@/app/(auth)/enroll/page'
import { Label } from '@/components/ui/label'

interface Step4ConfirmationProps {
  formValues: EnrollFormValues
}

export default function Step4Confirmation({
  formValues,
}: Step4ConfirmationProps) {
  const sections: {
    title: string
    fields: [keyof EnrollFormValues, string][]
  }[] = [
    {
      title: 'Student Information',
      fields: [
        ['firstName', 'First Name'],
        ['middleName', 'Middle Name'],
        ['lastName', 'Last Name'],
        ['extension', 'Extension'],
        ['sex', 'Sex'],
        ['gender', 'Gender'],
        ['birthday', 'Birthday'],
        ['lrn', 'LRN'],
        ['interestingFact', 'Interesting Fact'],
      ],
    },
    {
      title: 'Guardian Information',
      fields: [
        ['guardianFirstName', 'First Name'],
        ['guardianMiddleName', 'Middle Name'],
        ['guardianLastName', 'Last Name'],
        ['guardianExtension', 'Extension'],
        ['guardianRelationship', 'Relationship'],
        ['guardianNumber', 'Contact Number'],
      ],
    },
    {
      title: 'Account Information',
      fields: [
        ['email', 'Email'],
        // Password intentionally skipped
      ],
    },
  ]

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <div key={section.title}>
          <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
          <div className="grid grid-cols-2 gap-6">
            {section.fields.map(([key, label]) => (
              <div key={key}>
                <Label className="mb-1">{label}:</Label>
                <div className="text-gray-800">{formValues[key]}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
