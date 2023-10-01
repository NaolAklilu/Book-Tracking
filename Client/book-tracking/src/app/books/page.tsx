import React from 'react'
import BookList from '@/components/book_list'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import AddBook from '@/components/add_book'

export default function Home() {
  return (
    <main>
        <AddBook />
        <BookList />
    </main>
  )
}