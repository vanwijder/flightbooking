// test Users component by mocking fetch API endpoint https://jsonplaceholder.typicode.com/users

import { act, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Users from './Users'

import { mock, describe, test, expect, afterEach } from "bun:test"

const mockFetchUsers = mock(() => Promise.resolve([]))

mock.module("./userService", () => ({
    fetchUsers: mockFetchUsers
}))

describe('Users', () => {
    afterEach(() => {
        mockFetchUsers.mockClear()
    })

    test('should show loading state initially', async () => {
        // Mock the promise that never resolves to keep it in loading state
        mockFetchUsers.mockImplementation(() => new Promise(() => { }))

        render(<Users />)

        await waitFor(() => {
            expect(screen.getByText('Loading...')).toBeInTheDocument()
        })
    })

    test('shoud show error state when fetch fails', async () => {
        mockFetchUsers.mockRejectedValue(new Error('Failed to fetch users'))

        render(<Users />)

        await waitFor(() => {
            expect(screen.getByText('Error: Failed to fetch users')).toBeInTheDocument()
        })
    })

    test('should render users list', async () => {
        mockFetchUsers.mockResolvedValue([
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Doe' },
        ])

        render(<Users />)

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument()
        })
    })
})
