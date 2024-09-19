import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import MarkdownEditor from '@uiw/react-markdown-editor'
import { useAddSubmissionMutation } from '@/features/submission/submissionSlice'

type Application = {
  asset: string
  severity: string
  findings: File[]
  evidence: string
  impact: string
}

export const SubmitBountyReportPage = () => {
  return <SubmitBountyReportForm />
}

export const SubmitBountyReportForm = () => {
  const { id } = useParams()

  const [submit] = useAddSubmissionMutation()
  const navigate = useNavigate()

  const evidenceMd = `## Summary


## Places affected


## Steps to reproduce
1. ...
2. ...
3. ...


## Supporting material`

  const schema = z.object({
    asset: z.string().optional(),
    severity: z.string().optional(),
    findings: z.array(z.instanceof(File)).optional(),
    evidence: z.string().optional(),
    impact: z.string().optional()
  })

  const form = useForm<Application>({
    resolver: zodResolver(schema),
    defaultValues: {
      asset: '',
      severity: '',
      findings: [],
      evidence: evidenceMd,
      impact: ''
    }
  })

  const submitData = async (data: Application) => {
    try {
      const formData = new FormData()

      data.findings.forEach((finding, index) => {
        formData.append(`findings[${index}]`, finding)
      })

      formData.append('asset', data.asset)
      formData.append('evidence', data.evidence)
      formData.append('impact', data.impact)
      formData.append('bountyAssignmentId', `${id}`)

      await submit({
        body: formData
      }).unwrap()
      form.reset({})
      navigate(`/assigned-bounties/${id}`)
    } catch (error) {
      console.error('Error submitting report:', error)
    }
  }

  return (
    <main className='mx-auto sm:w-[100%] md:w-[80%] lg:w-[60%]'>
      <div className='grid w-full gap-2'>
        <h1>Submit Report</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitData)}
            className='space-y-8'
            encType='multipart/form-data'
          >
            <FormField
              control={form.control}
              name='asset'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='evidence'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Evidence</FormLabel>
                  <FormControl>
                    <MarkdownEditor
                      className='prose dark:prose-invert h-fit min-w-full'
                      showToolbar={true}
                      enablePreview={true}
                      enableScroll={true}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='impact'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Impact</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='findings'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Findings</FormLabel>
                  <FormControl>
                    <Input
                      name='findings'
                      className='w-fit'
                      type='file'
                      multiple
                      onChange={(e) =>
                        field.onChange(
                          e.target.files ? Array.from(e.target.files) : []
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </div>
    </main>
  )
}
