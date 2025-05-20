export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      auditions: {
        Row: {
          id: string
          user_id: string
          role: string
          project: string
          notes: string | null
          due_date: string
          created_at: string
          agent: string | null  // new
          casting_office: string | null  // new
        }
        Insert: {
          id?: string
          user_id: string
          role: string
          project: string
          notes?: string | null
          due_date: string
          created_at?: string
          agent: string | null  // new
          casting_office: string | null  // new
        }
        Update: Partial<Database['public']['Tables']['auditions']['Insert']>
      }
    }
  }
}
