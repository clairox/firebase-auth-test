import { z } from 'zod'
import LoginFormSchema from '../utils/schema'

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>
