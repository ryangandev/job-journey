import Link from 'next/link'
import { prisma } from "../../_libs/db"
import { redirect } from "next/navigation"
import CreateTodoForm from '../../_components/create-todo-form'


const Page = () => {
    return <>
        <header className='flex justify-between items-center mb-4'>
            <h1 className='text-2xl'>New</h1>
        </header>
        <CreateTodoForm />
    </>
}

export default Page
