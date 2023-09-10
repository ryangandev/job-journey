import Link from 'next/link'
import React from 'react'
import { createTodoAction } from '../_actions'

export default function CreateTodoForm() {
    return (
        <form action={createTodoAction} className='flex gap-2 flex-col'>
            <input 
                type='text'
                name='title' 
                className='border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100 '
            />
            <div className='flex justify-end gap-2'>
                <Link 
                    href='..' 
                    className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 focus-within:text-slate-700 outline-none'
                >
                    Cancel
                </Link>
                <button 
                    type='submit' 
                    className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 focus-within:text-slate-700 outline-none'
                >
                    Create
                </button>
            </div>
        </form>
    )
}
