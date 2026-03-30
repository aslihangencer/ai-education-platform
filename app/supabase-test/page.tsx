import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos, error } = await supabase.from('todos').select()

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Supabase Connection Error</h1>
        <pre className="p-4 bg-slate-100 rounded-xl overflow-auto text-sm">
          {JSON.stringify(error, null, 2)}
        </pre>
        <p className="mt-4 text-slate-600">
          Tip: Make sure the "todos" table exists in your Supabase project and Row Level Security (RLS) is configured correctly.
        </p>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Supabase SSR Test</h1>
      
      {todos && todos.length > 0 ? (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li key={todo.id} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="font-medium text-slate-700">{todo.name || todo.title}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-8 bg-blue-50 rounded-3xl text-center">
          <p className="text-blue-600 font-medium">No todos found. Add some in your Supabase dashboard!</p>
        </div>
      )}
    </div>
  )
}
