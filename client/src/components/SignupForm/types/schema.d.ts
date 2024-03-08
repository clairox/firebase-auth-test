import { z } from 'zod'
import SignupFormSchema from '../utils/schema'

export type SignupFormSchemaType = z.infer<typeof SignupFormSchema>
